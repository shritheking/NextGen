import React, { useEffect, useRef, useState } from 'react';

const SCRAMBLE_CHARS = '01<>/{}[]#_=+*';

interface ScrambleProps {
  text?: string;
  words?: string[];
  delay?: number;
  duration?: number;
  interval?: number;
  className?: string;
}

export const Scramble: React.FC<ScrambleProps> = ({
  text,
  words,
  delay = 0.25,
  duration = 1000,
  interval = 3500,
  className = ''
}) => {
  const wordList = words && words.length > 0 ? words : [text || 'Changing.'];
  const [wordIdx, setWordIdx] = useState(0);
  const currentTargetText = wordList[wordIdx];
  const ref = useRef<HTMLSpanElement>(null);
  const isFirstMount = useRef(true);

  useEffect(() => {
    const el = ref.current;
    if (!el || (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches)) return;

    let rafId = 0;
    let startTime = 0;

    const runScramble = (target: string) => {
      startTime = 0;
      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min(1, (timestamp - startTime) / duration);
        const revealedCount = Math.floor(progress * target.length);

        el.textContent = target
          .split('')
          .map((char, idx) => {
            if (idx < revealedCount || char === ' ') return char;
            return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
          })
          .join('');

        if (progress < 1) {
          rafId = requestAnimationFrame(animate);
        } else {
          el.textContent = target;
        }
      };
      rafId = requestAnimationFrame(animate);
    };

    const initialWait = isFirstMount.current ? delay * 1000 : 40;
    isFirstMount.current = false;

    const timeoutId = setTimeout(() => {
      runScramble(currentTargetText);
    }, initialWait);

    let loopTimer: NodeJS.Timeout | null = null;
    if (wordList.length > 1) {
      loopTimer = setInterval(() => {
        setWordIdx(prev => (prev + 1) % wordList.length);
      }, interval);
    } else {
      loopTimer = setInterval(() => {
        runScramble(currentTargetText);
      }, interval);
    }

    return () => {
      clearTimeout(timeoutId);
      if (loopTimer) clearInterval(loopTimer);
      cancelAnimationFrame(rafId);
      if (el) el.textContent = currentTargetText;
    };
  }, [wordIdx, currentTargetText, duration, interval, delay, wordList.length]);

  return (
    <span className={`relative inline-block ${className}`}>
      <span className="invisible">{currentTargetText}</span>
      <span ref={ref} aria-hidden={true} className="absolute inset-0 whitespace-nowrap">
        {currentTargetText}
      </span>
    </span>
  );
};
