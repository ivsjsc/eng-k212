/**
 * Accent Training Component
 * Shadowing & Pronunciation Practice
 * 
 * Features:
 * - Shadowing exercises
 * - Slow speech practice
 * - Muscle memory drills
 * - IPA pronunciation guide
 * - YouTube video integration
 */

import React, { useState, useRef, useEffect } from 'react';

interface AccentTrainingProps {
  phrase: string;
  ipa?: string;
  translation?: string;
  youtubeUrl?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
}

interface ShadowingExercise {
  id: number;
  phrase: string;
  ipa: string;
  translation: string;
  youtubeUrl?: string;
  channel: string;
  focus: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

const shadowingExercises: ShadowingExercise[] = [
  {
    id: 1,
    phrase: "Let's schedule a meeting to discuss the proposal.",
    ipa: "/lets ˈʃɛdjuːl ə ˈmiːtɪŋ tə dɪsˈkʌs ðə prəˈpoʊzəl/",
    translation: "Hãy lên lịch một cuộc họp để thảo luận về đề xuất.",
    youtubeUrl: "https://www.youtube.com/@bbclearningenglish",
    channel: "BBC Learning English",
    focus: ["Linking sounds", "Schwa /ə/", "Stress patterns"],
    difficulty: "beginner"
  },
  {
    id: 2,
    phrase: "I'd like to follow up on our previous conversation.",
    ipa: "/aɪd laɪk tə ˈfɑloʊ ʌp ɑn aʊər ˈpriviəs ˌkɑnvərˈseɪʃən/",
    translation: "Tôi muốn theo dõi về cuộc trò chuyện trước của chúng ta.",
    youtubeUrl: "https://www.youtube.com/@EnglishwithLucy",
    channel: "English With Lucy",
    focus: ["Contractions", "Weak forms", "Intonation"],
    difficulty: "intermediate"
  },
  {
    id: 3,
    phrase: "Could you elaborate on the key points of your presentation?",
    ipa: "/kʊd jə ɪˈlæbəˌreɪt ɑn ðə kiː pɔɪnts əv jʊər ˌprɛzənˈteɪʃən/",
    translation: "Bạn có thể nói rõ hơn về các điểm chính trong bài thuyết trình không?",
    youtubeUrl: "https://www.youtube.com/@RachelsEnglish",
    channel: "Rachel's English",
    focus: ["R-colored vowels", "Flap T", "Rhythm"],
    difficulty: "advanced"
  },
  {
    id: 4,
    phrase: "We need to negotiate the terms and conditions carefully.",
    ipa: "/wi niːd tə nɪˈgoʊʃiˌeɪt ðə tɜrmz ænd kənˈdɪʃənz ˈkɛrfəli/",
    translation: "Chúng ta cần đàm phán các điều khoản và điều kiện cẩn thận.",
    youtubeUrl: "https://www.youtube.com/@SpeakEnglishWithTiffani",
    channel: "Speak English With Tiffani",
    focus: ["Clear articulation", "Word stress", "Pacing"],
    difficulty: "intermediate"
  },
  {
    id: 5,
    phrase: "I appreciate your patience throughout this process.",
    ipa: "/aɪ əˈpriʃiˌeɪt jʊər ˈpeɪʃəns θruˈaʊt ðɪs ˈprɑsɛs/",
    translation: "Tôi đánh giá cao sự kiên nhẫn của bạn trong suốt quá trình này.",
    youtubeUrl: "https://www.youtube.com/@AccentsWayEnglish",
    channel: "Accent's Way English with Hadar",
    focus: ["Vowel clarity", "TH sounds", "Natural flow"],
    difficulty: "advanced"
  }
];

const AccentTraining: React.FC<AccentTrainingProps> = ({
  phrase,
  ipa,
  translation,
  youtubeUrl,
  difficulty = 'intermediate'
}) => {
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(0.5);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState<string | null>(null);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [showIPA, setShowIPA] = useState(false);
  const [repetitions, setRepetitions] = useState(0);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const currentExercise = shadowingExercises[currentExerciseIndex];

  // Speech synthesis for phrase playback
  const speakPhrase = (speed: number) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(currentExercise.phrase);
      utterance.rate = speed;
      utterance.pitch = 1;
      utterance.lang = 'en-US';
      
      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => {
        setIsPlaying(false);
        setRepetitions(prev => prev + 1);
      };
      
      window.speechSynthesis.cancel(); // Cancel any ongoing speech
      window.speechSynthesis.speak(utterance);
    }
  };

  // Recording functionality
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };
      
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        const audioUrl = URL.createObjectURL(blob);
        setRecordedAudio(audioUrl);
        chunksRef.current = [];
        
        // Stop all tracks
        stream.getTracks().forEach(track => track.stop());
      };
      
      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Please allow microphone access for recording');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const playRecording = () => {
    if (recordedAudio) {
      const audio = new Audio(recordedAudio);
      audio.play();
    }
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
      if (recordedAudio) {
        URL.revokeObjectURL(recordedAudio);
      }
    };
  }, [recordedAudio]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 pb-20">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-4 py-4">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">
            🎯 Accent Training
          </h1>
          <span className={`
            px-3 py-1 rounded-full text-xs font-semibold
            ${difficulty === 'beginner' ? 'bg-green-100 text-green-700' : ''}
            ${difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-700' : ''}
            ${difficulty === 'advanced' ? 'bg-red-100 text-red-700' : ''}
          `}>
            {difficulty.toUpperCase()}
          </span>
        </div>
        
        {/* Progress */}
        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
          <i className="fas fa-redo text-blue-500"></i>
          <span>Repetitions: <strong>{repetitions}</strong></span>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Current Phrase Card */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">
                Practice Phrase
              </span>
              <button
                onClick={() => setShowIPA(!showIPA)}
                className="text-xs text-blue-600 dark:text-blue-400 font-semibold"
              >
                {showIPA ? 'Hide' : 'Show'} IPA
              </button>
            </div>
            
            <p className="text-xl font-bold text-slate-900 dark:text-white mb-3 leading-relaxed">
              {currentExercise.phrase}
            </p>
            
            {showIPA && (
              <p className="text-base text-purple-600 dark:text-purple-400 font-mono mb-3">
                {currentExercise.ipa}
              </p>
            )}
            
            <p className="text-sm text-slate-600 dark:text-slate-400 italic">
              {currentExercise.translation}
            </p>
          </div>

          {/* Focus Areas */}
          <div className="mb-4">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase block mb-2">
              Focus On:
            </span>
            <div className="flex flex-wrap gap-2">
              {currentExercise.focus.map((item, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs font-medium"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* YouTube Channel */}
          <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 rounded-xl">
            <i className="fab fa-youtube text-red-500 text-xl"></i>
            <div>
              <p className="text-xs text-slate-600 dark:text-slate-400">Learn from</p>
              <a
                href={currentExercise.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-red-600 dark:text-red-400 hover:underline"
              >
                {currentExercise.channel} →
              </a>
            </div>
          </div>
        </div>

        {/* Playback Speed Control */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
          <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">
            🐌 Playback Speed
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-sm text-slate-600 dark:text-slate-400 w-20">
                {playbackSpeed}x
              </span>
              <input
                type="range"
                min="0.3"
                max="1.5"
                step="0.1"
                value={playbackSpeed}
                onChange={(e) => setPlaybackSpeed(parseFloat(e.target.value))}
                className="flex-1 accent-purple-500"
              />
            </div>
            
            {/* Quick speed buttons */}
            <div className="grid grid-cols-4 gap-2">
              {[0.5, 0.75, 1.0, 1.25].map(speed => (
                <button
                  key={speed}
                  onClick={() => {
                    setPlaybackSpeed(speed);
                    speakPhrase(speed);
                  }}
                  className={`
                    py-2 px-3 rounded-lg font-semibold text-sm transition-all
                    ${playbackSpeed === speed 
                      ? 'bg-purple-500 text-white' 
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                    }
                  `}
                >
                  {speed}x
                </button>
              ))}
            </div>

            {/* Play button */}
            <button
              onClick={() => speakPhrase(playbackSpeed)}
              disabled={isPlaying}
              className={`
                w-full py-4 rounded-xl font-bold text-white transition-all
                ${isPlaying 
                  ? 'bg-slate-400 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-purple-500 to-blue-500 active:scale-98 shadow-lg'
                }
              `}
            >
              {isPlaying ? (
                <>
                  <i className="fas fa-spinner fa-spin mr-2"></i>
                  Playing...
                </>
              ) : (
                <>
                  <i className="fas fa-play mr-2"></i>
                  Listen & Shadow
                </>
              )}
            </button>
          </div>
        </div>

        {/* Recording Section */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
          <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">
            🎤 Record Your Practice
          </h3>
          
          <div className="space-y-4">
            {/* Record button */}
            <button
              onClick={isRecording ? stopRecording : startRecording}
              className={`
                w-full py-4 rounded-xl font-bold text-white transition-all
                ${isRecording 
                  ? 'bg-red-500 animate-pulse' 
                  : 'bg-gradient-to-r from-blue-500 to-green-500 active:scale-98 shadow-lg'
                }
              `}
            >
              {isRecording ? (
                <>
                  <i className="fas fa-stop mr-2"></i>
                  Stop Recording
                </>
              ) : (
                <>
                  <i className="fas fa-microphone mr-2"></i>
                  Start Recording
                </>
              )}
            </button>

            {/* Playback recorded audio */}
            {recordedAudio && (
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-green-700 dark:text-green-300">
                    ✓ Recording saved
                  </span>
                  <button
                    onClick={() => setRecordedAudio(null)}
                    className="text-xs text-red-600 dark:text-red-400"
                  >
                    Delete
                  </button>
                </div>
                <button
                  onClick={playRecording}
                  className="w-full py-3 rounded-lg bg-green-500 text-white font-semibold active:scale-98 transition-transform"
                >
                  <i className="fas fa-play mr-2"></i>
                  Play My Recording
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Exercise Navigation */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
          <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">
            More Exercises
          </h3>
          
          <div className="grid grid-cols-5 gap-2">
            {shadowingExercises.map((exercise, idx) => (
              <button
                key={exercise.id}
                onClick={() => {
                  setCurrentExerciseIndex(idx);
                  setRepetitions(0);
                  setRecordedAudio(null);
                }}
                className={`
                  aspect-square rounded-lg font-bold transition-all
                  ${idx === currentExerciseIndex 
                    ? 'bg-purple-500 text-white ring-2 ring-purple-300' 
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                  }
                `}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Tips */}
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-2xl p-6">
          <h3 className="text-base font-bold text-slate-900 dark:text-white mb-3">
            💡 Shadowing Tips
          </h3>
          <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
            <li className="flex items-start gap-2">
              <i className="fas fa-check text-green-500 mt-0.5"></i>
              <span>Start at <strong>0.5x speed</strong> and gradually increase</span>
            </li>
            <li className="flex items-start gap-2">
              <i className="fas fa-check text-green-500 mt-0.5"></i>
              <span>Repeat each phrase <strong>10-15 times</strong> daily</span>
            </li>
            <li className="flex items-start gap-2">
              <i className="fas fa-check text-green-500 mt-0.5"></i>
              <span>Focus on <strong>mouth movements</strong> and muscle memory</span>
            </li>
            <li className="flex items-start gap-2">
              <i className="fas fa-check text-green-500 mt-0.5"></i>
              <span>Record yourself and <strong>compare</strong> with the model</span>
            </li>
            <li className="flex items-start gap-2">
              <i className="fas fa-check text-green-500 mt-0.5"></i>
              <span>Practice <strong>without looking</strong> at text for natural flow</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AccentTraining;
export { shadowingExercises };
export type { AccentTrainingProps, ShadowingExercise };
