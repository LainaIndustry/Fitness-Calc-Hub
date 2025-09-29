// Calorie Calculator
document.addEventListener('DOMContentLoaded', function() {
    const calorieForm = document.getElementById('calorie-form');
    
    if (calorieForm) {
        calorieForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const gender = document.querySelector('input[name="gender"]:checked').value;
            const age = parseInt(document.getElementById('age').value);
            const height = parseFloat(document.getElementById('height').value);
            const weight = parseFloat(document.getElementById('weight').value);
            const activityLevel = parseFloat(document.getElementById('activity').value);
            const goal = document.getElementById('goal').value;
            
            if (age && height && weight && activityLevel && goal) {
                let bmr;
                
                // Calculate BMR first (Mifflin-St Jeor Equation)
                if (gender === 'male') {
                    bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
                } else {
                    bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
                }
                
                // Calculate TDEE
                const tdee = bmr * activityLevel;
                
                // Adjust based on goal
                let calorieNeeds;
                let interpretation = '';
                
                switch(goal) {
                    case 'loss':
                        calorieNeeds = tdee - 500;
                        interpretation = `For weight loss, aim for ${Math.round(calorieNeeds)} calories per day. This creates a 500-calorie deficit for gradual, sustainable weight loss of about 0.5 kg per week.`;
                        break;
                    case 'maintain':
                        calorieNeeds = tdee;
                        interpretation = `For weight maintenance, aim for ${Math.round(calorieNeeds)} calories per day. This matches your total daily energy expenditure.`;
                        break;
                    case 'gain':
                        calorieNeeds = tdee + 500;
                        interpretation = `For weight gain, aim for ${Math.round(calorieNeeds)} calories per day. This creates a 500-calorie surplus for gradual muscle gain.`;
                        break;
                }
                
                const resultElement = document.getElementById('calorie-result');
                const valueElement = document.getElementById('calorie-value');
                const interpretationElement = document.getElementById('calorie-interpretation');
                
                valueElement.textContent = Math.round(calorieNeeds);
                interpretationElement.textContent = interpretation;
                resultElement.style.display = 'block';
            }
        });
    }
});
