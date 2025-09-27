// TDEE Calculator
function initTDEECalculator() {
    const form = document.getElementById('tdee-form');
    const resultDiv = document.getElementById('tdee-result');
    const tdeeValue = document.getElementById('tdee-value');
    const maintenanceValue = document.getElementById('maintenance-value');
    const mildLossValue = document.getElementById('mild-loss-value');
    const lossValue = document.getElementById('loss-value');
    const extremeLossValue = document.getElementById('extreme-loss-value');
    const gainValue = document.getElementById('gain-value');
    
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get BMR first
        const age = parseInt(document.getElementById('age').value);
        const gender = document.querySelector('input[name="gender"]:checked').value;
        const weight = parseFloat(document.getElementById('weight').value);
        const height = parseFloat(document.getElementById('height').value);
        const unit = document.querySelector('input[name="unit"]:checked').value;
        const activity = parseFloat(document.getElementById('activity').value);
        
        // Validate inputs
        if (!validateNumberInput(document.getElementById('age'), 15, 100) || 
            !validateNumberInput(document.getElementById('weight'), 20, 300) ||
            !validateNumberInput(document.getElementById('height'), 50, 250)) {
            return;
        }
        
        // Calculate BMR
        let bmr;
        if (unit === 'metric') {
            if (gender === 'male') {
                bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
            } else {
                bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
            }
        } else {
            if (gender === 'male') {
                bmr = 66 + (6.23 * weight) + (12.7 * height) - (6.8 * age);
            } else {
                bmr = 655 + (4.35 * weight) + (4.7 * height) - (4.7 * age);
            }
        }
        
        // Calculate TDEE
        const tdee = bmr * activity;
        
        // Calculate different calorie goals
        const maintenance = tdee;
        const mildLoss = tdee * 0.9; // 10% deficit
        const loss = tdee * 0.8; // 20% deficit
        const extremeLoss = tdee * 0.7; // 30% deficit
        const gain = tdee * 1.1; // 10% surplus
        
        // Display results
        tdeeValue.textContent = formatNumber(tdee);
        maintenanceValue.textContent = formatNumber(maintenance);
        mildLossValue.textContent = formatNumber(mildLoss);
        lossValue.textContent = formatNumber(loss);
        extremeLossValue.textContent = formatNumber(extremeLoss);
        gainValue.textContent = formatNumber(gain);
        
        resultDiv.style.display = 'block';
    });
    
    // Activity level descriptions
    const activitySelect = document.getElementById('activity');
    const activityDesc = document.getElementById('activity-desc');
    
    const activityDescriptions = {
        '1.2': 'Little or no exercise',
        '1.375': 'Light exercise 1-3 days/week',
        '1.55': 'Moderate exercise 3-5 days/week',
        '1.725': 'Hard exercise 6-7 days/week',
        '1.9': 'Very hard exercise, physical job'
    };
    
    activitySelect.addEventListener('change', function() {
        activityDesc.textContent = activityDescriptions[this.value] || '';
    });
}
