
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useEffect, useState, useRef } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useUser, useFirestore, useStorage } from "@/firebase";
import { doc } from "firebase/firestore";
import { updateDocumentNonBlocking } from "@/firebase/non-blocking-updates";
import { updateProfile } from "firebase/auth";
import { Textarea } from "../ui/textarea";

const profileFormSchema = z.object({
  displayName: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(30, {
      message: "Name must not be longer than 30 characters.",
    }),
  email: z
    .string({
      required_error: "Please select an email to display.",
    })
    .email(),
  bio: z.string().max(160).optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export function ProfileForm() {
  const { toast } = useToast();
  const { user } = useUser();
  const firestore = useFirestore();
  const storage = useStorage();
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      displayName: "",
      email: "",
      bio: "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (user) {
      // In a real app, you'd fetch the bio from Firestore.
      // For this example, we'll just use the auth profile.
      form.reset({
        displayName: user.displayName || "",
        email: user.email || "",
        bio: "Security enthusiast learning to spot phishing attacks.", // Mock bio
      });
    }
  }, [user, form, firestore]);
  
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!user) return;
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
        const storageRef = ref(storage, `avatars/${user.uid}/${file.name}`);
        await uploadBytes(storageRef, file);
        const photoURL = await getDownloadURL(storageRef);

        // Update Firebase Auth profile
        await updateProfile(user, { photoURL });

        // Update Firestore document
        const userRef = doc(firestore, "users", user.uid);
        updateDocumentNonBlocking(userRef, { photoURL });

        toast({
            title: "Avatar updated!",
            description: "Your new profile picture has been saved.",
        });

    } catch (error) {
        toast({
            title: "Upload Failed",
            description: "There was an error uploading your avatar.",
            variant: "destructive",
        });
    } finally {
        setIsUploading(false);
    }
  }

  function onSubmit(data: ProfileFormValues) {
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to update your profile.",
        variant: "destructive",
      });
      return;
    }
    
    // Update Firebase Auth profile for displayName
    updateProfile(user, { displayName: data.displayName });

    // Update Firestore document for displayName, email, bio
    const userRef = doc(firestore, "users", user.uid);
    updateDocumentNonBlocking(userRef, { 
        displayName: data.displayName, 
        email: data.email,
        // bio: data.bio, // In a real app, you would also save the bio here.
    });

    toast({
      title: "Profile updated successfully!",
      description: "Your profile information has been saved.",
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="displayName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Display Name</FormLabel>
              <FormControl>
                <Input placeholder="Your name" {...field} />
              </FormControl>
              <FormDescription>
                This is the name that will be displayed on your profile and on the leaderboard.
              </FormDescription>
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
                <Input placeholder="Your email address" {...field} disabled />
              </FormControl>
              <FormDescription>
                Your email address cannot be changed.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormItem>
            <FormLabel>Avatar</FormLabel>
            <FormControl>
                <Input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
            </FormControl>
            <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()} disabled={isUploading}>
                {isUploading ? 'Uploading...' : 'Upload new picture'}
            </Button>
            <FormDescription>
                Upload a new profile picture.
            </FormDescription>
        </FormItem>
         <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about yourself"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                You can <strong>@mention</strong> other users and organizations to link to them.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Update profile</Button>
      </form>
    </Form>
  );
}
