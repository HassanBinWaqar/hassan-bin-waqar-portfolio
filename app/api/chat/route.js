import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Ensure Node.js runtime (SDK may not work in Edge runtime)
export const runtime = 'nodejs';

// Simple guard to ensure key exists
function getClient() {
  const key = process.env.GEMINI_API_KEY;
  if (!key) {
    throw new Error('GEMINI_API_KEY is not set');
  }
  return new GoogleGenerativeAI(key);
}

// Persona prompt that matches Hassan's portfolio tone
const SYSTEM_PROMPT = `You are Hassan's friendly portfolio assistant. Keep answers concise, helpful, and professional.
Tone: welcoming, confident, and clear. Use simple language. When asked about Hassan, summarize based on:
- Full Stack enthusiast focused on building real-world products with modern web tech
- Strong foundation in JavaScript/TypeScript, React/Next.js, C++, SQL, and software design
- Experience: Buildables (MERN Fellow), Siber Koza (Web Dev), Bytewise (Frontend), NUML (ongoing)
- Contact email: hmisb2000@gmail.com; Resume available on the site
If asked for links, reference pages within this portfolio when possible.
Avoid making up facts. If you don't know, say so briefly and suggest using the contact form.`;

export async function POST(req) {
  try {
    const body = await req.json();
    const { messages } = body || {};
    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'messages[] required' }, { status: 400 });
    }

    const genAI = getClient();
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    // Build a single prompt from history; keep it short to control token usage
    const historyText = messages
      .map((m) => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`)
      .join('\n');

    const prompt = `${SYSTEM_PROMPT}\n\nConversation so far:\n${historyText}\n\nAssistant:`;

    const result = await model.generateContent(prompt);
    const text = result && result.response ? result.response.text() : '';
    if (!text) {
      return NextResponse.json({ error: 'Empty response from model' }, { status: 502 });
    }

    return NextResponse.json({ reply: text });
  } catch (err) {
    console.error('Chat API error:', err);
    const msg = err instanceof Error ? err.message : 'Chat failed';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
