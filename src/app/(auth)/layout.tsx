import { Shield } from 'lucide-react';
import Link from 'next/link';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-background p-4">
      <div className="mb-8">
        <Link href="/" className="flex items-center gap-2 text-primary">
          <Shield className="h-8 w-8" />
          <h1 className="text-2xl font-bold font-headline">PhishAware</h1>
        </Link>
      </div>
      <div className="w-full max-w-sm">{children}</div>
    </div>
  );
}
