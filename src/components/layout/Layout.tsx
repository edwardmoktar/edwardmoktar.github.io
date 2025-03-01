import { ReactNode } from 'react';
import Navbar from './Navbar';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-[#F6F3EE] dark:bg-[#020817] text-foreground">
      <Navbar />
      <main className="page-content">{children}</main>
    </div>
  );
}
