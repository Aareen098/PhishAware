import React from 'react';
import Link from 'next/link';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarInset,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Shield } from 'lucide-react';
import { ThemeToggle } from '@/components/layout/theme-toggle';
import { UserNav } from '@/components/layout/user-nav';
import { SidebarNav } from '@/components/layout/sidebar-nav';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full bg-background">
      <SidebarProvider>
        <Sidebar collapsible="icon">
          <SidebarHeader>
            <div className="flex items-center gap-2" data-testid="logo">
                <Button variant="ghost" size="icon" className="h-10 w-10 shrink-0 text-primary" asChild>
                    <Link href="/dashboard" aria-label="Home">
                        <Shield className="h-6 w-6" />
                    </Link>
                </Button>
                <div className="flex flex-col items-start truncate">
                  <span className="text-lg font-semibold tracking-tight">PhishAware</span>
                </div>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarNav />
          </SidebarContent>
        </Sidebar>
        <SidebarInset>
          <header className="sticky top-0 z-30 flex h-14 items-center justify-end gap-4 border-b bg-background px-4 sm:px-6">
            <ThemeToggle />
            <UserNav />
          </header>
          <main className="flex flex-1 flex-col gap-4 p-4 sm:px-6 sm:py-6 md:gap-8">{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
