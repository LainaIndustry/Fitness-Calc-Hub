// Calorie Calculator Logic
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('calorieForm');
    const goalSelect = document.getElementById('goal');
    const rateSelect = document.getElementById('rate');

    // Update rate options based on goal
    goalSelect.addEventListener('change', function() {
        updateRateOptions(this.value);
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const gender = document.querySelector('input[name="gender"]:checked').value;
        const age = parseFloat(document.getElementById('age').value);
        const weight = parseFloat(document.getElementById('weight').value);
        const height = parseFloat(document.getElementById('height').value);
        const activityLevel = parseFloat(document.getElementById('activity').value);
        const goal = goalSelect.value;
        const rate = parseFloat(rateSelect.value);

        // Validate inputs
        if (!validateInputs(age, weight, height)) {
            return;
        }

        // Calculate BMR
        const bmr = calculateBMR(gender, age, weight, height);
        
        // Calculate maintenance calories
        const maintenance = calculateMaintenance(bmr, activityLevel);
        
        // Calculate target calories
        const targetCalories = calculateTargetCalories(maintenance, goal, rate);
        
        // Calculate macronutrients
        const macros = calculateMacronutrients(targetCalories, goal);
        
        // Display results
        displayCalorieResult(maintenance, targetCalories, goal, rate, macros);
    });

    function updateRateOptions(goal) {
        const rateSelect = document.getElementById('rate');
        rateSelect.innerHTML = '';

        const options = {
            'loss': [
                { value: -250, text: 'Slow (0.25 kg/week)' },
                { value: -500, text: 'Moderate (0.5 kg/week)' },
                { value: -750, text: 'Fast (0.75 kg/week)' },
                { value: -1000, text: 'Aggressive (1 kg/week)' }
            ],
            'maintain': [
                { value: 0, text: 'Maintenance' }
            ],
            'gain': [
                { value: 250, text: 'Slow (0.25 kg/week)' },
                { value: 500, text: 'Moderate (0.5 kg/week)' },
                { value: 750, text: 'Fast (0.75 kg/week)' },
                { value: 1000, text: 'Aggressive (1 kg/week)' }
            ]
        };

        options[goal].forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option.value;
            optionElement.textContent = option.text;
            rateSelect.appendChild(optionElement);
        });
    }

    function validateInputs(age, weight, height) {
        let isValid = true;

        if (isNaN(age) || age < 15 || age > 100) {
            showError(document.getElementById('age'), 'Please enter an age between 15 and 100');
            isValid = false;
        } else {
            clearError(document.getElementById('age'));
        }

        if (isNaN(weight) || weight < 30 || weight > 300) {
            showError(document.getElementById('weight'), 'Please enter a weight between 30 and 300 kg');
            isValid = false;
        } else {
            clearError(document.getElementById('weight'));
        }

        if (isNaN(height) || height < 100 || height > 250) {
            showError(document.getElementById('height'), 'Please enter a height between 100 and 250 cm');
            isValid = false;
        } else {
            clearError(document.getElementById('height'));
        }

        return isValid;
    }

    function calculateBMR(gender, age, weight, height) {
        if (gender === 'male') {
            return (10 * weight) + (6.25 * height) - (5 * age) + 5;
        } else {
            return (10 * weight) + (6.25 * height) - (5 * age) - 161;
        }
    }

    function calculateMaintenance(bmr, activityLevel) {
        return bmr * activityLevel;
    }

    function calculateTargetCalories(maintenance, goal, rate) {
        return maintenance + rate;
    }

    function calculateMacronutrients(calories, goal) {
        let proteinRatio, fatRatio, carbRatio;

        switch(goal) {
            case 'loss':
                proteinRatio = 0.35; // Higher protein for satiety
                fatRatio = 0.25;
                carbRatio = 0.40;
                break;
            case 'gain':
                proteinRatio = 0.30;
                fatRatio = 0.25;
                carbRatio = 0.45; // Higher carbs for energy
                break;
            default: // maintain
                proteinRatio = 0.30;
                fatRatio = 0.30;
                carbRatio = 0.40;
        }

        return {
            protein: Math.round((calories * proteinRatio) / 4), // 4 calories per gram
            fat: Math.round((calories * fatRatio) / 9), // 9 calories per gram
            carbs: Math.round((calories * carbRatio) / 4) // 4 calories per gram
        };
    }

    function displayCalorieResult(maintenance, targetCalories, goal, rate, macros) {
        const resultValue = document.getElementById('resultValue');
        const resultDescription = document.getElementById('resultDescription');
        const macroInfo = document.getElementById('macroInfo');

        resultValue.textContent = `${targetCalories.toFixed(0)} calories/day`;
        
        const goalText = getGoalText(goal, rate);
        resultDescription.textContent = goalText;

        macroInfo.innerHTML = `
            <h4>Macronutrient Breakdown:</h4>
            <div class="macro-grid">
                <div class="macro-item">
                    <h5>Protein</h5>
                    <p>${macros.protein}g</p>
                    <small>${Math.round(macros.protein * 4)} calories</small>
                </div>
                <div class="macro-item">
                    <h5>Carbohydrates</h5>
                    <p>${macros.carbs}g</p>
                    <small>${Math.round(macros.carbs * 4)} calories</small>
                </div>
                <div class="macro-item">
                    <h5>Fat</h5>
                    <p>${macros.fat}g</p>
                    <small>${Math.round(macros.fat * 9)} calories</small>
                </div>
            </div>
            <p class="maintenance-note">Maintenance calories: ${maintenance.toFixed(0)}/day</p>
        `;

        document.getElementById('result').style.display = 'block';
        document.getElementById('result').scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    function getGoalText(goal, rate) {
        const rateKg = Math.abs(rate) / 1000 * 7; // Convert weekly calorie change to kg
        if (goal === 'loss') {
            return `Weight Loss: ${rateKg.toFixed(1)} kg per week`;
        } else if (goal === 'gain') {
            return `Weight Gain: ${rateKg.toFixed(1)} kg per week`;
        } else {
            return 'Weight Maintenance';
        }
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
