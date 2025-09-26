// BMR Calculator Logic
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('bmrForm');
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
        clearErrors();
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

        // Calculate BMR using Mifflin-St Jeor Equation
        const bmr = calculateBMR(gender, age, weightKg, heightCm);
        
        // Calculate maintenance calories for different activity levels
        const maintenanceCalories = calculateMaintenanceCalories(bmr);
        
        // Display results
        displayBMRResult(bmr, maintenanceCalories, gender, age, weightKg);
    });

    function validateInputs(age, weight, height, system) {
        let isValid = true;
        const minWeight = system === 'metric' ? 30 : 66;
        const maxWeight = system === 'metric' ? 300 : 660;
        const minHeight = system === 'metric' ? 100 : 39;
        const maxHeight = system === 'metric' ? 250 : 98;

        clearErrors();

        if (isNaN(age) || age < 15 || age > 100) {
            showError(document.getElementById('age'), 'Please enter an age between 15 and 100 years');
            isValid = false;
        }

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

    function calculateBMR(gender, age, weightKg, heightCm) {
        // Mifflin-St Jeor Equation
        if (gender === 'male') {
            return (10 * weightKg) + (6.25 * heightCm) - (5 * age) + 5;
        } else {
            return (10 * weightKg) + (6.25 * heightCm) - (5 * age) - 161;
        }
    }

    function calculateMaintenanceCalories(bmr) {
        return {
            sedentary: Math.round(bmr * 1.2),
            light: Math.round(bmr * 1.375),
            moderate: Math.round(bmr * 1.55),
            active: Math.round(bmr * 1.725),
            veryActive: Math.round(bmr * 1.9)
        };
    }

    function displayBMRResult(bmr, maintenance, gender, age, weightKg) {
        const resultValue = document.getElementById('resultValue');
        const resultDescription = document.getElementById('resultDescription');
        const maintenanceCalories = document.getElementById('maintenanceCalories');
        const resultContainer = document.getElementById('result');

        if (resultValue) {
            resultValue.textContent = `${Math.round(bmr)} calories/day`;
        }
        
        if (resultDescription) {
            const genderText = gender === 'male' ? 'men' : 'women';
            resultDescription.textContent = `Basal Metabolic Rate for ${age}-year-old ${genderText}`;
        }
        
        if (maintenanceCalories) {
            maintenanceCalories.innerHTML = `
                <h4>Daily Calorie Needs Based on Activity:</h4>
                <div class="maintenance-grid">
                    <div class="maintenance-item">
                        <span class="activity-level">Sedentary:</span>
                        <span class="calories">${maintenance.sedentary} calories/day</span>
                    </div>
                    <div class="maintenance-item">
                        <span class="activity-level">Light Exercise:</span>
                        <span class="calories">${maintenance.light} calories/day</span>
                    </div>
                    <div class="maintenance-item">
                        <span class="activity-level">Moderate Exercise:</span>
                        <span class="calories">${maintenance.moderate} calories/day</span>
                    </div>
                    <div class="maintenance-item">
                        <span class="activity-level">Active:</span>
                        <span class="calories">${maintenance.active} calories/day</span>
                    </div>
                    <div class="maintenance-item">
                        <span class="activity-level">Very Active:</span>
                        <span class="calories">${maintenance.veryActive} calories/day</span>
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

    function clearResults() {
        const resultContainer = document.getElementById('result');
        if (resultContainer) resultContainer.style.display = 'none';
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
