// Lightweight sound helper for UI effects
// Place sound files in the public/sounds/ folder named: click.mp3, confirm.mp3, cancel.mp3, open.mp3, close.mp3, notification.mp3

type SoundName = 'click' | 'confirm' | 'cancel' | 'open' | 'close' | 'notification';

const DEFAULT_VOLUME = 0.14;
const audioMap: Partial<Record<SoundName, HTMLAudioElement>> = {};
let initialized = false;
let enabled = false;
let detachHandler: (() => void) | null = null;

export function initSounds(basePath = '/sounds') {
  if (initialized) return;
  const names: SoundName[] = ['click', 'confirm', 'cancel', 'open', 'close', 'notification'];
  names.forEach(name => {
    try {
      const a = new Audio(`${basePath}/${name}.mp3`);
      a.preload = 'auto';
      a.volume = DEFAULT_VOLUME;
      // don't throw if file not found; errors are handled when play is attempted
      audioMap[name] = a;
    } catch (err) {
      // ignore
    }
  });
  initialized = true;
}

export function playSound(name: SoundName) {
  const a = audioMap[name];
  if (!a) return;
  try {
    a.currentTime = 0;
    // play returns a promise in modern browsers
    const p = a.play();
    if (p && typeof p.then === 'function') {
      p.catch(() => {
        // autoplay or interaction restrictions; ignore silently
      });
    }
  } catch (err) {
    // ignore playback errors
  }
}

/**
 * Attach a global click handler that will play a sound when an element (or its ancestor)
 * contains the attribute `data-sound="<name>"`. Example: <button data-sound="click">.
 * Returns a function to remove the listener.
 */
export function attachGlobalSoundHandler() {
  const handler = (e: MouseEvent) => {
    try {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const el = target.closest('[data-sound]') as HTMLElement | null;
      if (!el) return;
      const name = el.getAttribute('data-sound') as SoundName | null;
      if (!name) return;
      playSound(name);
    } catch (err) {
      // swallow errors
    }
  };
  window.addEventListener('click', handler);
  return () => window.removeEventListener('click', handler);
}

export function enableSounds(basePath = '/sounds') {
  try {
    if (enabled) return;
    initSounds(basePath);
    detachHandler = attachGlobalSoundHandler();
    enabled = true;
  } catch (err) {
    // ignore
  }
}

export function disableSounds() {
  try {
    if (!enabled) return;
    if (detachHandler) {
      try { detachHandler(); } catch (e) { /* ignore */ }
      detachHandler = null;
    }
    enabled = false;
  } catch (err) {
    // ignore
  }
}

export function soundsEnabled() {
  return enabled;
}

export function setVolume(name: SoundName, v: number) {
  const a = audioMap[name];
  if (!a) return;
  a.volume = Math.max(0, Math.min(1, v));
}

export function isInitialized() {
  return initialized;
}
