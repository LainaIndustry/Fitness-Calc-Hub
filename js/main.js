// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }

    // BMI Calculator for homepage
    const bmiForm = document.getElementById('bmi-form');
    if (bmiForm) {
        bmiForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const height = parseFloat(document.getElementById('height').value) / 100; // Convert cm to m
            const weight = parseFloat(document.getElementById('weight').value);
            
            if (height && weight) {
                const bmi = weight / (height * height);
                const resultElement = document.getElementById('bmi-result');
                const valueElement = document.getElementById('bmi-value');
                const interpretationElement = document.getElementById('bmi-interpretation');
                
                valueElement.textContent = bmi.toFixed(1);
                
                let interpretation = '';
                if (bmi < 18.5) {
                    interpretation = 'Underweight';
                } else if (bmi < 25) {
                    interpretation = 'Normal weight';
                } else if (bmi < 30) {
                    interpretation = 'Overweight';
                } else {
                    interpretation = 'Obese';
                }
                
                interpretationElement.textContent = interpretation;
                resultElement.style.display = 'block';
            }
        });
    }
});
