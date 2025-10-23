import { SignupForm } from '@/components/auth/signup-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function SignupPage() {
  return (
    <Card className={cn('auth-card')}>
      <CardHeader className="space-y-2 text-center">
        <CardTitle className="text-2xl font-bold tracking-tight">Create Your Account</CardTitle>
        <CardDescription>
          Join PhishAware and become a human firewall.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SignupForm />
        <div className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link href="/login" className="font-semibold text-primary underline-offset-4 hover:underline">
            Log in
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
