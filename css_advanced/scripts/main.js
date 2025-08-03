/**
 * CSS Advanced Project - Main JavaScript File
 * Handles interactive functionality and animations
 */

// ===== UTILITY FUNCTIONS =====
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// Debounce function for performance optimization
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Throttle function for scroll events
const throttle = (func, limit) => {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// ===== DOM CONTENT LOADED =====
document.addEventListener('DOMContentLoaded', function() {
  initializeApp();
});

// ===== MAIN INITIALIZATION =====
function initializeApp() {
  initNavigation();
  initScrollAnimations();
  initSmoothScrolling();
  initFormHandling();
  initHeaderScroll();
  initLoadingAnimations();
  initAccessibility();
  
  console.log('CSS Advanced Project initialized successfully!');
}

// ===== NAVIGATION FUNCTIONALITY =====
function initNavigation() {
  const navToggle = $('.nav-toggle');
  const navMenu = $('.nav-menu');
  const navLinks = $$('.nav-link');
  
  if (!navToggle || !navMenu) return;
  
  // Mobile menu toggle
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    
    // Update ARIA attributes for accessibility
    const isExpanded = navMenu.classList.contains('active');
    navToggle.setAttribute('aria-expanded', isExpanded);
    navMenu.setAttribute('aria-hidden', !isExpanded);
  });
  
  // Close menu when clicking on nav links
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.style.overflow = '';
      
      navToggle.setAttribute('aria-expanded', 'false');
      navMenu.setAttribute('aria-hidden', 'true');
    });
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.style.overflow = '';
      
      navToggle.setAttribute('aria-expanded', 'false');
      navMenu.setAttribute('aria-hidden', 'true');
    }
  });
  
  // Handle escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.style.overflow = '';
      navToggle.focus();
      
      navToggle.setAttribute('aria-expanded', 'false');
      navMenu.setAttribute('aria-hidden', 'true');
    }
  });
}

// ===== HEADER SCROLL EFFECTS =====
function initHeaderScroll() {
  const header = $('.header');
  if (!header) return;
  
  const handleScroll = throttle(() => {
    const scrollY = window.scrollY;
    
    if (scrollY > 100) {
      header.classList.add('scrolled');
      header.style.background = 'rgba(255, 255, 255, 0.98)';
      header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
      header.classList.remove('scrolled');
      header.style.background = 'rgba(255, 255, 255, 0.95)';
      header.style.boxShadow = 'none';
    }
  }, 16);
  
  window.addEventListener('scroll', handleScroll);
}

// ===== SMOOTH SCROLLING =====
function initSmoothScrolling() {
  const links = $$('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      const targetId = link.getAttribute('href');
      const targetElement = $(targetId);
      
      if (targetElement) {
        const headerHeight = $('.header')?.offsetHeight || 80;
        const targetPosition = targetElement.offsetTop - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // Update URL without jumping
        history.pushState(null, null, targetId);
        
        // Focus management for accessibility
        targetElement.setAttribute('tabindex', '-1');
        targetElement.focus();
        targetElement.addEventListener('blur', () => {
          targetElement.removeAttribute('tabindex');
        }, { once: true });
      }
    });
  });
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
  const animatedElements = $$('.animate-on-scroll, .service-card, .about-content > *, .contact-content > *');
  
  // Add animate-on-scroll class to elements that should animate
  animatedElements.forEach(el => {
    if (!el.classList.contains('animate-on-scroll')) {
      el.classList.add('animate-on-scroll');
    }
  });
  
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        
        // Add staggered animation for service cards
        if (entry.target.classList.contains('service-card')) {
          const cards = $$('.service-card');
          const index = Array.from(cards).indexOf(entry.target);
          entry.target.style.animationDelay = `${index * 0.1}s`;
        }
      }
    });
  }, observerOptions);
  
  animatedElements.forEach(el => observer.observe(el));
}

