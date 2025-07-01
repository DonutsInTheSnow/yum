import './globals.css';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CartProvider } from '@/lib/CartContext';
import VideoBackground from '@/components/VideoBackground';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Yum Shop',
  description: 'Pre-order bakery items for in-store pickup in Wolfeboro, NH',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full pb-5">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen relative overflow-x-hidden`}>
        <VideoBackground />
        <Header />
        <CartProvider>
          <main className="flex-1 z-10">
            {children}
          </main>
        </CartProvider>
        <Footer />
      </body>
    </html>
  );
}