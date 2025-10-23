'use server';

/**
 * @fileOverview Implements an AI-powered quiz feedback generator.
 *
 * - generateQuizFeedback - A function that provides personalized feedback based on quiz performance.
 * - QuizFeedbackInput - The input type for the generateQuizFeedback function.
 * - QuizFeedbackOutput - The return type for the generateQuizFeedback function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const QuizFeedbackInputSchema = z.object({
  scenarioTitle: z.string().describe('The title of the quiz scenario.'),
  score: z.number().describe('The percentage score the user achieved.'),
  questions: z
    .array(
      z.object({
        questionText: z.string(),
        userAnswer: z.string(),
        correctAnswer: z.string(),
        wasCorrect: z.boolean(),
        explanation: z.string(),
      })
    )
    .describe('An array of the questions, user answers, and results.'),
});
export type QuizFeedbackInput = z.infer<typeof QuizFeedbackInputSchema>;

const QuizFeedbackOutputSchema = z.object({
  feedback: z
    .string()
    .describe(
      'Personalized, encouraging, and constructive feedback for the user based on their quiz performance. It should be 2-3 sentences long.'
    ),
});
export type QuizFeedbackOutput = z.infer<typeof QuizFeedbackOutputSchema>;

export async function generateQuizFeedback(
  input: QuizFeedbackInput
): Promise<QuizFeedbackOutput> {
  return quizFeedbackFlow(input);
}

const prompt = ai.definePrompt({
  name: 'quizFeedbackPrompt',
  input: { schema: QuizFeedbackInputSchema },
  output: { schema: QuizFeedbackOutputSchema },
  prompt: `You are a friendly and encouraging cybersecurity coach. The user has just completed a phishing simulation quiz.
  
  Your task is to provide personalized, constructive feedback based on their performance.
  
  Scenario Title: {{{scenarioTitle}}}
  Score: {{{score}}}%

  User's Answers:
  {{#each questions}}
  - Question: "{{this.questionText}}"
    - Your Answer: "{{this.userAnswer}}" ({{#if this.wasCorrect}}Correct{{else}}Incorrect{{/if}})
    - Explanation: {{this.explanation}}
  {{/each}}

  Based on the results, provide 2-3 sentences of personalized feedback.
  - If the user did well, praise them and highlight a key strength.
  - If the user struggled, be encouraging. Point out a specific area for improvement based on their incorrect answers without being discouraging. For example, instead of saying "You failed to spot the fake URL", say "Double-checking the sender's email address is a great habit to build".
  - Mention the scenario context (e.g., "in that delivery scam scenario").
  - Maintain a positive and supportive tone.
  - Generate a unique response each time.
  `,
});

const quizFeedbackFlow = ai.defineFlow(
  {
    name: 'quizFeedbackFlow',
    inputSchema: QuizFeedbackInputSchema,
    outputSchema: QuizFeedbackOutputSchema,
  },
  async input => {
    const { output } = await prompt(input);
    return output!;
  }
);
