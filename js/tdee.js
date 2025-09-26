// TDEE Calculator Logic
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('tdeeForm');
    if (!form) return;

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
        clearErrors();

        if (isNaN(age) || age < 15 || age > 100) {
            showError(document.getElementById('age'), 'Please enter an age between 15 and 100 years');
            isValid = false;
        }

        if (isNaN(weight) || weight < 30 || weight > 300) {
            showError(document.getElementById('weight'), 'Please enter a weight between 30 and 300 kg');
            isValid = false;
        }

        if (isNaN(height) || height < 100 || height > 250) {
            showError(document.getElementById('height'), 'Please enter a height between 100 and 250 cm');
            isValid = false;
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

    function calculateTDEE(bmr, activityLevel) {
        return bmr * activityLevel;
    }

    function calculateGoalCalories(tdee, goal) {
        switch(goal) {
            case 'extreme_loss':
                return { calories: tdee - 1000, description: 'Extreme Weight Loss' };
            case 'loss':
                return { calories: tdee - 500, description: 'Weight Loss' };
            case 'maintain':
                return { calories: tdee, description: 'Weight Maintenance' };
            case 'gain':
                return { calories: tdee + 500, description: 'Weight Gain' };
            case 'extreme_gain':
                return { calories: tdee + 1000, description: 'Extreme Weight Gain' };
            default:
                return { calories: tdee, description: 'Weight Maintenance' };
        }
    }

    function displayTDEEResult(bmr, tdee, goalCalories, goal) {
        const resultValue = document.getElementById('resultValue');
        const resultDescription = document.getElementById('resultDescription');
        const goalInfo = document.getElementById('goalInfo');
        const resultContainer = document.getElementById('result');

        if (resultValue) {
            resultValue.textContent = `${Math.round(tdee)} calories/day`;
        }
        
        if (resultDescription) {
            resultDescription.textContent = `Total Daily Energy Expenditure`;
        }
        
        if (goalInfo) {
            const weeklyChange = Math.abs(tdee - goalCalories.calories) * 7;
            
            goalInfo.innerHTML = `
                <h4>Your Results:</h4>
                <div class="result-grid">
                    <div class="result-item">
                        <span class="result-label">BMR:</span>
                        <span class="result-value">${Math.round(bmr)} calories/day</span>
                    </div>
                    <div class="result-item">
                        <span class="result-label">TDEE:</span>
                        <span class="result-value">${Math.round(tdee)} calories/day</span>
                    </div>
                    <div class="result-item highlight">
                        <span class="result-label">Goal Calories:</span>
                        <span class="result-value">${Math.round(goalCalories.calories)} calories/day</span>
                    </div>
                </div>
            `;
        }
        
        if (resultContainer) {
            resultContainer.style.display = 'block';
            resultContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
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
        if (errorDiv) errorDiv.remove();
        input.style.borderColor = '#e5e7eb';
    }

    function clearErrors() {
        document.querySelectorAll('.error-message').forEach(error => error.remove());
        document.querySelectorAll('input').forEach(input => {
            input.style.borderColor = '#e5e7eb';
        });
    }

    // Input validation
    document.querySelectorAll('input[type="number"]').forEach(input => {
        input.addEventListener('input', function() {
            clearError(this);
        });
        
        input.addEventListener('keypress', function(e) {
            const charCode = e.which ? e.which : e.keyCode;
            if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode !== 46) {
                e.preventDefault();
            }
        });
    });
});
