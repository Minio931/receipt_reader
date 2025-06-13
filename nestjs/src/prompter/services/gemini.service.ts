import {
  Content,
  GenerateContentConfig,
  GenerateContentParameters,
  GenerateContentResponse,
  GoogleGenAI,
} from '@google/genai';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GeminiService {
  private readonly modelName: string;
  private client: GoogleGenAI;

  constructor() {
    this.client = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });
    this.modelName = process.env.GEMINI_MODEL;
  }

  get clientModel(): GoogleGenAI {
    return this.client;
  }

  public async sendPrompt(
    message: Content[],
    system: string | null,
    temperature: number = 1.0,
  ): Promise<GenerateContentResponse> {
    const options: GenerateContentConfig = {
      systemInstruction: system,
      temperature: temperature,
    };

    const parameters: GenerateContentParameters = {
      model: this.modelName,
      contents: message,
      config: options,
    };

    return this.client.models.generateContent(parameters);
  }

  //TODO prowadzenie chatów
}
