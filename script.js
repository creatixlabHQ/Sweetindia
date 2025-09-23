// Cart array (load from localStorage on page load)
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to add item to cart
function addToCart(id, name, price) {
  id = Number(id); // Ensure id is a number for consistency
  price = Number(price);
  const existingItem = cart.find(item => item.id === id);
  if (existingItem) {
    existingItem.quantity += 1; // Increment if already in cart
  } else {
    cart.push({ id, name, price, quantity: 1 }); // Add new item
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartDisplay(); // Update cart UI
  alert(`${name} added to cart!`);
}

// Function to update cart display (e.g., in a cart modal or page)
function updateCartDisplay() {
  const cartItems = document.getElementById('cart-items'); // e.g., <ul id="cart-items">
  const cartTotal = document.getElementById('cart-total'); // e.g., <span id="cart-total"></span>
  const cartCount = document.querySelector('.cart-count'); // Update navbar cart icon count

  if (cartItems) {
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
      const li = document.createElement('li');
      li.innerHTML = `
        ${item.name} - ₹${item.price} x ${item.quantity}
        <button onclick="updateQuantity(${item.id}, -1)">-</button>
        <button onclick="updateQuantity(${item.id}, 1)">+</button>
        <button onclick="removeFromCart(${item.id})">Remove</button>
        <span>Subtotal: ₹${item.price * item.quantity}</span>
      `;
      cartItems.appendChild(li);
      total += item.price * item.quantity;
    });

    if (cartTotal) {
      cartTotal.innerHTML = `Total: ₹${total}`;
    }
  }

  // Update cart count in navbar icon
  if (cartCount) {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = count;
  }
}

// Function to update quantity
function updateQuantity(id, change) {
  id = Number(id);
  const item = cart.find(item => item.id === id);
  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) {
      removeFromCart(id);
      return;
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
  }
}

// Function to remove item
function removeFromCart(id) {
  id = Number(id);
  cart = cart.filter(item => item.id !== id);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartDisplay();
}

// Function to clear the cart
function clearCart() {
  cart = [];
  localStorage.removeItem('cart');
  updateCartDisplay();
}

// Load cart on page load
document.addEventListener('DOMContentLoaded', function () {
  updateCartDisplay();

  // --- Other unrelated page JS from your previous code ---

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

  // Form Submission
  const bookingForm = document.getElementById('booking-form');
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      // ❌ preventDefault hata diya hai taki FormSubmit email bhej sake

      // Get form values
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const phone = document.getElementById('phone').value;
      const guests = document.getElementById('guests').value;
      const date = document.getElementById('date').value;
      const time = document.getElementById('time').value;
      const specialRequests = document.getElementById('special-requests').value;

      // Show confirmation alert
      alert(`Thank you ${name}! Your table for ${guests} on ${date} at ${time} has been booked. We'll send confirmation details to ${email}.`);

      // ✅ Ab form normal submit hoga (FormSubmit ke through email aayega)
      // reset() ki zarurat nahi hai kyunki redirect/thank you page handle karega
    });
  }

  // Change: Use the global addToCart for menu items (remove old event code)
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
      const menuItem = button.closest('.menu-card');
      // You must set data-id, data-name, data-price on the .menu-card for this to work
      const id = menuItem.getAttribute('data-id') || Date.now(); // fallback to timestamp if missing
      const name = menuItem.querySelector('h3').textContent.trim();
      const priceText = menuItem.querySelector('span').textContent.replace(/[^\d]/g, '');
      const price = Number(priceText) || 0;
      addToCart(id, name, price);
    });
  });
});
