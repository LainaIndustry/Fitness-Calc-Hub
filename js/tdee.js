// TDEE Calculator Logic
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('tdeeForm');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const gender = document.querySelector('input[name="gender"]:checked').value;
        const age = parseFloat(document.getElementById('age').value);
        const weight = parseFloat(document.getElementById('weight').value);
        const height = parseFloat(document.getElementById('height').value);
        const activityLevel = parseFloat(document.getElementById('activity').value);
        const goal = document.getElementById('goal').value;

        // Validate inputs
        if (!validateInputs(age, weight, height)) {
            return;
        }

        // Calculate BMR first
        const bmr = calculateBMR(gender, age, weight, height);
        
        // Calculate TDEE
        const tdee = calculateTDEE(bmr, activityLevel);
        
        // Calculate goal calories
        const goalCalories = calculateGoalCalories(tdee, goal);
        
        // Display results
        displayTDEEResult(bmr, tdee, goalCalories, goal);
    });

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
        // Mifflin-St Jeor Equation
        if (gender === 'male') {
            return (10 * weight) + (6.25 * height) - (5 * age) + 5;
        } else {
            return (10 * weight) + (6.25 * height) - (5 * age) - 161;
        }
    }

    function calculateTDEE(bmr, activityLevel) {
        return bmr * activityLevel;
    }

    function calculateGoalCalories(tdee, goal) {
        switch(goal) {
            case 'extreme_loss':
                return tdee - 1000;
            case 'loss':
                return tdee - 500;
            case 'maintain':
                return tdee;
            case 'gain':
                return tdee + 500;
            case 'extreme_gain':
                return tdee + 1000;
            default:
                return tdee;
        }
    }

    function displayTDEEResult(bmr, tdee, goalCalories, goal) {
        const resultValue = document.getElementById('resultValue');
        const resultDescription = document.getElementById('resultDescription');
        const goalInfo = document.getElementById('goalInfo');

        resultValue.textContent = `${tdee.toFixed(0)} calories/day`;
        resultDescription.textContent = `Total Daily Energy Expenditure`;
        
        const goalText = getGoalText(goal);
        goalInfo.innerHTML = `
            <h4>Your Results:</h4>
            <p><strong>BMR (Basal Metabolic Rate):</strong> ${bmr.toFixed(0)} calories/day</p>
            <p><strong>TDEE (Maintenance):</strong> ${tdee.toFixed(0)} calories/day</p>
            <p><strong>Goal Calories (${goalText}):</strong> ${goalCalories.toFixed(0)} calories/day</p>
            <p><strong>Weekly ${goal.includes('loss') ? 'Deficit' : 'Surplus'}:</strong> ${Math.abs(tdee - goalCalories) * 7} calories</p>
        `;

        document.getElementById('result').style.display = 'block';
        document.getElementById('result').scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    function getGoalText(goal) {
        const goals = {
            'extreme_loss': 'Extreme Weight Loss',
            'loss': 'Weight Loss',
            'maintain': 'Weight Maintenance',
            'gain': 'Weight Gain',
            'extreme_gain': 'Extreme Weight Gain'
        };
        return goals[goal] || 'Weight Maintenance';
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
