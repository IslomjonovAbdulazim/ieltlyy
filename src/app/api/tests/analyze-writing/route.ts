import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { text, prompt, taskNumber } = await req.json();

    if (!text || !prompt) {
      return NextResponse.json(
        { error: "Text and prompt are required" },
        { status: 400 }
      );
    }

    // Use GPT-4 to analyze IELTS writing based on official criteria
    const analysisPrompt = `You are an expert IELTS examiner. Analyze this IELTS Writing Task ${taskNumber} response and provide detailed feedback.

TASK PROMPT:
${prompt}

STUDENT'S RESPONSE:
${text}

Evaluate the response based on these IELTS Writing criteria:
1. Task Achievement/Response (25%)
2. Coherence and Cohesion (25%)
3. Lexical Resource (25%)
4. Grammatical Range and Accuracy (25%)

Provide your analysis in this EXACT JSON format:
{
  "bandScore": <number between 0-9 in 0.5 increments>,
  "taskAchievement": <number 0-9>,
  "coherenceCohesion": <number 0-9>,
  "lexicalResource": <number 0-9>,
  "grammaticalAccuracy": <number 0-9>,
  "mistakes": [
    {
      "type": "grammar|vocabulary|coherence|task",
      "original": "<exact phrase from text>",
      "correction": "<corrected version>",
      "explanation": "<brief explanation>"
    }
  ],
  "strengths": [
    "<specific strength 1>",
    "<specific strength 2>"
  ],
  "improvements": [
    "<specific improvement 1>",
    "<specific improvement 2>"
  ],
  "feedback": "<detailed paragraph of overall feedback>"
}

Be specific and constructive. Identify actual mistakes from the text.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are an expert IELTS examiner providing detailed, constructive feedback on writing tasks. Always respond with valid JSON only.",
        },
        {
          role: "user",
          content: analysisPrompt,
        },
      ],
      temperature: 0.3,
      response_format: { type: "json_object" },
    });

    const analysis = JSON.parse(completion.choices[0].message.content || "{}");

    return NextResponse.json({ analysis });
  } catch (error: any) {
    console.error("Writing analysis error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to analyze writing" },
      { status: 500 }
    );
  }
}