import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Activity, ShieldCheck, Target } from 'lucide-react';
import { StatsCard } from '@/components/dashboard/stats-card';
import { PerformanceChart } from '@/components/dashboard/performance-chart';
import { ScenarioList } from '@/components/dashboard/scenario-list';
import { AdaptiveScenarioSuggester } from '@/components/dashboard/adaptive-scenario-suggester';

export default function DashboardPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 md:gap-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Scenarios Completed"
          value="4"
          icon={<ShieldCheck className="h-4 w-4 text-muted-foreground" />}
          description="out of 12 available"
        />
        <StatsCard
          title="Average Score"
          value="82%"
          icon={<Target className="h-4 w-4 text-muted-foreground" />}
          description="+5% from last month"
        />
        <StatsCard
          title="Weakest Area"
          value="Email Phishing"
          icon={<Activity className="h-4 w-4 text-muted-foreground" />}
          description="Focus on identifying fake links"
        />
         <AdaptiveScenarioSuggester />
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-7">
        <Card className="col-span-1 lg:col-span-4">
          <CardHeader>
            <CardTitle>Performance Over Time</CardTitle>
            <CardDescription>Your score progression on simulations.</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <PerformanceChart />
          </CardContent>
        </Card>
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
