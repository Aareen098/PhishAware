"use client";

import { useState } from 'react';
import type { Scenario, Question } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle2, XCircle, ArrowRight, RotateCw, BarChart } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import type { QuizAttempt } from '@/lib/types';

type QuizClientProps = {
  scenario: Scenario;
};

export function QuizClient({ scenario }: QuizClientProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [attempt, setAttempt] = useState<QuizAttempt>({ questions: [] });

  const currentQuestion = scenario.questions[currentQuestionIndex];
  const totalQuestions = scenario.questions.length;

  const handleOptionSelect = (optionId: string) => {
    if (isAnswered) return;
    setSelectedOptionId(optionId);
  };

  const handleSubmit = () => {
    if (!selectedOptionId) return;
    
    const selectedOption = currentQuestion.options.find(
      (opt) => opt.id === selectedOptionId
    );
    const isCorrect = !!selectedOption?.isCorrect;

    setIsAnswered(true);

    if (isCorrect) {
      setScore(score + 1);
    }
    
    setAttempt(prev => ({
        ...prev,
        questions: [
            ...prev.questions,
            {
                questionText: currentQuestion.text,
                userAnswer: selectedOption?.text || '',
                correctAnswer: currentQuestion.options.find(o => o.isCorrect)?.text || '',
                wasCorrect: isCorrect,
                explanation: currentQuestion.explanation,
            }
        ]
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setIsAnswered(false);
      setSelectedOptionId(null);
    } else {
      setAttempt(prev => ({
        ...prev,
        scenarioTitle: scenario.title,
        score: Math.round((score / totalQuestions) * 100),
      }));
      setShowResults(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedOptionId(null);
    setIsAnswered(false);
    setScore(0);
    setShowResults(false);
    setAttempt({ questions: [] });
  }

  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  if (showResults) {
    return (
        <div className="space-y-6">
            <Card className="text-center">
                <CardHeader>
                    <CardTitle className="text-3xl font-headline">Scenario Complete!</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-lg text-muted-foreground">Your Score:</p>
                    <p className="text-6xl font-bold text-primary">
                        {Math.round((score / totalQuestions) * 100)}%
                    </p>
                    <p className="text-muted-foreground">
                        You correctly answered {score} out of {totalQuestions} questions.
                    </p>
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

  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        <Progress value={progress} className="h-2 flex-1" />
        <span className="text-sm font-medium text-muted-foreground">
          {currentQuestionIndex + 1} / {totalQuestions}
        </span>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>{currentQuestion.text}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
           {currentQuestion.imageUrl && (
            <div className="relative my-4 aspect-video overflow-hidden rounded-md border">
              <Image 
                src={currentQuestion.imageUrl} 
                alt="Question visual" 
                fill 
                className="object-contain" 
                data-ai-hint={currentQuestion.imageHint}
              />
            </div>
           )}
          <div className="space-y-2">
            {currentQuestion.options.map((option) => {
              const isSelected = selectedOptionId === option.id;
              const isCorrect = option.isCorrect;
              const variant = isAnswered
                ? isCorrect
                  ? 'correct'
                  : isSelected
                  ? 'incorrect'
                  : 'default'
                : isSelected
                ? 'selected'
                : 'default';
                
              return (
                <Button
                  key={option.id}
                  onClick={() => handleOptionSelect(option.id)}
                  variant={variant === 'default' ? 'outline' : 'default'}
                  className={cn("w-full justify-start h-auto py-3 text-wrap", {
                    'bg-secondary hover:bg-secondary ring-2 ring-primary': variant === 'selected',
                    'bg-green-100 dark:bg-green-900 border-green-300 dark:border-green-700 text-green-900 dark:text-green-100 hover:bg-green-100 dark:hover:bg-green-900': variant === 'correct',
                    'bg-red-100 dark:bg-red-900 border-red-300 dark:border-red-700 text-red-900 dark:text-red-100 hover:bg-red-100 dark:hover:bg-red-900': variant === 'incorrect',
                  })}
                  disabled={isAnswered}
                >
                  {option.text}
                </Button>
              );
            })}
          </div>
          {isAnswered && (
            <Alert
              variant={
                currentQuestion.options.find((o) => o.id === selectedOptionId)
                  ?.isCorrect
                  ? 'default'
                  : 'destructive'
              }
              className={cn({'border-green-500 bg-green-50 dark:bg-green-950': currentQuestion.options.find((o) => o.id === selectedOptionId)
                  ?.isCorrect})}
            >
              {currentQuestion.options.find((o) => o.id === selectedOptionId)
                ?.isCorrect ? (
                <CheckCircle2 className="h-4 w-4" />
              ) : (
                <XCircle className="h-4 w-4" />
              )}
              <AlertTitle>
                {currentQuestion.options.find((o) => o.id === selectedOptionId)
                  ?.isCorrect
                  ? 'Correct!'
                  : 'Incorrect'}
              </AlertTitle>
              <AlertDescription>
                {currentQuestion.explanation}
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter>
          {isAnswered ? (
            <Button onClick={handleNextQuestion} className="ml-auto">
              {currentQuestionIndex === totalQuestions - 1 ? 'View Results' : 'Next Question'}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              className="ml-auto"
              disabled={!selectedOptionId}
            >
              Submit
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
