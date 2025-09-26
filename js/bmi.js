// BMI Calculator Logic with AdSense
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
        } else {
            weightUnit.textContent = 'lbs';
            heightUnit.textContent = 'inches';
        }
        clearResults();
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const system = systemSelect.value;
        const weight = parseFloat(weightInput.value);
        const height = parseFloat(heightInput.value);

        if (!validateInputs(weight, height, system)) return;

        const bmi = calculateBMI(weight, height, system);
        const category = getBMICategory(bmi);
        const recommendation = getBMIRecommendation(bmi);
        
        displayBMIResult(bmi, category, recommendation);
    });

    function validateInputs(weight, height, system) {
        const minWeight = system === 'metric' ? 20 : 44;
        const maxWeight = system === 'metric' ? 300 : 660;
        const minHeight = system === 'metric' ? 100 : 39;
        const maxHeight = system === 'metric' ? 250 : 98;

        if (isNaN(weight) || weight < minWeight || weight > maxWeight) {
            showError(weightInput, `Weight must be between ${minWeight}-${maxWeight}`);
            return false;
        }

        if (isNaN(height) || height < minHeight || height > maxHeight) {
            showError(heightInput, `Height must be between ${minHeight}-${maxHeight}`);
            return false;
        }

        return true;
    }

    function calculateBMI(weight, height, system) {
        return system === 'metric' 
            ? weight / ((height / 100) ** 2)
            : (weight / (height ** 2)) * 703;
    }

    function getBMICategory(bmi) {
        if (bmi < 18.5) return 'Underweight';
        if (bmi < 25) return 'Normal weight';
        if (bmi < 30) return 'Overweight';
        return 'Obesity';
    }

    function getBMIRecommendation(bmi) {
        if (bmi < 18.5) return 'Consider consulting a healthcare provider for weight gain strategies.';
        if (bmi < 25) return 'Maintain your current weight with balanced nutrition and regular exercise.';
        if (bmi < 30) return 'Consider moderate weight loss through diet and exercise.';
        return 'Consult a healthcare provider for a comprehensive weight management plan.';
    }

    function displayBMIResult(bmi, category, recommendation) {
        showResult(bmi.toFixed(1), `${category}. ${recommendation}`);
    }

    function showError(input, message) {
        input.style.borderColor = '#ef4444';
        alert(message);
    }

    function clearResults() {
        const result = document.getElementById('result');
        if (result) result.style.display = 'none';
    }
});
