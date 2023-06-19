'use client';

import { ReactNode } from 'react';
import { useDarkMode } from 'usehooks-ts';

export const ToggleTheme = ({ children }: { children: ReactNode }) => {
  const { isDarkMode } = useDarkMode(true);
  const theme = isDarkMode ? 'black' : 'cupcake';
  return (
    <div className="min-h-screen" data-theme={theme}>
      {children}
    </div>
  );
};
