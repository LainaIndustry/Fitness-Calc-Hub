// BMR Calculator
document.addEventListener('DOMContentLoaded', function() {
    const bmrForm = document.getElementById('bmr-form');
    const bmrResults = document.getElementById('bmr-results');
    
    if (bmrForm) {
        bmrForm.addEventListener('submit', function(e) {
            e.preventDefault();
            calculateBMR();
        });
        
        // Add reset functionality
        const resetBtn = document.getElementById('bmr-reset');
        if (resetBtn) {
            resetBtn.addEventListener('click', function() {
                resetForm('bmr-form', 'bmr-results');
            });
        }
    }
});

function calculateBMR() {
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const age = parseInt(document.getElementById('age').value);
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);
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
    
    // Round to nearest whole number
    bmr = Math.round(bmr);
    
    // Show results
    const resultText = `Your BMR is ${bmr} calories/day`;
    const descriptionText = `<p>Your Basal Metabolic Rate (BMR) is the number of calories your body needs at rest to maintain basic physiological functions.</p>
                            <p>This is the minimum number of calories you would burn if you stayed in bed all day.</p>`;
    
    showResults('bmr-results', resultText, descriptionText);
}
