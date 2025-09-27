// Simple assistant proxy server (ESM)
import http from 'http';
import { URL } from 'url';

const PORT = process.env.PORT || 3001;
const PROVIDER = (process.env.PROVIDER || '').toLowerCase();
const HF_API_KEY = process.env.HUGGINGFACE_API_KEY || process.env.HF_API_KEY;
const HF_MODEL = process.env.HF_MODEL || 'google/flan-t5-small';
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

function parseJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => body += chunk.toString());
    req.on('end', () => {
      try {
        const obj = body ? JSON.parse(body) : {};
        resolve(obj);
      } catch (e) {
        reject(e);
      }
    });
    req.on('error', reject);
  });
}

const personalKeywords = ['tài khoản','mật khẩu','email','số điện thoại','sđt','cmnd','cccd','thẻ','thẻ tín dụng','số thẻ'];

function containsPersonal(text) {
  if (!text) return false;
  const lower = text.toLowerCase();
  return personalKeywords.some(k => lower.includes(k));
}

async function callHuggingFace(prompt) {
  if (!HF_API_KEY) throw new Error('Hugging Face API key not configured (HUGGINGFACE_API_KEY)');
  const url = `https://api-inference.huggingface.co/models/${HF_MODEL}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${HF_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({inputs: prompt, parameters: {max_new_tokens: 256}})
  });
  const contentType = res.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    const data = await res.json();
    if (Array.isArray(data) && data.length && data[0].generated_text) return data[0].generated_text;
    if (data.generated_text) return data.generated_text;
    return JSON.stringify(data);
  }
  return await res.text();
}

async function callOpenAI(prompt) {
  if (!OPENAI_API_KEY) throw new Error('OpenAI API key not configured (OPENAI_API_KEY)');
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL || 'gpt-3.5-turbo',
      messages: [
        {role: 'system', content: 'You are a helpful assistant.'},
        {role: 'user', content: prompt}
      ],
      max_tokens: 256
    })
  });
  const data = await res.json();
  if (data && data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) {
    return data.choices[0].message.content;
  }
  return JSON.stringify(data);
}

function localFallback(personaName, message) {
  const lower = (message || '').toLowerCase();
  if (lower.includes('khóa học') || lower.includes('học') || lower.includes('course')) {
    return `${personaName}: Mình có thể giúp bạn chọn khóa học. Bạn đang tìm khóa học cho trình độ nào?`;
  }
  if (lower.includes('giáo viên') || lower.includes('teacher')) {
    return `${personaName}: IVS có nhiều chương trình, bạn ưu tiên chi phí hay kinh nghiệm giáo viên?`;
  }
  if (lower.includes('xin chào') || lower.includes('hello') || lower.includes('hi')) {
    return `${personaName}: Xin chào! Mình là ${personaName}. Bạn cần hỗ trợ gì?`;
  }
  return `${personaName}: Mình chưa hiểu rõ, bạn mô tả kỹ hơn giúp mình nhé?`;
}

const server = http.createServer(async (req, res) => {
  // Basic CORS + JSON endpoints
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    return res.end();
  }

  const url = new URL(req.url, `http://${req.headers.host}`);
  if (req.method === 'POST' && url.pathname === '/api/assistant') {
    try {
      const body = await parseJsonBody(req);
      const message = body.message || '';
      const personaName = body.personaName || 'Assistant';
      const privacyMode = !!body.privacyMode;

      if (privacyMode && containsPersonal(message)) {
        const reply = `${personaName}: Mình tôn trọng quyền riêng tư và không xử lý thông tin cá nhân. Vui lòng liên hệ hỗ trợ chính thức.`;
        res.writeHead(200, {'Content-Type': 'application/json'});
        return res.end(JSON.stringify({reply}));
      }

      const prompt = `You are ${personaName}. Answer the user's question concisely in Vietnamese when possible. User: ${message}`;

      let modelReply = null;
      if (PROVIDER === 'hf') {
        try {
          modelReply = await callHuggingFace(prompt);
        } catch (e) {
          console.error('HF error', e && e.message);
          modelReply = null;
        }
      } else if (PROVIDER === 'openai') {
        try {
          modelReply = await callOpenAI(prompt);
        } catch (e) {
          console.error('OpenAI error', e && e.message);
          modelReply = null;
        }
      }

      if (!modelReply) {
        modelReply = localFallback(personaName, message);
      }

      res.writeHead(200, {'Content-Type': 'application/json'});
      return res.end(JSON.stringify({reply: modelReply}));
    } catch (err) {
      console.error('bad request', err);
      res.writeHead(400, {'Content-Type': 'application/json'});
      return res.end(JSON.stringify({error: 'invalid json body'}));
    }
  }

  res.writeHead(404, {'Content-Type': 'application/json'});
  res.end(JSON.stringify({error: 'not found'}));
});

server.listen(PORT, () => {
  console.log(`Assistant proxy listening on http://localhost:${PORT}  provider=${PROVIDER || 'local-fallback'}`);
});
