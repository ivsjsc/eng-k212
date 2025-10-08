// ai-chatbot-v2.js
// Lightweight IVS Assistant with persona + privacy settings
(function () {
  class IVSChatbot {
    constructor() {
      this.isOpen = false;
      this.messages = [];
      this.prefs = {
        personaName: 'IVS Assistant',
        privacyMode: false
      };
      this.init();
    }

    init() {
      this.createChatbotUI();
      this.setupEventListeners();
      this.loadInitialMessage();
    }

    createChatbotUI() {
      // If the UI already exists, skip
      if (document.getElementById('ivs-chatbot')) return;

      const chatbotHTML = `
<div id="ivs-chatbot" class="fixed bottom-20 right-6 z-40 hidden">
  <button id="chatbot-toggle" class="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full p-4 shadow-lg transition-all duration-300 focus:outline-none" aria-label="Toggle IVS Assistant">
    <svg id="chat-icon" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
  </button>

  <div id="chat-window" class="absolute bottom-16 right-0 w-80 h-96 bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 hidden flex-col transition-all duration-300">
    <div class="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-t-lg flex items-center justify-between">
      <div class="flex items-center space-x-2">
        <div class="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/><path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"/></svg>
        </div>
        <div>
          <h3 id="chat-assistant-name" class="font-semibold text-sm">IVS Assistant</h3>
          <p class="text-xs opacity-90">Hỗ trợ 24/7</p>
        </div>
      </div>

      <div class="flex items-center space-x-2">
        <button id="chat-settings" title="Assistant settings" class="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-1 transition-colors" aria-label="Assistant settings">⚙️</button>
        <button id="chat-close" class="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-1 transition-colors" aria-label="Close chat">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
      </div>
    </div>

    <div id="chat-messages" aria-live="polite" class="flex-1 p-4 space-y-4 overflow-y-auto bg-gray-50 dark:bg-gray-900"></div>

    <div class="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-b-lg">
      <div class="flex space-x-2">
        <input type="text" id="chat-input" placeholder="Nhập câu hỏi của bạn..." class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" aria-label="Message input">
        <button id="chat-send" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg" aria-label="Send message">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
        </button>
      </div>
      <div class="flex space-x-1 mt-2">
        <button class="quick-reply px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 rounded" data-reply="courses">Khóa học</button>
        <button class="quick-reply px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 rounded" data-reply="teachers">Giáo viên</button>
        <button class="quick-reply px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 rounded" data-reply="contact">Liên hệ</button>
      </div>
    </div>
  </div>
</div>
`;
      document.body.insertAdjacentHTML('beforeend', chatbotHTML);

      // settings panel
      if (!document.getElementById('chat-settings-panel')) {
        const settingsHtml = `
<div id="chat-settings-panel" class="hidden fixed bottom-44 right-6 z-50 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border p-4">
  <h4 class="font-semibold mb-2">Assistant settings</h4>
  <label class="block text-sm mb-2">Name<br><input id="assistant-name-input" type="text" class="mt-1 w-full px-2 py-1 border rounded" placeholder="Assistant name"></label>
  <label class="flex items-center text-sm mb-2"><input id="assistant-privacy-input" type="checkbox" class="mr-2">Limit to non-personal responses (Privacy mode)</label>
  <div class="flex justify-end"><button id="assistant-save-settings" class="px-3 py-1 bg-blue-500 text-white rounded">Save</button></div>
</div>
`;
        document.body.insertAdjacentHTML('beforeend', settingsHtml);
      }
    }

    setupEventListeners() {
      const toggleBtn = document.getElementById('chatbot-toggle');
      const closeBtn = document.getElementById('chat-close');
      const sendBtn = document.getElementById('chat-send');
      const inputField = document.getElementById('chat-input');
      const quickReplies = document.querySelectorAll('.quick-reply');
      const settingsBtn = document.getElementById('chat-settings');
      const settingsPanel = document.getElementById('chat-settings-panel');
      const settingsSave = document.getElementById('assistant-save-settings');
      const nameInput = document.getElementById('assistant-name-input');
      const privacyInput = document.getElementById('assistant-privacy-input');

      if (toggleBtn) toggleBtn.addEventListener('click', () => this.toggleChat());
      if (closeBtn) closeBtn.addEventListener('click', () => this.closeChat());
      if (sendBtn) sendBtn.addEventListener('click', () => this.sendMessage());
      if (inputField) inputField.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') this.sendMessage();
      });

      quickReplies.forEach(btn => {
        btn.addEventListener('click', (ev) => {
          const reply = btn.dataset.reply || '';
          this.addMessage('user', btn.textContent || reply);
          // generate and show assistant response
          const resp = this.generateResponse(reply || btn.textContent || '');
          this.addMessage('bot', resp);
        });
      });

      if (settingsBtn && settingsPanel) {
        settingsBtn.addEventListener('click', () => {
          if (settingsPanel.classList.contains('hidden')) {
            if (nameInput) nameInput.value = this.prefs.personaName || '';
            if (privacyInput) privacyInput.checked = !!this.prefs.privacyMode;
            settingsPanel.classList.remove('hidden');
          } else {
            settingsPanel.classList.add('hidden');
          }
        });
      }

      if (settingsSave) {
        settingsSave.addEventListener('click', () => {
          if (nameInput) this.prefs.personaName = (nameInput.value || 'IVS Assistant').trim();
          if (privacyInput) this.prefs.privacyMode = !!privacyInput.checked;
          const nameEl = document.getElementById('chat-assistant-name');
          if (nameEl) nameEl.textContent = this.prefs.personaName;
          if (settingsPanel) settingsPanel.classList.add('hidden');
          this.savePreferences();
        });
      }

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          const panel = document.getElementById('chat-settings-panel');
          if (panel && !panel.classList.contains('hidden')) {
            panel.classList.add('hidden');
          } else if (this.isOpen) {
            this.closeChat();
          }
        }
      });

      // Populate name in header from prefs
      this.loadPreferences();
      const nameEl = document.getElementById('chat-assistant-name');
      if (nameEl) nameEl.textContent = this.prefs.personaName;
    }

    loadInitialMessage() {
      // show the assistant button with subtle delay
      setTimeout(() => {
        const toggle = document.getElementById('chatbot-toggle');
        if (toggle && toggle.classList.contains('hidden')) toggle.classList.remove('hidden');
      }, 1200);

      // initial welcome (only added to messages when opened)
    }

    toggleChat() {
      const chatWindow = document.getElementById('chat-window');
      const toggle = document.getElementById('chatbot-toggle');
      if (!chatWindow) return;
      this.isOpen = !this.isOpen;
      if (this.isOpen) {
        chatWindow.classList.remove('hidden');
        const input = document.getElementById('chat-input');
        if (input) input.focus();
      } else {
        chatWindow.classList.add('hidden');
      }
    }

    closeChat() {
      const chatWindow = document.getElementById('chat-window');
      if (!chatWindow) return;
      this.isOpen = false;
      chatWindow.classList.add('hidden');
    }

    sendMessage() {
      const inputField = document.getElementById('chat-input');
      if (!inputField) return;
      let message = (inputField.value || '').trim();
      if (!message) return;
      // normalize whitespace
      message = message.replace(/\\s+/g, ' ').trim();

      this.addMessage('user', message);
      inputField.value = '';

      // Try server-side AI proxy first; fall back to local simulation
      this.callServerAssistant(message).then(reply => {
        this.addMessage('bot', reply);
      }).catch(() => {
        const reply = this.generateResponse(message);
        setTimeout(() => { this.addMessage('bot', reply); }, 300 + Math.random() * 700);
      });
    }

    addMessage(sender, text) {
      const messagesContainer = document.getElementById('chat-messages');
      if (!messagesContainer) return;

      const messageDiv = document.createElement('div');
      messageDiv.className = `flex ${sender === 'user' ? 'justify-end' : 'justify-start'}`;

      const messageBubble = document.createElement('div');
      messageBubble.className = `max-w-xs px-4 py-2 rounded-lg text-sm ${sender === 'user' ? 'bg-blue-500 text-white' : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-600'}`;

      const textNode = document.createTextNode(text);
      messageBubble.appendChild(textNode);
      messageDiv.appendChild(messageBubble);
      messagesContainer.appendChild(messageDiv);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    generateResponse(message) {
      const lower = (message || '').toLowerCase();
      const personalKeywords = ['tài khoản','mật khẩu','email','số điện thoại','sđt','cmnd','cccd','thẻ','thẻ tín dụng','số thẻ'];
      const asksForPersonal = personalKeywords.some(k => lower.includes(k));
      if (this.prefs.privacyMode && asksForPersonal) {
        return `${this.prefs.personaName}: Mình tôn trọng quyền riêng tư của bạn và không xử lý thông tin cá nhân. Vui lòng liên hệ hỗ trợ chính thức nếu cần truy vấn về tài khoản.`;
      }

      if (lower.includes('khóa học') || lower.includes('course') || lower.includes('học')) {
        return `${this.prefs.personaName}: Mình có thể giúp bạn chọn khóa học. Bạn đang tìm khóa học cho trình độ nào (ví dụ: cơ bản, trung cấp, nâng cao)?`;
      }

      if (lower.includes('giáo viên') || lower.includes('teacher') || lower.includes('gvnn')) {
        return `${this.prefs.personaName}: IVS có giáo viên bản ngữ và nhiều chương trình; cho mình biết bạn ưu tiên về kinh nghiệm giảng dạy hay chi phí nhé.`;
      }

      if (lower.includes('liên hệ') || lower.includes('lien he') || lower.includes('contact')) {
        return `${this.prefs.personaName}: Bạn có thể liên hệ Hotline +84 896 920 547 hoặc email info@ivsacademy.edu.vn. Mình cũng có thể mở phần liên hệ cho bạn.`;
      }

      if (lower.includes('xin chào') || lower.includes('hello') || lower.includes('hi')) {
        return `${this.prefs.personaName}: Xin chào! Mình là ${this.prefs.personaName}. Bạn cần hỗ trợ về gì hôm nay?`;
      }

      return `${this.prefs.personaName}: Mình chưa hiểu rõ, bạn mô tả kỹ hơn giúp mình nhé?`;
    }

    async callServerAssistant(message) {
      // simple health check: attempt to POST to /api/assistant on same host/port
      try {
        const payload = {
          message,
          personaName: this.prefs.personaName || 'Assistant',
          privacyMode: !!this.prefs.privacyMode
        };
        const resp = await fetch('/api/assistant', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (!resp.ok) throw new Error('bad response');
        const data = await resp.json();
        if (data && data.reply) return data.reply;
        throw new Error('no reply');
      } catch (e) {
        // rethrow to allow fallback
        throw e;
      }
    }

    loadPreferences() {
      try {
        const raw = localStorage.getItem('ivs_chatbot_prefs');
        if (raw) {
          const obj = JSON.parse(raw);
          this.prefs = Object.assign(this.prefs, obj);
        }
      } catch (e) { /* ignore */ }
    }

    savePreferences() {
      try {
        localStorage.setItem('ivs_chatbot_prefs', JSON.stringify(this.prefs));
      } catch (e) { /* ignore */ }
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    if (!window.IVSChatbotInstance) {
      window.IVSChatbotInstance = new IVSChatbot();
    }
  });
});