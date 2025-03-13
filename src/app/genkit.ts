'use server';

import { gemini20Flash, googleAI } from '@genkit-ai/googleai';
import { genkit, z } from 'genkit';

const ai = genkit({
  plugins: [
    googleAI({
      apiKey: process.env.GOOGLE_GENAI_API_KEY,
    }),
  ],
  model: gemini20Flash,
});

const resultSchema = z.object({ judge: z.string(), solution: z.string() });

export const generateFlow = ai.defineFlow(
  {
    name: 'generateFlow',
    inputSchema: z.string(),
  },
  async (url) => {
    const { output } = await ai.generate({
      system: 'Kamu adalah kritikus yang sering memberi kritikan tajam',
      prompt: `Buatkan saya kritik untuk akun social media dengan link berikut ${url}`,
      output: { schema: resultSchema },
    });
    return output;
  },
);

export const generateByImageURLFlow = ai.defineFlow(
  {
    name: 'generateFlow',
    inputSchema: z.string(),
  },
  async (url) => {
    const { text } = await ai.generate([
      { media: { url } },
      { text: 'buat puisi dari gambar tersebut' },
    ]);
    return text;
  },
);
