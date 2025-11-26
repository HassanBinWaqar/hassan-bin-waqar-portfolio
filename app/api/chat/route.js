import { NextResponse } from 'next/server';

// Ensure Node.js runtime
export const runtime = 'nodejs';

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

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
    }

    // Format messages for Groq API (OpenAI-compatible)
    const formattedMessages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...messages.map(m => ({
        role: m.role === 'user' ? 'user' : 'assistant',
        content: m.content
      }))
    ];

    // Call Groq API - FREE tier with 14,400 requests/day
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile', // Fast, free, high-quality
        messages: formattedMessages,
        temperature: 0.7,
        max_tokens: 1024,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Groq API error:', response.status, errorData);
      return NextResponse.json({ error: 'Failed to generate response' }, { status: 500 });
    }

    const data = await response.json();
    const text = data.choices[0]?.message?.content || '';
    
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
