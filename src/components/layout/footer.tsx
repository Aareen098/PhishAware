import Link from "next/link";
import { Shield } from "lucide-react";

export function Footer() {
    return (
        <footer className="flex w-full shrink-0 flex-col items-center gap-2 border-t px-4 py-6 sm:flex-row md:px-6">
            <div className="flex items-center gap-2">
                <Shield className="h-6 w-6 text-primary" />
                <span className="font-bold">PhishAware</span>
            </div>
            <p className="text-xs text-muted-foreground sm:ml-4">
              &copy; 2024 PhishAware. All rights reserved.
            </p>
            <nav className="flex gap-4 sm:ml-auto sm:gap-6">
              <Link
                href="#"
                className="text-xs underline-offset-4 hover:underline"
                prefetch={false}
              >
                Terms of Service
              </Link>
              <Link
                href="#"
                className="text-xs underline-offset-4 hover:underline"
                prefetch={false}
              >
                Privacy
              </Link>
            </nav>
      </footer>
    );
}
