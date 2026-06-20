import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    const dirPath = path.join(process.cwd(), 'data');
    const filePath = path.join(dirPath, 'waitlist.json');

    // Ensure data directory exists
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    let waitlist: string[] = [];

    if (fs.existsSync(filePath)) {
      try {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        waitlist = JSON.parse(fileContent);
      } catch (e) {
        console.error('Error reading waitlist file, resetting database', e);
      }
    }

    // Prevent duplicates
    if (waitlist.includes(email)) {
      return NextResponse.json(
        { success: true, message: 'You are already on the waitlist!' },
        { status: 200 }
      );
    }

    waitlist.push(email);
    fs.writeFileSync(filePath, JSON.stringify(waitlist, null, 2), 'utf8');

    return NextResponse.json(
      { success: true, message: 'Thank you! You have joined the waitlist.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Waitlist API Error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
