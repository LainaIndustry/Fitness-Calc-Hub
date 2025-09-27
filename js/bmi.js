// BMI Calculator
function initBMICalculator() {
    const form = document.getElementById('bmi-form');
    const resultDiv = document.getElementById('bmi-result');
    const bmiValue = document.getElementById('bmi-value');
    const bmiCategory = document.getElementById('bmi-category');
    
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const height = parseFloat(document.getElementById('height').value);
        const weight = parseFloat(document.getElementById('weight').value);
        const unit = document.querySelector('input[name="unit"]:checked').value;
        
        // Validate inputs
        if (!validateNumberInput(document.getElementById('height'), 50, 250) || 
            !validateNumberInput(document.getElementById('weight'), 20, 300)) {
            return;
        }
        
        // Calculate BMI
        let bmi;
        if (unit === 'metric') {
            // Metric: kg and cm
            bmi = weight / ((height / 100) ** 2);
        } else {
            // Imperial: lbs and inches
            bmi = (weight / (height ** 2)) * 703;
        }
        
        // Display result
        bmiValue.textContent = formatNumber(bmi);
        bmiCategory.textContent = getBMICategory(bmi);
        
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
                document.getElementById('height').placeholder = 'Enter height in cm';
                document.getElementById('weight').placeholder = 'Enter weight in kg';
            } else {
                heightLabel.textContent = 'Height (inches)';
                weightLabel.textContent = 'Weight (lbs)';
                document.getElementById('height').placeholder = 'Enter height in inches';
                document.getElementById('weight').placeholder = 'Enter weight in lbs';
            }
        });
    });
}

function getBMICategory(bmi) {
    if (bmi < 18.5) {
        return 'Underweight';
    } else if (bmi < 25) {
        return 'Normal weight';
    } else if (bmi < 30) {
        return 'Overweight';
    } else {
        return 'Obese';
    }
}
