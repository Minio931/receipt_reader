import { Prompt } from '../entities/prompt.model';
import { GeminiPayload } from '../types/gemini-payload.type';
import { ModelFormatterInterface } from './model-formatter.interface';

export class GeminiFormatter implements ModelFormatterInterface {
  format<T>(prompt: Prompt<any>): Prompt<GeminiPayload> {
    switch (prompt?.payload?.contentType) {
    }
  }
}
