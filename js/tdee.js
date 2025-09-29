// TDEE Calculator
document.addEventListener('DOMContentLoaded', function() {
    const tdeeForm = document.getElementById('tdee-form');
    const tdeeResults = document.getElementById('tdee-results');
    
    if (tdeeForm) {
        tdeeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            calculateTDEE();
        });
        
        // Add reset functionality
        const resetBtn = document.getElementById('tdee-reset');
        if (resetBtn) {
            resetBtn.addEventListener('click', function() {
                resetForm('tdee-form', 'tdee-results');
            });
        }
    }
});

function calculateTDEE() {
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const age = parseInt(document.getElementById('age').value);
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);
    const activity = document.getElementById('activity').value;
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
    
    // Calculate goals
    const maintenance = tdee;
    const mildLoss = Math.round(tdee * 0.9); // 10% deficit
    const loss = Math.round(tdee * 0.8); // 20% deficit
    const extremeLoss = Math.round(tdee * 0.7); // 30% deficit
    const mildGain = Math.round(tdee * 1.1); // 10% surplus
    const gain = Math.round(tdee * 1.2); // 20% surplus
    
    // Show results
    const resultText = `Your TDEE is ${tdee} calories/day`;
    const descriptionText = `<p>Your Total Daily Energy Expenditure (TDEE) is the total number of calories you burn each day, including physical activity.</p>
                            <p><strong>Based on your TDEE, here are your daily calorie needs for different goals:</strong></p>
                            <ul>
                                <li>Weight maintenance: ${maintenance} calories/day</li>
                                <li>Mild weight loss (0.25 kg/week): ${mildLoss} calories/day</li>
                                <li>Weight loss (0.5 kg/week): ${loss} calories/day</li>
                                <li>Extreme weight loss (1 kg/week): ${extremeLoss} calories/day</li>
                                <li>Mild weight gain (0.25 kg/week): ${mildGain} calories/day</li>
                                <li>Weight gain (0.5 kg/week): ${gain} calories/day</li>
                            </ul>`;
    
    showResults('tdee-results', resultText, descriptionText);
}
