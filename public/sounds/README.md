# 🔊 UI Sound Files Setup Guide

## 📁 Required Sound Files

Place these 6 sound files in `/public/sounds/` folder:

### 1. **click.mp3** (Button/Link Click)
- **Duration**: 50-100ms
- **Description**: Subtle click sound for buttons, links, and interactive elements
- **Recommended**: Soft mechanical click or tap sound
- **Example sources**:
  - https://freesound.org/people/kwahmah_02/sounds/256116/ (Button Click)
  - https://mixkit.co/free-sound-effects/click/

### 2. **confirm.mp3** (Success/Confirmation)
- **Duration**: 200-400ms
- **Description**: Positive feedback sound for successful actions (save, submit, etc.)
- **Recommended**: Pleasant chime or bell sound
- **Example sources**:
  - https://freesound.org/people/LittleRobotSoundFactory/sounds/270303/ (Success Sound)
  - https://mixkit.co/free-sound-effects/win/

### 3. **cancel.mp3** (Cancel/Error)
- **Duration**: 100-300ms
- **Description**: Neutral or negative feedback for cancel, close, or error
- **Recommended**: Soft thud or error beep
- **Example sources**:
  - https://freesound.org/people/distillerystudio/sounds/327736/ (Error Sound)
  - https://mixkit.co/free-sound-effects/error/

### 4. **open.mp3** (Modal/Panel Open)
- **Duration**: 150-300ms
- **Description**: Sound when opening modals, panels, or menus
- **Recommended**: Slide or whoosh sound
- **Example sources**:
  - https://freesound.org/people/shinephoenixstormcrow/sounds/337049/ (Slide Open)
  - https://mixkit.co/free-sound-effects/pop/

### 5. **close.mp3** (Modal/Panel Close)
- **Duration**: 100-250ms
- **Description**: Sound when closing modals, panels, or menus
- **Recommended**: Quick close or thud sound
- **Example sources**:
  - https://freesound.org/people/NenadSimic/sounds/171697/ (Door Close)
  - https://mixkit.co/free-sound-effects/swoosh/

### 6. **notification.mp3** (Alert/Notification)
- **Duration**: 300-600ms
- **Description**: Attention-grabbing sound for notifications and alerts
- **Recommended**: Notification bell or chime
- **Example sources**:
  - https://freesound.org/people/FoolBoyMedia/sounds/320655/ (Notification Bell)
  - https://mixkit.co/free-sound-effects/notification/

---

## 🎵 Technical Requirements

All sound files must meet these specifications:
- **Format**: MP3
- **Sample Rate**: 44.1kHz or 48kHz
- **Bit Rate**: 128kbps (good balance of quality and size)
- **Channels**: Mono (stereo is fine but not necessary)
- **File Size**: 5-15KB per file (total ~50KB for all 6)
- **Normalization**: -3dB to -6dB peak level (prevent distortion)

---

## 📥 Quick Download Options

### Option 1: Use Mixkit (Easiest)
1. Go to https://mixkit.co/free-sound-effects/
2. Search for each sound type
3. Download as MP3
4. Rename to match required names
5. Copy to `/public/sounds/`

### Option 2: Use Freesound.org (More Variety)
1. Create free account at https://freesound.org/
2. Search for each sound type
3. Filter by:
   - License: CC0 (no attribution required) or CC-BY
   - Duration: 0-1 seconds
   - Filesize: <50KB
4. Download and convert to MP3 if needed (use online converter)
5. Rename and copy to `/public/sounds/`

### Option 3: Use Zapsplat (Professional)
1. Create free account at https://www.zapsplat.com/
2. Browse "UI" category
3. Download individual sounds
4. Rename and copy to `/public/sounds/`

### Option 4: Generate with AI (Modern Approach)
Use AI sound generation tools:
- https://elevenlabs.io/sound-effects (ElevenLabs Sound Effects)
- https://suno.ai/ (Suno AI)
- Describe the sound you need in text

---

## 🛠️ Sound Editing Tools (If Needed)

### Online Tools (No Installation)
- **AudioMass**: https://audiomass.co/ (Free online audio editor)
- **MP3Cut**: https://mp3cut.net/ (Trim audio online)
- **Online Audio Converter**: https://online-audio-converter.com/ (Convert formats)

### Desktop Tools (Professional)
- **Audacity** (Free, open-source): https://www.audacityteam.org/
  - Import sound
  - Trim to desired length
  - Normalize audio (Effect > Normalize)
  - Export as MP3

---

## 📋 Step-by-Step Implementation

### Step 1: Download Sounds
```bash
# Create sounds directory if not exists
mkdir -p public/sounds

# Download recommended sounds (example using curl)
# Replace URLs with actual sound file URLs
curl -o public/sounds/click.mp3 "YOUR_CLICK_SOUND_URL"
curl -o public/sounds/confirm.mp3 "YOUR_CONFIRM_SOUND_URL"
curl -o public/sounds/cancel.mp3 "YOUR_CANCEL_SOUND_URL"
curl -o public/sounds/open.mp3 "YOUR_OPEN_SOUND_URL"
curl -o public/sounds/close.mp3 "YOUR_CLOSE_SOUND_URL"
curl -o public/sounds/notification.mp3 "YOUR_NOTIFICATION_SOUND_URL"
```

