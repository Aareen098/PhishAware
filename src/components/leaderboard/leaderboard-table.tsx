import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { leaderboardData } from "@/lib/data/leaderboard";
import { Crown, Medal, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

function RankIcon({ rank }: { rank: number }) {
    if (rank === 1) return <Crown className="h-5 w-5 text-yellow-500" />;
    if (rank === 2) return <Medal className="h-5 w-5 text-slate-400" />;
    if (rank === 3) return <Trophy className="h-5 w-5 text-yellow-700" />;
    return <span className="font-semibold text-muted-foreground">{rank}</span>;
}

export function LeaderboardTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[80px] text-center">Rank</TableHead>
          <TableHead>User</TableHead>
          <TableHead className="text-center">Scenarios</TableHead>
          <TableHead className="text-right">Avg. Score</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {leaderboardData.map((user) => (
          <TableRow key={user.id} className={cn({'bg-primary/10': user.name === 'PhishAware User'})}>
            <TableCell className="text-center">
                <div className="flex items-center justify-center">
                    <RankIcon rank={user.rank} />
                </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-3">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint={user.imageHint} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="font-medium">{user.name}</span>
              </div>
            </TableCell>
            <TableCell className="text-center">{user.scenariosCompleted}</TableCell>
            <TableCell className="text-right font-semibold">{user.averageScore}%</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
