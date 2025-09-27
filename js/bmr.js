// BMR Calculator
function initBMRCalculator() {
    const form = document.getElementById('bmr-form');
    const resultDiv = document.getElementById('bmr-result');
    const bmrValue = document.getElementById('bmr-value');
    
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const age = parseInt(document.getElementById('age').value);
        const gender = document.querySelector('input[name="gender"]:checked').value;
        const weight = parseFloat(document.getElementById('weight').value);
        const height = parseFloat(document.getElementById('height').value);
        const unit = document.querySelector('input[name="unit"]:checked').value;
        
        // Validate inputs
        if (!validateNumberInput(document.getElementById('age'), 15, 100) || 
            !validateNumberInput(document.getElementById('weight'), 20, 300) ||
            !validateNumberInput(document.getElementById('height'), 50, 250)) {
            return;
        }
        
        // Calculate BMR
        let bmr;
        if (unit === 'metric') {
            // Metric calculation
            if (gender === 'male') {
                bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
            } else {
                bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
            }
        } else {
            // Imperial calculation
            if (gender === 'male') {
                bmr = 66 + (6.23 * weight) + (12.7 * height) - (6.8 * age);
            } else {
                bmr = 655 + (4.35 * weight) + (4.7 * height) - (4.7 * age);
            }
        }
        
        // Display result
        bmrValue.textContent = formatNumber(bmr);
        resultDiv.style.display = 'block';
    });
    
    // Unit toggle functionality
    const unitRadios = document.querySelectorAll('input[name="unit"]');
    const heightLabel = document.querySelector('label[for="height"]');
    const weightLabel = document.querySelector('label[for="weight"]');
    
    unitRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.value === 'metric') {
                heightLabel.textContent = 'Height (cm)';
                weightLabel.textContent = 'Weight (kg)';
            } else {
                heightLabel.textContent = 'Height (inches)';
                weightLabel.textContent = 'Weight (lbs)';
            }
        });
    });
}
