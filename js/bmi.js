// BMI Calculator Logic
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('bmiForm');
    if (!form) return;

    const systemSelect = document.getElementById('system');
    const weightInput = document.getElementById('weight');
    const heightInput = document.getElementById('height');
    const weightUnit = document.getElementById('weightUnit');
    const heightUnit = document.getElementById('heightUnit');

    // Update units based on measurement system
    systemSelect.addEventListener('change', function() {
        if (this.value === 'metric') {
            weightUnit.textContent = 'kg';
            heightUnit.textContent = 'cm';
            weightInput.placeholder = 'Enter weight in kg';
            heightInput.placeholder = 'Enter height in cm';
        } else {
            weightUnit.textContent = 'lbs';
            heightUnit.textContent = 'inches';
            weightInput.placeholder = 'Enter weight in lbs';
            heightInput.placeholder = 'Enter height in inches';
        }
        
        clearResults();
        clearErrors();
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const system = systemSelect.value;
        const weight = parseFloat(weightInput.value);
        const height = parseFloat(heightInput.value);

        // Validate inputs
        if (!validateInputs(weight, height, system)) {
            return;
        }

        // Calculate BMI
        const bmi = calculateBMI(weight, height, system);
        
        // Get BMI category and recommendations
        const category = getBMICategory(bmi);
        const recommendation = getBMIRecommendation(bmi);
        const colorClass = getBMIColorClass(bmi);
        
        // Display results
        displayBMIResult(bmi, category, recommendation, colorClass);
    });

    function validateInputs(weight, height, system) {
        let isValid = true;
        const minWeight = system === 'metric' ? 20 : 44;
        const maxWeight = system === 'metric' ? 300 : 660;
        const minHeight = system === 'metric' ? 100 : 39;
        const maxHeight = system === 'metric' ? 250 : 98;

        clearErrors();

        if (isNaN(weight) || weight < minWeight || weight > maxWeight) {
            showError(weightInput, `Please enter a weight between ${minWeight} and ${maxWeight} ${system === 'metric' ? 'kg' : 'lbs'}`);
            isValid = false;
        }

        if (isNaN(height) || height < minHeight || height > maxHeight) {
            showError(heightInput, `Please enter a height between ${minHeight} and ${maxHeight} ${system === 'metric' ? 'cm' : 'inches'}`);
            isValid = false;
        }

        return isValid;
    }

    function calculateBMI(weight, height, system) {
        if (system === 'metric') {
            // BMI = weight(kg) / height(m)^2
            return weight / Math.pow(height / 100, 2);
        } else {
            // BMI = (weight(lbs) / height(in)^2) * 703
            return (weight / Math.pow(height, 2)) * 703;
        }
    }

    function getBMICategory(bmi) {
        if (bmi < 16) return 'Severe Thinness';
        if (bmi < 17) return 'Moderate Thinness';
        if (bmi < 18.5) return 'Mild Thinness';
        if (bmi < 25) return 'Normal Weight';
        if (bmi < 30) return 'Overweight';
        if (bmi < 35) return 'Obese Class I';
        if (bmi < 40) return 'Obese Class II';
        return 'Obese Class III';
    }

    function getBMIColorClass(bmi) {
        if (bmi < 18.5) return 'underweight';
        if (bmi < 25) return 'normal';
        if (bmi < 30) return 'overweight';
        return 'obese';
    }

    function getBMIRecommendation(bmi) {
        if (bmi < 18.5) {
            return 'Consider consulting a healthcare provider for weight gain strategies. Focus on nutrient-dense foods and strength training.';
        } else if (bmi < 25) {
            return 'Maintain your current weight with balanced nutrition and regular exercise. Continue healthy habits.';
        } else if (bmi < 30) {
            return 'Consider moderate weight loss through diet and exercise. Aim for 0.5-1kg per week with sustainable changes.';
        } else {
            return 'Consult a healthcare provider for a comprehensive weight management plan. Focus on long-term health improvements.';
        }
    }

    function displayBMIResult(bmi, category, recommendation, colorClass) {
        const resultValue = document.getElementById('resultValue');
        const resultCategory = document.getElementById('resultCategory');
        const resultDescription = document.getElementById('resultDescription');
        const resultContainer = document.getElementById('result');

        if (resultValue) {
            resultValue.textContent = bmi.toFixed(1);
            resultValue.className = `result-value ${colorClass}`;
        }
        
        if (resultCategory) {
            resultCategory.textContent = category;
            resultCategory.className = `result-category ${colorClass}`;
        }
        
        if (resultDescription) {
            resultDescription.textContent = recommendation;
        }
        
        if (resultContainer) {
            resultContainer.style.display = 'block';
            resultContainer.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
            });
        }
    }

    function showError(input, message) {
        clearError(input);
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.color = '#ef4444';
        errorDiv.style.fontSize = '0.875rem';
        errorDiv.style.marginTop = '0.5rem';
        errorDiv.textContent = message;
        input.parentNode.appendChild(errorDiv);
        input.style.borderColor = '#ef4444';
    }

    function clearError(input) {
        const errorDiv = input.parentNode.querySelector('.error-message');
        if (errorDiv) {
            errorDiv.remove();
        }
        input.style.borderColor = '#e5e7eb';
    }

    function clearErrors() {
        document.querySelectorAll('.error-message').forEach(error => error.remove());
        document.querySelectorAll('input').forEach(input => {
            input.style.borderColor = '#e5e7eb';
        });
    }

    function clearResults() {
        const resultContainer = document.getElementById('result');
        if (resultContainer) {
            resultContainer.style.display = 'none';
        }
    }

    // Input validation helpers
    weightInput.addEventListener('input', function() {
        clearError(this);
    });

    heightInput.addEventListener('input', function() {
        clearError(this);
    });

    // Prevent non-numeric input
    [weightInput, heightInput].forEach(input => {
        input.addEventListener('keypress', function(e) {
            const charCode = e.which ? e.which : e.keyCode;
            if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode !== 46) {
                e.preventDefault();
            }
        });
    });
});
