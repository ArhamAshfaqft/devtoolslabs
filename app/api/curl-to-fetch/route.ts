import { NextResponse } from 'next/server';
import * as curlconverter from 'curlconverter';

export async function POST(request: Request) {
  try {
    const { curlString } = await request.json();

    if (!curlString || typeof curlString !== 'string') {
      return NextResponse.json({ error: 'Invalid cURL string provided.' }, { status: 400 });
    }

    const fetchCode = curlconverter.toNodeFetch(curlString);
    return NextResponse.json({ result: fetchCode });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to parse cURL command syntax.' },
      { status: 500 }
    );
  }
}
