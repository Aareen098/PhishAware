'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getLastAttempt } from '@/components/quiz/quiz-client';
import {
  generateQuizFeedback,
  type QuizFeedbackInput,
  type QuizFeedbackOutput,
} from '@/ai/flows/quiz-feedback-flow';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart, RotateCw, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';


// A simple markdown-to-HTML renderer
const Markdown = ({ content }: { content: string }) => {
    const html = content
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\n/g, '<br />');
    return <p dangerouslySetInnerHTML={{ __html: html }} />;
};


export default function FeedbackPage() {
  const router = useRouter();
  const [attempt, setAttempt] = useState<QuizFeedbackInput | null>(null);
  const [feedback, setFeedback] = useState<QuizFeedbackOutput | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Retrieve the quiz attempt data from the client-side module
    const lastAttempt = getLastAttempt();
    if (!lastAttempt) {
      // If there's no attempt data, the user might have refreshed the page.
      // We can't recover the state, so we send them back to the dashboard.
      router.replace('/dashboard');
      return;
    }
    setAttempt(lastAttempt as QuizFeedbackInput);

    // Call the AI flow to generate feedback
    generateQuizFeedback(lastAttempt as QuizFeedbackInput)
      .then((fb) => {
        setFeedback(fb);
      })
      .catch((err) => {
        console.error('Error generating feedback:', err);
        setError('Sorry, we couldn\'t generate AI feedback for this quiz. Please try again later.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [router]);

  if (!attempt) {
    // This will show briefly before the redirect or while loading.
    return null; 
  }

  const handleRestart = () => {
    // Navigate back to the quiz page to restart
    const quizId = window.location.pathname.split('/')[2];
    router.push(`/quiz/${quizId}`);
  }

  return (
    <div className="mx-auto w-full max-w-3xl space-y-8">
      {/* Score and Title Card */}
      <Card className="text-center">
        <CardHeader>
          <CardTitle className="text-3xl font-headline">{attempt.scenarioTitle}</CardTitle>
          <CardDescription>Your Results</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-6xl font-bold text-primary">{attempt.score}%</p>
          <p className="text-muted-foreground">
            You correctly answered {attempt.questions.filter(q => q.wasCorrect).length} out of {attempt.questions.length} questions.
          </p>
        </CardContent>
      </Card>
      
      {/* AI Feedback Card */}
      <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl font-headline">
                <Sparkles className="h-6 w-6 text-primary" />
                AI-Powered Feedback
            </CardTitle>
            <CardDescription>Here's a breakdown of your performance and some tips for the future.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            {isLoading && (
                <div className="space-y-4">
                    <Skeleton className="h-8 w-1/3" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                </div>
            )}
            {error && <Alert variant="destructive"><AlertTitle>Error</AlertTitle><AlertDescription>{error}</AlertDescription></Alert>}
            {feedback && !isLoading && (
                <div className="prose prose-sm dark:prose-invert max-w-none">
                    <h3 className="text-xl font-semibold">{feedback.feedbackTitle}</h3>
                    <div className="text-muted-foreground">
                        <Markdown content={feedback.feedbackBody} />
                    </div>
                </div>
            )}
        </CardContent>
        <CardFooter className="flex justify-center gap-4">
            <Button onClick={handleRestart}>
                <RotateCw className="mr-2 h-4 w-4" />
                Try Again
            </Button>
            <Button asChild variant="outline">
                <Link href="/dashboard">
                    <BarChart className="mr-2 h-4 w-4" />
                    Back to Dashboard
                </Link>
            </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