### Step 2: Verify File Names
```bash
ls -lh public/sounds/
# Should show:
# click.mp3
# confirm.mp3
# cancel.mp3
# open.mp3
# close.mp3
# notification.mp3
```

### Step 3: Test Locally
1. Start dev server: `npm run dev`
2. Go to Settings > Appearance
3. Enable "Âm thanh giao diện"
4. Click buttons to test sounds
5. Adjust volume slider

### Step 4: Add `data-sound` Attributes
Add to interactive elements in your components:

```tsx
// Example: Add to buttons
<button 
  data-sound="click"
  onClick={handleClick}
  className="btn btn-primary"
>
  Click Me
</button>

// Example: Modal open
<button 
  data-sound="open"
  onClick={() => setShowModal(true)}
>
  Open Modal
</button>

// Example: Success action
<button 
  data-sound="confirm"
  onClick={handleSave}
>
  Save
</button>

// Example: Cancel action
<button 
  data-sound="cancel"
  onClick={handleCancel}
>
  Cancel
</button>
```

### Step 5: Deploy
```bash
# Deploy to Firebase
firebase deploy --only hosting
```

---

## 🎨 Recommended Sound Characteristics

### Click Sound
- **Mood**: Neutral, subtle
- **Volume**: Quiet (don't overpower UI)
- **Example**: Mechanical keyboard click, mouse click

### Confirm Sound
- **Mood**: Positive, pleasant
- **Volume**: Medium
- **Example**: Success chime, level-up sound, notification bell

### Cancel Sound
- **Mood**: Neutral to slightly negative
- **Volume**: Quiet to medium
- **Example**: Soft thud, door close, error beep (not harsh)

### Open Sound
- **Mood**: Uplifting, expanding
- **Volume**: Quiet to medium
- **Example**: Whoosh up, slide open, pop up

### Close Sound
- **Mood**: Neutral, closing
- **Volume**: Quiet
- **Example**: Whoosh down, slide close, thud

### Notification Sound
- **Mood**: Attention-grabbing but not annoying
- **Volume**: Medium to loud
- **Example**: Bell ring, notification chime, alert tone

---

## 🧪 Testing Checklist

### Browser Compatibility
- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari (macOS/iOS)
- [ ] Mobile browsers (Chrome Mobile, Safari Mobile)

### Functionality Tests
- [ ] Sounds play on click
- [ ] Volume slider adjusts correctly
- [ ] Toggle on/off works
- [ ] Sounds persist after reload
- [ ] No errors in console
- [ ] File sizes are reasonable (<15KB each)

### User Experience Tests
- [ ] Sounds are pleasant, not annoying
- [ ] Volume levels are balanced
- [ ] Sounds match the action (click vs. confirm vs. error)
- [ ] Sounds don't overlap or cut each other off
- [ ] Works well in noisy environments
- [ ] Works well with headphones

---

## 📄 License Compliance

If using CC-BY licensed sounds (Creative Commons Attribution):
1. Add attribution in your app footer or about page
2. Example format:
```
Sound Effects:
- Click sound by [Author] (CC-BY 4.0)
- Confirm sound by [Author] (CC-BY 4.0)
...
```

If using CC0 (Public Domain) sounds:
- No attribution required
- Can use commercially without restrictions

---

## 🚨 Common Issues & Solutions

### Issue: Sounds don't play on first click
**Solution**: Browser autoplay policy - sounds work after user interaction
```typescript
// In sound.ts, add this to enable sounds on first interaction:
document.addEventListener('click', () => {
  // Initialize audio context on first click
  audioMap.forEach(audio => {
    audio.play().then(() => audio.pause()).catch(() => {});
  });
}, { once: true });
```

### Issue: Sounds are too loud/quiet
**Solution**: Normalize audio files or adjust default volume
```typescript
// In utils/sound.ts
const DEFAULT_VOLUME = 0.14; // Adjust this value (0.0 to 1.0)
```

### Issue: Sounds lag or delay
**Solution**: Preload audio files
```typescript
// In utils/sound.ts
const a = new Audio(`${basePath}/${name}.mp3`);
a.preload = 'auto'; // Already implemented ✓
```

### Issue: Sounds don't work on mobile
**Solution**: Check mobile browser autoplay policies
- iOS Safari: Requires user interaction before playing sounds
- Android Chrome: Usually works after first tap
- Test thoroughly on actual devices

---

## 🎯 Future Enhancements

1. **Sound Packs**: Allow users to choose different sound themes
2. **Custom Sounds**: Let users upload their own sounds
3. **Spatial Audio**: Add 3D sound effects (Web Audio API)
4. **Haptic Feedback**: Combine sounds with vibration on mobile
5. **Adaptive Volume**: Automatically adjust volume based on time of day
6. **Sound Effects Library**: More sounds for different actions

---

## 📞 Support

If you need help finding or creating sound files:
1. Check the IVS Slack #dev-support channel
2. Ask in the team meeting
3. Contact the UI/UX designer for recommendations

---

**Document Created**: October 6, 2025  
**Last Updated**: October 6, 2025  
**Status**: Ready for implementation  
**Assignee**: Frontend Team
