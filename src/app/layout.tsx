import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Header } from '@/shared/components/Header/Header';
import './globals.css';
import { Providers } from '@/shared/providers/Providers';

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
        <Providers>
          <Header />
          <div className={'container-children'}>{children}</div>
        </Providers>
      </body>
    </html>
  );
}

export default RootLayout;
