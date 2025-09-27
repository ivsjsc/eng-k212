<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1B8DO2j5WjsA26_bcBb2w0bczsrgkYqjk

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

### Assistant proxy (optional)

This project includes a small optional assistant proxy server at `server/index.js`.

- To run locally with the built-in fallback (no external API):

   1. From the project root run:

```powershell
node server/index.js
```

   2. In another terminal run the test script:

```powershell
node scripts/test-assistant-server.mjs
```

- To enable Hugging Face inference provider set env vars:

```powershell
$env:PROVIDER = 'hf'
$env:HUGGINGFACE_API_KEY = 'hf_xxx'
$env:HF_MODEL = 'google/flan-t5-small'
node server/index.js
```

The client `js/ai-chatbot.js` will POST to `/api/assistant` and fall back to local responses if the server is unreachable.
