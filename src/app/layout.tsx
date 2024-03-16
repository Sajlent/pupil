import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import { Providers } from '@/app/providers';
import './globals.scss';

const defaultFont = Open_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Pupil App',
  description: 'Najlepsza aplikacja do znalezienia opieki nad zwierzętami.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={defaultFont.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
