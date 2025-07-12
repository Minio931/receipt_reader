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
  private client: GoogleGenAI;
  private readonly modelName: string;

  constructor(apiKey: string, modelName: string) {
    this.apiKey = apiKey;
    this.modelName = modelName;
    this.client = new GoogleGenAI({
      apiKey: this.apiKey,
    });
  }

  public async processReceipt(
    inputImages64: string[],
    prompt: string,
    system = "You are receipt recognizer",
    temperature = 0.0,
  ) {
    const contents: Content[] = this.prepareMessage(inputImages64, prompt);

    const options: GenerateContentConfig = {
      systemInstruction: system,
      temperature: temperature,
    };

    const props: GenerateContentParameters = {
      config: options,
      contents,
      model: this.modelName,
    };

    const response: GenerateContentResponse = await this.client.models.generateContent(props);

    return this.extractJson(response);
  }

  private extractJson(data: GenerateContentResponse) {
    const text = data.candidates[0].content.parts[0].text;

    const formattedText = text.replace(/```json|```/g, "");

    return JSON.parse(formattedText);
  }

  private prepareMessage(inputImages64: string[], prompt: string): Content[] {
    return [
      {
        role: SenderRole.USER,
        parts: [
          { text: prompt },
          ...inputImages64.map((base64) => ({
            inlineData: {
              data: base64,
              mimeType: "image/jpg",
            },
          })),
        ],
      },
    ];
  }
}

export default new GeminiService(
  process.env.GEMINI_API_KEY ?? "",
  process.env.GEMINI_MODEL ?? "gemini-2.0-flash",
);
