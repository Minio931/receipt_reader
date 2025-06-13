import { Prompt } from '../../entities/prompt.model';

export interface PromptStrategyInterface<TPayload> {
  buildPrompt(payload: TPayload): Prompt<TPayload>;
}
