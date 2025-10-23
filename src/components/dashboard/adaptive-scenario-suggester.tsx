"use client";

import { useState } from 'react';
import { Wand2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { adaptiveLearningPath } from '@/ai/flows/adaptive-learning-path';
import type { UserPerformance } from '@/lib/types';
import { scenarios } from '@/lib/data/scenarios';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '../ui/skeleton';
import Link from 'next/link';

export function AdaptiveScenarioSuggester() {
  const [suggestion, setSuggestion] = useState<{
    suggestedScenario: string;
    reason: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSuggestScenario = async () => {
    setIsLoading(true);
    setSuggestion(null);

    // Mock user performance data
    const userPerformance: UserPerformance = {
      easyCorrect: 5,
      easyTotal: 5,
      mediumCorrect: 3,
      mediumTotal: 5,
      hardCorrect: 1,
      hardTotal: 2,
    };

    const availableScenarios = scenarios.map((s) => s.id);

    try {
      const result = await adaptiveLearningPath({
        userPerformance,
        availableScenarios,
      });
      setSuggestion(result);
    } catch (error) {
      console.error('Error getting scenario suggestion:', error);
      toast({
        title: 'Error',
        description: 'Could not generate a scenario suggestion. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const suggestedScenarioDetails = suggestion ? scenarios.find(s => s.id === suggestion.suggestedScenario) : null;

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-sm font-medium">
          <Wand2 className="h-4 w-4 text-muted-foreground" />
          AI-Powered Next Step
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col justify-center text-center">
        {isLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-6 w-3/4 mx-auto" />
            <Skeleton className="h-4 w-full mx-auto" />
            <Skeleton className="h-4 w-5/6 mx-auto" />
          </div>
        ) : suggestion && suggestedScenarioDetails ? (
          <div className='space-y-3'>
            <h3 className="font-semibold text-lg">{suggestedScenarioDetails.title}</h3>
            <p className="text-xs text-muted-foreground">{suggestion.reason}</p>
             <Button asChild className="w-full" variant="secondary">
                <Link href={`/quiz/${suggestedScenarioDetails.id}`}>Start Now</Link>
            </Button>
          </div>
        ) : (
          <Button onClick={handleSuggestScenario} disabled={isLoading}>
            <Wand2 className="mr-2 h-4 w-4" />
            Suggest a scenario
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
