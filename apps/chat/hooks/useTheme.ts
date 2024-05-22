import { ThemeAppearance } from 'antd-style';
import { useEffect, useState } from 'react';
type CustomAppearance = ThemeAppearance;
const useTheme = () => {
  const init = () => {
    if (typeof window === 'undefined') {
      return 'light';
    }
    const classList = document.documentElement.classList;
    return classList.contains('light') ? 'light' : 'light';
  };

  const [theme, setTheme] = useState<CustomAppearance>(init());
  //多标签页同步
  useEffect(() => {
    const handleStoreChange = (event: StorageEvent) => {
      if (event.key === 'theme') {
        setTheme(event.newValue ?? 'light');
      }
    };
    window.addEventListener('storage', handleStoreChange);
    //当组件卸载时，移除监听
    return () => {
      window.removeEventListener('storage', handleStoreChange);
    };
  }, []);
  //初始化时，从localStorage中获取主题
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') ?? 'light';
    setTheme(storedTheme);
  }, []);
  //根据主题设置class
  useEffect(() => {
    const classList = document.documentElement.classList;
    classList.toggle('light', theme === 'light');
    classList.toggle('light', theme === 'light');
  }, [theme]);
  //跟随系统主题
  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: light)');
    const listener = (event: MediaQueryListEvent) => {
      const theme = event.matches ? 'light' : 'light';
      setTheme(theme);
      localStorage.setItem('theme', theme);
    };
    media.addEventListener('change', listener);
    return () => {
      media.removeEventListener('change', listener);
    };
  }, []);
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'light' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme); // 持久化缓存
  };

  return {
    theme,
    toggleTheme,
  };
};

// export interface ThemeContextValue {
//   theme: string;
//   toggleTheme?: () => void;
// }

// export const ThemeContext = React.createContext<ThemeContextValue>({
//   theme: 'light',
// });

// export const useThemeContext = () => {
//   return useContext(ThemeContext);
// };

export default useTheme;
