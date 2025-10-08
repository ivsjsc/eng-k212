import React, { useEffect, useRef, useState } from 'react';

interface AudioPlayerProps {
  text: string;
  lang?: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ text, lang = 'en-US' }) => {
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const [speaking, setSpeaking] = useState(false);
  const [rate, setRate] = useState(1);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [voiceIndex, setVoiceIndex] = useState(0);

  useEffect(() => {
    synthRef.current = window.speechSynthesis;
    const load = () => {
      const v = synthRef.current ? synthRef.current.getVoices() : [];
      setVoices(v);
      // restore persisted voice index if available
      try {
        const saved = localStorage.getItem('eb_audio_voice');
        if (saved !== null) {
          const idx = Number(saved);
          if (!Number.isNaN(idx) && idx >= 0 && idx < v.length) setVoiceIndex(idx);
        }
      } catch (e) {
        // ignore
      }
    };
    load();
    window.speechSynthesis?.addEventListener('voiceschanged', load);
    return () => window.speechSynthesis?.removeEventListener('voiceschanged', load);
  }, []);

  // restore rate from storage
  useEffect(() => {
    try {
      const savedRate = localStorage.getItem('eb_audio_rate');
      if (savedRate) setRate(Number(savedRate));
    } catch (e) {
      // noop
    }
  }, []);

  // persist rate and voice choice
  useEffect(() => {
    try {
      localStorage.setItem('eb_audio_rate', String(rate));
      localStorage.setItem('eb_audio_voice', String(voiceIndex));
    } catch (e) {
      // ignore
    }
  }, [rate, voiceIndex]);

  const play = () => {
    if (!synthRef.current) return;
    synthRef.current.cancel();
    // tiny UI audio cue (short beep)
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = 'sine';
      o.frequency.value = 800;
      o.connect(g);
      g.connect(ctx.destination);
      o.start();
      g.gain.setValueAtTime(0.001, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.2, ctx.currentTime + 0.01);
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
      setTimeout(() => { o.stop(); ctx.close(); }, 200);
    } catch (e) {
      // ignore if audioctx not available
    }

    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang;
    u.rate = rate;
    if (voices[voiceIndex]) u.voice = voices[voiceIndex];
    u.onstart = () => setSpeaking(true);
    u.onend = () => setSpeaking(false);
    u.onerror = () => setSpeaking(false);
    synthRef.current.speak(u);
  };

  const stop = () => {
    synthRef.current?.cancel();
    setSpeaking(false);
  };

  return (
    <div className="flex items-center gap-3">
      <button
        aria-pressed={speaking}
        onClick={() => (speaking ? stop() : play())}
        className="min-h-[44px] min-w-[88px] px-3 py-2 bg-blue-600 text-white rounded-lg touch-manipulation"
      >
        {speaking ? 'Stop' : 'Play'}
      </button>

      <div className="flex items-center gap-2">
        <label className="text-sm">Rate</label>
        <input
          type="range"
          min={0.6}
          max={1.6}
          step={0.1}
          value={rate}
          onChange={(e) => setRate(Number(e.target.value))}
          className="w-24"
          aria-label="speech rate"
        />
      </div>

      {voices.length > 0 && (
        <select
          value={voiceIndex}
          onChange={(e) => setVoiceIndex(Number(e.target.value))}
          className="ml-2 rounded-md border px-2 py-1 text-sm"
        >
          {voices.map((v, i) => (
            <option key={v.name + i} value={i}>{v.name} ({v.lang})</option>
          ))}
        </select>
      )}

      <div className="ml-3 flex items-center gap-2">
        {speaking ? (
          <div className="flex items-center gap-2">
            <div className="flex gap-1 items-center" aria-hidden>
              <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
              <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse delay-75" />
              <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse delay-150" />
            </div>
            <span className="text-sm text-slate-600">Speaking</span>
          </div>
        ) : (
          <span className="text-sm text-slate-500">Ready</span>
        )}
        <span className="sr-only" aria-live="polite">{speaking ? 'Speaking' : 'Idle'}</span>
      </div>
    </div>
  );
};

export default AudioPlayer;
