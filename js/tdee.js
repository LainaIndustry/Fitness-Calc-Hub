// TDEE Calculator
document.addEventListener('DOMContentLoaded', function() {
    const tdeeForm = document.getElementById('tdee-form');
    
    if (tdeeForm) {
        tdeeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const gender = document.querySelector('input[name="gender"]:checked').value;
            const age = parseInt(document.getElementById('age').value);
            const height = parseFloat(document.getElementById('height').value);
            const weight = parseFloat(document.getElementById('weight').value);
            const activityLevel = parseFloat(document.getElementById('activity').value);
            
            if (age && height && weight && activityLevel) {
                let bmr;
                
                // Calculate BMR first (Mifflin-St Jeor Equation)
                if (gender === 'male') {
                    bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
                } else {
                    bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
                }
                
                // Calculate TDEE
                const tdee = bmr * activityLevel;
                
                const resultElement = document.getElementById('tdee-result');
                const valueElement = document.getElementById('tdee-value');
                const interpretationElement = document.getElementById('tdee-interpretation');
                
                valueElement.textContent = Math.round(tdee);
                
                let interpretation = `Based on your activity level, you burn approximately ${Math.round(tdee)} calories per day. `;
                interpretation += `To maintain weight: ${Math.round(tdee)} calories/day | `;
                interpretation += `To lose weight: ${Math.round(tdee - 500)} calories/day | `;
                interpretation += `To gain weight: ${Math.round(tdee + 500)} calories/day`;
                
                interpretationElement.textContent = interpretation;
                resultElement.style.display = 'block';
            }
        });
    }
});
