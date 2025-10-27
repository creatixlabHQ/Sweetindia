document.addEventListener('DOMContentLoaded', function () {
  // Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenuClose = document.getElementById('mobile-menu-close');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.remove('hidden');
    });
  }
  if (mobileMenuClose && mobileMenu) {
    mobileMenuClose.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
    });
  }

  // Close mobile menu when clicking on links
  if (mobileMenu) {
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  // Navbar Scroll Effect
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (navbar) {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
  });

  // Scroll Reveal Animation
  const animateElements = document.querySelectorAll('.animate-on-scroll');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, { threshold: 0.1 });

  animateElements.forEach(element => {
    observer.observe(element);
  });

  // Menu Filtering
  const menuTabs = document.querySelectorAll('.menu-tab');
  const menuCards = document.querySelectorAll('.menu-card');

  menuTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active class from all tabs
      menuTabs.forEach(t => t.classList.remove('bg-yellow-500', 'text-white'));
      // Add active class to clicked tab
      tab.classList.add('bg-yellow-500', 'text-white');

      const category = tab.dataset.category;

      menuCards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
  // Set first tab as active by default
  if (menuTabs.length > 0) {
    menuTabs[0].classList.add('bg-yellow-500', 'text-white');
  }

  // Booking Form Submission (keeps default submit so FormSubmit works)
  const bookingForm = document.getElementById('booking-form');
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      // Do not prevent default — keep FormSubmit behaviour
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const phone = document.getElementById('phone').value;
      const guests = document.getElementById('guests').value;
      const date = document.getElementById('date').value;
      const time = document.getElementById('time').value;
      // Show a friendly message — form will then submit normally
      alert(`Thank you ${name}! Your table for ${guests} on ${date} at ${time} has been booked. We'll send confirmation details to ${email}.`);
    });
  }

  // Convert Add-to-Cart buttons into "Order Now" behavior (no cart usage)
  // Behavior: navigate to #reservation (on-page) or to a custom link if provided via data-order-link
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  addToCartButtons.forEach(button => {
    // Replace existing click behavior with a redirect to reservation or a provided link
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const menuItem = button.closest('.menu-card');
      // Optional: if author added a data-order-link attribute on button, use that
      const customLink = button.getAttribute('data-order-link') || (menuItem && menuItem.getAttribute('data-order-link'));
      if (customLink) {
        // open custom link in same tab
        window.location.href = customLink;
        return;
      }
      // Default: navigate to reservation section
      // If there's a dedicated reservation page, you can change '#reservation' to 'reservation.html' or a WhatsApp URL
      if (document.querySelector('#reservation')) {
        // smooth scroll if section exists
        document.querySelector('#reservation').scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        // fallback: go to reservation page or contact (change as needed)
        window.location.href = 'index.html#reservation';
      }
    });
  });

  // Optional small accessibility improvement: ensure keyboard users can "activate" menu-card links
  document.querySelectorAll('.menu-card a, .menu-card button').forEach(el => {
    el.setAttribute('tabindex', '0');
  });

  // Clean up: remove any visible cart UI elements if you prefer (uncomment to enable)
  // const cartUi = document.querySelector('.cart, #cart-count, .cart-count, a[href*="cart.html"], a[href*="checkout.html"]');
  // if (cartUi) cartUi.remove();
});
