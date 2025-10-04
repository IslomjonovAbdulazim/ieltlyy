import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { testParts } from '@/db/schema';

export async function GET(request: NextRequest) {
  try {
    const targetUrl = "https://www2.cs.uic.edu/~i101/SoundFiles/CantinaBand3.wav";
    
    // Query all test parts
    const allParts = await db.select().from(testParts);
    
    // Calculate statistics
    const totalParts = allParts.length;
    const partsWithAudio = allParts.filter(part => part.audioUrl).length;
    const partsWithCorrectUrl = allParts.filter(part => part.audioUrl === targetUrl).length;
    
    // Get sample data - first 5 parts with their audio URLs
    const sampleParts = allParts.slice(0, 5).map(part => ({
      id: part.id,
      partNumber: part.partNumber,
      title: part.title,
      audioUrl: part.audioUrl,
      hasCorrectUrl: part.audioUrl === targetUrl
    }));
    
    // Get all parts that match the target URL
    const matchingParts = allParts
      .filter(part => part.audioUrl === targetUrl)
      .map(part => ({
        id: part.id,
        partNumber: part.partNumber,
        title: part.title,
        testId: part.testId
      }));
    
    return NextResponse.json({
      summary: {
        totalParts,
        partsWithAudio,
        partsWithCorrectUrl,
        targetUrl
      },
      matchingParts,
      sampleData: sampleParts,
      message: `Found ${partsWithCorrectUrl} out of ${totalParts} parts with the target audio URL`
    }, { status: 200 });

  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + error 
    }, { status: 500 });
  }
}