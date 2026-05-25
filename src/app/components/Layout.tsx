import { TopNavigation } from './TopNavigation';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50">
      <TopNavigation />
      <main>{children}</main>
    </div>
  );
}
