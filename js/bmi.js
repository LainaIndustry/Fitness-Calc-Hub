// BMI Calculator
document.addEventListener('DOMContentLoaded', function() {
    const bmiForm = document.getElementById('bmi-form');
    
    if (bmiForm) {
        bmiForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const height = parseFloat(document.getElementById('height').value) / 100; // Convert cm to m
            const weight = parseFloat(document.getElementById('weight').value);
            
            if (height && weight) {
                const bmi = weight / (height * height);
                const resultElement = document.getElementById('bmi-result');
                const valueElement = document.getElementById('bmi-value');
                const interpretationElement = document.getElementById('bmi-interpretation');
                
                valueElement.textContent = bmi.toFixed(1);
                
                let interpretation = '';
                if (bmi < 18.5) {
                    interpretation = 'Underweight - You may need to gain weight for optimal health.';
                } else if (bmi < 25) {
                    interpretation = 'Normal weight - Maintain your current weight for good health.';
                } else if (bmi < 30) {
                    interpretation = 'Overweight - Consider losing weight to improve your health.';
                } else {
                    interpretation = 'Obese - Weight loss is recommended for better health outcomes.';
                }
                
                interpretationElement.textContent = interpretation;
                resultElement.style.display = 'block';
            }
        });
    }
});
