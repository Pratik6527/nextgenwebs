
import requests
import json

try:
    response = requests.post(
        "http://localhost:8000/api/ai", 
        json={"prompt": "Hello"}
    )
    with open("api_response.txt", "w", encoding="utf-8") as f:
        f.write(response.text)
    print(f"Status: {response.status_code}")
except Exception as e:
    print(f"Error: {e}")
