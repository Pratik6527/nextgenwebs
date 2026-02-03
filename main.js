/* main.js */

// --------- 1. DEFINE YOUR BACKEND URL ---------
const MY_BACKEND_API_ROOT = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
  ? "http://localhost:8000"
  : ""; // On Vercel, use relative paths



// --------- 2. PROJECT DATA (6 Premium Projects) ---------
// --------- 2. PROJECT DATA (Enhanced) ---------
const sampleProjects = [
  {
    title: "Neon Shop",
    description: "Modern headless e-commerce with Stripe integration and cart logic. Features a custom checkout flow and real-time inventory management.",
    tags: ["Next.js", "Stripe", "Web"],
    image: "https://images.unsplash.com/photo-1555529733-0e670560f7e1?auto=format&fit=crop&q=80&w=800",
    category: "Web"
  },
  {
    title: "Cyber Analytics",
    description: "Real-time data dashboard with dark mode and glassmorphism. Visualizes complex datasets using D3.js and Recharts.",
    tags: ["React", "D3.js", "Web"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
    category: "Web"
  },
  {
    title: "AI SaaS Platform",
    description: "Generative AI text processing tool. Allows users to generate marketing copy and blog posts in seconds.",
    tags: ["Node", "OpenAI", "AI"],
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=800",
    category: "AI"
  },
  {
    title: "Enterprise ERP",
    description: "Multi-tenant SaaS dashboard with role-based access control. Designed for scalability and security.",
    tags: ["React", "Tailwind", "Web"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    category: "Web"
  },
  {
    title: "Finance Tracker",
    description: "Smarter budgeting with predictive AI models. Categorizes expenses automatically and forecasts future spending.",
    tags: ["Mobile", "Gemini", "AI"],
    image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&q=80&w=800",
    category: "Mobile"
  },
  {
    title: "3D Configurator",
    description: "WebGL based real-time customization engine for automotive and fashion brands. Built with React Three Fiber.",
    tags: ["Three.js", "Web", "Design"],
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=800",
    category: "Web"
  },
  {
    title: "HealthConnect App",
    description: "Telemedicine platform connecting patients with doctors. Features video calling and prescription management.",
    tags: ["React Native", "Firebase", "Mobile"],
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800",
    category: "Mobile"
  },
  {
    title: "Neural Art Gen",
    description: "AI-powered image generation tool using Stable Diffusion. Create unique artwork from text prompts.",
    tags: ["Python", "PyTorch", "AI"],
    image: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?auto=format&fit=crop&q=80&w=800",
    category: "AI"
  }
];

// --------- TESTIMONIALS DATA (12+ Reviews) ---------
const testimonials = [
  { name: "Sarah Jenkins", role: "CTO, FinTech Startups", text: "Pratik transformed our outdated site into a high-converting PWA. The AI integration saves us 10+ hours a week.", stars: 5, img: "https://randomuser.me/api/portraits/women/44.jpg" },
  { name: "David Chen", role: "Founder, DataFlow", text: "We needed a complex 3D dashboard. Pratik delivered a solution that was visually stunning and performant.", stars: 5, img: "https://randomuser.me/api/portraits/men/32.jpg" },
  { name: "Emily Davis", role: "VP Marketing, SASSy", text: "The most professional developer I've worked with. The dark mode implementation is flawless.", stars: 5, img: "https://randomuser.me/api/portraits/women/68.jpg" },
  { name: "Michael Ross", role: "CEO, Ross Tech", text: "Incredible attention to detail. The animations feel so organic and premium.", stars: 5, img: "https://randomuser.me/api/portraits/men/45.jpg" },
  { name: "Jessica Wong", role: "Product Manager", text: "He understood our vision immediately. The turn around time was faster than expected.", stars: 5, img: "https://randomuser.me/api/portraits/women/33.jpg" },
  { name: "Robert Fox", role: "Director, Creative Inc", text: "A true artist of code. The glassmorphism effects are top-tier.", stars: 5, img: "https://randomuser.me/api/portraits/men/22.jpg" },
  { name: "Amanda Lo", role: "Startup Founder", text: "Our user engagement went up 200% after the redesign. Highly recommended!", stars: 5, img: "https://randomuser.me/api/portraits/women/12.jpg" },
  { name: "Thomas King", role: "Tech Lead, Google", text: "Clean code, scalable architecture. Pratik knows his stuff.", stars: 5, img: "https://randomuser.me/api/portraits/men/11.jpg" },
  { name: "Sophie Moore", role: "Designer", text: "Finally a developer who cares about pixel perfection. A joy to collaborate with.", stars: 5, img: "https://randomuser.me/api/portraits/women/90.jpg" },
  { name: "James Lee", role: "Investor", text: "I refer all my portfolio companies to Pratik. He delivers results.", stars: 5, img: "https://randomuser.me/api/portraits/men/85.jpg" },
  { name: "Linda Scott", role: "Ops Manager", text: "The admin dashboard he built saved us so much manual work. worth every penny.", stars: 5, img: "https://randomuser.me/api/portraits/women/29.jpg" },
  { name: "Daniel Green", role: "Mobile Dev", text: "Seamless integration between the web and mobile apps. Great API design.", stars: 5, img: "https://randomuser.me/api/portraits/men/67.jpg" }
];

function renderProjectsGrid(filter = "all") {
  const grid = document.getElementById("projects-grid");
  const preview = document.getElementById("projects-preview");

  const filtered = filter === "all"
    ? sampleProjects
    : sampleProjects.filter(p => p.category === filter || p.tags.includes(filter));

  const generateCard = (p, i) => `
    <div class="glassmorphism spotlight-card rounded-xl overflow-hidden group reveal delay-${(i % 3 + 1) * 100}">
      <div class="h-48 overflow-hidden relative">
        <img src="${p.image}" alt="${p.title}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
        <div class="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60"></div>
        <div class="absolute top-2 right-2 bg-slate-900/80 backdrop-blur px-2 py-1 rounded text-xs font-mono text-white border border-white/10">
          ${p.category || 'Project'}
        </div>
      </div>
      <div class="p-5 relative z-10">
        <h3 class="font-bold text-xl text-white font-heading group-hover:text-sky-400 transition-colors">${p.title}</h3>
        <p class="text-sm mt-3 text-slate-300 leading-relaxed">${p.description}</p>
        <div class="mt-4 flex flex-wrap gap-2">
          ${(p.tags || []).map(t => `<span class="text-xs px-2 py-1 bg-slate-800/80 border border-slate-700/50 rounded-md text-sky-300 shadow-sm">${t}</span>`).join('')}
        </div>
      </div>
    </div>
  `;

  if (grid) {
    grid.innerHTML = filtered.map(generateCard).join("");
    initSpotlight(); // Re-init spotlight for new elements
  }
  if (preview) {
    preview.innerHTML = sampleProjects.slice(0, 3).map(generateCard).join("");
    // Note: preview is static usually, so no sophisticated filter needed there
  }

  // Render Testimonials if container exists
  if (document.getElementById("testimonials-track")) {
    renderTestimonials();
  }
}

// Spotlight Effect Logic
function initSpotlight() {
  const cards = document.querySelectorAll('.spotlight-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--x', `${x}px`);
      card.style.setProperty('--y', `${y}px`);
    });
  });
}

