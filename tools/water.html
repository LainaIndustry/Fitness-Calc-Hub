// Water Intake Calculator
document.addEventListener('DOMContentLoaded', function() {
    const waterForm = document.getElementById('water-form');
    
    if (waterForm) {
        waterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const gender = document.querySelector('input[name="gender"]:checked').value;
            const weight = parseFloat(document.getElementById('weight').value);
            const activityLevel = parseFloat(document.getElementById('activity').value);
            const climate = parseFloat(document.getElementById('climate').value);
            
            if (weight && activityLevel && climate) {
                // Base water calculation: 30-35 ml per kg of body weight
                let baseWater = weight * 0.033; // liters
                
                // Adjust for gender (men typically need more water)
                if (gender === 'male') {
                    baseWater *= 1.1;
                }
                
                // Apply activity and climate multipliers
                const totalWater = baseWater * activityLevel * climate;
                
                const resultElement = document.getElementById('water-result');
                const valueElement = document.getElementById('water-value');
                const interpretationElement = document.getElementById('water-interpretation');
                
                valueElement.textContent = totalWater.toFixed(2);
                
                let interpretation = `You should aim for approximately ${totalWater.toFixed(2)} liters (${(totalWater * 33.814).toFixed(0)} ounces) of water per day. `;
                interpretation += 'This includes water from all sources - drinking water, other beverages, and water-rich foods.';
                
                interpretationElement.textContent = interpretation;
                resultElement.style.display = 'block';
            }
        });
    }
});
