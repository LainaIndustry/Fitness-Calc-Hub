// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form validation helper
function validateNumberInput(input, min = 0, max = 999) {
    const value = parseFloat(input.value);
    if (isNaN(value) || value < min || value > max) {
        input.style.borderColor = '#ef4444';
        return false;
    }
    input.style.borderColor = '#e5e7eb';
    return true;
}

// Common calculator functions
function showResult(result, description) {
    const resultContainer = document.getElementById('result');
    const resultValue = document.getElementById('resultValue');
    const resultDescription = document.getElementById('resultDescription');
    
    resultValue.textContent = result;
    resultDescription.textContent = description;
    resultContainer.style.display = 'block';
    
    // Scroll to result
    resultContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
}
