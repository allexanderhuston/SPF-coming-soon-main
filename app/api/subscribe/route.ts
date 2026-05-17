import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Invalid email.' }, { status: 400 });
  }

  const res = await fetch('https://api.kit.com/v4/subscribers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Kit-Api-Key': process.env.KIT_API_KEY!,
    },
    body: JSON.stringify({ email_address: email }),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    console.error('Kit API error', res.status, body);
    return NextResponse.json({ error: 'Could not subscribe. Try again.' }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
