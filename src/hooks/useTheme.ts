import { useEffect, useLayoutEffect, useState } from 'react';
import { useAppSelector } from '../store/model';
import { selectSettings } from '../store/selectors';

const useTheme = () => {
  const settings = useAppSelector(selectSettings);
  const [theme, setTheme] = useState<string>('dark');

  useEffect(() => {
    setTheme(settings.theme);
  }, [settings]);

  useLayoutEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return { theme, setTheme };
};

export { useTheme };
