import { useEffect, useState } from 'react';
import { readLocalValue, writeLocalValue } from '../utils/storage';

type Theme = 'dark' | 'light';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => readLocalValue<Theme>('ggarena-theme', 'dark'));

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    writeLocalValue('ggarena-theme', theme);
  }, [theme]);

  return {
    theme,
    toggleTheme: () => setTheme((current) => (current === 'dark' ? 'light' : 'dark')),
  };
}