// Run spotlight on global load
document.addEventListener('DOMContentLoaded', initSpotlight);

function renderTestimonials() {
  const container = document.getElementById("testimonials-track");
  if (!container) return;

  // Render original list + duplicate for infinite scroll
  const loopData = [...testimonials, ...testimonials];

  container.innerHTML = loopData.map(t => `
    <div class="inline-block w-[350px] p-6 mx-4 glassmorphism rounded-xl border border-white/5 relative whitespace-normal align-top hover:bg-white/5 transition-colors duration-300">
       <div class="flex items-center gap-1 mb-3 text-yellow-500 text-sm drop-shadow-md">
         ${"★".repeat(t.stars)}
       </div>
       <p class="text-slate-300 text-sm italic mb-4 line-clamp-3 leading-relaxed">"${t.text}"</p>
       <div class="flex items-center gap-3">
         <img src="${t.img}" class="h-10 w-10 rounded-full border-2 border-sky-500/30 object-cover" alt="${t.name}">
         <div>
           <h4 class="text-white font-bold text-sm bg-clip-text text-transparent bg-gradient-to-r from-sky-300 to-indigo-300">${t.name}</h4>
           <div class="text-xs text-sky-400 font-mono tracking-tight">${t.role}</div>
         </div>
       </div>
    </div>
  `).join("");
}

// Run it on page load
renderProjectsGrid();

