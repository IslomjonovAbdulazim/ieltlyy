import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { testParts, tests } from '@/db/schema';
import { eq, and } from 'drizzle-orm';
import { getCurrentUser } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    // Query to find all listening test parts with their audio URLs
    const listeningParts = await db
      .select({
        partId: testParts.id,
        testId: testParts.testId,
        partNumber: testParts.partNumber,
        title: testParts.title,
        audioUrl: testParts.audioUrl,
        testTitle: tests.title,
        testType: tests.type
      })
      .from(testParts)
      .innerJoin(tests, eq(testParts.testId, tests.id))
      .where(eq(tests.type, 'listening'));

    // Filter out parts that don't have audio URLs
    const partsWithAudio = listeningParts.filter(part => part.audioUrl);

    const response = {
      success: true,
      message: 'Listening test parts retrieved successfully',
      totalCount: partsWithAudio.length,
      totalListeningParts: listeningParts.length,
      data: partsWithAudio.map(part => ({
        partId: part.partId,
        testId: part.testId,
        partNumber: part.partNumber,
        title: part.title,
        audioUrl: part.audioUrl,
        testTitle: part.testTitle,
        testType: part.testType
      }))
    };

    return NextResponse.json(response, { status: 200 });

  } catch (error) {
    console.error('GET listening parts error:', error);
    
    // Handle specific database connection errors
    if (error instanceof Error) {
      if (error.message.includes('database') || error.message.includes('connection')) {
        return NextResponse.json({ 
          error: 'Database connection failed',
          code: 'DATABASE_CONNECTION_ERROR',
          details: error.message
        }, { status: 503 });
      }
    }

    return NextResponse.json({ 
      error: 'Internal server error: ' + error,
      code: 'INTERNAL_SERVER_ERROR'
    }, { status: 500 });
  }
}