import { SenderRole } from "@/enums/sender-role.enum.js";
import {
  Content,
  GenerateContentConfig,
  GenerateContentParameters,
  GenerateContentResponse,
  GoogleGenAI,
} from "@google/genai";

export class GeminiService {
  private readonly apiKey: string;
  private readonly modelName: string;
  private client: GoogleGenAI;

  constructor(apiKey: string, modelName: string) {
    this.apiKey = apiKey;
    this.modelName = modelName;
    this.client = new GoogleGenAI({
      apiKey: this.apiKey,
    });
  }

  public async processReceipt(
    inputImage64: string,
    prompt: string,
    system: string = "You are receipt recognizer",
    temperature: number = 0.0,
  ) {
    const contents: Content[] = this.prepareMessage(inputImage64, prompt);

    const options: GenerateContentConfig = {
      systemInstruction: system,
      temperature: temperature,
    };

    const props: GenerateContentParameters = {
      model: this.modelName,
      contents,
      config: options,
    };

    const response: GenerateContentResponse = await this.client.models.generateContent(props);

    return this.extractJson(response);
  }

  private extractJson(data: GenerateContentResponse) {
    const text = data.candidates[0].content.parts[0].text;

    const formattedText = text.replace(/```json|```/g, "");

    return JSON.parse(formattedText);
  }

  private prepareMessage(inputImage64: string, prompt: string): Content[] {
    return [
      {
        role: SenderRole.USER,
        parts: [
          {
            text: prompt,
          },
        ],
      },
      {
        role: SenderRole.USER,
        parts: [
          {
            inlineData: {
              mimeType: "image/jpg",
              data: inputImage64,
            },
          },
        ],
      },
    ];
  }
}

export default new GeminiService(
  process.env.GEMINI_API_KEY ?? "",
  process.env.GEMINI_MODEL ?? "gemini-2.0-flash",
);
