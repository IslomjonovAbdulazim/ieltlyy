import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json({
      status: 'OK',
      timestamp: new Date().toISOString(),
      message: 'API is working correctly'
    }, { status: 200 });
  } catch (error) {
    console.error('Status check error:', error);
    return NextResponse.json({
      status: 'ERROR',
      timestamp: new Date().toISOString(),
      error: 'Internal server error'
    }, { status: 500 });
  }
}