import type { Config } from 'tailwindcss';

const config: Config = {
  mode: 'jit',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundColor: {
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
        secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
        background: 'rgb(var(--color-background) / <alpha-value>)',
        foreground: 'rgb(var(--color-foreground) / <alpha-value>)',
        separator: 'rgb(var(--color-separator) / <alpha-value>)',
      },
      textColor: {
        primary: 'rgb(var(--color-foreground) / <alpha-value>)',
      },
      boxShadow: {
        multiple:
          '0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 -2px 4px -1px rgba(0, 0, 0, 0.06), 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',

        // 其他自定义阴影...
      },
      screens: {
        // 移动优先 min-width
        xs: '320px', //小手机
        sm: '480px', //手机
        md: '768px', //平板
        lg: '1024px', //桌面
        xl: '1280px', //大桌面
        '2xl': '1536px', //超大桌面
      },
    },
    plugins: [],
  },
};
export default config;
