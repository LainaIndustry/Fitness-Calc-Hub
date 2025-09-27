// Heart Rate Calculator
function initHeartRateCalculator() {
    const form = document.getElementById('heart-rate-form');
    const resultDiv = document.getElementById('heart-rate-result');
    const maxRateValue = document.getElementById('max-rate-value');
    const targetMinValue = document.getElementById('target-min-value');
    const targetMaxValue = document.getElementById('target-max-value');
    
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const age = parseInt(document.getElementById('age').value);
        const restingRate = parseInt(document.getElementById('resting-rate').value);
        
        // Validate inputs
        if (!validateNumberInput(document.getElementById('age'), 15, 100) || 
            !validateNumberInput(document.getElementById('resting-rate'), 40, 100)) {
            return;
        }
        
        // Calculate maximum heart rate (using Tanaka formula)
        const maxRate = 208 - (0.7 * age);
        
        // Calculate heart rate reserve (Karvonen formula)
        const reserve = maxRate - restingRate;
        
        // Calculate target zones (50-85% of reserve)
        const targetMin = Math.round(restingRate + (reserve * 0.5));
        const targetMax = Math.round(restingRate + (reserve * 0.85));
        
        // Display results
        maxRateValue.textContent = Math.round(maxRate);
        targetMinValue.textContent = targetMin;
        targetMaxValue.textContent = targetMax;
        
        resultDiv.style.display = 'block';
    });
}
