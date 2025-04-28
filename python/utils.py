import base64
import json
import re

from PIL import Image
from io import BytesIO


def encode_image_to_webp_base64(filepath):
    if filepath is None:
        return None
    
    try:
        pil_image = Image.open(filepath)
        if pil_image.mode == 'RGBA':
            pil_image = pil_image.convert('RGB')

        buffered = BytesIO()
        pil_image.save(buffered, format="WEBP")

        base64_image = base64.b64encode(buffered.getvalue()).decode('utf-8')

        return base64_image

    except Exception as e:
        return None, str(e)
    

def read_text_file(filepath):
    with open(filepath, "r", encoding="utf-8") as file:
        content = file.read()

    return content


def extract_json_and_save(response, filename="receipt.json"):
    raw_text = response.candidates[0].content.parts[0].text

    match = re.search(r"```json\n(.*)\n```", raw_text, re.DOTALL)

    if match:
        json_str = match.group(1)

        try:
            data = json.loads(json_str)

            with open(filename, "w", encoding="utf-8") as f:
                json.dump(data, f, indent=2, ensure_ascii=False)

            print(f"✅ JSON zapisany do pliku: {filename}")

        except json.JSONDecodeError as e:
            print("❌ Błąd przy parsowaniu JSON-a:", e)
    else:
        print("❌ Nie znaleziono poprawnego bloku JSON w odpowiedzi.")