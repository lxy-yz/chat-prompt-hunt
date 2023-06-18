'use client';

import { ReactNode } from 'react';
import { useDarkMode } from 'usehooks-ts';

export const ToggleTheme = ({ children }: { children: ReactNode }) => {
  const { isDarkMode } = useDarkMode();

  return (
    <div className="h-full min-h-screen" data-theme={isDarkMode ? 'black' : 'cupcake'}>
      {children}
    </div>
  );
};
