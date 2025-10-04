import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { tests, testParts, questions } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest, { params }: { params: Promise<{ testId: string }> }) {
  try {
    const { testId: testIdParam } = await params;
    const testId = parseInt(testIdParam);
    
    if (!testId || isNaN(testId)) {
      return NextResponse.json({ 
        error: "Valid test ID is required", 
        code: "INVALID_ID" 
      }, { status: 400 });
    }
    
    const { answers } = await req.json();
    
    if (!answers || typeof answers !== 'object') {
      return NextResponse.json({ 
        error: "Answers object is required", 
        code: "MISSING_ANSWERS" 
      }, { status: 400 });
    }
    
    // Get test
    const test = await db.select().from(tests).where(eq(tests.id, testId)).limit(1);
    if (test.length === 0) {
      return NextResponse.json({ error: 'Test not found' }, { status: 404 });
    }
    
    const testData = test[0];
    
    // Handle subjective tests (Writing/Speaking) - just record submission
    if (testData.type === 'writing' || testData.type === 'speaking') {
      return NextResponse.json({
        result: {
          testId: testData.id,
          testTitle: testData.title,
          testType: testData.type,
          message: "Submission recorded. Manual scoring required.",
          submittedAt: new Date().toISOString(),
          submission: answers
        }
      });
    }
    
    // Handle objective tests (Listening/Reading)
    const parts = await db.select().from(testParts)
      .where(eq(testParts.testId, testId))
      .orderBy(testParts.partNumber);
    
    let totalQuestions = 0;
    let totalCorrect = 0;
    let totalMarks = 0;
    let earnedMarks = 0;
    const breakdown = [];
    const detailedResults = [];
    
    for (const part of parts) {
      // Get questions for this part
      const partQuestions = await db.select().from(questions)
        .where(eq(questions.partId, part.id))
        .orderBy(questions.questionNumber);
      
      let partCorrect = 0;
      let partTotal = partQuestions.length;
      let partMarks = 0;
      let partEarnedMarks = 0;
      
      for (const question of partQuestions) {
        totalQuestions++;
        totalMarks += question.marks;
        partMarks += question.marks;
        
        const submittedAnswer = answers[question.questionNumber.toString()];
        const correctAnswer = question.correctAnswer;
        
        let isCorrect = false;
        let earned = 0;
        
        if (submittedAnswer && correctAnswer) {
          // Case-insensitive comparison
          const submitted = submittedAnswer.toString().trim().toLowerCase();
          const correct = correctAnswer.toString().trim().toLowerCase();
          
          if (submitted === correct) {
            totalCorrect++;
            partCorrect++;
            earnedMarks += question.marks;
            partEarnedMarks += question.marks;
            isCorrect = true;
            earned = question.marks;
          }
        }
        
        // Add detailed question result
        detailedResults.push({
          questionNumber: question.questionNumber,
          questionText: question.questionText,
          submittedAnswer: submittedAnswer || "",
          correctAnswer: correctAnswer || "",
          isCorrect,
          marks: question.marks,
          earnedMarks: earned
        });
      }
      
      breakdown.push({
        partNumber: part.partNumber,
        partTitle: part.title,
        questions: partTotal,
        correct: partCorrect,
        percentage: partTotal > 0 ? Math.round((partCorrect / partTotal) * 100) : 0,
        marks: partMarks,
        earnedMarks: partEarnedMarks
      });
    }
    
    const percentage = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;
    const passed = percentage >= 60;
    
    return NextResponse.json({
      result: {
        testId: testData.id,
        testTitle: testData.title,
        testType: testData.type,
        totalQuestions,
        correctAnswers: totalCorrect,
        score: earnedMarks,
        totalMarks,
        percentage,
        passed,
        submittedAt: new Date().toISOString(),
        breakdown,
        detailedResults
      }
    });
    
  } catch (error) {
    console.error('POST submit test error:', error);
    return NextResponse.json({ error: 'Internal server error: ' + error }, { status: 500 });
  }
}