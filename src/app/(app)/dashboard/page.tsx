import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Activity, ShieldCheck, Target, Wand2 } from 'lucide-react';
import { StatsCard } from '@/components/dashboard/stats-card';
import { PerformanceChart } from '@/components/dashboard/performance-chart';
import { ScenarioList } from '@/components/dashboard/scenario-list';
import { ProfileCard } from '@/components/profile/profile-card';

export default function DashboardPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 md:gap-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Scenarios Completed"
          value="0"
          icon={<ShieldCheck className="h-4 w-4 text-muted-foreground" />}
          description="out of 12 available"
        />
        <StatsCard
          title="Average Score"
          value="0%"
          icon={<Target className="h-4 w-4 text-muted-foreground" />}
          description="Complete a scenario to see your score"
        />
        <StatsCard
          title="Weakest Area"
          value="N/A"
          icon={<Activity className="h-4 w-4 text-muted-foreground" />}
          description="Complete scenarios to analyze"
        />
         <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">AI-Powered Next Step</CardTitle>
                <Wand2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">Coming Soon</div>
                <p className="text-xs text-muted-foreground">AI suggestions are temporarily disabled.</p>
            </CardContent>
         </Card>
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-7">
        <div className="col-span-1 flex flex-col gap-4 lg:col-span-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Over Time</CardTitle>
              <CardDescription>Your score progression on simulations.</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <PerformanceChart />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
                <CardTitle>Profile Status</CardTitle>
                <CardDescription>Your account details and activity.</CardDescription>
            </CardHeader>
            <CardContent>
                <ProfileCard />
            </CardContent>
          </Card>
        </div>
        <Card className="col-span-1 lg:col-span-3">
          <CardHeader>
            <CardTitle>Training Scenarios</CardTitle>
            <CardDescription>
              Select a scenario to test your skills.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScenarioList />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
