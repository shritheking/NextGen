import React, { useState, useEffect, useRef } from 'react';
import { Info, Sparkles, X } from 'lucide-react';

export interface ContextualHintProps {
  id: string;
  title: string;
  description: string;
  variant?: 'tooltip' | 'inline';
  accent?: 'blue' | 'violet';
  placement?: 'top' | 'bottom' | 'inline';
  dismissible?: boolean;
  duration?: number; // ms to auto-hide (default 6500ms)
  isVisible: boolean; // triggered by intersection observer
  storageKey?: string; // sessionStorage key, default `ng_hint_${id}`
  onDismiss?: () => void;
  className?: string;
  ariaLive?: 'polite' | 'assertive';
}

export const ContextualHint: React.FC<ContextualHintProps> = ({
  id,
  title,
  description,
  variant = 'tooltip',
  accent = 'blue',
  placement = 'top',
  dismissible = true,
  duration = 6500,
  isVisible,
  storageKey,
  onDismiss,
  className = '',
  ariaLive = 'polite',
}) => {
  const effectiveKey = storageKey || `ng_hint_${id}`;

  const [hasBeenDismissed, setHasBeenDismissed] = useState<boolean>(() => {
    try {
      if (typeof window !== 'undefined' && window.sessionStorage) {
        return window.sessionStorage.getItem(effectiveKey) === 'true';
      }
    } catch {
      // safe fallback for restricted environments
    }
    return false;
  });

  const [isVisibleState, setIsVisibleState] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const hasTriggeredRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Trigger when isVisible becomes true and hasn't been dismissed in this session
  useEffect(() => {
    if (isVisible && !hasTriggeredRef.current && !hasBeenDismissed) {
      hasTriggeredRef.current = true;
      setIsVisibleState(true);

      // Record in sessionStorage so this hint only shows ONCE per browser session
      try {
        if (typeof window !== 'undefined' && window.sessionStorage) {
          window.sessionStorage.setItem(effectiveKey, 'true');
        }
      } catch {
        // safe fallback
      }

      // Auto-dismiss after duration if specified
      if (duration > 0) {
        timerRef.current = setTimeout(() => {
          handleDismiss();
        }, duration);
      }
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isVisible, hasBeenDismissed, duration, effectiveKey]);

  const handleDismiss = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setIsExiting(true);
    setTimeout(() => {
      setHasBeenDismissed(true);
      setIsVisibleState(false);
      if (onDismiss) onDismiss();
    }, 280);
  };

  if (!isVisibleState || hasBeenDismissed) {
    return null;
  }

  const isTooltip = variant === 'tooltip';
  const accentClass = accent === 'violet' ? 'accent-violet' : 'accent-blue';

  return (
    <div
      id={`contextual-hint-${id}`}
      role="region"
      aria-live={ariaLive}
      className={`contextual-hint-container ${
        isTooltip ? 'hint-variant-tooltip' : 'hint-variant-inline'
      } hint-placement-${placement} ${accentClass} ${isExiting ? 'hint-exit' : ''} ${className}`}
    >
      <div className="contextual-hint-bubble">
        <div className="contextual-hint-top-row">
          <div className="contextual-hint-title-group">
            <span className="contextual-hint-icon" aria-hidden="true">
              {accent === 'violet' ? (
                <Sparkles size={12} strokeWidth={2.4} />
              ) : (
                <Info size={12} strokeWidth={2.4} />
              )}
            </span>
            <strong className="contextual-hint-title">{title}</strong>
          </div>

          {dismissible && (
            <button
              type="button"
              className="contextual-hint-dismiss"
              onClick={handleDismiss}
              aria-label={`Dismiss ${title}`}
              title="Dismiss instruction"
            >
              <X size={11} strokeWidth={2.4} />
            </button>
          )}
        </div>

        <p className="contextual-hint-desc">{description}</p>

        {isTooltip && <div className="contextual-hint-caret" aria-hidden="true" />}
      </div>
    </div>
  );
};