// BMR Calculator Logic
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('bmrForm');
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
        
        const gender = document.querySelector('input[name="gender"]:checked').value;
        const age = parseFloat(document.getElementById('age').value);
        const weight = parseFloat(weightInput.value);
        const height = parseFloat(heightInput.value);
        const system = systemSelect.value;

        // Validate inputs
        if (!validateInputs(age, weight, height, system)) {
            return;
        }

        // Convert to metric if imperial
        const weightKg = system === 'metric' ? weight : weight * 0.453592;
        const heightCm = system === 'metric' ? height : height * 2.54;

        // Calculate BMR using Mifflin-St Jeor Equation (most accurate)
        const bmr = calculateBMR(gender, age, weightKg, heightCm);
        
        // Display results
        displayBMRResult(bmr, gender, age, weightKg);
    });

    function validateInputs(age, weight, height, system) {
        let isValid = true;
        const minWeight = system === 'metric' ? 30 : 66;
        const maxWeight = system === 'metric' ? 300 : 660;
        const minHeight = system === 'metric' ? 100 : 39;
        const maxHeight = system === 'metric' ? 250 : 98;

        if (isNaN(age) || age < 15 || age > 100) {
            showError(document.getElementById('age'), 'Please enter an age between 15 and 100');
            isValid = false;
        } else {
            clearError(document.getElementById('age'));
        }

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

    function calculateBMR(gender, age, weightKg, heightCm) {
        // Mifflin-St Jeor Equation
        if (gender === 'male') {
            return (10 * weightKg) + (6.25 * heightCm) - (5 * age) + 5;
        } else {
            return (10 * weightKg) + (6.25 * heightCm) - (5 * age) - 161;
        }
    }

    function displayBMRResult(bmr, gender, age, weightKg) {
        const resultValue = document.getElementById('resultValue');
        const resultDescription = document.getElementById('resultDescription');
        const maintenance = document.getElementById('maintenanceCalories');

        resultValue.textContent = `${bmr.toFixed(0)} calories/day`;
        
        const genderText = gender === 'male' ? 'men' : 'women';
        resultDescription.textContent = `Basal Metabolic Rate for ${age}-year-old ${genderText} weighing ${weightKg.toFixed(1)}kg`;
        
        // Calculate maintenance calories for different activity levels
        const activityLevels = {
            'Sedentary': 1.2,
            'Lightly Active': 1.375,
            'Moderately Active': 1.55,
            'Very Active': 1.725,
            'Extremely Active': 1.9
        };

        let maintenanceHTML = '<h4>Daily Calorie Needs:</h4>';
        for (const [level, multiplier] of Object.entries(activityLevels)) {
            const calories = bmr * multiplier;
            maintenanceHTML += `<p><strong>${level}:</strong> ${calories.toFixed(0)} calories/day</p>`;
        }
        
        maintenance.innerHTML = maintenanceHTML;
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

    function clearResults() {
        document.getElementById('result').style.display = 'none';
    }
});
