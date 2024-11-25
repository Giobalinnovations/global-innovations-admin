import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import ReactQueryProvider from '@/components/ReactQueryProvider';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '900'],
});

export const metadata: Metadata = {
  title: 'Global Innovation media admin',
  description: 'Global Innovation media admin',
  robots: {
    index: false,
    googleBot: {
      index: false,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} flex flex-col min-h-screen`}
        suppressHydrationWarning
      >
        <ReactQueryProvider>
          {children}
          <Toaster />
          <ReactQueryDevtools initialIsOpen={false} />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
