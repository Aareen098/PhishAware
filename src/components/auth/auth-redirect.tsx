
'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useUser } from '@/firebase';

export function AuthRedirect() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isUserLoading) return; // Wait until user state is resolved

    const isAuthPage = pathname?.startsWith('/login') || pathname?.startsWith('/signup');

    if (user && isAuthPage) {
      // If user is logged in and on an auth page, redirect to dashboard
      router.replace('/dashboard');
    } else if (!user && !isAuthPage && pathname !== '/') {
        // If user is not logged in and not on an auth page or landing page, redirect to login
        const protectedRoutes = ['/dashboard', '/profile', '/settings', '/quiz', '/leaderboard', '/news'];
        if (protectedRoutes.some(route => pathname?.startsWith(route))) {
            router.replace('/login');
        }
    }
  }, [user, isUserLoading, router, pathname]);

  return null; // This component does not render anything
}
