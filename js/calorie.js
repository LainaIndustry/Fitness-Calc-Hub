// Heart Rate Calculator Logic
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('heartRateForm');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const age = parseFloat(document.getElementById('age').value);
        const restingHR = parseFloat(document.getElementById('restingHR').value);
        const fitnessLevel = document.getElementById('fitnessLevel').value;
        const goal = document.getElementById('goal').value;

        // Validate inputs
        if (!validateInputs(age, restingHR)) {
            return;
        }

        // Calculate heart rate zones
        const traditionalZones = calculateTraditionalZones(age);
        const karvonenZones = calculateKarvonenZones(age, restingHR);
        const mhr = calculateMaxHR(age, fitnessLevel);
        
        // Get target zone based on goal
        const targetZone = getTargetZone(goal, karvonenZones);
        
        // Display results
        displayHeartRateResults(traditionalZones, karvonenZones, mhr, restingHR, targetZone);
    });

    function validateInputs(age, restingHR) {
        let isValid = true;
        clearErrors();

        if (isNaN(age) || age < 15 || age > 100) {
            showError(document.getElementById('age'), 'Please enter an age between 15 and 100 years');
            isValid = false;
        }

        if (isNaN(restingHR) || restingHR < 40 || restingHR > 100) {
            showError(document.getElementById('restingHR'), 'Please enter a resting heart rate between 40 and 100 bpm');
            isValid = false;
        }

        return isValid;
    }

    function calculateMaxHR(age, fitnessLevel) {
        const formulas = {
            'beginner': age => 220 - age,
            'intermediate': age => 208 - (0.7 * age),
            'advanced': age => 211 - (0.64 * age)
        };
        
        return Math.round(formulas[fitnessLevel](age));
    }

    function calculateTraditionalZones(age) {
        const maxHR = 220 - age;
        return {
            zone1: { min: Math.round(maxHR * 0.50), max: Math.round(maxHR * 0.60), name: 'Very Light', intensity: '50-60%' },
            zone2: { min: Math.round(maxHR * 0.60), max: Math.round(maxHR * 0.70), name: 'Light', intensity: '60-70%' },
            zone3: { min: Math.round(maxHR * 0.70), max: Math.round(maxHR * 0.80), name: 'Moderate', intensity: '70-80%' },
            zone4: { min: Math.round(maxHR * 0.80), max: Math.round(maxHR * 0.90), name: 'Hard', intensity: '80-90%' },
            zone5: { min: Math.round(maxHR * 0.90), max: maxHR, name: 'Maximum', intensity: '90-100%' }
        };
    }

    function calculateKarvonenZones(age, restingHR) {
        const maxHR = 220 - age;
        const reserveHR = maxHR - restingHR;
        
        return {
            zone1: { 
                min: Math.round(restingHR + (reserveHR * 0.50)), 
                max: Math.round(restingHR + (reserveHR * 0.60)), 
                name: 'Very Light',
                intensity: '50-60%'
            },
            zone2: { 
                min: Math.round(restingHR + (reserveHR * 0.60)), 
                max: Math.round(restingHR + (reserveHR * 0.70)), 
                name: 'Light',
                intensity: '60-70%'
            },
            zone3: { 
                min: Math.round(restingHR + (reserveHR * 0.70)), 
                max: Math.round(restingHR + (reserveHR * 0.80)), 
                name: 'Moderate',
                intensity: '70-80%'
            },
            zone4: { 
                min: Math.round(restingHR + (reserveHR * 0.80)), 
                max: Math.round(restingHR + (reserveHR * 0.90)), 
                name: 'Hard',
                intensity: '80-90%'
            },
            zone5: { 
                min: Math.round(restingHR + (reserveHR * 0.90)), 
                max: maxHR, 
                name: 'Maximum',
                intensity: '90-100%'
            }
        };
    }

    function getTargetZone(goal, zones) {
        const zoneMapping = {
            'fat_burn': zones.zone2,
            'cardio': zones.zone3,
            'endurance': zones.zone3,
            'performance': zones.zone4
        };
        return zoneMapping[goal] || zones.zone3;
    }

    function displayHeartRateResults(traditionalZones, karvonenZones, mhr, restingHR, targetZone) {
        const resultValue = document.getElementById('resultValue');
        const resultDescription = document.getElementById('resultDescription');
        const zonesInfo = document.getElementById('zonesInfo');
        const resultContainer = document.getElementById('result');

        if (resultValue) {
            resultValue.textContent = `${mhr} bpm`;
        }
        
        if (resultDescription) {
            resultDescription.textContent = `Maximum Heart Rate`;
        }
        
        if (zonesInfo) {
            zonesInfo.innerHTML = `
                <h4>Heart Rate Zones</h4>
                
                <div class="target-zone">
                    <h5>Recommended Zone:</h5>
                    <div class="zone-highlight">
                        <span class="zone-range">${targetZone.min}-${targetZone.max} bpm</span>
                        <span class="zone-intensity">(${targetZone.intensity})</span>
                    </div>
                </div>

                <div class="zones-comparison">
                    <div class="zones-method">
                        <h5>Traditional Method</h5>
                        ${generateZonesHTML(traditionalZones)}
                    </div>
                    <div class="zones-method">
                        <h5>Karvonen Method</h5>
                        ${generateZonesHTML(karvonenZones)}
                    </div>
                </div>
                
                <div class="hr-summary">
                    <h5>Summary:</h5>
                    <p><strong>Resting HR:</strong> ${restingHR} bpm</p>
                    <p><strong>Max HR:</strong> ${mhr} bpm</p>
                </div>
            `;
        }
        
        if (resultContainer) {
            resultContainer.style.display = 'block';
            resultContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    function generateZonesHTML(zones) {
        let html = '';
        for (const [key, zone] of Object.entries(zones)) {
            html += `
                <div class="zone-item">
                    <span class="zone-name">${zone.name}</span>
                    <span class="zone-range">${zone.min}-${zone.max} bpm</span>
                </div>
            `;
        }
        return html;
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

    // Input validation
    document.querySelectorAll('input[type="number"]').forEach(input => {
        input.addEventListener('input', function() {
            clearError(this);
        });
        
        input.addEventListener('keypress', function(e) {
            const charCode = e.which ? e.which : e.keyCode;
            if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode !== 46) {
                e.preventDefault();
            }
        });
    });
});
