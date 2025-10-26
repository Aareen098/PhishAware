'use server';
/**
 * @fileoverview Provides an AI flow to generate personalized feedback for a user's quiz attempt.
 *
 * - generateQuizFeedback - A function that calls the Genkit flow to get feedback.
 * - QuizFeedbackInput - The Zod schema for the input to the feedback flow.
 * - QuizFeedbackOutput - The Zod schema for the output of the feedback flow.
 */
import { ai } from '@/ai/genkit';
import { z } from 'zod';

// Schema for a single question's result.
const QuizQuestionAttemptSchema = z.object({
  questionText: z.string().describe('The text of the question that was asked.'),
  userAnswer: z.string().describe("The answer the user selected."),
  correctAnswer: z.string().describe('The correct answer to the question.'),
  wasCorrect: z.boolean().describe('Whether the user\'s answer was correct.'),
  explanation: z
    .string()
    .describe('The explanation for why the correct answer is right.'),
});

// Schema for the overall quiz attempt. This is the input to our flow.
export const QuizFeedbackInputSchema = z.object({
  scenarioTitle: z.string().describe('The title of the phishing scenario/quiz.'),
  score: z.number().describe('The user\'s final score as a percentage.'),
  questions: z
    .array(QuizQuestionAttemptSchema)
    .describe('The list of questions, user answers, and results.'),
});
export type QuizFeedbackInput = z.infer<typeof QuizFeedbackInputSchema>;

// Schema for the AI-generated feedback. This is the output of our flow.
export const QuizFeedbackOutputSchema = z.object({
  feedbackTitle: z.string().describe('A compelling, short title for the feedback (e.g., "Great Job!" or "Good Start!").'),
  feedbackBody: z.string().describe('A detailed, encouraging, and educational feedback paragraph in Markdown format. It should analyze the user\'s performance, explain the core concepts of the phishing scenario, and provide actionable tips for improvement, especially focusing on the questions the user got wrong.'),
});
export type QuizFeedbackOutput = z.infer<typeof QuizFeedbackOutputSchema>;


/**
 * A client-callable function that executes the quiz feedback generation flow.
 * @param input The user's quiz attempt data.
 * @returns A promise that resolves to the AI-generated feedback.
 */
export async function generateQuizFeedback(
  input: QuizFeedbackInput
): Promise<QuizFeedbackOutput> {
  return quizFeedbackFlow(input);
}

// Defines the Genkit prompt for the feedback generation.
const quizFeedbackPrompt = ai.definePrompt({
  name: 'quizFeedbackPrompt',
  input: { schema: QuizFeedbackInputSchema },
  output: { schema: QuizFeedbackOutputSchema },
  prompt: `
You are an expert cybersecurity awareness trainer called 'PhishAware AI'. Your tone is encouraging, helpful, and educational.

A user has just completed a phishing simulation quiz. Your task is to provide them with personalized feedback based on their results.

The scenario was: {{{scenarioTitle}}}
The user's score was: {{{score}}}%

Here are the questions and their results:
{{#each questions}}
- Question: "{{questionText}}"
  - User Answer: "{{userAnswer}}" ({{#if wasCorrect}}Correct{{else}}Incorrect{{/if}})
  - Correct Answer: "{{correctAnswer}}"
  - Explanation: "{{explanation}}"
{{/each}}

Analyze their performance, especially the incorrect answers.
Generate a feedback response in Markdown format.

The response should:
1.  Start with an encouraging title.
2.  Congratulate them on their score, regardless of what it is.
3.  Explain the overall concept of the phishing attack they just faced (e.g., "This was a classic example of a social engineering attack...").
4.  For any incorrect answers, gently explain the mistake and reinforce the lesson from the explanation. Do NOT just repeat the explanation. Rephrase it and provide more context.
5.  Provide 2-3 general, actionable tips they can use to spot similar threats in the future.
6.  End with a positive and motivating statement.
`,
});

// Defines the Genkit flow that orchestrates the feedback generation.
const quizFeedbackFlow = ai.defineFlow(
  {
    name: 'quizFeedbackFlow',
    inputSchema: QuizFeedbackInputSchema,
    outputSchema: QuizFeedbackOutputSchema,
  },
  async (input) => {
    const { output } = await quizFeedbackPrompt(input);
    return output!;
  }
);
