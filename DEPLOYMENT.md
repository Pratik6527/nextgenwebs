
# 🚀 Deployment Guide

## 1. Push to GitHub
1.  Initialize git (if not already):
    ```bash
    git init
    git add .
    git commit -m "Initial commit - Ready for Vercel"
    ```
2.  Create a repository on GitHub.
3.  Push your code:
    ```bash
    git remote add origin https://github.com/Pratik6527/nextgenwebs
    git push -u origin main
    ```

## 2. Deploy to Vercel
1.  Go to [Vercel](https://vercel.com) and "Add New Project".
2.  Import your GitHub repository.
3.  **Build Settings**:
    - Framework Preset: `Other` (or leave default, Vercel detects Python).
    - Root Directory: `./`
4.  **Environment Variables** (CRITICAL):
    Add the following in the Vercel Dashboard (Settings > Environment Variables):
    
    | Key | Value |
    |-----|-------|
    | `OPENAI_API_KEY` | `sk-proj-...` (Your OpenAI Key) |
    | `MONGO_URI` | `mongodb+srv://...` (Your Connection String) |
    | `ADMIN_PASSWORD` | `#Atharva@8903` (Or your chosen password) |
    | `EMAIL_USER` | `pratikmondal527@gmail.com` |
    | `EMAIL_PASSWORD` | `...` (Your App Password) |

5.  Click **Deploy**.

## 3. Verify Deployment
- Visit your Vercel URL (e.g., `https://easy-portfolio.vercel.app`).
- Test the contact form (sends data to backend).
- Test the AI Chat (uses OpenAI).

## Troubleshooting
- **Database Connection**: If MongoDB fails on Vercel, ensure your Atlas Network Access allows `0.0.0.0/0` (Allow Access from Anywhere).
- **AI Quota**: If AI says "Quota Exceeded", check your OpenAI billing.
