const url = process.env.URL || 'http://localhost:3001/api/assistant';

async function test() {
  const payload = {
    message: 'Xin chào, cho tôi biết về khóa học cơ bản',
    personaName: 'MyAssistant',
    privacyMode: false
  };

  try {
    const res = await fetch(url, { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(payload) });
    const text = await res.text();
    let data = null;
    try { data = JSON.parse(text); } catch (e) { data = { raw: text }; }
    console.log('status', res.status);
    console.log('reply:', data.reply || data.raw || data);
  } catch (e) {
    console.error('error calling assistant server', e && e.stack ? e.stack : e);
    process.exit(1);
  }
}

test();