// Filter Event Listeners
const filterBtns = document.querySelectorAll('.filter-btn');
if (filterBtns.length > 0) {
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all
      filterBtns.forEach(b => {
        b.classList.remove('bg-sky-500/20', 'text-sky-300', 'border-sky-500/50');
        b.classList.add('bg-slate-800', 'text-slate-400', 'border-slate-700');
      });
      // Add active class to clicked
      btn.classList.remove('bg-slate-800', 'text-slate-400', 'border-slate-700');
      btn.classList.add('bg-sky-500/20', 'text-sky-300', 'border-sky-500/50');

      renderProjectsGrid(btn.dataset.filter);
    });
  });
}

// --------- 8. GLOBAL FLOATING WRAPPER (AI + WHATSAPP) ---------
function injectFloatingButtons() {
  // 1. WhatsApp Button (Stacked above)
  if (!document.querySelector('.floating-whatsapp-btn')) {
    const wa = document.createElement('a');
    // REPLACE '919876543210' with your actual number
    wa.href = 'https://wa.me/917047448557?text=Hi%20Pratik,%20I%20saw%20your%20portfolio!';
    wa.target = '_blank';
    wa.className = 'floating-whatsapp-btn';
    wa.title = 'Chat on WhatsApp';
    wa.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
        <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
      </svg>`;
    document.body.appendChild(wa);
  }

  // 2. AI Button (Bottom)
  if (!document.querySelector('.floating-ai-btn')) {
    const btn = document.createElement('a');
    btn.href = 'ai.html';
    btn.className = 'floating-ai-btn';
    btn.innerHTML = `<span>🤖 Ask AI Agent</span>`;
    document.body.appendChild(btn);
  }
}
document.addEventListener('DOMContentLoaded', injectFloatingButtons);

// --------- 10. SCROLL REVEAL ANIMATION ---------
function initScrollReveal() {
  const reveals = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target); // Reveal only once
      }
    });
  }, {
    threshold: 0.1, // Trigger when 10% visible
    rootMargin: "0px 0px -50px 0px"
  });

  reveals.forEach((el) => observer.observe(el));
}
document.addEventListener('DOMContentLoaded', initScrollReveal);


// --------- 11. DYNAMIC SLOT SCHEDULER ---------
function initScheduler() {
  const daySelect = document.getElementById("slot-day");
  const timeSelect = document.getElementById("slot-time");

  if (!daySelect || !timeSelect) return;

  // Toggle Visibility
  const toggle = document.getElementById("book-slot-check");
  const container = document.getElementById("slot-selector-container");
  if (toggle && container) {
    toggle.addEventListener("change", (e) => {
      if (e.target.checked) {
        container.classList.remove("hidden");
        container.classList.add("fade-in"); // Add simple animation class if defined, or just block
      } else {
        container.classList.add("hidden");
        daySelect.value = ""; // Reset
        timeSelect.value = "";
      }
    });
  }

  // 1. Generate Next 7 Weekdays (Mon-Fri)
  const days = [];
  let d = new Date();
  while (days.length < 5) {
    d.setDate(d.getDate() + 1); // Start from tomorrow
    if (d.getDay() !== 0 && d.getDay() !== 6) { // Skip Sun(0) & Sat(6)
      days.push(new Date(d));
    }
  }

  days.forEach(date => {
    const opt = document.createElement("option");
    // Format: "Mon, Oct 25"
    opt.value = date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    opt.textContent = opt.value;
    daySelect.appendChild(opt);
  });

  // 2. Generate Time Slots (10:00 AM to 6:00 PM) - 30 min intervals
  // 10:00, 10:30, 11:00 ... 17:30 (5:30 PM is last slot for 30 min call ending at 6)
  const slots = [];
  for (let hour = 10; hour < 18; hour++) {
    slots.push(formatTime(hour, 0));
    slots.push(formatTime(hour, 30));
  }

  function formatTime(h, m) {
    const ampm = h >= 12 ? 'PM' : 'AM';
    const fh = h > 12 ? h - 12 : h;
    const fm = m === 0 ? '00' : '30';
    return `${fh}:${fm} ${ampm}`;
  }

  // 3. Enable Time on Day Select
  daySelect.addEventListener("change", () => {
    timeSelect.innerHTML = '<option value="" disabled selected>Select Time</option>';
    timeSelect.disabled = false;
    slots.forEach(t => {
      const opt = document.createElement("option");
      opt.value = t;
      opt.textContent = t;
      timeSelect.appendChild(opt);
    });
  });
}
document.addEventListener('DOMContentLoaded', initScheduler);

// --------- 3. CONTACT FORM (FOR CONTACT PAGE) ---------
const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    formStatus.innerHTML = '<span class="text-yellow-300">Sending...</span>';

    const name = (document.getElementById("name") || {}).value;
    const email = (document.getElementById("email") || {}).value;
    const phone = (document.getElementById("phone") || {}).value;
    const message = (document.getElementById("message") || {}).value;

    // Capture Slot
    const sDay = (document.getElementById("slot-day") || {}).value;
    const sTime = (document.getElementById("slot-time") || {}).value;
    const slot = (sDay && sTime) ? `${sDay} @ ${sTime}` : "No preference";

    if (!name || !email || !message) {
      formStatus.innerHTML = '<span class="text-red-400">Please fill required fields</span>';
      return;
    }

    try {
      // Send data to our backend
      const response = await fetch(`${MY_BACKEND_API_ROOT}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, phone, message, slot })
      });

      if (!response.ok) {
        throw new Error('Server responded with an error');
      }

      formStatus.innerHTML = '<span class="text-emerald-400 font-bold">🚀 Collaboration Launched! Details secured in database.</span>';
      contactForm.reset();
      setTimeout(() => formStatus.textContent = '', 4000);

    } catch (err) {
      console.error(err);
      formStatus.innerHTML = '<span class="text-red-400">Error sending message</span>';
    }
  });
}


