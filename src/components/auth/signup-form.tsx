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
      <svg {...props} viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.39,14.73A5.4,5.4,0,0,1,16,13.2a2.86,2.86,0,0,1,1-2.15,3.44,3.44,0,0,0-2.3-1,5.13,5.13,0,0,0-4.22,2.57,5.4,5.4,0,0,1-3.32-.46,5.13,5.13,0,0,0-3.41,5.28,9.75,9.75,0,0,0,5.47,5.53,5.22,5.22,0,0,0,6.09-1.63A5.13,5.13,0,0,0,19.39,14.73ZM12.5,4.41A3.28,3.28,0,0,1,14.65,2a3.42,3.42,0,0,1,2.51,1.15,3.29,3.29,0,0,0-2.54,1.4,3.42,3.42,0,0,0-2.12-1.14Z"/>
      </svg>
    )
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
      <div className="grid grid-cols-2 gap-4">
        <Button variant="outline" onClick={() => handleSocialSignUp(new GoogleAuthProvider())}><GoogleIcon className="mr-2 h-4 w-4" /> Google</Button>
        <Button variant="outline" onClick={() => handleSocialSignUp(new OAuthProvider('apple.com'))}><AppleIcon className="mr-2 h-4 w-4" /> Apple</Button>
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
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
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
            Create Account
          </Button>
        </form>
      </Form>
    </div>
  );
}
