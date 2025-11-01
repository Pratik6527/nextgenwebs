

  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-app.js";
  import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-database.js";

  const firebaseConfig = {
    apiKey: "AIzaSyBLJYTMWWttvj5-V4az206x4fpR4nFVByo",
    authDomain: "web-contact-60e10.firebaseapp.com",
    databaseURL: "https://web-contact-60e10-default-rtdb.firebaseio.com",
    projectId: "web-contact-60e10",
    storageBucket: "web-contact-60e10.appspot.com",
    messagingSenderId: "800325439609",
    appId: "1:800325439609:web:4cb3d554123b0b88ef04a8"
  };

  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);

  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    formStatus.innerHTML = '<p class="text-yellow-300">⏳ Sending message...</p>';

    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    try {
      const messagesRef = ref(db, 'messages');
      await set(push(messagesRef), {
        name,
        phone,
        email,
        message,
        timestamp: new Date().toISOString()
      });

      formStatus.innerHTML = '<p class="text-green-400">✅ Message sent successfully!</p>';
      contactForm.reset();
    } catch (error) {
      console.error('Error:', error);
      formStatus.innerHTML = '<p class="text-red-400">❌ Network error. Please try again later.</p>';
    }

    setTimeout(() => (formStatus.innerHTML = ''), 5000);
  });

