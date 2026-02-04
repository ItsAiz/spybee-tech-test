import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Header } from '@/shared/components/Header/Header';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Projects | Spybee'
};

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <html lang={'en'}>
      <body className={`${geistSans.variable} ${geistMono.variable} container`}>
        <Header />
        <div className={'container-children'}>{children}</div>
      </body>
    </html>
  );
}

export default RootLayout;
