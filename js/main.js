// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    if (hamburger) hamburger.classList.remove('active');
    if (navMenu) navMenu.classList.remove('active');
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
    
    if (resultValue) resultValue.textContent = result;
    if (resultDescription) resultDescription.textContent = description;
    if (resultContainer) {
        resultContainer.style.display = 'block';
        resultContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

// AdSense Management
function initializeAds() {
    if (typeof adsbygoogle !== 'undefined') {
        (adsbygoogle = window.adsbygoogle || []).push({});
    }
}

// Cookie Consent
document.addEventListener('DOMContentLoaded', function() {
    if (!getCookie('cookie_consent')) {
        showCookieBanner();
    } else if (getCookie('cookie_consent') === 'accepted') {
        loadAdSense();
    }
});

function showCookieBanner() {
    const banner = document.createElement('div');
    banner.id = 'cookie-consent-banner';
    banner.innerHTML = `
        <div class="cookie-content">
            <p>We use cookies to personalize content and ads, to provide social media features, and to analyze our traffic. 
               We also share information about your use of our site with our social media, advertising, and analytics partners.</p>
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
    if (banner) banner.remove();
}

function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/;SameSite=Lax`;
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
}

function loadAdSense() {
    if (getCookie('cookie_consent') === 'accepted') {
        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX';
        script.crossOrigin = 'anonymous';
        document.head.appendChild(script);
        
        script.onload = () => initializeAds();
    }
}
