/**
 * YouTube Video Embed Component
 * Mobile-First Video Player
 * 
 * Features:
 * - Responsive iframe embed
 * - YouTube channel integration
 * - Fullscreen support
 * - Loading state
 * - Error handling
 */

import React, { useState } from 'react';

interface VideoEmbedProps {
  videoId?: string;
  channelUrl?: string;
  channelName?: string;
  title?: string;
  description?: string;
  autoplay?: boolean;
}

// Featured YouTube channels for business English
const featuredChannels = [
  {
    name: 'BBC Learning English',
    url: 'https://www.youtube.com/@bbclearningenglish',
    handle: '@bbclearningenglish',
    description: 'Professional English lessons from BBC',
    icon: '🇬🇧',
    color: 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300'
  },
  {
    name: 'English With Lucy',
    url: 'https://www.youtube.com/@EnglishwithLucy',
    handle: '@EnglishwithLucy',
    description: 'British pronunciation & business vocabulary',
    icon: '👩‍🏫',
    color: 'bg-pink-50 dark:bg-pink-900/20 text-pink-700 dark:text-pink-300'
  },
  {
    name: 'Speak English With Tiffani',
    url: 'https://www.youtube.com/@SpeakEnglishWithTiffani',
    handle: '@SpeakEnglishWithTiffani',
    description: 'American English for professionals',
    icon: '🎤',
    color: 'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300'
  },
  {
    name: "Rachel's English",
    url: 'https://www.youtube.com/@RachelsEnglish',
    handle: '@RachelsEnglish',
    description: 'American accent & pronunciation training',
    icon: '🗣️',
    color: 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
  },
  {
    name: "Accent's Way English with Hadar",
    url: 'https://www.youtube.com/@AccentsWayEnglish',
    handle: '@AccentsWayEnglish',
    description: 'Accent reduction & confident speaking',
    icon: '🎯',
    color: 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300'
  }
];

const VideoEmbed: React.FC<VideoEmbedProps> = ({
  videoId,
  channelUrl,
  channelName,
  title = 'Business English Video',
  description,
  autoplay = false
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Find channel info if channelName provided
  const channelInfo = channelName 
    ? featuredChannels.find(ch => 
        ch.name.toLowerCase().includes(channelName.toLowerCase())
      )
    : null;

  // Build YouTube embed URL
  const embedUrl = videoId
    ? `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1${autoplay ? '&autoplay=1' : ''}`
    : null;

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-lg">
      {/* Video Player */}
      {embedUrl ? (
        <div className="relative w-full" style={{ paddingBottom: '56.25%' /* 16:9 Aspect Ratio */ }}>
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-100 dark:bg-slate-700">
              <div className="text-center">
                <i className="fas fa-spinner fa-spin text-3xl text-slate-400 mb-2"></i>
                <p className="text-sm text-slate-600 dark:text-slate-400">Loading video...</p>
              </div>
            </div>
          )}
          
          {hasError ? (
            <div className="absolute inset-0 flex items-center justify-center bg-red-50 dark:bg-red-900/20">
              <div className="text-center px-4">
                <i className="fas fa-exclamation-triangle text-3xl text-red-500 mb-2"></i>
                <p className="text-sm text-red-700 dark:text-red-300 font-semibold mb-1">
                  Unable to load video
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Please check your connection
                </p>
              </div>
            </div>
          ) : (
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src={embedUrl}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              onLoad={() => setIsLoading(false)}
              onError={() => {
                setIsLoading(false);
                setHasError(true);
              }}
            />
          )}
        </div>
      ) : (
        /* Channel Preview (no specific video) */
        <div className="p-6 bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20">
          <div className="text-center">
            <i className="fab fa-youtube text-6xl text-red-500 mb-4"></i>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
              {channelInfo?.name || channelName || 'YouTube Channel'}
            </h3>
            {channelInfo?.description && (
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                {channelInfo.description}
              </p>
            )}
            <a
              href={channelInfo?.url || channelUrl || 'https://youtube.com'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 bg-red-500 text-white font-semibold rounded-xl active:scale-98 transition-transform shadow-lg"
            >
              <i className="fab fa-youtube mr-2"></i>
              Visit Channel
            </a>
          </div>
        </div>
      )}

      {/* Video Info */}
      {(title || description || channelInfo) && (
        <div className="p-4">
          {title && (
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
              {title}
            </h3>
          )}
          
          {description && (
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
              {description}
            </p>
          )}

          {/* Channel Badge */}
          {channelInfo && (
            <a
              href={channelInfo.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl ${channelInfo.color} font-medium text-sm hover:opacity-80 transition-opacity`}
            >
              <span className="text-lg">{channelInfo.icon}</span>
              <span>{channelInfo.name}</span>
              <i className="fas fa-external-link-alt text-xs"></i>
            </a>
          )}
        </div>
      )}
    </div>
  );
};

// Channel showcase component
const ChannelShowcase: React.FC = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
        📺 Featured YouTube Channels
      </h2>
      
      <div className="grid grid-cols-1 gap-4">
        {featuredChannels.map((channel, idx) => (
          <a
            key={idx}
            href={channel.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center gap-4">
              <div className="text-4xl">
                {channel.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
                  {channel.name}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                  {channel.description}
                </p>
                <span className="text-xs text-blue-600 dark:text-blue-400 font-semibold">
                  {channel.handle} →
                </span>
              </div>
              <div>
                <i className="fab fa-youtube text-2xl text-red-500"></i>
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* Tips */}
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-4 mt-6">
        <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2">
          💡 How to Use These Channels
        </h4>
        <ul className="space-y-1 text-xs text-slate-700 dark:text-slate-300">
          <li className="flex items-start gap-2">
            <i className="fas fa-check text-green-500 mt-0.5"></i>
            <span>Watch <strong>5-10 minutes daily</strong> for consistency</span>
          </li>
          <li className="flex items-start gap-2">
            <i className="fas fa-check text-green-500 mt-0.5"></i>
            <span>Use <strong>subtitles</strong> to improve listening & reading</span>
          </li>
          <li className="flex items-start gap-2">
            <i className="fas fa-check text-green-500 mt-0.5"></i>
            <span>Practice <strong>shadowing</strong> by repeating after the speaker</span>
          </li>
          <li className="flex items-start gap-2">
            <i className="fas fa-check text-green-500 mt-0.5"></i>
            <span>Take <strong>notes</strong> of useful phrases and vocabulary</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default VideoEmbed;
export { ChannelShowcase, featuredChannels };
export type { VideoEmbedProps };
