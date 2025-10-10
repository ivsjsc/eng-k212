/**
 * Microlearning Timer Component
 * 5-7 Minute Lesson Timer
 * 
 * Features:
 * - Visual countdown
 * - Pause/Resume
 * - Progress tracking
 * - Completion celebration
 * - Auto-advance to next lesson
 */

import React, { useState, useEffect, useRef } from 'react';

interface LessonTimerProps {
  duration: number; // in seconds (default 360 = 6 minutes)
  lessonTitle: string;
  onComplete?: () => void;
  onPause?: () => void;
  onResume?: () => void;
  autoStart?: boolean;
}

const LessonTimer: React.FC<LessonTimerProps> = ({
  duration = 360, // 6 minutes default
  lessonTitle,
  onComplete,
  onPause,
  onResume,
  autoStart = false
}) => {
  const [timeRemaining, setTimeRemaining] = useState(duration);
  const [isRunning, setIsRunning] = useState(autoStart);
  const [isPaused, setIsPaused] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(Date.now());

  // Format time as MM:SS
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Calculate progress percentage
  const progress = ((duration - timeRemaining) / duration) * 100;

  // Start timer
  const handleStart = () => {
    setIsRunning(true);
    setIsPaused(false);
    startTimeRef.current = Date.now();
  };

  // Pause timer
  const handlePause = () => {
    setIsRunning(false);
    setIsPaused(true);
    if (onPause) onPause();
  };

  // Resume timer
  const handleResume = () => {
    setIsRunning(true);
    setIsPaused(false);
    if (onResume) onResume();
  };

  // Reset timer
  const handleReset = () => {
    setTimeRemaining(duration);
    setIsRunning(false);
    setIsPaused(false);
    setIsCompleted(false);
  };

  // Timer effect
  useEffect(() => {
    if (isRunning && timeRemaining > 0) {
      intervalRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            setIsRunning(false);
            setIsCompleted(true);
            if (onComplete) onComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeRemaining, onComplete]);

  // Get motivational message based on progress
  const getMotivationalMessage = (): string => {
    if (isCompleted) return "🎉 Lesson Complete!";
    if (progress < 25) return "🚀 Great start! Keep going!";
    if (progress < 50) return "💪 You're doing amazing!";
    if (progress < 75) return "🔥 Almost halfway there!";
    if (progress < 90) return "⭐ Final stretch!";
    return "🏆 So close! Finish strong!";
  };

  // Get color based on time remaining
  const getTimerColor = (): string => {
    if (isCompleted) return 'text-green-500';
    if (timeRemaining < 60) return 'text-red-500';
    if (timeRemaining < 120) return 'text-orange-500';
    return 'text-blue-500';
  };

  // Circle progress stroke
  const radius = 100;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
      {/* Header */}
      <div className="text-center mb-6">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
          {lessonTitle}
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Microlearning: {Math.floor(duration / 60)} minutes
        </p>
      </div>

      {/* Circular Timer */}
      <div className="relative w-64 h-64 mx-auto mb-6">
        {/* SVG Circle */}
        <svg className="w-full h-full transform -rotate-90">
          {/* Background circle */}
          <circle
            cx="128"
            cy="128"
            r={radius}
            stroke="currentColor"
            strokeWidth="12"
            fill="none"
            className="text-slate-200 dark:text-slate-700"
          />
          {/* Progress circle */}
          <circle
            cx="128"
            cy="128"
            r={radius}
            stroke="currentColor"
            strokeWidth="12"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className={`${
              isCompleted 
                ? 'text-green-500' 
                : timeRemaining < 60 
                  ? 'text-red-500' 
                  : 'text-blue-500'
            } transition-all duration-1000`}
          />
        </svg>

        {/* Time display in center */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-5xl font-bold ${getTimerColor()} transition-colors`}>
            {formatTime(timeRemaining)}
          </span>
          <span className="text-sm text-slate-600 dark:text-slate-400 mt-2">
            {Math.round(progress)}% Complete
          </span>
        </div>
      </div>

      {/* Motivational Message */}
      <div className="text-center mb-6">
        <p className="text-base font-semibold text-slate-700 dark:text-slate-300">
          {getMotivationalMessage()}
        </p>
      </div>

      {/* Control Buttons */}
      {!isCompleted ? (
        <div className="grid grid-cols-2 gap-3">
          {!isRunning ? (
            <button
              onClick={isPaused ? handleResume : handleStart}
              className="col-span-2 py-4 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold active:scale-98 transition-transform shadow-lg"
            >
              <i className={`fas fa-${isPaused ? 'play' : 'rocket'} mr-2`}></i>
              {isPaused ? 'Resume' : 'Start Lesson'}
            </button>
          ) : (
            <>
              <button
                onClick={handlePause}
                className="py-4 rounded-xl bg-yellow-500 text-white font-bold active:scale-98 transition-transform shadow-lg"
              >
                <i className="fas fa-pause mr-2"></i>
                Pause
              </button>
              <button
                onClick={handleReset}
                className="py-4 rounded-xl bg-slate-500 text-white font-bold active:scale-98 transition-transform shadow-lg"
              >
                <i className="fas fa-redo mr-2"></i>
                Reset
              </button>
            </>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {/* Completion celebration */}
          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl text-center">
            <div className="text-4xl mb-2">🎉</div>
            <p className="text-base font-bold text-green-700 dark:text-green-300 mb-1">
              Excellent Work!
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              You completed this microlearning session
            </p>
          </div>

          {/* Action buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleReset}
              className="py-3 rounded-xl bg-slate-500 text-white font-semibold active:scale-98 transition-transform"
            >
              <i className="fas fa-redo mr-2"></i>
              Retry
            </button>
            <button
              onClick={onComplete}
              className="py-3 rounded-xl bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold active:scale-98 transition-transform shadow-lg"
            >
              <i className="fas fa-arrow-right mr-2"></i>
              Next Lesson
            </button>
          </div>
        </div>
      )}

      {/* Timer Info */}
      <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-blue-500">
              {Math.floor(duration / 60)}
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Total Minutes
            </p>
          </div>
          <div>
            <p className="text-2xl font-bold text-purple-500">
              {Math.floor((duration - timeRemaining) / 60)}
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Minutes Spent
            </p>
          </div>
          <div>
            <p className="text-2xl font-bold text-green-500">
              {Math.round(progress)}%
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Progress
            </p>
          </div>
        </div>
      </div>

      {/* Microlearning Benefits */}
      {!isRunning && !isCompleted && (
        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
          <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2">
            ⚡ Why Microlearning?
          </h4>
          <ul className="space-y-1 text-xs text-slate-700 dark:text-slate-300">
            <li className="flex items-start gap-2">
              <i className="fas fa-check text-green-500 mt-0.5"></i>
              <span><strong>Focus:</strong> 5-7 minutes = optimal attention span</span>
            </li>
            <li className="flex items-start gap-2">
              <i className="fas fa-check text-green-500 mt-0.5"></i>
              <span><strong>Retention:</strong> Bite-sized content sticks better</span>
            </li>
            <li className="flex items-start gap-2">
              <i className="fas fa-check text-green-500 mt-0.5"></i>
              <span><strong>Consistency:</strong> Easy to fit into daily routine</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default LessonTimer;
export type { LessonTimerProps };
