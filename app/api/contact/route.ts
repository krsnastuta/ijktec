import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required.' },
        { status: 400 }
      );
    }

    if (!email.includes('@')) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    const dirPath = path.join(process.cwd(), 'data');
    const filePath = path.join(dirPath, 'contact.json');

    // Ensure data directory exists
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    let messages: any[] = [];

    if (fs.existsSync(filePath)) {
      try {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        messages = JSON.parse(fileContent);
      } catch (e) {
        console.error('Error reading contact file, resetting database', e);
      }
    }

    const newContactMessage = {
      id: Date.now().toString(),
      name,
      email,
      subject,
      message,
      createdAt: new Date().toISOString(),
    };

    messages.push(newContactMessage);
    fs.writeFileSync(filePath, JSON.stringify(messages, null, 2), 'utf8');

    return NextResponse.json(
      { success: true, message: 'Message sent successfully! We will get back to you shortly.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact API Error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
