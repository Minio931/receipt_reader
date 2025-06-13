import { ModelType } from '../types/model.type';
import { v4 as uuidv4 } from 'uuid';

export class Prompt<TPayload> {
  id: string;
  payload: TPayload;
  model: ModelType;
  createdAt: Date;

  constructor({ payload, model, createdAt }) {
    this.payload = payload;
    this.model = model;
    this.createdAt = createdAt;
    this.id = uuidv4();
  }
}
