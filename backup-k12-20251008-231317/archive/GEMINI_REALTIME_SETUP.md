# Gemini 2.5 Flash Native Audio Real-time Setup

This document explains how to set up real-time voice conversations using Google's Gemini 2.5 Flash Native Audio Preview in the IVS Assistant.

## Features

- **Real-time voice input**: Continuous speech recognition
- **Natural conversation**: AI responds with both text and synthesized speech
- **Low latency**: Direct WebSocket connection to Google's servers
- **Multilingual support**: Works with Vietnamese and English

## Setup

### 1. Get Gemini API Key

1. Go to [Google AI Studio](https://aistudio.google.com/)
2. Create a new API key
3. Add it to your environment variables:

```bash
VITE_GEMINI_API_KEY=your_api_key_here
```

### 2. Enable in the App

1. In the IVS Assistant, click the "Gemini" button to toggle real-time mode
2. The button will show "Live" when active
3. Voice input becomes automatic, and responses include synthesized speech

## Pricing Information (October 2025)

- **Audio Input**: $0.0006 per 15 seconds
- **Audio Output**: $0.003 per 15 seconds
- **Text Input**: $0.000075 per 1K characters
- **Text Output**: $0.0003 per 1K characters

**Note**: Real-time audio conversations cost more than text-only interactions due to continuous audio processing.

## Technical Implementation

### WebSocket Connection

The app connects directly to Google's WebSocket endpoint:
```
wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1alpha.GenerativeService.BidiGenerateContent
```

### Audio Processing

- **Input**: Browser's MediaRecorder API captures audio in real-time
- **Format**: PCM audio at 16kHz sample rate
- **Output**: Base64-encoded audio chunks sent to Gemini
- **Response**: Gemini returns both text and synthesized audio

### Voice Configuration

- **Voice**: Zephyr (prebuilt voice)
- **Language**: Auto-detected based on user language setting

## Usage Tips

1. **Microphone Permissions**: Allow microphone access when prompted
2. **Network Connection**: Requires stable internet for real-time audio
3. **Browser Support**: Works best in Chrome/Edge with WebRTC support
4. **Cost Awareness**: Monitor usage as audio processing is more expensive

## Troubleshooting

- **Connection Issues**: Check API key and internet connection
- **Audio Not Working**: Ensure microphone permissions are granted
- **High Latency**: Try different network or browser
- **Cost Concerns**: Switch back to text mode for cheaper interactions

## API Reference

For more details, see the official documentation:
- [Gemini Live API](https://ai.google.dev/api/live)
- [Audio Setup Guide](https://github.com/google-gemini/cookbook/blob/main/quickstarts/Get_started_LiveAPI.py)