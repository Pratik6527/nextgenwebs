import os
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()
KEY = os.getenv("GEMINI_API_KEY")
print(f"Key loaded: {str(KEY)[:5]}... (Length: {len(KEY) if KEY else 0})")

if not KEY:
    print("NO KEY FOUND")
    exit()

genai.configure(api_key=KEY)
try:
    print("Attempting with gemini-pro...")
    model = genai.GenerativeModel("gemini-pro")
    response = model.generate_content("Hello")
    print("SUCCESS")
    print(response.text)
except Exception as e:
    print(f"ERROR: {e}")
    
print("-" * 20)
try:
    print("Attempting with gemini-1.5-flash...")
    model = genai.GenerativeModel("gemini-1.5-flash")
    response = model.generate_content("Hello")
    print("SUCCESS")
    print(response.text)
except Exception as e:
    print(f"ERROR: {e}")
