import os
from dotenv import load_dotenv
import os
from google import genai

class GeminiService:
    def __init__(self, api_key=None, model_name="gemini-2.0-flash"):
        load_dotenv()
        self.api_key = api_key or os.getenv("GOOGLE_GEMINI_API_KEY")
        if not self.api_key:
            raise ValueError("API Key is required. Set i via env or pass directly.")
        
        self.client = genai.Client(api_key=self.api_key)
        self.model = model_name
        print('Gemini Service Initialize')


    def process_image(self, input_image64, prompt, system="You are receipt recognizer", temperature=0.0):
        content = []
        if prompt:
            content.append({
                "role": "user",
                "parts": [{"text": prompt}]
            })
        
        if input_image64:
            content.append({
                "role": "user",
                "parts":[{
                    "inline_data": {
                        "mime_type": "image/webp",
                        "data": input_image64
                    }
                }]
            }) 

        if not len(content):
            raise ValueError("Invalid input data no image and prompt")
        
        response = self.client.models.generate_content(model=self.model, contents=content, config={
            "system_instruction": system
        })

        return response