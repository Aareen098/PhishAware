"use client";

import { useUser } from "@/firebase";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Users, Mail } from "lucide-react";

export function ProfileCard() {
    const { user, isUserLoading } = useUser();

    const fallback = user?.displayName?.substring(0, 2).toUpperCase() || user?.email?.substring(0, 2).toUpperCase() || "PA";

    if (isUserLoading) {
        return (
            <Card>
                <CardContent className="flex flex-col items-center pt-6 space-y-4">
                     <Skeleton className="h-24 w-24 rounded-full" />
                     <div className="space-y-2 text-center w-full">
                        <Skeleton className="h-6 w-3/4 mx-auto" />
                        <Skeleton className="h-4 w-full mx-auto" />
                     </div>
                </CardContent>
            </Card>
        )
    }

    if (!user) {
        return null;
    }

    return (
        <Card>
            <CardContent className="flex flex-col items-center pt-6 space-y-4">
                <Avatar className="h-24 w-24">
                    {user.photoURL && <AvatarImage src={user.photoURL} alt={user.displayName || "User Avatar"} />}
                    <AvatarFallback>{fallback}</AvatarFallback>
                </Avatar>
                <div className="text-center">
                    <h2 className="text-2xl font-bold">{user.displayName}</h2>
                    <p className="text-muted-foreground">{user.email}</p>
                </div>

                <div className="w-full space-y-2 pt-4">
                    <div className="flex items-center text-sm">
                        <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Joined on {new Date(user.metadata.creationTime!).toLocaleDateString()}</span>
                    </div>
                     <div className="flex items-center text-sm">
                        <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">phishaware-user</span>
                    </div>
                </div>

            </CardContent>
        </Card>
    );
}
