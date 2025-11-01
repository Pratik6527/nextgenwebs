// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-firestore.js";

// ✅ Your Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyBLJYTMWWttvj5-V4az206x4fpR4nFVByo",
  authDomain: "web-contact-60e10.firebaseapp.com",
  projectId: "web-contact-60e10",
  storageBucket: "web-contact-60e10.appspot.com",
  messagingSenderId: "800325439609",
  appId: "1:800325439609:web:4cb3d554123b0b88ef04a8",
};

// 🚀 Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 🎯 Handle Form Submission
const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // stop refresh ✅

    status.innerHTML = '<p class="text-yellow-300">⏳ Sending your message...</p>';

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !phone || !email || !message) {
      status.innerHTML = '<p class="text-red-400">⚠️ Please fill in all fields.</p>';
      return;
    }

    try {
      await addDoc(collection(db, "messages"), {
        name,
        phone,
        email,
        message,
        timestamp: new Date(),
      });

      status.innerHTML = '<p class="text-green-400">✅ Message sent successfully!</p>';
      form.reset();

      setTimeout(() => {
        status.innerHTML = "";
      }, 5000);
    } catch (error) {
      console.error("❌ Firebase Error:", error);
      status.innerHTML = '<p class="text-red-400">❌ Failed to send. Please try again.</p>';
    }
  });
} else {
  console.error("⚠️ Contact form not found in DOM");
}
