import {
  Content,
  createPartFromUri,
  createUserContent,
  GenerateContentConfig,
  GoogleGenAI,
} from '@google/genai';
import { GeminiService } from './gemini.service';

export class MessageService {
  private readonly client: GoogleGenAI;

  constructor(private geminiService: GeminiService) {
    this.client = this.geminiService.clientModel;
  }

  createUserMessageText(text: string): Content {
    return createUserContent(text);
  }

  async createUserMessageImage(
    filePath: string,
    config: GenerateContentConfig,
  ): Promise<Content> {
    const file = await this.client.files.upload({
      file: filePath,
      config,
    });

    return createUserContent([createPartFromUri(file.uri, file.mimeType)]);
  }
}
