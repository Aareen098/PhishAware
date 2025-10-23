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
                    <CardTitle>Preferences</CardTitle>
                    <CardDescription>
                        Adjust your application settings.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p>General application settings will go here.</p>
                </CardContent>
            </Card>
        </div>
    );
}
