// Calorie Calculator
function initCalorieCalculator() {
    const form = document.getElementById('calorie-form');
    const resultDiv = document.getElementById('calorie-result');
    const calorieValue = document.getElementById('calorie-value');
    const goalDescription = document.getElementById('goal-description');
    
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const age = parseInt(document.getElementById('age').value);
        const gender = document.querySelector('input[name="gender"]:checked').value;
        const weight = parseFloat(document.getElementById('weight').value);
        const height = parseFloat(document.getElementById('height').value);
        const unit = document.querySelector('input[name="unit"]:checked').value;
        const activity = parseFloat(document.getElementById('activity').value);
        const goal = document.getElementById('goal').value;
        
        // Validate inputs
        if (!validateNumberInput(document.getElementById('age'), 15, 100) || 
            !validateNumberInput(document.getElementById('weight'), 20, 300) ||
            !validateNumberInput(document.getElementById('height'), 50, 250)) {
            return;
        }
        
        // Calculate BMR
        let bmr;
        if (unit === 'metric') {
            if (gender === 'male') {
                bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
            } else {
                bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
            }
        } else {
            if (gender === 'male') {
                bmr = 66 + (6.23 * weight) + (12.7 * height) - (6.8 * age);
            } else {
                bmr = 655 + (4.35 * weight) + (4.7 * height) - (4.7 * age);
            }
        }
        
        // Calculate TDEE
        const tdee = bmr * activity;
        
        // Adjust based on goal
        let calories;
        let description;
        
        switch(goal) {
            case 'extreme_loss':
                calories = tdee * 0.6;
                description = 'Extreme weight loss (40% deficit)';
                break;
            case 'loss':
                calories = tdee * 0.8;
                description = 'Weight loss (20% deficit)';
                break;
            case 'mild_loss':
                calories = tdee * 0.9;
                description = 'Mild weight loss (10% deficit)';
                break;
            case 'maintain':
                calories = tdee;
                description = 'Weight maintenance';
                break;
            case 'gain':
                calories = tdee * 1.1;
                description = 'Weight gain (10% surplus)';
                break;
            default:
                calories = tdee;
                description = 'Weight maintenance';
        }
        
        // Display results
        calorieValue.textContent = formatNumber(calories);
        goalDescription.textContent = description;
        
        resultDiv.style.display = 'block';
    });
}
