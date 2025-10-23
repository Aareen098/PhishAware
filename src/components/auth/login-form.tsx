
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter } from "next/navigation";
import {
  signInWithPopup,
  GoogleAuthProvider,
  OAuthProvider,
  User,
} from "firebase/auth";
import { doc } from "firebase/firestore";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth, useFirestore } from "@/firebase";
import { initiateEmailSignIn } from "@/firebase/non-blocking-login";
import { useToast } from "@/hooks/use-toast";
import { setDocumentNonBlocking } from "@/firebase/non-blocking-updates";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(1, { message: "Password is required." }),
});

function AppleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      height="1em"
      width="1em"
      {...props}
    >
      <path d="M12.01,16.22c-1.3,0-2.55-0.58-3.53-1.54s-1.5-2.28-1.49-3.58c0.01-1.42,0.64-2.73,1.75-3.63s2.51-1.3,3.95-1.29 c0.94,0,2.2,0.47,3.23,1.28c-1.28,0.78-2.14,2.05-2.13,3.46c0.01,1.38,0.76,2.66,1.96,3.45C14.73,15.83,13.4,16.22,12.01,16.22z M15.79,3.54c-0.29,0-1.5,0.11-2.61,0.85c-0.89,0.6-1.63,1.52-2.01,2.66c-0.1,0.29-0.04,0.6,0.15,0.81 c0.2,0.21,0.48,0.29,0.75,0.22c1.2-0.3,2.39-0.96,3.24-1.92c1.11-1.25,1.55-2.67,1.48-3.85C16.57,3.61,16.2,3.54,15.79,3.54z" />
      <path d="M19.81,18.84c-0.02,0-1.89-0.67-3.63-0.67c-1.61,0-2.85,0.59-3.81,0.59c-0.97,0-2.2-0.62-3.69-0.59 c-1.88,0.04-3.55,0.81-4.43,2.02c-1.3,1.79-1.3,4.2-0.02,5.92c0.88,1.18,2.24,2.25,3.8,2.25c1.47,0,2.62-0.84,4.2-0.88 c1.58-0.04,2.95,0.88,4.22,0.88c1.55,0,2.94-0.97,3.82-2.14c0.1-0.13,0.19-0.27,0.28-0.42c-1.6-1.04-2.66-2.81-2.66-4.7 C17.34,19.87,18.3,18.84,19.81,18.84z" />
    </svg>
  );
}
  
function GoogleIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg {...props} viewBox="0 0 24 24" fill="currentColor">
            <path d="M22.56,12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26,1.37-1.04,2.53-2.21,3.31v2.77h3.57c2.08-1.92,3.28-4.74,3.28-8.09Z"/>
            <path d="M12,23c2.97,0,5.46-.98,7.28-2.66l-3.57-2.77c-.98.66-2.23,1.06-3.71,1.06-2.86,0-5.29-1.93-6.16-4.53H2.18v2.84C3.99,20.53,7.7,23,12,23Z"/>
            <path d="M5.84,14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43,8.55,1,10.22,1,12s.43,3.45,1.18,4.93l3.66-2.84Z"/>
            <path d="M12,5.38c1.62,0,3.06.56,4.21,1.64l3.15-3.15C17.45,2.09,14.97,1,12,1,7.7,1,3.99,3.47,2.18,7.07l3.66,2.84c.87-2.6,3.3-4.53,6.16-4.53Z"/>
        </svg>
    )
}

export function LoginForm() {
  const auth = useAuth();
  const firestore = useFirestore();
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSocialSignIn = async (provider: GoogleAuthProvider | OAuthProvider) => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      await syncUserData(user);
      router.push("/dashboard");
    } catch (error: any) {
      toast({
        title: "Login Failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const syncUserData = async (user: User) => {
    const userRef = doc(firestore, "users", user.uid);
    const userData = {
      id: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      creationTime: user.metadata.creationTime,
      lastSignInTime: user.metadata.lastSignInTime,
    };
    setDocumentNonBlocking(userRef, userData, { merge: true });
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await initiateEmailSignIn(auth, values.email, values.password);
      router.push("/dashboard");
    } catch (error: any) {
      toast({
        title: "Login Failed",
        description: error.message,
        variant: "destructive",
      });
    }
  }

  return (
    <div className="grid gap-6">
      <div className="grid grid-cols-2 gap-4">
        <Button variant="outline" onClick={() => handleSocialSignIn(new GoogleAuthProvider())}><GoogleIcon className="mr-2 h-4 w-4" /> Google</Button>
        <Button variant="outline" onClick={() => handleSocialSignIn(new OAuthProvider('apple.com'))}><AppleIcon className="mr-2 h-4 w-4" /> Apple</Button>
      </div>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="m@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Log In
          </Button>
        </form>
      </Form>
    </div>
  );
}
