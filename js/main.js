// Main JavaScript for Fitness-Calc-Hub

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            nav.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenuBtn.classList.remove('active');
            nav.classList.remove('active');
        });
    });
    
    // Initialize all calculators if on a calculator page
    if (typeof initBMICalculator === 'function') {
        initBMICalculator();
    }
    
    if (typeof initBMRCalculator === 'function') {
        initBMRCalculator();
    }
    
    if (typeof initCalorieCalculator === 'function') {
        initCalorieCalculator();
    }
    
    if (typeof initHeartRateCalculator === 'function') {
        initHeartRateCalculator();
    }
    
    if (typeof initTDEECalculator === 'function') {
        initTDEECalculator();
    }
    
    if (typeof initWaterCalculator === 'function') {
        initWaterCalculator();
    }
});

// Utility function for number formatting
function formatNumber(num, decimals = 2) {
    return parseFloat(num).toFixed(decimals);
}

// Utility function for input validation
function validateNumberInput(input, min = 0, max = 1000) {
    const value = parseFloat(input.value);
    
    if (isNaN(value) || value < min || value > max) {
        input.classList.add('error');
        return false;
    }
    
    input.classList.remove('error');
    return true;
}

// Add error class styling
const style = document.createElement('style');
style.textContent = `
    .error {
        border-color: #f44336 !important;
        box-shadow: 0 0 5px rgba(244, 67, 54, 0.5) !important;
    }
`;
document.head.appendChild(style);
