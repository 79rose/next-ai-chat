import type { Metadata } from 'next';
import { Figtree } from 'next/font/google';

import ModalProvider from '@/providers/ModalProvider';
import ToasterProvider from '@/providers/ToasterProvider';
import './globals.css';

const font = Figtree({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Next Chat',
  description: '调用大模型来实现ai对话应用',
};

export const revalidate = 0;
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={font.className}>
        {/* 新增 */}
        <script
          async
          dangerouslySetInnerHTML={{
            __html: `
              const item = localStorage.getItem('theme') || 'light';
              document.documentElement.classList.toggle('dark', item === 'dark');
              document.documentElement.classList.toggle('light', item === 'light');
            `,
          }}
        />
        <ToasterProvider />
        <ModalProvider />
        {children}
      </body>
    </html>
  );
}
