'use server';
import { config } from 'dotenv';
config();

// This file is for local development only.
// It is not used in production.
import '@/ai/flows/adaptive-learning-path.ts';
import '@/ai/flows/quiz-feedback-flow.ts';
