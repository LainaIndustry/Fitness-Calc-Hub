// Main JavaScript for Fitness Calculator Hub

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            navMenu.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!event.target.closest('.nav-menu') && !event.target.closest('.mobile-menu-btn')) {
                navMenu.classList.remove('active');
            }
        });
    }
    
    // Initialize all calculators
    initializeCalculators();
    
    // Add form submission handlers for contact form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleContactForm();
        });
    }
});

// Initialize all calculators
function initializeCalculators() {
    console.log('Fitness Calculator Hub initialized');
}

// Utility function to validate numbers
function validateNumber(input, min = 0, max = 1000) {
    const value = parseFloat(input);
    if (isNaN(value) || value < min || value > max) {
        return false;
    }
    return true;
}

// Utility function to show results
function showResults(elementId, result, description) {
    const resultsElement = document.getElementById(elementId);
    if (resultsElement) {
        const resultValue = resultsElement.querySelector('.result-value');
        const resultDescription = resultsElement.querySelector('.result-description');
        
        if (resultValue) resultValue.textContent = result;
        if (resultDescription) resultDescription.innerHTML = description;
        resultsElement.style.display = 'block';
        
        // Scroll to results
        resultsElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

// Utility function to reset form
function resetForm(formId, resultsId) {
    const form = document.getElementById(formId);
    const results = document.getElementById(resultsId);
    
    if (form) form.reset();
    if (results) results.style.display = 'none';
}

// Contact form handler
function handleContactForm() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Basic validation
    if (!name || !email || !subject || !message) {
        alert('Please fill in all fields');
        return;
    }
    
    // In a real application, you would send this data to a server
    // For now, we'll just show a success message
    alert('Thank you for your message! We will get back to you soon.');
    document.getElementById('contact-form').reset();
}
