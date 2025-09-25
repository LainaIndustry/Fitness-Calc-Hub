// Heart Rate Calculator Logic
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('heartRateForm');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const age = parseFloat(document.getElementById('age').value);
        const restingHR = parseFloat(document.getElementById('restingHR').value);
        const fitnessLevel = document.getElementById('fitnessLevel').value;

        // Validate inputs
        if (!validateInputs(age, restingHR)) {
            return;
        }

        // Calculate heart rate zones using different methods
        const traditionalZones = calculateTraditionalZones(age);
        const karvonenZones = calculateKarvonenZones(age, restingHR);
        const mhr = calculateMaxHR(age, fitnessLevel);
        
        // Display results
        displayHeartRateResults(traditionalZones, karvonenZones, mhr, restingHR);
    });

    function validateInputs(age, restingHR) {
        let isValid = true;

        if (isNaN(age) || age < 15 || age > 100) {
            showError(document.getElementById('age'), 'Please enter an age between 15 and 100');
            isValid = false;
        } else {
            clearError(document.getElementById('age'));
        }

        if (isNaN(restingHR) || restingHR < 40 || restingHR > 100) {
            showError(document.getElementById('restingHR'), 'Please enter a resting heart rate between 40 and 100 bpm');
            isValid = false;
        } else {
            clearError(document.getElementById('restingHR'));
        }

        return isValid;
    }

    function calculateMaxHR(age, fitnessLevel) {
        // Different formulas based on fitness level
        const formulas = {
            'beginner': age => 220 - age, // Traditional
            'intermediate': age => 208 - (0.7 * age), // Tanaka
            'advanced': age => 211 - (0.64 * age) // Miller
        };
        
        return Math.round(formulas[fitnessLevel](age));
    }

    function calculateTraditionalZones(age) {
        const maxHR = 220 - age;
        return {
            zone1: { min: Math.round(maxHR * 0.50), max: Math.round(maxHR * 0.60), name: 'Very Light' },
            zone2: { min: Math.round(maxHR * 0.60), max: Math.round(maxHR * 0.70), name: 'Light' },
            zone3: { min: Math.round(maxHR * 0.70), max: Math.round(maxHR * 0.80), name: 'Moderate' },
            zone4: { min: Math.round(maxHR * 0.80), max: Math.round(maxHR * 0.90), name: 'Hard' },
            zone5: { min: Math.round(maxHR * 0.90), max: maxHR, name: 'Maximum' }
        };
    }

    function calculateKarvonenZones(age, restingHR) {
        const maxHR = 220 - age;
        const reserveHR = maxHR - restingHR;
        
        return {
            zone1: { 
                min: Math.round(restingHR + (reserveHR * 0.50)), 
                max: Math.round(restingHR + (reserveHR * 0.60)), 
                name: 'Very Light' 
            },
            zone2: { 
                min: Math.round(restingHR + (reserveHR * 0.60)), 
                max: Math.round(restingHR + (reserveHR * 0.70)), 
                name: 'Light' 
            },
            zone3: { 
                min: Math.round(restingHR + (reserveHR * 0.70)), 
                max: Math.round(restingHR + (reserveHR * 0.80)), 
                name: 'Moderate' 
            },
            zone4: { 
                min: Math.round(restingHR + (reserveHR * 0.80)), 
                max: Math.round(restingHR + (reserveHR * 0.90)), 
                name: 'Hard' 
            },
            zone5: { 
                min: Math.round(restingHR + (reserveHR * 0.90)), 
                max: maxHR, 
                name: 'Maximum' 
            }
        };
    }

    function displayHeartRateResults(traditionalZones, karvonenZones, mhr, restingHR) {
        const resultValue = document.getElementById('resultValue');
        const resultDescription = document.getElementById('resultDescription');
        const zonesInfo = document.getElementById('zonesInfo');

        resultValue.textContent = `${mhr} bpm`;
        resultDescription.textContent = `Maximum Heart Rate`;

        let zonesHTML = `
            <h4>Heart Rate Zones</h4>
            <div class="zones-comparison">
                <div class="zones-method">
                    <h5>Traditional Method</h5>
                    ${generateZonesHTML(traditionalZones)}
                </div>
                <div class="zones-method">
                    <h5>Karvonen Method (More Accurate)</h5>
                    ${generateZonesHTML(karvonenZones)}
                </div>
            </div>
            <div class="hr-summary">
                <p><strong>Resting HR:</strong> ${restingHR} bpm</p>
                <p><strong>Max HR:</strong> ${mhr} bpm</p>
                <p><strong>Heart Rate Reserve:</strong> ${mhr - restingHR} bpm</p>
            </div>
        `;

        zonesInfo.innerHTML = zonesHTML;
        document.getElementById('result').style.display = 'block';
        document.getElementById('result').scrollIntoView({ behavior: 'smooth', block: 'center' });
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
});
