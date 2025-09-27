import fetch from 'node-fetch';

const url = process.env.URL || 'http://localhost:3001/api/assistant';

async function test() {
  const payload = {
    message: 'Xin chào, cho tôi biết về khóa học cơ bản',
    personaName: 'MyAssistant',
    privacyMode: false
  };

  try {
    const res = await fetch(url, { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(payload) });
    const data = await res.json();
    console.log('status', res.status);
    console.log('reply:', data.reply);
  } catch (e) {
    console.error('error calling assistant server', e.message);
    process.exit(1);
  }
}

test();
