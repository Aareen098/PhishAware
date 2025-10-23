import { NextJSPlugin } from '@genkit-ai/next';

import '@/ai/flows/adaptive-learning-path';
import '@/ai/flows/quiz-feedback-flow';

const { GET, POST } = NextJSPlugin();

export { GET, POST };
