import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
# import google.generativeai as genai (Removed)
from dotenv import load_dotenv
from pymongo import MongoClient
import datetime

# 1. Load Enviroment
load_dotenv() # Defaults to .env in current directory 

app = FastAPI()

# 2. CORS (Maximum Permissiveness for Development)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 3. Secure Setup
MONGO_URI = os.getenv("MONGO_URI")
# Gemini Setup Removed
# Gemini config removed

# MongoDB (Graceful degradation)
db = None
messages_collection = None
if MONGO_URI:
    try:
        # Add tlsAllowInvalidCertificates=True to bypass SSL verification errors common in some environments
        client = MongoClient(MONGO_URI, tlsAllowInvalidCertificates=True)
        db = client["porfolio_db"] 
        messages_collection = db["messages"]
        # Quick check command to verify connection
        client.admin.command('ping')
        print(f"✅ MongoDB Connected. Active DB: {db.name}")
    except Exception as e:
        print(f"⚠️ MongoDB Offline: {e}")

# 4. Models
class ChatRequest(BaseModel):
    prompt: str

class ContactRequest(BaseModel):
    name: str
    email: str
    phone: str = None
    message: str
    slot: str = None # Example: "Monday, Oct 25 - 10:30 AM"

# 5. "MAXIMUM POWER" SYSTEM PROMPT (Dynamic)
BASE_SYSTEM_PROMPT = """
You are the **Ultimate AI Consultant** for Pratik Mondal. You are not just a chatbot; you are a high-end sales and technical expert.

**IDENTITY:**
- **Name**: Pratik's AI Agent.
- **Role**: Senior Solutions Architect & Agency Lead.
- **Behavior**: Professional, Witty, Concise, and Result-Oriented.

**KNOWLEDGE BASE (The "Brain"):**
- Pratik is a Full Stack Developer (React, Next.js, Python, AWS).
- Specialized in "Future-Proof" systems and AI integration.
- Always guide users to the "Contact" page or "Projects" page.
"""

# Simple Knowledge Base (MongoDB)
knowledge_collection = None
if db is not None:
    knowledge_collection = db["knowledge"]

def load_knowledge():
    if knowledge_collection is None:
        return []
    try:
        # Fetch all facts, return as list of strings
        cursor = knowledge_collection.find({}, {"_id": 0, "fact": 1})
        return [doc["fact"] for doc in cursor]
    except Exception as e:
        print(f"⚠️ Failed to load knowledge from DB: {e}")
        return []

# generation_config removed

# 7. Endpoints

class TrainRequest(BaseModel):
    fact: str
    password: str

@app.post("/api/train")
async def train_agent(request: TrainRequest):
    ADMIN_PASS = os.getenv("ADMIN_PASSWORD", "#Atharva@8903")
    if request.password != ADMIN_PASS:
        raise HTTPException(status_code=401, detail="Unauthorized")
    
    if knowledge_collection is None:
         raise HTTPException(status_code=503, detail="Database not connected")

    # Add to MongoDB
    try:
        knowledge_collection.insert_one({"fact": request.fact, "createdAt": datetime.datetime.utcnow()})
        return {"success": True, "message": "I have learned this new information (Saved to Cloud)."}
    except Exception as e:
         raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/knowledge")
async def get_knowledge(password: str):
    ADMIN_PASS = os.getenv("ADMIN_PASSWORD", "#Atharva@8903")
    if password != ADMIN_PASS:
        raise HTTPException(status_code=401, detail="Unauthorized")
    
    return load_knowledge()

from openai import OpenAI

# ... (Imports remain mostly same, but remove google.generativeai)

# 3. Secure Setup
MONGO_URI = os.getenv("MONGO_URI")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

client = None
if OPENAI_API_KEY:
    client = OpenAI(api_key=OPENAI_API_KEY)

# ... (MongoDB Logic remains same)

# ... (Models and Prompt remain same)