// --------- 4. ADMIN PANEL (FOR ADMIN PAGE) ---------
const adminLoginBtn = document.getElementById("admin-login");
const adminLogoutBtn = document.getElementById("admin-logout");
const messagesList = document.getElementById("messages-list");
const adminPanel = document.getElementById("admin-panel");
const loginForm = document.getElementById("login-form");

// This function just renders the HTML for the messages
function renderAdminMessages(messages) {
  if (!messagesList) return;
  messagesList.innerHTML = messages.map(m => `
        <div class="p-4 bg-slate-800/50 rounded-lg border border-slate-700 hover:border-sky-500/30 transition-colors">
          <div class="flex justify-between items-start mb-2">
            <div>
              <div class="font-bold text-white text-lg">${m.name}</div>
              <div class="text-sm text-sky-400 font-mono">${m.email}</div>
            </div>
            <div class="text-right">
              <div class="text-xs text-slate-400">Phone: ${m.phone || 'N/A'}</div>
              <div class="text-xs text-yellow-500 font-bold mt-1">${m.slot ? '📅 ' + m.slot : ''}</div>
              <div class="text-xs text-slate-500 mt-1">${new Date(m.createdAt).toLocaleString()}</div>
            </div>
          </div>
          <p class="mt-3 text-slate-300 text-sm leading-relaxed border-t border-slate-700/50 pt-3">${m.message}</p>
          
          <!-- ADMIN ACTIONS -->
          <div class="mt-4 flex gap-3 text-xs border-t border-slate-700/50 pt-3">
             <a href="mailto:${m.email}" class="text-sky-400 hover:text-white flex items-center gap-1">
               ✉️ Reply
             </a>
             ${m.meeting_link ? `
               <a href="${m.meeting_link}" target="_blank" class="text-emerald-400 hover:text-white flex items-center gap-1 font-bold">
                 📹 Join Meeting
               </a>
             ` : ''}
              ${m.phone ? `
               <a href="https://wa.me/${m.phone.replace(/[^0-9]/g, '')}" target="_blank" class="text-green-500 hover:text-white flex items-center gap-1">
                 💬 WhatsApp
               </a>
             ` : ''}
          </div>
        </div>
      `).join("");
}

