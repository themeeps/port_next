import { GoogleGenAI } from '@google/genai';
import { buildSystemPrompt } from '@/lib/chatbot';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const MAX_MESSAGE_LENGTH = 500;
const MAX_HISTORY = 12;

// Best-effort in-memory rate limit. Resets on cold start / per serverless
// instance, so it's not a hard guarantee across all traffic — just a cheap
// deterrent against a single client hammering the API.
const requestLog = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 10;

function isRateLimited(id: string): boolean {
  const now = Date.now();
  const timestamps = (requestLog.get(id) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  timestamps.push(now);
  requestLog.set(id, timestamps);
  return timestamps.length > RATE_LIMIT_MAX;
}

type IncomingMessage = { role: 'user' | 'bot'; text: string };

export async function POST(request: Request) {
  const clientId = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  if (isRateLimited(clientId)) {
    return Response.json({ error: 'Too many messages. Please wait a moment and try again.' }, { status: 429 });
  }

  const body = await request.json().catch(() => null);
  const messages: IncomingMessage[] | undefined = body?.messages;

  if (!Array.isArray(messages) || messages.length === 0) {
    return Response.json({ error: 'Missing messages' }, { status: 400 });
  }

  const contents = messages.slice(-MAX_HISTORY).map((m) => ({
    role: m.role === 'user' ? ('user' as const) : ('model' as const),
    parts: [{ text: String(m.text ?? '').slice(0, MAX_MESSAGE_LENGTH) }],
  }));

  if (contents[0]?.role !== 'user') {
    return Response.json({ error: 'Conversation must start with a user message' }, { status: 400 });
  }

  try {
    const systemInstruction = await buildSystemPrompt();

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents,
      config: { systemInstruction },
    });

    const reply = response.text ?? "Sorry, I couldn't come up with a response.";

    return Response.json({ reply });
  } catch (error) {
    console.error('Chat API error:', error);
    return Response.json({ error: 'Failed to get a response.' }, { status: 502 });
  }
}
