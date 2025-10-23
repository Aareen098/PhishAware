import { LoginForm } from '@/components/auth/login-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <Card className={cn('auth-card')}>
      <CardHeader className="space-y-2 text-center">
        <CardTitle className="text-2xl font-bold tracking-tight">Welcome Back!</CardTitle>
        <CardDescription>
          Sign in to continue your training and stay sharp.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <LoginForm />
        <div className="mt-6 text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="font-semibold text-primary underline-offset-4 hover:underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
