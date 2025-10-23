import {NextApiRequest, NextApiResponse} from 'next';
import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';
import {NextJSPlugin} from '@genkit-ai/next';

import '@/ai/flows/adaptive-learning-path';
import '@/ai/flows/quiz-feedback-flow';

genkit({
  plugins: [googleAI(), NextJSPlugin()],
});

export async function GET(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  return;
}

export async function POST(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  return;
}
