// Heart Rate Calculator
document.addEventListener('DOMContentLoaded', function() {
    const heartRateForm = document.getElementById('heart-rate-form');
    const heartRateResults = document.getElementById('heart-rate-results');
    
    if (heartRateForm) {
        heartRateForm.addEventListener('submit', function(e) {
            e.preventDefault();
            calculateHeartRateZones();
        });
        
        // Add reset functionality
        const resetBtn = document.getElementById('heart-rate-reset');
        if (resetBtn) {
            resetBtn.addEventListener('click', function() {
                resetForm('heart-rate-form', 'heart-rate-results');
            });
        }
    }
});

function calculateHeartRateZones() {
    const age = parseInt(document.getElementById('age').value);
    
    // Validation
    if (!validateNumber(age, 1, 120)) {
        alert('Please enter a valid age');
        return;
    }
    
    // Calculate maximum heart rate (using the common 220 - age formula)
    const maxHR = 220 - age;
    
    // Calculate heart rate zones
    const zones = {
        warmUp: {
            min: Math.round(maxHR * 0.5),
            max: Math.round(maxHR * 0.6),
            description: 'Very light, good for recovery and warm-up'
        },
        fatBurning: {
            min: Math.round(maxHR * 0.6),
            max: Math.round(maxHR * 0.7),
            description: 'Light, improves basic endurance and fat burning'
        },
        aerobic: {
            min: Math.round(maxHR * 0.7),
            max: Math.round(maxHR * 0.8),
            description: 'Moderate, improves aerobic capacity'
        },
        anaerobic: {
            min: Math.round(maxHR * 0.8),
            max: Math.round(maxHR * 0.9),
            description: 'Hard, improves anaerobic capacity and threshold'
        },
        maximum: {
            min: Math.round(maxHR * 0.9),
            max: maxHR,
            description: 'Maximum, for interval training and peak performance'
        }
    };
    
    // Show results
    const resultText = `Your maximum heart rate is ${maxHR} BPM`;
    const descriptionText = `<p>Based on your age, here are your heart rate training zones:</p>
                            <ul>
                                <li><strong>Zone 1 (Warm-up):</strong> ${zones.warmUp.min} - ${zones.warmUp.max} BPM<br>${zones.warmUp.description}</li>
                                <li><strong>Zone 2 (Fat Burning):</strong> ${zones.fatBurning.min} - ${zones.fatBurning.max} BPM<br>${zones.fatBurning.description}</li>
                                <li><strong>Zone 3 (Aerobic):</strong> ${zones.aerobic.min} - ${zones.aerobic.max} BPM<br>${zones.aerobic.description}</li>
                                <li><strong>Zone 4 (Anaerobic):</strong> ${zones.anaerobic.min} - ${zones.anaerobic.max} BPM<br>${zones.anaerobic.description}</li>
                                <li><strong>Zone 5 (Maximum):</strong> ${zones.maximum.min} - ${zones.maximum.max} BPM<br>${zones.maximum.description}</li>
                            </ul>
                            <p><strong>Note:</strong> These calculations are estimates. Individual maximum heart rates can vary. Consult with a healthcare professional before starting any new exercise program.</p>`;
    
    showResults('heart-rate-results', resultText, descriptionText);
}
