from gemini_service import  GeminiService
from utils import encode_image_to_webp_base64, read_text_file, extract_json_and_save


gemini_service = GeminiService()

image = encode_image_to_webp_base64("paragon.jpg")
prompt = read_text_file("prompt_v1.txt")

json = gemini_service.process_image(input_image64=image, prompt=prompt)

extract_json_and_save(json)
