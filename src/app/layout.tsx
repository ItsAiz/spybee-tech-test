import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Header } from '@/shared/components/Header/Header';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-primary',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Projects | Spybee'
};

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <html lang={'en'}>
      <body className={`${inter.variable} container`}>
        <Header />
        <div className={'container-children'}>{children}</div>
      </body>
    </html>
  );
}

export default RootLayout;