// ===== LOADING ANIMATIONS =====
function initLoadingAnimations() {
  // Add loading class to body
  document.body.classList.add('loading');
  
  // Remove loading class after page load
  window.addEventListener('load', () => {
    setTimeout(() => {
      document.body.classList.remove('loading');
      document.body.classList.add('loaded');
    }, 100);
  });
  
  // Animate hero elements on load
  const heroElements = $$('.hero-title, .hero-description, .hero-actions, .hero-image');
  heroElements.forEach((el, index) => {
    el.style.animationDelay = `${index * 0.2}s`;
  });
}

// ===== FORM HANDLING =====
function initFormHandling() {
  const contactForm = $('.contact-form');
  if (!contactForm) return;
  
  contactForm.addEventListener('submit', handleFormSubmit);
  
  // Real-time validation
  const inputs = contactForm.querySelectorAll('input, textarea');
  inputs.forEach(input => {
    input.addEventListener('blur', validateField);
    input.addEventListener('input', debounce(validateField, 300));
  });
}

function handleFormSubmit(e) {
  e.preventDefault();
  
  const form = e.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  
  // Validate all fields
  const isValid = validateForm(form);
  
  if (!isValid) {
    showNotification('Please fill in all required fields correctly.', 'error');
    return;
  }
  
  // Show loading state
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  submitBtn.textContent = 'Sending...';
  submitBtn.disabled = true;
  
  // Simulate form submission (replace with actual API call)
  setTimeout(() => {
    console.log('Form submitted:', data);
    showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');
    form.reset();
    
    // Reset button
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  }, 2000);
}

function validateField(e) {
  const field = e.target;
  const value = field.value.trim();
  let isValid = true;
  let message = '';
  
  // Remove existing error styles
  field.classList.remove('error');
  removeFieldError(field);
  
  // Required field validation
  if (field.hasAttribute('required') && !value) {
    isValid = false;
    message = 'This field is required.';
  }
  
  // Email validation
  if (field.type === 'email' && value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      isValid = false;
      message = 'Please enter a valid email address.';
    }
  }
  
  // Name validation
  if (field.name === 'name' && value) {
    if (value.length < 2) {
      isValid = false;
      message = 'Name must be at least 2 characters long.';
    }
  }
  
  // Message validation
  if (field.name === 'message' && value) {
    if (value.length < 10) {
      isValid = false;
      message = 'Message must be at least 10 characters long.';
    }
  }
  
  if (!isValid) {
    field.classList.add('error');
    showFieldError(field, message);
  }
  
  return isValid;
}

function validateForm(form) {
  const fields = form.querySelectorAll('input[required], textarea[required]');
  let isValid = true;
  
  fields.forEach(field => {
    const fieldValid = validateField({ target: field });
    if (!fieldValid) isValid = false;
  });
  
  return isValid;
}

function showFieldError(field, message) {
  removeFieldError(field);
  
  const errorElement = document.createElement('div');
  errorElement.className = 'field-error';
  errorElement.textContent = message;
  errorElement.style.color = 'var(--danger-color)';
  errorElement.style.fontSize = 'var(--font-size-sm)';
  errorElement.style.marginTop = 'var(--spacing-xs)';
  
  field.parentNode.appendChild(errorElement);
}

function removeFieldError(field) {
  const existingError = field.parentNode.querySelector('.field-error');
  if (existingError) {
    existingError.remove();
  }
}

