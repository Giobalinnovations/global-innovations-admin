import DashboardSidebar from './components/dashboard-sidebar';
import DashboardHeader from './components/dashboard-header';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Global Innovation media Dashboard',
  description: 'Global Innovation media Dashboard',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <DashboardSidebar />
      <div className="flex flex-col">
        <DashboardHeader />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