// Handle Admin Login
if (adminLoginBtn) {
  adminLoginBtn.addEventListener("click", async () => {
    const pass = document.getElementById("admin-pass").value;

    try {
      // Use the *full* URL to your backend
      const res = await fetch(`${MY_BACKEND_API_ROOT}/api/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: pass })
      });

      if (res.status === 401) {
        alert("Login failed: Incorrect password.");
        return;
      }
      if (!res.ok) {
        throw new Error('Server error');
      }

      const messages = await res.json();

      // Success! Render messages and show the panel
      renderAdminMessages(messages);
      if (adminPanel) adminPanel.classList.remove("hidden");
      if (loginForm) loginForm.classList.add("hidden");
      if (adminLogoutBtn) adminLogoutBtn.classList.remove("hidden");

    } catch (err) {
      alert("Login failed: " + err.message);
    }
  });
}

// Handle Admin Logout (simple hide/show)
if (adminLogoutBtn) {
  adminLogoutBtn.addEventListener("click", () => {
    if (adminPanel) adminPanel.classList.add("hidden");
    if (loginForm) loginForm.classList.remove("hidden");
    if (adminLogoutBtn) adminLogoutBtn.classList.add("hidden");
    document.getElementById("admin-pass").value = ""; // Clear password field
  });
}

// --------- 6. AI TRAINING (ADMIN ONLY) ---------
const trainBtn = document.getElementById("train-btn");
if (trainBtn) {
  trainBtn.addEventListener("click", async () => {
    const fact = document.getElementById("train-input").value.trim();
    const pass = document.getElementById("admin-pass").value; // Reuse login pass for simplicity

    if (!fact) return alert("Please enter a fact to teach the AI.");

    try {
      const res = await fetch(`${MY_BACKEND_API_ROOT}/api/train`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fact, password: pass })
      });

      const data = await res.json();
      if (data.success) {
        alert("Success! " + data.message);
        document.getElementById("train-input").value = ""; // Clear input
        loadKnowledgeBase(pass); // Refresh list
      } else {
        alert("Error: " + data.detail);
      }
    } catch (err) {
      alert("Training failed: " + err.message);
    }
  });
}

async function loadKnowledgeBase(password) {
  const listParams = new URLSearchParams({ password });
  try {
    const res = await fetch(`${MY_BACKEND_API_ROOT}/api/knowledge?${listParams}`);
    if (res.ok) {
      const facts = await res.json();
      const container = document.getElementById("knowledge-list");
      if (container) {
        container.innerHTML = facts.map((f, i) => `
          <div class="p-3 bg-slate-800/50 rounded mb-2 border border-slate-700 flex justify-between">
             <span class="text-sm text-slate-300">"${f}"</span>
             <span class="text-xs text-sky-500 font-mono">#${i + 1}</span>
          </div>
        `).join("");
      }
    }
  } catch (e) {
    console.error("Failed to load knowledge", e);
  }
}

// Hook loadKnowledgeBase into the login success flow
const originalRender = renderAdminMessages;
renderAdminMessages = function (messages) {
  originalRender(messages);
  // Also load training data if we are logged in
  const pass = document.getElementById("admin-pass").value;
  loadKnowledgeBase(pass);
}


// --------- 5. AI TOOLS (FOR AI PAGE) ---------

// Use the *same* backend root as your contact form
const AI_BACKEND_URL = `${MY_BACKEND_API_ROOT}/api/ai`;

// Function to call the AI backend
async function aiChat(prompt) {
  try {
    const res = await fetch(AI_BACKEND_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt })
    });
    if (!res.ok) {
      throw new Error('AI server error');
    }
    return res.json();
  } catch (err) {
    console.error(err);
    return { error: "Failed to connect to the AI. " + err.message };
  }
}

// AI Chat Assistant
const chatSend = document.getElementById("chat-send");
if (chatSend) {
  const chatLog = document.getElementById("chat-log");
  const chatInput = document.getElementById("chat-input");

  // Auto-focus input
  chatInput.focus();

  chatSend.addEventListener("click", async () => {
    const text = chatInput.value.trim();
    if (!text) return;

    // 1. User Message
    chatLog.innerHTML += `
      <div class="text-right mb-4">
        <div class="inline-block p-3 rounded-lg chat-bubble-user text-white max-w-[80%] shadow-lg">
          ${text}
        </div>
      </div>
    `;
    chatInput.value = "";
    chatLog.scrollTop = chatLog.scrollHeight; // Auto-scroll

    // 2. Loading State (Pulse)
    const loadingId = "loading-" + Date.now();
    chatLog.innerHTML += `
      <div id="${loadingId}" class="mb-4">
        <div class="inline-block p-3 rounded-lg bg-slate-800/50 text-sky-400 text-xs font-mono animate-pulse border border-sky-500/20">
          ⚡ Neural Engine Processing...
        </div>
      </div>
    `;
    chatLog.scrollTop = chatLog.scrollHeight;

    // 3. Call AI
    const response = await aiChat(text);

    // Remove loading
    const loader = document.getElementById(loadingId);
    if (loader) loader.remove();

    // 4. AI Response
    if (response.error) {
      chatLog.innerHTML += `
        <div class="mb-4">
          <div class="inline-block p-3 rounded-lg bg-red-900/40 border border-red-500/50 text-red-200 max-w-[80%]">
            ⚠️ ${response.error}
          </div>
        </div>`;
    } else {
      // Convert markdown-style **bold** to HTML
      let formattedText = response.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

      chatLog.innerHTML += `
        <div class="mb-4">
          <div class="inline-block p-4 rounded-lg chat-bubble-ai text-slate-200 max-w-[85%] shadow-xl backdrop-blur-sm">
            ${formattedText}
          </div>
        </div>`;
    }
    chatLog.scrollTop = chatLog.scrollHeight;
  });

  // Allow "Enter" key to send
  chatInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") chatSend.click();
  });
}

// AI Quote Estimator
const quoteBtn = document.getElementById("quote-btn");
if (quoteBtn) {
  const quoteInput = document.getElementById("quote-input");
  const quoteOutput = document.getElementById("quote-output");

  quoteBtn.addEventListener("click", async () => {
    const projectDetails = quoteInput.value.trim();
    if (!projectDetails) return;

    // Loading State
    quoteOutput.innerHTML = `
      <div class="flex items-center gap-3 text-sky-400 p-4 bg-slate-900/50 rounded-lg border border-sky-500/20">
         <span class="animate-spin text-xl">⚡</span>
         <span class="font-mono text-sm">Analyzing Requirements & Calculating Costs...</span>
      </div>
    `;

    // Construct Prompt
    const prompt = `
      Act as a professional software agency project manager. 
      Estimate the cost and timeline for the following project requirements:
      "${projectDetails}"
      
      Provide a breakdown of:
      1. Design & Discovery
      2. Development Phase
      3. Testing & Deployment
      4. Total Estimated Cost (in USD)
      5. Timeline (in weeks)
      
      Format the output in clean HTML with <ul> and <strong> tags for readability. Keep it concise.
    `;

    // Call AI
    const response = await aiChat(prompt);

    if (response.error) {
      quoteOutput.innerHTML = `<div class="text-red-400 p-4 bg-red-900/20 rounded border border-red-500/30">⚠️ ${response.error}</div>`;
    } else {
      // Remove generic bolding if AI adds it weirdly, relying on standard HTML
      quoteOutput.innerHTML = `
        <div class="p-6 bg-slate-800/40 rounded-xl border border-white/10 shadow-inner">
           <h4 class="text-xl font-bold text-white mb-4 border-b border-slate-700 pb-2">🚀 Project Estimate</h4>
           <div class="text-slate-300 space-y-2 text-sm leading-relaxed">
             ${response.text.replace(/\n/g, '<br>')}
           </div>
           <div class="mt-6 pt-4 border-t border-slate-700 text-center">
             <a href="contact.html" class="btn-primary text-sm">Book a Consultation</a>
           </div>
        </div>
      `;
    }
  });
}


// --------- 9. POWER MODE: ANIMATED COUNTERS ---------
function animateCounters() {
  const stats = document.querySelectorAll('.stat-number');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const value = parseInt(target.innerText.replace(/\D/g, '')); // Extract number
        const suffix = target.innerText.replace(/\d/g, ''); // Extract suffix (+, %)

        let count = 0;
        const duration = 2000; // 2 seconds
        const increment = Math.ceil(value / (duration / 20)); // Update every 20ms

        const timer = setInterval(() => {
          count += increment;
          if (count >= value) {
            target.innerText = value + suffix;
            clearInterval(timer);
          } else {
            target.innerText = count + suffix;
          }
        }, 20);

        observer.unobserve(target); // Only animate once
      }
    });
  }, { threshold: 0.5 });

  stats.forEach(stat => observer.observe(stat));
}
document.addEventListener('DOMContentLoaded', animateCounters);

// --------- 12. MOBILE MENU LOGIC ---------
function initMobileMenu() {
  const mobileBtn = document.getElementById("mobile-toggle");
  const mobileMenu = document.getElementById("mobile-menu");

  if (mobileBtn && mobileMenu) {
    // Remove old listeners to be safe (though not strictly necessary on page load)
    const newBtn = mobileBtn.cloneNode(true);
    mobileBtn.parentNode.replaceChild(newBtn, mobileBtn);

    newBtn.addEventListener("click", (e) => {
      e.stopPropagation(); // Prevent document click from immediately closing it
      mobileMenu.classList.toggle("hidden");
    });

    // Close menu when clicking any link inside it
    mobileMenu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
      });
    });

    // Close when clicking outside
    document.addEventListener("click", (e) => {
      if (!mobileMenu.contains(e.target) && !newBtn.contains(e.target)) {
        mobileMenu.classList.add("hidden");
      }
    });
  }
}

// Run immediately if ready, or wait
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initMobileMenu);
} else {
  initMobileMenu();
}
