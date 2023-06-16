'use client';

import { ReactNode } from 'react';
import { useDarkMode } from 'usehooks-ts';

export const ToggleTheme = ({ children }: { children: ReactNode }) => {
  const { isDarkMode, toggle } = useDarkMode();

  return (
    <div data-theme={isDarkMode ? 'black' : 'cupcake'}>
      <div className="h-10 flex justify-center items-center">
        <button className="text-xl" onClick={() => toggle()}>
          💡
        </button>
      </div>
      {children}
    </div>
  );
};
