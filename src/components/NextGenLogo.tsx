import React, { useState } from 'react';

interface NextGenLogoProps {
  className?: string;
  theme?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg';
}

export const NextGenLogo: React.FC<NextGenLogoProps> = ({
  className = '',
  theme = 'light',
  size = 'md'
}) => {
  const [imgFailed, setImgFailed] = useState(false);
  const isDark = theme === 'dark';
  const iconSize = size === 'sm' ? 24 : size === 'lg' ? 34 : 28;
  const textSize = size === 'sm' ? 20 : size === 'lg' ? 28 : 24;
  const blockSize = size === 'sm' ? { w: 7, h: 18 } : size === 'lg' ? { w: 10, h: 26 } : { w: 8.5, h: 22 };

  return (
    <div
      className={`nextgen-brand-logo ${isDark ? 'footer-logo' : ''} ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: size === 'sm' ? '6px' : '7px',
        textDecoration: 'none',
        lineHeight: 1
      }}
    >
      {!imgFailed ? (
        <img
          src="/logo-icon.png"
          alt="NextGen Logo Mark"
          className="brand-official-icon"
          onError={(e) => {
            const img = e.currentTarget;
            if (!img.src.includes('assets/logo-icon.png')) {
              img.src = '/assets/logo-icon.png';
            } else {
              setImgFailed(true);
            }
          }}
          style={{
            width: `${iconSize}px`,
            height: `${iconSize}px`,
            borderRadius: `${Math.round(iconSize * 0.25)}px`,
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.12)',
            display: 'inline-block',
            objectFit: 'contain'
          }}
        />
      ) : (
        <svg
          viewBox="0 0 100 100"
          style={{
            width: `${iconSize}px`,
            height: `${iconSize}px`,
            borderRadius: `${Math.round(iconSize * 0.25)}px`,
            display: 'inline-block',
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.12)'
          }}
        >
          <rect width="100" height="100" rx="24" fill="#0b0b0a"/>
          <rect x="2" y="2" width="96" height="96" rx="22" fill="none" stroke="#22211f" strokeWidth="4"/>
          <path d="M 28,26 L 52,50 L 28,74" stroke="#f5f4f0" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          <path d="M 50,26 L 74,50 L 50,74" stroke="#2563eb" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        </svg>
      )}
      <span
        className="brand-text"
        style={{
          fontFamily: "'Space Grotesk', -apple-system, BlinkMacSystemFont, sans-serif",
          fontSize: `${textSize}px`,
          fontWeight: 800,
          letterSpacing: '-0.055em',
          color: isDark ? '#ffffff' : '#0f172a',
          lineHeight: 1
        }}
      >
        nextgen
      </span>
      <span
        className="brand-block"
        aria-hidden="true"
        style={{
          width: `${blockSize.w}px`,
          height: `${blockSize.h}px`,
          background: '#2563eb',
          display: 'inline-block',
          borderRadius: '2px',
          marginLeft: '1px'
        }}
      />
    </div>
  );
};
