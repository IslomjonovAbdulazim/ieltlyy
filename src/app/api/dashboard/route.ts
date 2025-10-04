import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongo";
import { requireAuth } from "@/lib/api-helpers";
import { AttemptModel } from "@/models/Attempt";

export async function GET(req: NextRequest) {
  const auth = requireAuth(req);
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectToDatabase();
  const attempts = await AttemptModel.find({ userId: auth.userId })
    .sort({ createdAt: -1 })
    .lean();

  const data = attempts.map((a: any) => ({
    id: String(a._id),
    section: a.section,
    score: a.score ?? null,
    total: a.total ?? null,
    percent: a.percent ?? null,
    createdAt: a.createdAt,
  }));

  return NextResponse.json({ attempts: data });
}