import { Button } from '@/components/ui/button';
import { Shield, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { Footer } from '@/components/layout/footer';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex h-16 items-center px-4 lg:px-6">
        <Link
          href="#"
          className="flex items-center justify-center"
          prefetch={false}
        >
          <Shield className="h-6 w-6 text-primary" />
          <span className="ml-2 font-bold font-headline">PhishAware</span>
        </Link>
        <nav className="ml-auto flex items-center gap-2 sm:gap-4">
          <Button asChild variant="ghost">
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">Get Started</Link>
          </Button>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-6 md:py-12 lg:py-16 xl:py-24 hero-bg">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-4">
                  <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Become a Human Firewall
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    PhishAware uses AI-powered simulations to train you in the art of spotting phishing emails, fake login pages, and social engineering attacks.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg">
                    <Link href="/dashboard">Start Your Free Training</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <Link href="/leaderboard">View Leaderboard</Link>
                  </Button>
                </div>
              </div>
              <div className="hidden items-center justify-center lg:flex">
                <ShieldCheck className="h-64 w-64 text-primary/10" />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
