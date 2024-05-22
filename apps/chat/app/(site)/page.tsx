'use client';
import ChatSlider from '@/components/chatSlider';
import useTheme from '@/hooks/useTheme';
import { Layout, theme } from 'antd';
import { ThemeAppearance, ThemeProvider } from 'antd-style';
import MianChat from './components/mianChat';
type CustomAppearance = ThemeAppearance;
export default function RootLayout() {
  const { theme: appearance, toggleTheme } = useTheme();

  return (
    <ThemeProvider
      appearance={appearance}
      theme={(appearance: CustomAppearance) => {
        switch (appearance) {
          case 'light':
            return {
              token: {
                colorPrimary: 'purple',
              },
            };
          case 'dark':
            return {
              token: {
                colorPrimary: 'cyan',
              },
              algorithm: theme.darkAlgorithm,
            };
        }
      }}
    >
      <Layout className="flex h-[100vh] w-full flex-row">
        <ChatSlider />
        <MianChat className="flex-1" />
      </Layout>
    </ThemeProvider>
  );
}
