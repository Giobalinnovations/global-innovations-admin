import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
// import Footer from '@/components/footer';
// import Header from '@/components/header';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '900'],
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} flex flex-col min-h-screen`}>
        {/* <Header /> */}
        <div className="h-screen flex items-center justify-center bg-[#f2f2f2]">
          {children}
        </div>

        {/* <Footer /> */}
      </body>
    </html>
  );
}
