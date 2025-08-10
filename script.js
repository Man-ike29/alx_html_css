// Hamburger Menu Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobileNav');
    const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
    
    // Toggle mobile menu
    function toggleMobileMenu() {
        hamburger.classList.toggle('active');
        mobileNav.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (mobileNav.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }
    
    // Close mobile menu
    function closeMobileMenu() {
        hamburger.classList.remove('active');
        mobileNav.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Event listeners
    hamburger.addEventListener('click', toggleMobileMenu);
    
    // Close menu when clicking on nav items
    mobileNavItems.forEach(item => {
        item.addEventListener('click', closeMobileMenu);
    });
    
    // Close menu when clicking outside
    mobileNav.addEventListener('click', function(e) {
        if (e.target === mobileNav) {
            closeMobileMenu();
        }
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
            closeMobileMenu();
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 480 && mobileNav.classList.contains('active')) {
            closeMobileMenu();
        }
    });

// Form validation and interactions
    const form = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const submitBtn = document.querySelector('.submit-btn');

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validation functions
    function validateName(name) {
        return name.trim().length >= 2;
    }

    function validateEmail(email) {
        return emailRegex.test(email.trim());
    }

    function validateMessage(message) {
        return message.trim().length >= 10;
    }

    // Show error message
    function showError(input, message) {
        const errorElement = document.getElementById(input.id + 'Error');
        errorElement.textContent = message;
        errorElement.classList.add('show');
        input.classList.add('error');
    }

    // Hide error message
    function hideError(input) {
        const errorElement = document.getElementById(input.id + 'Error');
        errorElement.classList.remove('show');
        input.classList.remove('error');
    }

    // Real-time validation
    nameInput.addEventListener('blur', function() {
        if (!validateName(this.value)) {
            showError(this, 'Name must be at least 2 characters long');
        } else {
            hideError(this);
        }
    });

    emailInput.addEventListener('blur', function() {
        if (!validateEmail(this.value)) {
            showError(this, 'Please enter a valid email address');
        } else {
            hideError(this);
        }
    });

    messageInput.addEventListener('blur', function() {
        if (!validateMessage(this.value)) {
            showError(this, 'Message must be at least 10 characters long');
        } else {
            hideError(this);
        }
    });

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;

        // Validate all fields
        if (!validateName(nameInput.value)) {
            showError(nameInput, 'Name must be at least 2 characters long');
            isValid = false;
        } else {
            hideError(nameInput);
        }

        if (!validateEmail(emailInput.value)) {
            showError(emailInput, 'Please enter a valid email address');
            isValid = false;
        } else {
            hideError(emailInput);
        }

        if (!validateMessage(messageInput.value)) {
            showError(messageInput, 'Message must be at least 10 characters long');
            isValid = false;
        } else {
            hideError(messageInput);
        }

        if (isValid) {
            // Simulate form submission
            submitBtn.textContent = 'SENDING...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.textContent = 'MESSAGE SENT!';
                submitBtn.style.backgroundColor = '#28a745';
                
                // Reset form after 2 seconds
                setTimeout(() => {
                    form.reset();
                    submitBtn.textContent = 'CALL TO ACTION';
                    submitBtn.style.backgroundColor = '';
                    submitBtn.disabled = false;
                }, 2000);
            }, 1500);
        }
    });

    // Add focus animations
    const inputs = [nameInput, emailInput, messageInput];
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
    });
});