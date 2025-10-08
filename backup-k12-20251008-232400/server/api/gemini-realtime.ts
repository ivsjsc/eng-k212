// API handler for Gemini real-time audio conversation
// POST /api/gemini-realtime
// WebSocket-like connection for real-time audio streaming

import { GoogleGenAI } from '@google/genai';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  console.error('GEMINI_API_KEY not configured');
}

const genAI = new GoogleGenAI({ apiKey: GEMINI_API_KEY! });

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // For real-time audio with Gemini, the client needs to connect directly to Google's WebSocket
    // We'll provide the configuration and authentication details

    const config = {
      responseModalities: ['AUDIO'],
      mediaResolution: 'MEDIA_RESOLUTION_LOW',
      speechConfig: {
        voiceConfig: {
          prebuiltVoiceConfig: {
            voiceName: 'Zephyr'
          }
        }
      },
      contextWindowCompression: {
        triggerTokens: 25600,
        slidingWindow: {
          targetTokens: 12800
        }
      }
    };

    // Return configuration for client-side WebSocket connection
    res.status(200).json({
      success: true,
      config,
      model: 'models/gemini-2.5-flash-native-audio-preview-09-2025',
      websocketUrl: 'wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1alpha.GenerativeService.BidiGenerateContent',
      apiKey: GEMINI_API_KEY, // In production, use a more secure method
      message: 'Connect to the WebSocket URL with the provided config and API key'
    });

  } catch (error) {
    console.error('Gemini realtime setup error:', error);
    res.status(500).json({
      error: 'Failed to setup Gemini realtime connection',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}