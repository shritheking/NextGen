import React from 'react';
import { NextGenLogo } from './NextGenLogo';

interface EMCLogoProps {
  className?: string;
  brandTitle?: string;
  theme?: 'dark' | 'light';
}

export const EMCLogo: React.FC<EMCLogoProps> = ({ className = '', theme = 'light' }) => {
  return <NextGenLogo className={className} theme={theme} />;
};