// ===== NOTIFICATIONS =====
function showNotification(message, type = 'info') {
  // Remove existing notifications
  const existingNotification = $('.notification');
  if (existingNotification) {
    existingNotification.remove();
  }
  
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <span class="notification-message">${message}</span>
      <button class="notification-close" aria-label="Close notification">&times;</button>
    </div>
  `;
  
  // Add styles
  Object.assign(notification.style, {
    position: 'fixed',
    top: '20px',
    right: '20px',
    background: type === 'success' ? 'var(--accent-color)' : 
                type === 'error' ? 'var(--danger-color)' : 'var(--primary-color)',
    color: 'white',
    padding: 'var(--spacing-md) var(--spacing-lg)',
    borderRadius: 'var(--border-radius-md)',
    boxShadow: 'var(--shadow-lg)',
    zIndex: 'var(--z-modal)',
    maxWidth: '400px',
    animation: 'slideInRight 0.3s ease-out',
    transform: 'translateX(100%)',
    opacity: '0'
  });
  
  document.body.appendChild(notification);
  
  // Animate in
  requestAnimationFrame(() => {
    notification.style.transform = 'translateX(0)';
    notification.style.opacity = '1';
  });
  
  // Close functionality
  const closeBtn = notification.querySelector('.notification-close');
  closeBtn.addEventListener('click', () => {
    notification.style.transform = 'translateX(100%)';
    notification.style.opacity = '0';
    setTimeout(() => notification.remove(), 300);
  });
  
  // Auto close after 5 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.style.transform = 'translateX(100%)';
      notification.style.opacity = '0';
      setTimeout(() => notification.remove(), 300);
    }
  }, 5000);
}

// ===== ACCESSIBILITY ENHANCEMENTS =====
function initAccessibility() {
  // Skip to main content link
  const skipLink = document.createElement('a');
  skipLink.href = '#main';
  skipLink.textContent = 'Skip to main content';
  skipLink.className = 'skip-link';
  skipLink.style.cssText = `
    position: absolute;
    top: -40px;
    left: 6px;
    background: var(--primary-color);
    color: white;
    padding: 8px;
    text-decoration: none;
    border-radius: 4px;
    z-index: 1000;
    transition: top 0.3s;
  `;
  
  skipLink.addEventListener('focus', () => {
    skipLink.style.top = '6px';
  });
  
  skipLink.addEventListener('blur', () => {
    skipLink.style.top = '-40px';
  });
  
  document.body.insertBefore(skipLink, document.body.firstChild);
  
  // Add main id to main element
  const main = $('.main');
  if (main) {
    main.id = 'main';
  }
  
  // Keyboard navigation for service cards
  const serviceCards = $$('.service-card');
  serviceCards.forEach(card => {
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'article');
    
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
  });
  
  // ARIA labels for navigation
  const navToggle = $('.nav-toggle');
  if (navToggle) {
    navToggle.setAttribute('aria-label', 'Toggle navigation menu');
    navToggle.setAttribute('aria-expanded', 'false');
  }
  
  const navMenu = $('.nav-menu');
  if (navMenu) {
    navMenu.setAttribute('aria-hidden', 'true');
  }
}

// ===== PERFORMANCE OPTIMIZATIONS =====
// Lazy load images
function initLazyLoading() {
  const images = $$('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        imageObserver.unobserve(img);
      }
    });
  });
  
  images.forEach(img => imageObserver.observe(img));
}

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
  console.error('JavaScript error:', e.error);
  // You could send this to an error reporting service
});

window.addEventListener('unhandledrejection', (e) => {
  console.error('Unhandled promise rejection:', e.reason);
  // You could send this to an error reporting service
});

// ===== ADDITIONAL CSS ANIMATIONS =====
const style = document.createElement('style');
style.textContent = `
  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  .field-error {
    animation: fadeInUp 0.3s ease-out;
  }
  
  .notification {
    transition: all 0.3s ease-out;
  }
  
  .loading .animate-on-scroll {
    opacity: 0;
    transform: translateY(30px);
  }
  
  .loaded .animate-on-scroll {
    opacity: 1;
    transform: translateY(0);
    transition: all 0.6s ease-out;
  }
  
  input.error,
  textarea.error {
    border-color: var(--danger-color) !important;
    box-shadow: 0 0 0 2px rgba(220, 53, 69, 0.2);
  }
  
  .skip-link:focus {
    top: 6px !important;
  }
`;

document.head.appendChild(style);

// ===== EXPORT FOR TESTING =====
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    initializeApp,
    showNotification,
    validateField,
    validateForm
  };
}