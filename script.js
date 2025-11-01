document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile menu ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    if(mobileMenuButton) {
        mobileMenuButton.addEventListener('click', ()=> mobileMenu.classList.toggle('hidden'));
    }

    // --- Smooth scroll ---
    document.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if(href && href.length > 1){ 
            e.preventDefault(); 
            const el = document.querySelector(href); 
            if(el) el.scrollIntoView({ behavior: 'smooth' }); 
            if(mobileMenu) mobileMenu.classList.add('hidden'); // Close mobile menu on click
        }
    }));

    // --- Contact Form Submission ---
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
      contactForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // Stop the default form submission
        const btn = contactForm.querySelector('button[type="submit"]');
        btn.disabled = true;
        btn.textContent = 'Sending...';

        // Get data from the form
        const data = {
          name: document.getElementById('name').value,
          email: document.getElementById('email').value,
          message: document.getElementById('message').value
        };

        try {
          // Send data to YOUR server's /api/contact endpoint
          const res = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
          });

          const resData = await res.json();

          if (res.ok) {
            formStatus.innerHTML = `<p class="text-green-400">✅ Message sent successfully!</p>`;
            contactForm.reset();
          } else {
            formStatus.innerHTML = `<p class="text-yellow-300">⚠️ Submission failed: ${resData.error}</p>`;
          }
        } catch (err) {
          formStatus.innerHTML = `<p class="text-red-400">❌ Network error. Please try again later.</p>`;
        }

        btn.disabled = false;
        btn.textContent = 'Send Message';
        setTimeout(() => (formStatus.innerHTML = ''), 5000);
      });
    }

    // Note: Your admin.html expects /api/projects, which does not exist
    // in your server.js. That will be the next step.
});