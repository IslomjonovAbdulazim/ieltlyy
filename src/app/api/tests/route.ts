import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { tests, testParts, questions } from "@/db/schema";
import { eq } from "drizzle-orm";

// GET handler - List all tests with optional type filter
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const limit = Math.min(parseInt(searchParams.get('limit') || '10'), 100);
    const offset = parseInt(searchParams.get('offset') || '0');
    const full = searchParams.get('full') === 'true'; // New parameter for full details
    
    let query = db.select().from(tests);
    
    if (type) {
      // Fix case sensitivity - convert filter to lowercase to match seeded data
      query = query.where(eq(tests.type, type.toLowerCase()));
    }
    
    const testList = await query.limit(limit).offset(offset);
    
    // If full=true, fetch parts and questions for each test
    if (full && testList.length > 0) {
      const testsWithDetails = await Promise.all(
        testList.map(async (test) => {
          const parts = await db.select().from(testParts).where(eq(testParts.testId, test.id));
          const partsWithQuestions = await Promise.all(
            parts.map(async (part) => {
              const partQuestions = await db.select().from(questions).where(eq(questions.partId, part.id));
              return { ...part, questions: partQuestions };
            })
          );
          return { ...test, parts: partsWithQuestions };
        })
      );
      return NextResponse.json({ tests: testsWithDetails });
    }
    
    return NextResponse.json({ tests: testList });
  } catch (error) {
    console.error('GET tests error:', error);
    return NextResponse.json({ error: 'Internal server error: ' + error }, { status: 500 });
  }
}

// POST handler - Create new test with parts and questions
export async function POST(request: NextRequest) {
  try {
    const { title, description, type, duration, totalMarks, parts } = await request.json();
    
    // Validate required fields
    if (!title || !type || !duration || !totalMarks) {
      return NextResponse.json({ 
        error: "Title, type, duration, and totalMarks are required", 
        code: "MISSING_REQUIRED_FIELDS" 
      }, { status: 400 });
    }
    
    // Validate type
    const validTypes = ["listening", "reading", "writing", "speaking"];
    if (!validTypes.includes(type.toLowerCase())) {
      return NextResponse.json({ 
        error: "Type must be one of: listening, reading, writing, speaking", 
        code: "INVALID_TYPE" 
      }, { status: 400 });
    }
    
    // Validate duration and totalMarks are positive
    if (duration <= 0 || totalMarks <= 0) {
      return NextResponse.json({ 
        error: "Duration and totalMarks must be positive integers", 
        code: "INVALID_VALUES" 
      }, { status: 400 });
    }
    
    // Create test
    const newTest = await db.insert(tests).values({
      title: title.trim(),
      description: description || '',
      type: type.toLowerCase(),
      duration,
      totalMarks,
      createdAt: new Date().toISOString(),
    }).returning();
    
    const testId = newTest[0].id;
    const createdParts = [];
    
    // Create parts and questions if provided
    if (parts && Array.isArray(parts)) {
      for (const part of parts) {
        // Validate part required fields
        if (!part.partNumber || !part.title) {
          return NextResponse.json({ 
            error: "Part partNumber and title are required", 
            code: "MISSING_PART_FIELDS" 
          }, { status: 400 });
        }
        
        // Create part
        const newPart = await db.insert(testParts).values({
          testId,
          partNumber: part.partNumber,
          title: part.title.trim(),
          instructions: part.instructions || '',
          content: part.content || '',
          audioUrl: part.audioUrl || null,
        }).returning();
        
        const partId = newPart[0].id;
        const createdQuestions = [];
        
        // Create questions if provided
        if (part.questions && Array.isArray(part.questions)) {
          for (const question of part.questions) {
            // Validate question required fields
            if (!question.questionNumber || !question.questionText || !question.questionType || !question.marks) {
              return NextResponse.json({ 
                error: "Question questionNumber, questionText, questionType, and marks are required", 
                code: "MISSING_QUESTION_FIELDS" 
              }, { status: 400 });
            }
            
            // Validate questionType
            const validQuestionTypes = ["fill-in-blank", "multiple-choice", "true-false-notgiven", "essay", "recording"];
            if (!validQuestionTypes.includes(question.questionType)) {
              return NextResponse.json({ 
                error: "QuestionType must be one of: fill-in-blank, multiple-choice, true-false-notgiven, essay, recording", 
                code: "INVALID_QUESTION_TYPE" 
              }, { status: 400 });
            }
            
            const newQuestion = await db.insert(questions).values({
              partId,
              questionNumber: question.questionNumber,
              questionText: question.questionText.trim(),
              questionType: question.questionType,
              options: question.options || null,
              correctAnswer: question.correctAnswer || null,
              marks: question.marks,
            }).returning();
            
            createdQuestions.push(newQuestion[0]);
          }
        }
        
        createdParts.push({
          ...newPart[0],
          questions: createdQuestions
        });
      }
    }
    
    const result = {
      ...newTest[0],
      parts: createdParts
    };
    
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error('POST tests error:', error);
    return NextResponse.json({ error: 'Internal server error: ' + error }, { status: 500 });
  }
}