import { NextJSPlugin } from '@genkit-ai/next';

// Explicitly import flows for Vercel's build process.
import '@/ai/flows/adaptive-learning-path';
import '@/ai/flows/quiz-feedback-flow';

const { GET, POST } = NextJSPlugin();

export { GET, POST };
