// Main JavaScript File - Common functionality across all pages
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

function initializeWebsite() {
    setupNavigation();
    setupSmoothScrolling();
    setupFormValidation();
    initializeAdSense();
    setupCookieConsent();
}

// Mobile Navigation Toggle
function setupNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(n => {
            n.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.navbar') && navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
}

// Smooth scrolling for anchor links
function setupSmoothScrolling() {
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
}

// Form validation helper
function setupFormValidation() {
    // Global input validation
    document.querySelectorAll('input[type="number"]').forEach(input => {
        input.addEventListener('blur', function() {
            validateNumberInput(this);
        });
        
        // Prevent non-numeric input
        input.addEventListener('keypress', function(e) {
            const charCode = e.which ? e.which : e.keyCode;
            if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode !== 46) {
                e.preventDefault();
            }
        });
    });
}

// Form validation helper function
function validateNumberInput(input, min = 0, max = 999) {
    const value = parseFloat(input.value);
    if (isNaN(value) || value < min || value > max) {
        input.style.borderColor = '#ef4444';
        showError(input, `Please enter a value between ${min} and ${max}`);
        return false;
    }
    input.style.borderColor = '#e5e7eb';
    clearError(input);
    return true;
}

function showError(input, message) {
    clearError(input);
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.color = '#ef4444';
    errorDiv.style.fontSize = '0.875rem';
    errorDiv.style.marginTop = '0.5rem';
    input.parentNode.appendChild(errorDiv);
}

function clearError(input) {
    const errorDiv = input.parentNode.querySelector('.error-message');
    if (errorDiv) {
        errorDiv.remove();
    }
}

// Common calculator functions
function showResult(result, description) {
    const resultContainer = document.getElementById('result');
    const resultValue = document.getElementById('resultValue');
    const resultDescription = document.getElementById('resultDescription');
    
    if (resultValue) resultValue.textContent = result;
    if (resultDescription) resultDescription.textContent = description;
    if (resultContainer) {
        resultContainer.style.display = 'block';
        resultContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

// AdSense Management
function initializeAdSense() {
    // Only initialize if cookies are accepted
    if (getCookie('cookie_consent') === 'accepted') {
        if (typeof adsbygoogle !== 'undefined') {
            (adsbygoogle = window.adsbygoogle || []).push({});
        }
    }
}

// Cookie Consent Management
function setupCookieConsent() {
    if (!getCookie('cookie_consent')) {
        showCookieBanner();
    } else if (getCookie('cookie_consent') === 'accepted') {
        loadAdSense();
    }
}

function showCookieBanner() {
    const banner = document.createElement('div');
    banner.id = 'cookie-consent-banner';
    banner.innerHTML = `
        <div class="cookie-content">
            <p>We use cookies to personalize content and ads, to provide social media features, and to analyze our traffic.</p>
            <div class="cookie-buttons">
                <button id="accept-cookies" class="btn btn-primary">Accept All</button>
                <button id="reject-cookies" class="btn btn-secondary">Reject Non-Essential</button>
                <a href="legal/privacy-policy.html" class="cookie-link">Privacy Policy</a>
            </div>
        </div>
    `;
    
    document.body.appendChild(banner);
    
    document.getElementById('accept-cookies').addEventListener('click', function() {
        setCookie('cookie_consent', 'accepted', 365);
        hideCookieBanner();
        loadAdSense();
    });
    
    document.getElementById('reject-cookies').addEventListener('click', function() {
        setCookie('cookie_consent', 'rejected', 365);
        hideCookieBanner();
    });
}

function hideCookieBanner() {
    const banner = document.getElementById('cookie-consent-banner');
    if (banner) {
        banner.style.display = 'none';
        setTimeout(() => banner.remove(), 300);
    }
}

function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/;SameSite=Lax";
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function loadAdSense() {
    if (getCookie('cookie_consent') === 'accepted') {
        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX';
        script.crossOrigin = 'anonymous';
        document.head.appendChild(script);
        
        script.onload = () => {
            initializeAdSense();
        };
    }
}
