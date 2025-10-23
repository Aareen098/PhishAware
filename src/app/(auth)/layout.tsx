
import { Shield } from 'lucide-react';
import Link from 'next/link';
import { Footer } from '@/components/layout/footer';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center p-4 auth-bg">
      <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 text-foreground/80 transition-colors hover:text-foreground">
        <Shield className="h-6 w-6" />
        <h1 className="text-xl font-bold font-headline">PhishAware</h1>
      </Link>
      <div className="w-full max-w-sm mb-12 mt-16 sm:mt-0">{children}</div>
      <Footer />
    </div>
  );
}
