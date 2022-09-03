import { useLayoutEffect, useState } from 'react';

const useTheme = () => {
  const [theme, setTheme] = useState<string>('dark');

  useLayoutEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return { theme, setTheme };
};

export { useTheme };
