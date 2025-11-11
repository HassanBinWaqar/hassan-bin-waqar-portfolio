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

    // Try a short list of candidate models that are commonly available for
    // generateContent. The SDK doesn't expose a listModels() helper reliably
    // here, so we attempt each known name until one works.
    const candidates = [
      'models/gemini-2.5-flash',
      'models/gemini-2.5-pro',
      'models/gemini-flash-latest',
      'models/text-bison-001',
      'models/chat-bison-001'
    ];
    let model;
    let lastError = null;
    for (const name of candidates) {
      try {
        model = genAI.getGenerativeModel({ model: name });
        // quick test call will happen below; break here so we use this model
        console.info('Selected model candidate:', name);
        break;
      } catch (e) {
        console.warn('Unable to getGenerativeModel for', name, e?.message || e);
        lastError = e;
        model = null;
      }
    }
    if (!model) {
      throw new Error('No usable generative model found. Last error: ' + (lastError?.message || String(lastError)));
    }

    // Build a single prompt from history; keep it short to control token usage
    const historyText = messages
      .map((m) => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`)
      .join('\n');

    const prompt = `${SYSTEM_PROMPT}\n\nConversation so far:\n${historyText}\n\nAssistant:`;

    // Try to generate with the chosen model. If it fails (404 / unsupported
    // method), list models and retry with a compatible one.
    let result;
    try {
      result = await model.generateContent(prompt);
    } catch (genErr) {
      console.warn('Failed to generate with chosen model, attempting fallback...', genErr?.message || genErr);
        // Try a small list of candidate server models sequentially. Some SDK
        // builds or API keys don't expose a `listModels()` helper, so instead we
        // attempt a few known server-side model names and pick the first that
        // successfully generates content. This avoids calling `listModels()` which
        // may not exist in the installed SDK and caused the UI error you saw.
        const candidateModels = [
          'models/gemini-1.5-flash',
          'models/gemini-1.5',
          'models/chat-bison-001',
          'models/text-bison-001'
        ];

        let fallbackModel;
        let lastErr = null;
        for (const name of candidateModels) {
          try {
            fallbackModel = genAI.getGenerativeModel({ model: name });
            console.info('Using fallback model:', name);
            result = await fallbackModel.generateContent(prompt);
            break; // Exit loop if successful
          } catch (e) {
            console.warn('Unable to getGenerativeModel for', name, e?.message || e);
            lastErr = e;
            fallbackModel = null;
          }
        }
        if (!fallbackModel) {
          console.error('No model found that supports generateContent');
          return NextResponse.json({ error: 'No available model supports generateContent. Check API key or model availability.' }, { status: 502 });
        }
    }

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
