import { Content, GenerateContentParameters } from '@google/genai';

export type GeminiPayload = {
  model: string;
  contents: Content[];
  config: GenerateContentParameters;
};
