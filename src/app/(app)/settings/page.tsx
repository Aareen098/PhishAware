import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function SettingsPage() {
    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight font-headline">Settings</h1>
                <p className="text-muted-foreground">Manage your account and application preferences.</p>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Coming Soon</CardTitle>
                    <CardDescription>
                        This section is under construction. Soon you will be able to manage your profile, notifications, and other settings here.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex h-48 items-center justify-center rounded-md border-2 border-dashed">
                        <p className="text-muted-foreground">More settings coming soon!</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
