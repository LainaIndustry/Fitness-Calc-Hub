// BMI Calculator Logic
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('bmiForm');
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
        
        // Clear previous results
        document.getElementById('result').style.display = 'none';
        weightInput.value = '';
        heightInput.value = '';
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
        
        // Display results
        displayBMIResult(bmi, category, recommendation);
    });

    function validateInputs(weight, height, system) {
        let isValid = true;
        const minWeight = system === 'metric' ? 20 : 44; // 20kg or 44lbs
        const maxWeight = system === 'metric' ? 300 : 660; // 300kg or 660lbs
        const minHeight = system === 'metric' ? 100 : 39; // 100cm or 39 inches
        const maxHeight = system === 'metric' ? 250 : 98; // 250cm or 98 inches

        if (isNaN(weight) || weight < minWeight || weight > maxWeight) {
            showError(weightInput, `Please enter a weight between ${minWeight} and ${maxWeight} ${system === 'metric' ? 'kg' : 'lbs'}`);
            isValid = false;
        } else {
            clearError(weightInput);
        }

        if (isNaN(height) || height < minHeight || height > maxHeight) {
            showError(heightInput, `Please enter a height between ${minHeight} and ${maxHeight} ${system === 'metric' ? 'cm' : 'inches'}`);
            isValid = false;
        } else {
            clearError(heightInput);
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
        if (bmi < 25) return 'Normal';
        if (bmi < 30) return 'Overweight';
        if (bmi < 35) return 'Obese Class I';
        if (bmi < 40) return 'Obese Class II';
        return 'Obese Class III';
    }

    function getBMIRecommendation(bmi) {
        if (bmi < 18.5) {
            return 'Consider consulting a healthcare provider for weight gain strategies. Focus on nutrient-dense foods and strength training.';
        } else if (bmi < 25) {
            return 'Maintain your current weight with balanced nutrition and regular exercise.';
        } else if (bmi < 30) {
            return 'Consider moderate weight loss through diet and exercise. Aim for 0.5-1kg per week.';
        } else {
            return 'Consult a healthcare provider for a comprehensive weight management plan.';
        }
    }

    function displayBMIResult(bmi, category, recommendation) {
        const resultValue = document.getElementById('resultValue');
        const resultDescription = document.getElementById('resultDescription');
        const resultCategory = document.getElementById('resultCategory');
        
        resultValue.textContent = bmi.toFixed(1);
        resultCategory.textContent = category;
        resultDescription.textContent = recommendation;
        
        // Add color coding based on BMI category
        resultValue.className = 'result-value';
        if (bmi < 18.5) {
            resultValue.classList.add('underweight');
        } else if (bmi < 25) {
            resultValue.classList.add('normal');
        } else if (bmi < 30) {
            resultValue.classList.add('overweight');
        } else {
            resultValue.classList.add('obese');
        }
        
        document.getElementById('result').style.display = 'block';
        
        // Scroll to result
        document.getElementById('result').scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
        });
    }

    function showError(input, message) {
        clearError(input);
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.style.color = '#ef4444';
        errorDiv.style.fontSize = '0.875rem';
        errorDiv.style.marginTop = '0.5rem';
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
});

// Input validation helper
function validateNumberInput(input, min, max) {
    const value = parseFloat(input.value);
    if (isNaN(value) || value < min || value > max) {
        input.style.borderColor = '#ef4444';
        return false;
    }
    input.style.borderColor = '#e5e7eb';
    return true;
}
