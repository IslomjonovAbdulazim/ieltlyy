import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { tests, testParts, questions } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(req: NextRequest, { params }: { params: Promise<{ testId: string }> }) {
  try {
    const { testId: testIdParam } = await params;
    const testId = parseInt(testIdParam);
    
    if (!testId || isNaN(testId)) {
      return NextResponse.json({ 
        error: "Valid test ID is required", 
        code: "INVALID_ID" 
      }, { status: 400 });
    }
    
    // Get test
    const test = await db.select().from(tests).where(eq(tests.id, testId)).limit(1);
    if (test.length === 0) {
      return NextResponse.json({ error: 'Test not found' }, { status: 404 });
    }
    
    // Get parts for this test
    const parts = await db.select().from(testParts)
      .where(eq(testParts.testId, testId))
      .orderBy(testParts.partNumber);
    
    // Get questions for each part
    const partsWithQuestions = await Promise.all(
      parts.map(async (part) => {
        const partQuestions = await db.select().from(questions)
          .where(eq(questions.partId, part.id))
          .orderBy(questions.questionNumber);
        
        return {
          ...part,
          questions: partQuestions
        };
      })
    );
    
    const result = {
      ...test[0],
      parts: partsWithQuestions
    };
    
    return NextResponse.json({ test: result });
  } catch (error) {
    console.error('GET test error:', error);
    return NextResponse.json({ error: 'Internal server error: ' + error }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ testId: string }> }) {
  try {
    const { testId: testIdParam } = await params;
    const testId = parseInt(testIdParam);
    
    if (!testId || isNaN(testId)) {
      return NextResponse.json({ 
        error: "Valid test ID is required", 
        code: "INVALID_ID" 
      }, { status: 400 });
    }
    
    const { title, description, type, duration, totalMarks } = await req.json();
    
    // Validate type if provided
    if (type) {
      const validTypes = ["Listening", "Reading", "Writing", "Speaking"];
      if (!validTypes.includes(type)) {
        return NextResponse.json({ 
          error: "Type must be one of: Listening, Reading, Writing, Speaking", 
          code: "INVALID_TYPE" 
        }, { status: 400 });
      }
    }
    
    // Validate duration and totalMarks if provided
    if (duration !== undefined && duration <= 0) {
      return NextResponse.json({ 
        error: "Duration must be a positive integer", 
        code: "INVALID_DURATION" 
      }, { status: 400 });
    }
    
    if (totalMarks !== undefined && totalMarks <= 0) {
      return NextResponse.json({ 
        error: "TotalMarks must be a positive integer", 
        code: "INVALID_TOTAL_MARKS" 
      }, { status: 400 });
    }
    
    const updateData: any = {};
    if (title) updateData.title = title.trim();
    if (description !== undefined) updateData.description = description;
    if (type) updateData.type = type;
    if (duration !== undefined) updateData.duration = duration;
    if (totalMarks !== undefined) updateData.totalMarks = totalMarks;
    
    const updatedTest = await db.update(tests)
      .set(updateData)
      .where(eq(tests.id, testId))
      .returning();
    
    if (updatedTest.length === 0) {
      return NextResponse.json({ error: 'Test not found' }, { status: 404 });
    }
    
    return NextResponse.json({ test: updatedTest[0] });
  } catch (error) {
    console.error('PUT test error:', error);
    return NextResponse.json({ error: 'Internal server error: ' + error }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ testId: string }> }) {
  try {
    const { testId: testIdParam } = await params;
    const testId = parseInt(testIdParam);
    
    if (!testId || isNaN(testId)) {
      return NextResponse.json({ 
        error: "Valid test ID is required", 
        code: "INVALID_ID" 
      }, { status: 400 });
    }
    
    // Check if test exists
    const test = await db.select().from(tests).where(eq(tests.id, testId)).limit(1);
    if (test.length === 0) {
      return NextResponse.json({ error: 'Test not found' }, { status: 404 });
    }
    
    // Get parts to delete questions
    const parts = await db.select().from(testParts).where(eq(testParts.testId, testId));
    
    // Delete questions for each part
    for (const part of parts) {
      await db.delete(questions).where(eq(questions.partId, part.id));
    }
    
    // Delete parts
    await db.delete(testParts).where(eq(testParts.testId, testId));
    
    // Delete test
    await db.delete(tests).where(eq(tests.id, testId));
    
    return NextResponse.json({ 
      message: 'Test deleted successfully',
      deletedTest: test[0]
    });
  } catch (error) {
    console.error('DELETE test error:', error);
    return NextResponse.json({ error: 'Internal server error: ' + error }, { status: 500 });
  }
}