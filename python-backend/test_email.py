import os
import smtplib
from email.mime.text import MIMEText
from dotenv import load_dotenv

# Load credentials
load_dotenv()

email_user = os.getenv("EMAIL_USER")
email_pass = os.getenv("EMAIL_PASSWORD")

print(f"Testing Login for: {email_user}")

try:
    # Connect to Gmail SMTP
    server = smtplib.SMTP('smtp.gmail.com', 587)
    server.starttls()
    
    # Attempt Login
    server.login(email_user, email_pass)
    print("✅ LOGIN SUCCESS! Your email credentials are fast and correct.")
    
    server.quit()
except smtplib.SMTPAuthenticationError:
    print("❌ LOGIN FAILED: Authentication Error.")
    print("Reason: Google did not accept your password.")
    print("Tip: If you have 2-Step Verification on, you MUST use an 'App Password', not your normal password.")
except Exception as e:
    print(f"❌ LOGIN FAILED: {e}")
