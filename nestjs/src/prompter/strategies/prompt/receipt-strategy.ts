import { Prompt } from '../../entities/prompt.model';
import { ReceiptPayload } from '../../types/receipt-payload.type';
import { PromptStrategyInterface } from './prompt-strategy.interface';

export class ReceiptStrategy
  implements PromptStrategyInterface<ReceiptPayload>
{
  buildPrompt(payload: ReceiptPayload): Prompt<ReceiptPayload> {
    return new Prompt({
      payload,
      model: payload.model,
      createdAt: new Date(),
    });
  }
}
