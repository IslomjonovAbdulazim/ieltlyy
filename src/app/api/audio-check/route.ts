import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { testParts } from '@/db/schema';
import { eq, isNull, isNotNull } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const searchParams = url.searchParams;
    
    // Get query parameters
    const showAll = searchParams.get('showAll') === 'true';
    const updateUrl = searchParams.get('updateUrl');
    const partId = searchParams.get('partId');

    // If updating a specific part with a new audio URL
    if (partId && updateUrl) {
      const partIdInt = parseInt(partId);
      if (isNaN(partIdInt)) {
        return NextResponse.json({ 
          error: "Valid part ID is required",
          code: "INVALID_PART_ID" 
        }, { status: 400 });
      }

      const updated = await db.update(testParts)
        .set({ 
          audioUrl: updateUrl
        })
        .where(eq(testParts.id, partIdInt))
        .returning();

      if (updated.length === 0) {
        return NextResponse.json({ 
          error: "Part not found",
          code: "PART_NOT_FOUND" 
        }, { status: 404 });
      }

      return NextResponse.json({
        message: "Audio URL updated successfully",
        updatedPart: updated[0],
        count: 1
      });
    }

    // If bulk updating all parts with missing audio URLs
    if (updateUrl && !partId) {
      const updated = await db.update(testParts)
        .set({ 
          audioUrl: updateUrl
        })
        .where(isNull(testParts.audioUrl))
        .returning();

      return NextResponse.json({
        message: `Updated ${updated.length} parts with audio URL`,
        updatedParts: updated,
        count: updated.length
      });
    }

    // Default: Get all test parts and their audio status
    const baseQuery = db.select({
      id: testParts.id,
      testId: testParts.testId,
      partNumber: testParts.partNumber,
      title: testParts.title,
      audioUrl: testParts.audioUrl
    }).from(testParts);

    // Filter to show only parts without audio URLs unless showAll is true
    const filteredQuery = !showAll 
      ? baseQuery.where(isNull(testParts.audioUrl))
      : baseQuery;

    const parts = await filteredQuery.orderBy(testParts.testId, testParts.partNumber);

    // Count parts with and without audio URLs
    const partsWithAudio = await db.select({ count: testParts.id })
      .from(testParts)
      .where(isNotNull(testParts.audioUrl));

    const partsWithoutAudio = await db.select({ count: testParts.id })
      .from(testParts)
      .where(isNull(testParts.audioUrl));

    const totalParts = await db.select({ count: testParts.id })
      .from(testParts);

    return NextResponse.json({
      parts,
      summary: {
        total: totalParts.length,
        withAudio: partsWithAudio.length,
        withoutAudio: partsWithoutAudio.length,
        showingAll: showAll
      }
    });

  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + error 
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { audioUrl, partIds } = await request.json();

    if (!audioUrl) {
      return NextResponse.json({ 
        error: "Audio URL is required",
        code: "MISSING_AUDIO_URL" 
      }, { status: 400 });
    }

    let updatedCount = 0;
    let updatedParts = [];

    // If specific part IDs provided, update only those
    if (partIds && Array.isArray(partIds)) {
      for (const partId of partIds) {
        const partIdInt = parseInt(partId);
        if (isNaN(partIdInt)) continue;

        const updated = await db.update(testParts)
          .set({ 
            audioUrl: audioUrl
          })
          .where(eq(testParts.id, partIdInt))
          .returning();

        if (updated.length > 0) {
          updatedCount++;
          updatedParts.push(updated[0]);
        }
      }
    } else {
      // Update all parts without audio URLs
      const updated = await db.update(testParts)
        .set({ 
          audioUrl: audioUrl
        })
        .where(isNull(testParts.audioUrl))
        .returning();

      updatedCount = updated.length;
      updatedParts = updated;
    }

    return NextResponse.json({
      message: `Updated ${updatedCount} parts with audio URL`,
      updatedParts,
      count: updatedCount
    }, { status: 200 });

  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + error 
    }, { status: 500 });
  }
}