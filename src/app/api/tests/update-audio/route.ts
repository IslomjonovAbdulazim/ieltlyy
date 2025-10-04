import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { tests, testParts } from '@/db/schema';
import { eq, inArray } from 'drizzle-orm';

export async function POST(request: NextRequest) {
  try {
    const audioUrl = 'https://mdn.github.io/learning-area/html/multimedia-and-embedding/video-and-audio-content/viper.mp3';

    // First, get all listening test IDs
    const listeningTests = await db.select({ id: tests.id })
      .from(tests)
      .where(eq(tests.type, 'listening'));

    if (listeningTests.length === 0) {
      return NextResponse.json({
        message: "No listening tests found",
        updatedCount: 0,
        audioUrl: audioUrl
      }, { status: 200 });
    }

    // Extract test IDs
    const listeningTestIds = listeningTests.map(test => test.id);

    // Update all testParts that belong to listening tests
    const updatedParts = await db.update(testParts)
      .set({
        audioUrl: audioUrl
      })
      .where(inArray(testParts.testId, listeningTestIds))
      .returning();

    return NextResponse.json({
      message: `Updated ${updatedParts.length} listening test parts with audio URL`,
      updatedCount: updatedParts.length,
      audioUrl: audioUrl
    }, { status: 200 });

  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({
      error: 'Internal server error: ' + error
    }, { status: 500 });
  }
}