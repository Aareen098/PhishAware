
'use server';
/**
 * @fileoverview This file initializes the Genkit AI singleton with the Google AI plugin.
 *
 * It exports a single `ai` object that is used throughout the application to
 * define and run AI flows and prompts.
 */

import { genkit } from '@genkit-ai/core';
import { googleAI } from '@genkit-ai/google-genai';

// Initialize the Genkit AI instance with the Google AI plugin.
// This makes Google's models available for use in the application.
export const ai = genkit({
  plugins: [
    googleAI(),
  ],
  // Log errors to the console.
  logLevel: 'error',
  // Enable OpenTelemetry for tracing and metrics.
  enableTracingAndMetrics: true,
});
