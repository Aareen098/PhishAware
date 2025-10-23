import { NextJSPlugin } from '@genkit-ai/next';

// The NextJSPlugin automatically discovers the flows, so they don't need to be imported here.

const { GET, POST } = NextJSPlugin();

export { GET, POST };
