// Water Intake Calculator
function initWaterCalculator() {
    const form = document.getElementById('water-form');
    const resultDiv = document.getElementById('water-result');
    const waterValue = document.getElementById('water-value');
    
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const weight = parseFloat(document.getElementById('weight').value);
        const unit = document.querySelector('input[name="unit"]:checked').value;
        const activity = document.getElementById('activity').value;
        
        // Validate inputs
        if (!validateNumberInput(document.getElementById('weight'), 20, 300)) {
            return;
        }
        
        // Calculate base water needs (ml per kg)
        let baseWater;
        if (unit === 'metric') {
            baseWater = weight * 30; // 30ml per kg
        } else {
            baseWater = weight * 0.5; // 0.5 oz per lb
        }
        
        // Adjust for activity level
        let activityMultiplier = 1;
        switch(activity) {
            case 'sedentary': activityMultiplier = 1; break;
            case 'light': activityMultiplier = 1.2; break;
            case 'moderate': activityMultiplier = 1.5; break;
            case 'heavy': activityMultiplier = 1.8; break;
            case 'extreme': activityMultiplier = 2.0; break;
        }
        
        let totalWater = baseWater * activityMultiplier;
        
        // Convert to appropriate units for display
        let displayValue, unitText;
        
        if (unit === 'metric') {
            // Convert ml to liters if over 1000ml
            if (totalWater >= 1000) {
                displayValue = formatNumber(totalWater / 1000, 1);
                unitText = 'liters';
            } else {
                displayValue = Math.round(totalWater);
                unitText = 'ml';
            }
        } else {
            // Convert oz to cups if over 8oz
            if (totalWater >= 8) {
                displayValue = formatNumber(totalWater / 8, 1);
                unitText = 'cups';
            } else {
                displayValue = Math.round(totalWater);
                unitText = 'oz';
            }
        }
        
        // Display results
        waterValue.textContent = `${displayValue} ${unitText}`;
        resultDiv.style.display = 'block';
    });
}
