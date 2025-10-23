import { genkit, NextJSPlugin } from '@genkit-ai/next';
import { googleAI } from '@genkit-ai/google-genai';

export const ai = genkit({
  plugins: [googleAI(), NextJSPlugin()],
  model: 'googleai/gemini-2.5-flash',
});
