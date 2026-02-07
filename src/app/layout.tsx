import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Header } from '@/shared/components/Header/Header';
import { Providers } from '@/shared/providers/Providers';
import spybeeIcon from '@/shared/assets/spybee_logo_black.webp';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-primary',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Projects | Spybee',
  icons: {
    icon: spybeeIcon.src,
  },
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
