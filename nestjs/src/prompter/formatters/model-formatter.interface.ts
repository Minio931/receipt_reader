import { Prompt } from '../entities/prompt.model';

export interface ModelFormatterInterface {
  format<T>(prompt: Prompt<T>): any;
}
