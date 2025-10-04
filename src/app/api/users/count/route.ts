import { NextResponse } from "next/server";
import { db } from "@/db";
import { user } from "@/db/schema";
import { count } from "drizzle-orm";

export async function GET() {
  try {
    const result = await db.select({ count: count() }).from(user);
    const userCount = result[0]?.count || 0;
    return NextResponse.json({ count: userCount });
  } catch (error) {
    console.error("Error counting users:", error);
    return NextResponse.json({ error: "Failed to count users" }, { status: 500 });
  }
}