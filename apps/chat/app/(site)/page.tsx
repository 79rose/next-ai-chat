'use client';
import ChatSlider from '@/components/chatSlider';
import useTheme from '@/hooks/useTheme';
import { MoonFilled, SunFilled } from '@ant-design/icons';
import { Layout, Segmented, theme } from 'antd';
import { ThemeAppearance, ThemeProvider } from 'antd-style';
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
      <Layout className="flex h-[100vh] flex-row">
        <ChatSlider />
        {
          <Segmented
            options={[
              { value: 'light', icon: <SunFilled /> },
              { value: 'dark', icon: <MoonFilled /> },
            ]}
            value={appearance}
            onChange={toggleTheme}
          />
        }
      </Layout>
    </ThemeProvider>
  );
}
