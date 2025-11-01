  // Import Firebase SDK modules
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-app.js";
  import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-firestore.js";
  import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-storage.js";

  // 🔧 Your Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBLJYTMWWttvj5-V4az206x4fpR4nFVByo",
    authDomain: "web-contact-60e10.firebaseapp.com",
    projectId: "web-contact-60e10",
    storageBucket: "web-contact-60e10.appspot.com",
    messagingSenderId: "800325439609",
    appId: "1:800325439609:web:4cb3d554123b0b88ef04a8"
  };

  // 🔥 Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const storage = getStorage(app);

  // 📩 Handle contact form submission
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    formStatus.innerHTML = '<p class="text-yellow-300">⏳ Uploading and sending message...</p>';

    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    const resumeFile = document.getElementById('resume').files[0];

    if (!resumeFile) {
      formStatus.innerHTML = '<p class="text-red-400">⚠️ Please upload a resume file.</p>';
      return;
    }

    try {
      // 🗂️ Upload resume to Firebase Storage
      const storageRef = ref(storage, 'resumes/' + Date.now() + '_' + resumeFile.name);
      await uploadBytes(storageRef, resumeFile);
      const resumeURL = await getDownloadURL(storageRef);

      // 🧾 Save form data + resume link in Firestore
      await addDoc(collection(db, 'messages'), {
        name,
        phone,
        email,
        message,
        resumeURL,
        timestamp: new Date()
      });

      formStatus.innerHTML = '<p class="text-green-400">✅ Message & resume uploaded successfully!</p>';
      contactForm.reset();
    } catch (error) {
      console.error('❌ Upload error:', error);
      formStatus.innerHTML = '<p class="text-red-400">❌ Failed to send message. Please try again later.</p>';
    }

    setTimeout(() => (formStatus.innerHTML = ''), 6000);
  });