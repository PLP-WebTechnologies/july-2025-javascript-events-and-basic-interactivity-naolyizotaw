// Part 1: JavaScript Event Handling

// Theme toggle functionality
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
        themeToggle.textContent = 'Light Mode';
    } else {
        themeToggle.textContent = 'Dark Mode';
    }
});

// Card hover effect
const card = document.querySelector('.card');
card.addEventListener('mouseover', function() {
    this.style.transform = 'translateY(-5px)';
    this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
});

card.addEventListener('mouseout', function() {
    this.style.transform = 'translateY(0)';
    this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
});

// Click anywhere alert
document.addEventListener('click', function(e) {
    if (!e.target.matches('.theme-toggle') && !e.target.closest('form')) {
        alert('You clicked on the page! Event handling is working.');
    }
});

// Part 2: Interactive Elements

// Counter functionality
let count = 0;
const counterValue = document.getElementById('counterValue');
const incrementBtn = document.getElementById('incrementBtn');
const decrementBtn = document.getElementById('decrementBtn');
const resetBtn = document.getElementById('resetBtn');

incrementBtn.addEventListener('click', function() {
    count++;
    counterValue.textContent = count;
});

decrementBtn.addEventListener('click', function() {
    if (count > 0) count--;
    counterValue.textContent = count;
});

resetBtn.addEventListener('click', function() {
    count = 0;
    counterValue.textContent = count;
});

// FAQ functionality
const faqQuestions = document.querySelectorAll('.faq-question');
faqQuestions.forEach(question => {
    question.addEventListener('click', function() {
        const answer = this.nextElementSibling;
        const isVisible = answer.style.display === 'block';
        
        // Close all answers
        document.querySelectorAll('.faq-answer').forEach(ans => {
            ans.style.display = 'none';
        });
        
        // Update all icons
        document.querySelectorAll('.faq-question span').forEach(span => {
            span.textContent = '+';
        });
        
        // Toggle current answer
        if (!isVisible) {
            answer.style.display = 'block';
            this.querySelector('span').textContent = '-';
        }
    });
});

// Dropdown functionality
const dropdownBtn = document.querySelector('.dropdown-btn');
const dropdownContent = document.querySelector('.dropdown-content');

dropdownBtn.addEventListener('click', function() {
    dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
});

// Close dropdown when clicking outside
window.addEventListener('click', function(e) {
    if (!e.target.matches('.dropdown-btn')) {
        dropdownContent.style.display = 'none';
    }
});

// Part 3: Form Validation
const form = document.getElementById('validationForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const confirmPasswordError = document.getElementById('confirmPasswordError');
const successMessage = document.getElementById('successMessage');

// Validate name
nameInput.addEventListener('input', function() {
    if (this.value.length >= 2) {
        nameError.style.display = 'none';
        this.style.borderColor = '#ddd';
    }
});

// Validate email
emailInput.addEventListener('input', function() {
    if (validateEmail(this.value)) {
        emailError.style.display = 'none';
        this.style.borderColor = '#ddd';
    }
});

// Validate password
passwordInput.addEventListener('input', function() {
    if (validatePassword(this.value)) {
        passwordError.style.display = 'none';
        this.style.borderColor = '#ddd';
    }
});

// Validate confirm password
confirmPasswordInput.addEventListener('input', function() {
    if (this.value === passwordInput.value) {
        confirmPasswordError.style.display = 'none';
        this.style.borderColor = '#ddd';
    }
});

// Form submission
form.addEventListener('submit', function(e) {
    e.preventDefault();
    let isValid = true;

    // Validate name
    if (nameInput.value.length < 2) {
        nameError.style.display = 'block';
        nameInput.style.borderColor = 'var(--warning-color)';
        isValid = false;
    }

    // Validate email
    if (!validateEmail(emailInput.value)) {
        emailError.style.display = 'block';
        emailInput.style.borderColor = 'var(--warning-color)';
        isValid = false;
    }

    // Validate password
    if (!validatePassword(passwordInput.value)) {
        passwordError.style.display = 'block';
        passwordInput.style.borderColor = 'var(--warning-color)';
        isValid = false;
    }

    // Validate confirm password
    if (confirmPasswordInput.value !== passwordInput.value) {
        confirmPasswordError.style.display = 'block';
        confirmPasswordInput.style.borderColor = 'var(--warning-color)';
        isValid = false;
    }

    // If form is valid
    if (isValid) {
        successMessage.style.display = 'block';
        form.reset();
        
        // Hide success message after 3 seconds
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 3000);
    }
});

// Helper functions for validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePassword(password) {
    // At least 8 characters, 1 uppercase, 1 number
    const re = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    return re.test(password);
}