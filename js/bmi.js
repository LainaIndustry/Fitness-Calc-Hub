document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('bmiForm');
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
            weightInput.placeholder = 'Enter weight in kg';
            heightInput.placeholder = 'Enter height in cm';
        } else {
            weightUnit.textContent = 'lbs';
            heightUnit.textContent = 'inches';
            weightInput.placeholder = 'Enter weight in lbs';
            heightInput.placeholder = 'Enter height in inches';
        }
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const system = systemSelect.value;
        const weight = parseFloat(weightInput.value);
        const height = parseFloat(heightInput.value);

        // Validate inputs
        if (!validateNumberInput(weightInput, 1, 500) || !validateNumberInput(heightInput, 1, 300)) {
            return;
        }

        // Calculate BMI
        let bmi;
        if (system === 'metric') {
            bmi = weight / ((height / 100) ** 2);
        } else {
            bmi = (weight / (height ** 2)) * 703;
        }

        // Determine category
        let category;
        if (bmi < 18.5) {
            category = 'Underweight';
        } else if (bmi < 25) {
            category = 'Normal weight';
        } else if (bmi < 30) {
            category = 'Overweight';
        } else {
            category = 'Obesity';
        }

        showResult(bmi.toFixed(1), `Category: ${category}`);
    });
});
