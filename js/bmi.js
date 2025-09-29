// BMI Calculator
document.addEventListener('DOMContentLoaded', function() {
    const bmiForm = document.getElementById('bmi-form');
    const bmiResults = document.getElementById('bmi-results');
    
    if (bmiForm) {
        bmiForm.addEventListener('submit', function(e) {
            e.preventDefault();
            calculateBMI();
        });
        
        // Add reset functionality
        const resetBtn = document.getElementById('bmi-reset');
        if (resetBtn) {
            resetBtn.addEventListener('click', function() {
                resetForm('bmi-form', 'bmi-results');
            });
        }
    }
});

function calculateBMI() {
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);
    const unit = document.getElementById('unit').value;
    
    // Validation
    if (!validateNumber(weight, 1, 500) || !validateNumber(height, 0.5, 3)) {
        alert('Please enter valid weight and height values');
        return;
    }
    
    let bmi;
    
    // Calculate BMI based on unit system
    if (unit === 'metric') {
        // Metric: kg and m
        bmi = weight / (height * height);
    } else {
        // Imperial: lbs and inches
        bmi = (weight / (height * height)) * 703;
    }
    
    // Round to 1 decimal place
    bmi = Math.round(bmi * 10) / 10;
    
    // Determine BMI category
    let category = '';
    let description = '';
    
    if (bmi < 18.5) {
        category = 'Underweight';
        description = 'You may need to gain weight. Consider consulting a healthcare provider for advice.';
    } else if (bmi >= 18.5 && bmi <= 24.9) {
        category = 'Normal weight';
        description = 'You have a healthy body weight. Maintain your current lifestyle with balanced nutrition and regular exercise.';
    } else if (bmi >= 25 && bmi <= 29.9) {
        category = 'Overweight';
        description = 'You may need to lose weight. Consider increasing physical activity and improving your diet.';
    } else {
        category = 'Obesity';
        description = 'It is recommended to consult with a healthcare provider for weight management strategies.';
    }
    
    // Show results
    const resultText = `Your BMI is ${bmi} (${category})`;
    const descriptionText = `<p>${description}</p><p><strong>BMI Categories:</strong><br>
                            Underweight: < 18.5<br>
                            Normal weight: 18.5 - 24.9<br>
                            Overweight: 25 - 29.9<br>
                            Obesity: 30 or greater</p>`;
    
    showResults('bmi-results', resultText, descriptionText);
}
