import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const audioFile = formData.get("audio") as File;
    const questionText = formData.get("questionText") as string;

    if (!audioFile) {
      return NextResponse.json(
        { error: "No audio file provided" },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "OpenAI API key not configured. Please add OPENAI_API_KEY to your environment variables." },
        { status: 500 }
      );
    }

    // Step 1: Transcribe audio using Whisper
    const transcription = await openai.audio.transcriptions.create({
      file: audioFile,
      model: "whisper-1",
      language: "en",
      response_format: "verbose_json",
      timestamp_granularities: ["word"],
    });

    const transcribedText = transcription.text;

    // Step 2: Analyze transcription using GPT-4 for IELTS criteria
    const analysisPrompt = `You are an experienced IELTS speaking examiner. Analyze the following speaking response and provide detailed feedback based on IELTS Speaking Band Descriptors.

Question: ${questionText}

Candidate's Response: ${transcribedText}

Provide a detailed analysis in JSON format with the following structure:
{
  "overallBand": number (0-9 in 0.5 increments),
  "fluencyAndCoherence": {
    "band": number,
    "feedback": string,
    "mistakes": [{"text": string, "correction": string, "explanation": string}]
  },
  "lexicalResource": {
    "band": number,
    "feedback": string,
    "mistakes": [{"text": string, "correction": string, "explanation": string}]
  },
  "grammaticalRangeAndAccuracy": {
    "band": number,
    "feedback": string,
    "mistakes": [{"text": string, "correction": string, "explanation": string}]
  },
  "pronunciation": {
    "band": number,
    "feedback": string,
    "notes": string
  },
  "strengths": [string],
  "improvements": [string],
  "detailedFeedback": string
}

Focus on:
1. Fluency and Coherence: Speech rate, pauses, self-correction, coherence
2. Lexical Resource: Vocabulary range, accuracy, appropriateness
3. Grammatical Range and Accuracy: Sentence structures, grammar errors
4. Pronunciation: While we can't hear the audio directly, analyze the transcription for likely pronunciation issues based on word choice and sentence structure

Be specific and constructive in your feedback.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are an expert IELTS speaking examiner with years of experience. Provide detailed, constructive feedback following official IELTS band descriptors.",
        },
        {
          role: "user",
          content: analysisPrompt,
        },
      ],
      response_format: { type: "json_object" },
      temperature: 0.3,
    });

    const analysis = JSON.parse(completion.choices[0].message.content || "{}");

    return NextResponse.json({
      success: true,
      transcription: transcribedText,
      analysis,
      wordTimestamps: transcription.words || [],
    });
  } catch (error: any) {
    console.error("Speaking analysis error:", error);
    
    if (error?.code === 'invalid_api_key' || error?.status === 401) {
      return NextResponse.json(
        { error: "Invalid OpenAI API key. Please check your OPENAI_API_KEY environment variable." },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: error.message || "Failed to analyze speaking response" },
      { status: 500 }
    );
  }
}