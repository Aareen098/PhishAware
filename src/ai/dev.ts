'use server';
import { config } from 'dotenv';
config();

import '@/ai/flows/adaptive-learning-path.ts';
import '@/ai/flows/quiz-feedback-flow.ts';
