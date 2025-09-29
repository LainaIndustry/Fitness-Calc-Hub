// BMR Calculator
document.addEventListener('DOMContentLoaded', function() {
    const bmrForm = document.getElementById('bmr-form');
    
    if (bmrForm) {
        bmrForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const gender = document.querySelector('input[name="gender"]:checked').value;
            const age = parseInt(document.getElementById('age').value);
            const height = parseFloat(document.getElementById('height').value);
            const weight = parseFloat(document.getElementById('weight').value);
            
            if (age && height && weight) {
                let bmr;
                
                // Mifflin-St Jeor Equation
                if (gender === 'male') {
                    bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
                } else {
                    bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
                }
                
                const resultElement = document.getElementById('bmr-result');
                const valueElement = document.getElementById('bmr-value');
                const interpretationElement = document.getElementById('bmr-interpretation');
                
                valueElement.textContent = Math.round(bmr);
                interpretationElement.textContent = 'This is the number of calories your body needs at complete rest. To maintain your current weight, you need more calories based on your activity level.';
                resultElement.style.display = 'block';
            }
        });
    }
});
