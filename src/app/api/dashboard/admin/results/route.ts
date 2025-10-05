import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongo";
import { requireAdmin } from "@/lib/api-helpers";
import { AttemptModel } from "@/models/Attempt";
import { UserModel } from "@/models/User";

export async function GET(req: NextRequest) {
  const admin = requireAdmin(req);
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  await connectToDatabase();

  const [studentsCount, attemptsCount, sectionAgg] = await Promise.all([
    UserModel.countDocuments({ role: "student" }),
    AttemptModel.countDocuments({}),
    AttemptModel.aggregate([
      {
        $group: {
          _id: "$section",
          avgPercent: { $avg: { $ifNull: ["$percent", null] } },
          attempts: { $sum: 1 },
        },
      },
    ]),
  ]);

  // Overall average percent (only where percent exists)
  const overallAgg = await AttemptModel.aggregate([
    { $match: { percent: { $ne: null } } },
    { $group: { _id: null, avgPercent: { $avg: "$percent" }, attempts: { $sum: 1 } } },
  ]);

  const overall = overallAgg[0] || { avgPercent: null, attempts: 0 };

  const bySection = sectionAgg.map((s: any) => ({
    section: s._id,
    avgPercent: s.avgPercent ?? null,
    attempts: s.attempts,
  }));

  // include recent submissions list (latest 100)
  const recent = await AttemptModel.find({})
    .sort({ createdAt: -1 })
    .limit(100)
    .lean();

  const recentSubmissions = await Promise.all(
    recent.map(async (a: any) => {
      const u = await UserModel.findById(a.userId).lean();
      return {
        id: String(a._id),
        user: u && !Array.isArray(u) ? { id: String(u._id), name: u.name, email: u.email } : null,
        section: a.section,
        score: a.score ?? null,
        total: a.total ?? null,
        percent: a.percent ?? null,
        createdAt: a.createdAt,
      };
    })
  );

  return NextResponse.json({
    analytics: {
      students: studentsCount,
      attempts: attemptsCount,
      overallAvgPercent: overall.avgPercent ?? null,
      bySection,
    },
    submissions: recentSubmissions,
  });
}