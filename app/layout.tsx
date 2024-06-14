import type { Metadata } from 'next';
import { Inter, Manrope } from 'next/font/google';
import './globals.css';
import ConvexClerkProvider from './providers/ConvexClerkProvider';
import AudioProviver from './providers/AudioProviver';

const manrope = Manrope({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Podcast App',
  description: 'You can listen and learn new knowledges from this app',
  icons: {
    icon: '/icons/logo.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ConvexClerkProvider>
      <html lang='en'>
        <AudioProviver>
          <body className={manrope.className}>{children}</body>
        </AudioProviver>
      </html>
    </ConvexClerkProvider>
  );
}
