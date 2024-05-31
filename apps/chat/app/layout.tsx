import ModalProvider from '@/providers/ModalProvider';
import ToasterProvider from '@/providers/ToasterProvider';
import type { Metadata } from 'next';
import { Figtree } from 'next/font/google';
import './globals.css';
const font = Figtree({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Next Chat',
  description: '调用大模型来实现ai对话应用',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/png" href="./favicon.png" />
      </head>
      <body className={font.className}>
        {/* <script
          async
          dangerouslySetInnerHTML={{
            __html: `
            const item = localStorage.getItem('theme') || 'light';
            document.documentElement.classList.toggle('dark', item === 'dark');
            document.documentElement.classList.toggle('light', item === 'light');
            `,
          }}
        /> */}
        {/* <ToasterProvider />
          <ModalProvider /> */}
        <ToasterProvider />
        <ModalProvider />
        {children}
      </body>
    </html>
  );
}
