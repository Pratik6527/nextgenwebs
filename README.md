
# 🚀 Easy Portfolio - Antigravity Framework

A high-performance, AI-integrated portfolio website built with modern web technologies.

## ✨ Features
- **Dynamic AI Agent**: Chat with a virtual consultant powered by OpenAI.
- **Glassmorphism UI**: Premium design with tailwindcss and custom CSS.
- **Admin Panel**: Manage messages and train the AI knowledge base.
- **Performance**: Optimized assets and lazy loading for high Lighthouse scores.

## 🛠️ Tech Stack
- **Frontend**: HTML5, Vanilla JavaScript, TailwindCSS
- **Backend**: Python FastAPI
- **Database**: MongoDB (Atlas)
- **AI**: OpenAI GPT-3.5 Turbo

## 🚀 Getting Started

### Prerequisites
- Python 3.8+
- MongoDB Connection String
- OpenAI API Key

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/easy-portfolio.git
   cd easy-portfolio
   ```

2. Install Backend Dependencies:
   ```bash
   cd python-backend
   pip install -r requirements.txt
   ```

3. Configure Environment:
   Create a `.env` file in `python-backend/` with:
   ```env
   OPENAI_API_KEY=your_key_here
   MONGO_URI=your_mongo_uri
   ADMIN_PASSWORD=your_password
   EMAIL_USER=your_email
   EMAIL_PASSWORD=your_app_password
   ```

4. Run the Backend:
   ```bash
   python main.py
   ```
   Server runs on `http://localhost:8000`.

5. Run the Frontend:
   Open `index.html` via Live Server or Python HTTP server:
   ```bash
   # From root directory
   python -m http.server 5500
   ```

## 📂 Project Structure
- `assets/`: Images and static resources.
- `python-backend/`: API logic and database connection.
- `index.html`: Main landing page.
- `main.js`: Frontend logic and API integration.

## 🤝 Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
