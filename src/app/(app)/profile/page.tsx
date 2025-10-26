
"use client";

import { ProfileForm } from "@/components/profile/profile-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useUser } from "@/firebase";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Mail, Users } from "lucide-react";

export default function ProfilePage() {
    const { user, isUserLoading } = useUser();
    const fallback = user?.displayName?.substring(0, 2).toUpperCase() || user?.email?.substring(0, 2).toUpperCase() || "PA";

    return (
        <div className="mx-auto w-full max-w-2xl space-y-8">
            <div className="flex flex-col items-center gap-4">
                 {isUserLoading ? (
                    <>
                        <Skeleton className="h-24 w-24 rounded-full" />
                        <div className="space-y-2 text-center">
                            <Skeleton className="h-7 w-32" />
                            <Skeleton className="h-4 w-48" />
                        </div>
                    </>
                ) : user && (
                    <>
                        <Avatar className="h-24 w-24">
                            {user.photoURL && <AvatarImage src={user.photoURL} alt={user.displayName || "User Avatar"} />}
                            <AvatarFallback>{fallback}</AvatarFallback>
                        </Avatar>
                        <div className="text-center">
                            <h1 className="text-3xl font-bold tracking-tight font-headline">{user.displayName}</h1>
                            <p className="text-muted-foreground">{user.email}</p>
                        </div>
                    </>
                )}
            </div>

            {user && !isUserLoading && (
                <Card>
                    <CardContent className="pt-6 space-y-4">
                        <div className="w-full space-y-2">
                            <div className="flex items-center text-sm">
                                <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                                <span className="text-muted-foreground">Joined on {new Date(user.metadata.creationTime!).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center text-sm">
                                <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                                <span className="text-muted-foreground">{user.email}</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}

            <Card>
                <CardHeader>
                    <CardTitle>Edit Profile</CardTitle>
                    <CardDescription>
                        Update your personal information. This is how others will see you on the site.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ProfileForm />
                </CardContent>
            </Card>
        </div>
    );
}
