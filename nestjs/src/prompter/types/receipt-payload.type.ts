import { Content } from './content.type';
import { ModelType } from './model.type';

export type ReceiptPayload = {
  imageBase64: string;
  prompt: string;
  model: ModelType;
  contentType: Content;
};
