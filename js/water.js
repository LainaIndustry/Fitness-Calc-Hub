// Water Intake Calculator Logic
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('waterForm');
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

        if (isNaN(weight) || weight < minWeight || weight > maxWeight) {
            showError(weightInput, `Please enter a weight between ${minWeight} and ${maxWeight} ${system === 'metric' ? 'kg' : 'lbs'}`);
            isValid = false;
        } else {
            clearError(weightInput);
        }

        return isValid;
    }

    function calculateBaseWater(weight, system) {
        // Convert to kg if imperial
        const weightKg = system === 'metric' ? weight : weight * 0.453592;
        
        // Base formula: 30-35 ml per kg of body weight
        return weightKg * 0.033; // liters
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
                    adjustedWater += 0.3; // +300ml
                    break;
                case 'breastfeeding':
                    adjustedWater += 0.7; // +700ml
                    break;
                case 'illness':
                    adjustedWater *= 1.2;
                    break;
            }
        });

        return Math.max(adjustedWater, 1.5); // Minimum 1.5 liters
    }

    function displayWaterResult(liters, ounces, cups, activity, climate, healthConditions) {
        const resultValue = document.getElementById('resultValue');
        const resultDescription = document.getElementById('resultDescription');
        const detailsInfo = document.getElementById('detailsInfo');

        resultValue.textContent = `${liters.toFixed(1)} liters`;
        resultDescription.textContent = `Recommended Daily Water Intake`;

        const activityText = getActivityText(activity);
        const climateText = getClimateText(climate);
        const healthText = healthConditions.length > 0 ? 
            `Health factors: ${healthConditions.join(', ')}` : 'No special health considerations';

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
                    <h5>Cups (8oz)</h5>
                    <p>${cups.toFixed(0)} cups</p>
                </div>
            </div>
            <div class="water-factors">
                <p><strong>Activity Level:</strong> ${activityText}</p>
                <p><strong>Climate:</strong> ${climateText}</p>
                <p><strong>Health:</strong> ${healthText}</p>
            </div>
            <div class="water-tips">
                <h5>Hydration Tips:</h5>
                <ul>
                    <li>Drink water consistently throughout the day</li>
                    <li>Increase intake during and after exercise</li>
                    <li>Monitor urine color (pale yellow is ideal)</li>
                    <li>Listen to your body's thirst signals</li>
                </ul>
            </div>
        `;

        document.getElementById('result').style.display = 'block';
        document.getElementById('result').scrollIntoView({ behavior: 'smooth', block: 'center' });
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
