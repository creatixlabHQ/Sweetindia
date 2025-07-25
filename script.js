document.addEventListener('DOMContentLoaded', function() {

    // --- स्मूथ स्क्रॉलिंग ---
    const navLinks = document.querySelectorAll('nav a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // डिफ़ॉल्ट व्यवहार को रोकें

            let targetId = this.getAttribute('href');
            let targetElement = document.querySelector(targetId);

            if (targetElement) {
                // हेडर की ऊंचाई प्राप्त करें ताकि स्क्रॉलिंग सही जगह पर रुके
                const headerOffset = document.querySelector('header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // --- संपर्क फ़ॉर्म सबमिशन ---
    const contactForm = document.querySelector('.contact-form form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // डिफ़ॉल्ट फ़ॉर्म सबमिशन को रोकें

            // फ़ॉर्म डेटा प्राप्त करें (आप इसे सर्वर पर भेज सकते हैं)
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // उपयोगकर्ता के लिए एक संदेश प्रदर्शित करें
            alert(`धन्यवाद, ${name}! आपका संदेश सफलतापूर्वक भेज दिया गया है।`);

            // फ़ॉर्म को रीसेट करें
            contactForm.reset();
        });
    }

});
