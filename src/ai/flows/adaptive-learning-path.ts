'use server';

/**
 * @fileOverview Implements an adaptive learning path for phishing simulations.
 *
 * - adaptiveLearningPath - A function that suggests the next phishing scenario based on user performance.
 * - AdaptiveLearningPathInput - The input type for the adaptiveLearningPath function.
 * - AdaptiveLearningPathOutput - The return type for the adaptiveLearningPath function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AdaptiveLearningPathInputSchema = z.object({
  userPerformance: z
    .object({
      easyCorrect: z.number().describe('Number of easy questions answered correctly.'),
      easyTotal: z.number().describe('Total number of easy questions attempted.'),
      mediumCorrect: z.number().describe('Number of medium questions answered correctly.'),
      mediumTotal: z.number().describe('Total number of medium questions attempted.'),
      hardCorrect: z.number().describe('Number of hard questions answered correctly.'),
      hardTotal: z.number().describe('Total number of hard questions attempted.'),
    })
    .describe('The user performance data.'),
  availableScenarios: z
    .array(z.string())
    .describe('List of available phishing scenario identifiers.'),
});
export type AdaptiveLearningPathInput = z.infer<typeof AdaptiveLearningPathInputSchema>;

const AdaptiveLearningPathOutputSchema = z.object({
  suggestedScenario: z.string().describe('The identifier of the suggested phishing scenario.'),
  reason: z.string().describe('The AI reason for choosing the suggested scenario.'),
});
export type AdaptiveLearningPathOutput = z.infer<typeof AdaptiveLearningPathOutputSchema>;

export async function adaptiveLearningPath(
  input: AdaptiveLearningPathInput
): Promise<AdaptiveLearningPathOutput> {
  return adaptiveLearningPathFlow(input);
}

const adaptiveLearningPathPrompt = ai.definePrompt({
  name: 'adaptiveLearningPathPrompt',
  input: {schema: AdaptiveLearningPathInputSchema},
  output: {schema: AdaptiveLearningPathOutputSchema},
  prompt: `You are an AI that recommends phishing simulation scenarios based on user performance.

  Here is the user's performance data:
  Easy questions: {{{userPerformance.easyCorrect}}} / {{{userPerformance.easyTotal}}}
  Medium questions: {{{userPerformance.mediumCorrect}}} / {{{userPerformance.mediumTotal}}}
  Hard questions: {{{userPerformance.hardCorrect}}} / {{{userPerformance.hardTotal}}}

  Available scenarios: {{availableScenarios}}

  Based on this performance, suggest the most appropriate scenario to challenge the user and improve their phishing awareness.
  Consider the user's success rate at each difficulty level, and suggest scenarios that either reinforce weaker areas or introduce new challenges as they improve.
  Explain your reasoning for choosing the suggested scenario. Return your response as a JSON object.
  `,
});

const adaptiveLearningPathFlow = ai.defineFlow(
  {
    name: 'adaptiveLearningPathFlow',
    inputSchema: AdaptiveLearningPathInputSchema,
    outputSchema: AdaptiveLearningPathOutputSchema,
  },
  async input => {
    const {output} = await adaptiveLearningPathPrompt(input);
    return output!;
  }
);
