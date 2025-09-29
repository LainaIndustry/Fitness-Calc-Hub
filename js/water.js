// Water Intake Calculator
document.addEventListener('DOMContentLoaded', function() {
    const waterForm = document.getElementById('water-form');
    const waterResults = document.getElementById('water-results');
    
    if (waterForm) {
        waterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            calculateWaterNeeds();
        });
        
        // Add reset functionality
        const resetBtn = document.getElementById('water-reset');
        if (resetBtn) {
            resetBtn.addEventListener('click', function() {
                resetForm('water-form', 'water-results');
            });
        }
    }
});

function calculateWaterNeeds() {
    const weight = parseFloat(document.getElementById('weight').value);
    const activity = document.getElementById('activity').value;
    const unit = document.getElementById('unit').value;
    
    // Validation
    if (!validateNumber(weight, 1, 500)) {
        alert('Please enter a valid weight value');
        return;
    }
    
    let waterIntake;
    
    // Calculate water needs based on weight
    if (unit === 'metric') {
        // Metric: weight in kg
        waterIntake = weight * 0.033; // 33ml per kg
    } else {
        // Imperial: weight in lbs
        waterIntake = (weight / 2.2) * 0.033; // Convert to kg first
    }
    
    // Adjust for activity level
    const activityMultipliers = {
        sedentary: 1,
        light: 1.2,
        moderate: 1.4,
        active: 1.6,
        veryActive: 1.8
    };
    
    waterIntake *= activityMultipliers[activity];
    
    // Convert to liters and round to 2 decimal places
    waterIntake = Math.round(waterIntake * 100) / 100;
    
    // Convert to cups (1 liter = 4.22675 cups)
    const cups = Math.round(waterIntake * 4.22675 * 10) / 10;
    
    // Convert to ounces (1 liter = 33.814 ounces)
    const ounces = Math.round(waterIntake * 33.814);
    
    // Show results
    const resultText = `Your daily water intake should be ${waterIntake} liters`;
    const descriptionText = `<p>This is approximately ${cups} cups or ${ounces} ounces of water per day.</p>
                            <p><strong>Note:</strong> This is a general recommendation. Your actual needs may vary based on climate, health conditions, and other factors.</p>
                            <p><strong>Tips for staying hydrated:</strong></p>
                            <ul>
                                <li>Carry a water bottle with you throughout the day</li>
                                <li>Drink water before, during, and after exercise</li>
                                <li>Eat water-rich foods like fruits and vegetables</li>
                                <li>Drink when you're thirsty - don't wait until you're dehydrated</li>
                            </ul>`;
    
    showResults('water-results', resultText, descriptionText);
}
