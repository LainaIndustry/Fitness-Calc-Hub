// Water Intake Calculator Logic
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('waterForm');
    if (!form) return;

    const systemSelect = document.getElementById('system');
    const weightInput = document.getElementById('weight');
    const weightUnit = document.getElementById('weightUnit');

    // Update units based on measurement system
    systemSelect.addEventListener('change', function() {
        if (this.value === 'metric') {
            weightUnit.textContent = 'kg';
            weightInput.placeholder = 'Enter weight in kg';
        } else {
            weightUnit.textContent = 'lbs';
            weightInput.placeholder = 'Enter weight in lbs';
        }
        clearResults();
        clearErrors();
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const weight = parseFloat(weightInput.value);
        const system = systemSelect.value;
        const activity = parseFloat(document.getElementById('activity').value);
        const climate = document.getElementById('climate').value;
        const healthConditions = Array.from(document.querySelectorAll('input[name="health"]:checked')).map(cb => cb.value);

        // Validate inputs
        if (!validateInputs(weight, system)) {
            return;
        }

        // Calculate base water needs
        const baseWater = calculateBaseWater(weight, system);
        
        // Apply adjustments
        const adjustedWater = applyAdjustments(baseWater, activity, climate, healthConditions);
        
        // Convert to different units
        const waterInLiters = adjustedWater;
        const waterInOunces = adjustedWater * 33.814;
        const waterInCups = adjustedWater * 4.22675;
        
        // Display results
        displayWaterResult(waterInLiters, waterInOunces, waterInCups, activity, climate, healthConditions);
    });

    function validateInputs(weight, system) {
        let isValid = true;
        const minWeight = system === 'metric' ? 30 : 66;
        const maxWeight = system === 'metric' ? 300 : 660;

        clearErrors();

        if (isNaN(weight) || weight < minWeight || weight > maxWeight) {
            showError(weightInput, `Please enter a weight between ${minWeight} and ${maxWeight} ${system === 'metric' ? 'kg' : 'lbs'}`);
            isValid = false;
        }

        return isValid;
    }

    function calculateBaseWater(weight, system) {
        // Convert to kg if imperial
        const weightKg = system === 'metric' ? weight : weight * 0.453592;
        
        // Base formula: 35 ml per kg of body weight
        return weightKg * 0.035;
    }

    function applyAdjustments(baseWater, activity, climate, healthConditions) {
        let adjustedWater = baseWater;

        // Activity adjustment
        adjustedWater *= activity;

        // Climate adjustment
        if (climate === 'hot') {
            adjustedWater *= 1.2;
        } else if (climate === 'very_hot') {
            adjustedWater *= 1.5;
        }

        // Health conditions adjustment
        healthConditions.forEach(condition => {
            switch(condition) {
                case 'pregnant':
                    adjustedWater += 0.3;
                    break;
                case 'breastfeeding':
                    adjustedWater += 0.7;
                    break;
                case 'illness':
                    adjustedWater *= 1.2;
                    break;
            }
        });

        return Math.max(adjustedWater, 1.5);
    }

    function displayWaterResult(liters, ounces, cups, activity, climate, healthConditions) {
        const resultValue = document.getElementById('resultValue');
        const resultDescription = document.getElementById('resultDescription');
        const detailsInfo = document.getElementById('detailsInfo');
        const resultContainer = document.getElementById('result');

        if (resultValue) {
            resultValue.textContent = `${liters.toFixed(1)} liters`;
        }
        
        if (resultDescription) {
            resultDescription.textContent = `Recommended Daily Water Intake`;
        }
        
        if (detailsInfo) {
            const activityText = getActivityText(activity);
            const climateText = getClimateText(climate);

            detailsInfo.innerHTML = `
                <h4>Water Intake Details</h4>
                <div class="water-units">
                    <div class="unit-item">
                        <h5>Liters</h5>
                        <p>${liters.toFixed(1)} L</p>
                    </div>
                    <div class="unit-item">
                        <h5>Ounces</h5>
                        <p>${ounces.toFixed(0)} oz</p>
                    </div>
                    <div class="unit-item">
                        <h5>Cups</h5>
                        <p>${cups.toFixed(0)} cups</p>
                    </div>
                </div>
                <div class="water-factors">
                    <p><strong>Activity Level:</strong> ${activityText}</p>
                    <p><strong>Climate:</strong> ${climateText}</p>
                </div>
            `;
        }
        
        if (resultContainer) {
            resultContainer.style.display = 'block';
            resultContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    function getActivityText(activity) {
        const activities = {
            1.0: 'Sedentary',
            1.2: 'Light Activity',
            1.5: 'Moderate Activity',
            1.8: 'Active',
            2.0: 'Very Active'
        };
        return activities[activity] || 'Moderate Activity';
    }

    function getClimateText(climate) {
        const climates = {
            'normal': 'Temperate',
            'hot': 'Hot',
            'very_hot': 'Very Hot'
        };
        return climates[climate] || 'Temperate';
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
    weightInput.addEventListener('input', function() {
        clearError(this);
    });
    
    weightInput.addEventListener('keypress', function(e) {
        const charCode = e.which ? e.which : e.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode !== 46) {
            e.preventDefault();
        }
    });
});
