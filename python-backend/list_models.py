
import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    print("No API Key found")
    exit()

genai.configure(api_key=api_key)

try:
    with open("models.txt", "w") as f:
        print("Listing models...")
        for m in genai.list_models():
            if 'generateContent' in m.supported_generation_methods:
                print(m.name)
                f.write(m.name + "\n")

except Exception as e:
    print(f"Error: {e}")
