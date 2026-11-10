import React, { useEffect, useState, useRef } from 'react';

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  end,
  duration = 1800,
  prefix = '',
  suffix = '',
  decimals = 0,
  className = ''
}) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el || hasAnimated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);

            let startTime: number | null = null;
            const step = (timestamp: number) => {
              if (!startTime) startTime = timestamp;
              const progress = Math.min((timestamp - startTime) / duration, 1);
              // Smooth exponential ease-out
              const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
              setCount(ease * end);

              if (progress < 1) {
                requestAnimationFrame(step);
              } else {
                setCount(end);
              }
            };

            requestAnimationFrame(step);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [end, duration, hasAnimated]);

  const displayValue = decimals > 0 ? count.toFixed(decimals) : Math.round(count);

  return (
    <span ref={elementRef} className={`animated-counter-num ${className}`}>
      {prefix}
      {displayValue}
      {suffix}
    </span>
  );
};
