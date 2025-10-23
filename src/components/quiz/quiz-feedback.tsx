"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Wand2, RefreshCw } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { generateQuizFeedback } from '@/ai/flows/quiz-feedback-flow';
import type { QuizAttempt } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';

type QuizFeedbackProps = {
  attempt: Required<QuizAttempt>;
};

export function QuizFeedback({ attempt }: QuizFeedbackProps) {
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchFeedback = async () => {
    setIsLoading(true);
    try {
      const result = await generateQuizFeedback({
        scenarioTitle: attempt.scenarioTitle,
        score: attempt.score,
        questions: attempt.questions,
      });
      setFeedback(result.feedback);
    } catch (error) {
      console.error('Error generating feedback:', error);
      toast({
        title: 'Error',
        description: 'Could not generate AI feedback. Please try again.',
        variant: 'destructive',
      });
      setFeedback(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attempt]);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wand2 className="h-5 w-5 text-primary" />
            <CardTitle>AI Feedback</CardTitle>
          </div>
          <Button variant="ghost" size="icon" onClick={fetchFeedback} disabled={isLoading}>
            <RefreshCw className={cn('h-4 w-4', {'animate-spin': isLoading})} />
          </Button>
        </div>
        <CardDescription>
          Here's a personalized tip from our AI coach based on your results.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">{feedback}</p>
        )}
      </CardContent>
    </Card>
  );
}
