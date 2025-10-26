/**
 * @fileoverview This is the entrypoint for Genkit's Next.js plugin.
 *
 * This file should not be modified.
 */
import { nextJSHandler } from 'genkit-nextjs-plugin';
import '@/ai/flows/quiz-feedback-flow';

export const POST = nextJSHandler;
