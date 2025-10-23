
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
  updateProfile,
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
import { initiateEmailSignUp } from "@/firebase/non-blocking-login";
import { setDocumentNonBlocking } from "@/firebase/non-blocking-updates";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
});

function AppleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 384 512"
      fill="currentColor"
      height="1em"
      width="1em"
      {...props}
    >
      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C39.2 141.6 0 184.2 0 241.2c0 61.6 31.3 117.4 58.7 157.4 14.1 20.3 32.2 39.1 52.8 39.1 20.5 0 26.7-13.3 54.7-13.3 27.8 0 33.3 13.3 55.4 13.3 21.9 0 40.7-19.2 53.8-39.2 13.7-20.2 21.2-47.4 21.8-69.2zM248.4 83.2c14.2-16.6 27.5-35.5 31.1-54.6-28.9-1.8-59 13.2-73.4 29.5-12.7 14.6-28.7 35.1-31.4 53.2 30.6 2.5 59.1-13.1 73.7-28.1z" />
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

export function SignupForm() {
  const auth = useAuth();
  const firestore = useFirestore();
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const handleSocialSignUp = async (provider: GoogleAuthProvider | OAuthProvider) => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      await syncUserData(user);
      router.push("/dashboard");
    } catch (error: any) {
      toast({
        title: "Sign-up Failed",
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
      await initiateEmailSignUp(auth, values.email, values.password);
      
      auth.onAuthStateChanged(async (user) => {
        if (user) {
          await updateProfile(user, { displayName: values.name });
          await syncUserData(user);
          router.push("/dashboard");
        }
      });
    } catch (error: any) {
      toast({
        title: "Sign-up Failed",
        description: error.message,
        variant: "destructive",
      });
    }
  }

  return (
    <div className="grid gap-6">
       <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Name</FormLabel>
                <FormControl>
                  <Input className="input-glow bg-background/70" placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Email</FormLabel>
                <FormControl>
                  <Input className="input-glow bg-background/70" placeholder="m@example.com" {...field} />
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
                <FormLabel className="sr-only">Password</FormLabel>
                <FormControl>
                  <Input className="input-glow bg-background/70" type="password" placeholder="••••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full font-semibold">
            Create Account
          </Button>
        </form>
      </Form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Button variant="outline" className="font-medium bg-background/70" onClick={() => handleSocialSignUp(new GoogleAuthProvider())}><GoogleIcon className="mr-2 h-4 w-4" /> Google</Button>
        <Button variant="outline" className="font-medium bg-background/70" onClick={() => handleSocialSignUp(new OAuthProvider('apple.com'))}><AppleIcon className="mr-2 h-4 w-4" /> Apple</Button>
      </div>
    </div>
  );
}