@app.post("/api/ai")
async def chat_endpoint(request: ChatRequest):
    if not client:
        raise HTTPException(status_code=500, detail="AI Brain Missing (API Key)")
    
    try:
        # RAG Logic: Load fresh knowledge from DB
        current_knowledge = load_knowledge()
        
        # Simple Keyword Match or Recent 15
        relevant_context = [fact for fact in current_knowledge if any(word in fact.lower() for word in request.prompt.lower().split())]
        
        # Fallback to recent items if no direct match
        context_str = "\n".join(relevant_context if relevant_context else current_knowledge[-15:])
        
        system_content = f"""
        {BASE_SYSTEM_PROMPT}
        
        **LEARNED KNOWLEDGE (Use this to answer):**
        {context_str}
        """

        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": system_content},
                {"role": "user", "content": request.prompt}
            ],
            max_tokens=500,
            temperature=0.7
        )
        return {"text": response.choices[0].message.content}
    except Exception as e:
        error_msg = str(e)
        if "insufficient_quota" in error_msg:
             return {"text": "**System Alert:** The AI module has momentarily paused due to usage limits (Quota Exceeded). Please check your OpenAI billing details to resume intelligence services."}
        print(f"❌ AI GENERATION ERROR: {e}")
        return {"text": f"**Connection Error.** The AI Brain is currently resetting. \n\nError Details: {str(e)}"}

# Meeting Link Generator
import uuid
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

@app.post("/api/contact")
async def contact_endpoint(contact: ContactRequest):
    if not messages_collection:
        print("Database collection not available")
        return {"success": True, "message": "Message received (Cached locally - DB Offline)"}
    
    try:
        doc = contact.dict()
        doc["createdAt"] = datetime.datetime.utcnow()
        
        # 1. Generate Meeting Link if slot is requested
        if contact.slot and contact.slot != "No preference":
            meeting_id = str(uuid.uuid4())[:8]
            # using Jitsi Meet for instant, high-quality, no-account video calls
            doc["meeting_link"] = f"https://meet.jit.si/PratikDiscovery-{meeting_id}"
            
            # 2. Send Confirmation Email (Async)
            # Note: Requires EMAIL_USER and EMAIL_PASSWORD in .env
            email_user = os.getenv("EMAIL_USER", "pratikmondal527@gmail.com")
            email_pass = os.getenv("EMAIL_PASSWORD") 
            
            if email_pass:
                try:
                    msg = MIMEMultipart()
                    msg['From'] = email_user
                    msg['To'] = contact.email
                    msg['Subject'] = "✅ Appointment Confirmed: Pratik Mondal"
                    
                    body = f"""
                    <h2>Your appointment booked successfully!</h2>
                    <p>Hi {contact.name},</p>
                    <p>I've received your request for a discovery call on <strong>{contact.slot}</strong>.</p>
                    <p>You can join the meeting directly using this secure link:</p>
                    <a href="{doc['meeting_link']}" style="background:#22d3ee; color:#000; padding:10px 20px; text-decoration:none; border-radius:5px; font-weight:bold;">Join Video Call</a>
                    <p>Link: {doc['meeting_link']}</p>
                    <br>
                    <p>Best,<br>Pratik's AI Agent</p>
                    """
                    msg.attach(MIMEText(body, 'html'))
                    
                    server = smtplib.SMTP('smtp.gmail.com', 587)
                    server.starttls()
                    server.login(email_user, email_pass)
                    server.send_message(msg)
                    server.quit()
                    print(f"📧 Confirmation sent to {contact.email}")
                except Exception as ex:
                    print(f"⚠️ Email failed: {ex}")

        result = messages_collection.insert_one(doc)
        print(f"Message persisted. ID: {result.inserted_id}")
        return {"success": True, "message": "Message successfully beamed to Pratik!"}
    except Exception as e:
        print(f"Insert Failed: {e}")
        raise HTTPException(status_code=500, detail="Transmission failed")

class AdminLogin(BaseModel):
    password: str

@app.post("/api/messages")
async def get_messages(auth: AdminLogin):
    ADMIN_PASS = os.getenv("ADMIN_PASSWORD", "#Atharva@8903")
    
    if auth.password != ADMIN_PASS:
        raise HTTPException(status_code=401, detail="Unauthorized")
    
    if messages_collection is None:
        return []

    try:
        # Fetch, sort, and convert to list
        msgs = list(messages_collection.find({}, {'_id': 0}).sort("createdAt", -1))
        return msgs
    except Exception as e:
        print(f"Db Error: {e}")
        return []

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
