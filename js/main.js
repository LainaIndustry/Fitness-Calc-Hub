// Main JavaScript for Fitness Calculator Hub

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.nav-menu') && !event.target.closest('.mobile-menu-btn')) {
            navMenu.classList.remove('active');
        }
    });
    
    // Initialize all calculators
    initializeCalculators();
});

// Initialize all calculators
function initializeCalculators() {
    // This function will be extended by individual calculator scripts
    console.log('Calculators initialized');
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
    const resultValue = resultsElement.querySelector('.result-value');
    const resultDescription = resultsElement.querySelector('.result-description');
    
    resultValue.textContent = result;
    resultDescription.innerHTML = description;
    resultsElement.style.display = 'block';
    
    // Scroll to results
    resultsElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Utility function to reset form
function resetForm(formId, resultsId) {
    document.getElementById(formId).reset();
    document.getElementById(resultsId).style.display = 'none';
}
