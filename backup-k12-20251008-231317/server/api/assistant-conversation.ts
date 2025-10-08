// API handler for assistant conversation history (scaffold)
// POST /api/assistant-conversation
// Body: { userId: string, messages: [{role: 'user'|'assistant', content: string, timestamp: string}] }
// Returns: { ok: true }

import type { VercelRequest, VercelResponse } from '@vercel/node';

// In-memory store for demo (replace with DB in production)
const conversationStore: Record<string, Array<{role: string, content: string, timestamp: string}>> = {};

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'POST') {
    const { userId, messages } = req.body;
    if (!userId || !Array.isArray(messages)) {
      return res.status(400).json({ ok: false, error: 'Missing userId or messages' });
    }
    conversationStore[userId] = messages;
    return res.status(200).json({ ok: true });
  }
  if (req.method === 'GET') {
    const { userId } = req.query;
    if (!userId || typeof userId !== 'string') {
      return res.status(400).json({ ok: false, error: 'Missing userId' });
    }
    return res.status(200).json({ ok: true, messages: conversationStore[userId] || [] });
  }
  res.status(405).json({ ok: false, error: 'Method not allowed' });
}
