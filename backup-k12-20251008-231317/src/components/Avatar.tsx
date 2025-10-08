import React from 'react';

type Props = {
  avatar: string; // either a font-awesome class or an image filename/URL
  size?: number; // px
  className?: string;
};

const Avatar: React.FC<Props> = ({ avatar, size = 48, className = '' }) => {
  // if avatar looks like a url or starts with http or contains '/' or ends with .svg/.png
  const isImage = /(^https?:\/\/)|\/|\.(svg|png|jpg|jpeg)$/.test(avatar);

  if (isImage) {
    // normalize local images under /images/avatars if user provided a font-like name
    const src = avatar.startsWith('/') || avatar.startsWith('http') ? avatar : `/images/avatars/${avatar}`;
    return (
      <img
        src={src}
        alt="avatar"
        width={size}
        height={size}
        className={`rounded-full object-cover ${className}`}
      />
    );
  }

  // fallback to font-awesome icon class
  return (
    <div style={{ width: size, height: size }} className={`rounded-full flex items-center justify-center bg-slate-100 dark:bg-slate-700 ${className}`}>
      <i className={`fa-solid ${avatar} text-${Math.max(2, Math.floor(size / 12))}xl`} aria-hidden />
    </div>
  );
};

export default Avatar;
