// Calorie Calculator
document.addEventListener('DOMContentLoaded', function() {
    const calorieForm = document.getElementById('calorie-form');
    const calorieResults = document.getElementById('calorie-results');
    
    if (calorieForm) {
        calorieForm.addEventListener('submit', function(e) {
            e.preventDefault();
            calculateCalorieNeeds();
        });
        
        // Add reset functionality
        const resetBtn = document.getElementById('calorie-reset');
        if (resetBtn) {
            resetBtn.addEventListener('click', function() {
                resetForm('calorie-form', 'calorie-results');
            });
        }
    }
});

function calculateCalorieNeeds() {
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const age = parseInt(document.getElementById('age').value);
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);
    const activity = document.getElementById('activity').value;
    const goal = document.getElementById('goal').value;
    const unit = document.getElementById('unit').value;
    
    // Validation
    if (!validateNumber(age, 1, 120) || !validateNumber(weight, 1, 500) || !validateNumber(height, 30, 250)) {
        alert('Please enter valid values for all fields');
        return;
    }
    
    let bmr;
    
    // Convert to metric if necessary
    let weightKg = weight;
    let heightCm = height;
    
    if (unit === 'imperial') {
        // Convert lbs to kg
        weightKg = weight * 0.453592;
        // Convert inches to cm
        heightCm = height * 2.54;
    }
    
    // Calculate BMR using Mifflin-St Jeor Equation
    if (gender === 'male') {
        bmr = 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
    } else {
        bmr = 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
    }
    
    // Activity multipliers
    const activityMultipliers = {
        sedentary: 1.2,
        light: 1.375,
        moderate: 1.55,
        active: 1.725,
        veryActive: 1.9
    };
    
    // Calculate TDEE
    const tdee = Math.round(bmr * activityMultipliers[activity]);
    
    // Goal multipliers
    const goalMultipliers = {
        maintain: 1,
        mildLoss: 0.9,
        loss: 0.8,
        extremeLoss: 0.7,
        mildGain: 1.1,
        gain: 1.2
    };
    
    // Calculate daily calorie needs based on goal
    const dailyCalories = Math.round(tdee * goalMultipliers[goal]);
    
    // Determine goal description
    let goalDescription = '';
    switch(goal) {
        case 'maintain':
            goalDescription = 'weight maintenance';
            break;
        case 'mildLoss':
            goalDescription = 'mild weight loss (0.25 kg/week)';
            break;
        case 'loss':
            goalDescription = 'weight loss (0.5 kg/week)';
            break;
        case 'extremeLoss':
            goalDescription = 'extreme weight loss (1 kg/week)';
            break;
        case 'mildGain':
            goalDescription = 'mild weight gain (0.25 kg/week)';
            break;
        case 'gain':
            goalDescription = 'weight gain (0.5 kg/week)';
            break;
    }
    
    // Show results
    const resultText = `Your daily calorie target is ${dailyCalories} calories`;
    const descriptionText = `<p>To achieve ${goalDescription}, you should aim for ${dailyCalories} calories per day.</p>
                            <p>This calculation is based on your Basal Metabolic Rate (BMR) of ${Math.round(bmr)} calories and your activity level.</p>
                            <p><strong>Remember:</strong> These are estimates. Individual needs may vary based on metabolism, body composition, and other factors.</p>`;
    
    showResults('calorie-results', resultText, descriptionText);
}
