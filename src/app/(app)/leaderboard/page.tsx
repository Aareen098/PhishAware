import { LeaderboardTable } from "@/components/leaderboard/leaderboard-table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function LeaderboardPage() {
    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight font-headline">Leaderboard</h1>
                <p className="text-muted-foreground">See how you stack up against other security-savvy users.</p>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Global Rankings</CardTitle>
                    <CardDescription>
                        Rankings are based on a combination of scenarios completed and average score.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <LeaderboardTable />
                </CardContent>
            </Card>
        </div>
    );
}
