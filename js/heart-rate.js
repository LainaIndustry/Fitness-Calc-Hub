// Heart Rate Calculator
document.addEventListener('DOMContentLoaded', function() {
    const heartRateForm = document.getElementById('heart-rate-form');
    
    if (heartRateForm) {
        heartRateForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const age = parseInt(document.getElementById('age').value);
            const restingHR = document.getElementById('resting-hr').value ? parseInt(document.getElementById('resting-hr').value) : null;
            
            if (age) {
                // Calculate maximum heart rate
                const maxHR = 220 - age;
                
                // Calculate heart rate reserve if resting HR is provided
                const hrReserve = restingHR ? maxHR - restingHR : null;
                
                const zones = [
                    { name: 'Zone 1 (Very Light)', min: 0.5, max: 0.6, description: 'Warm-up, recovery, fat burning' },
                    { name: 'Zone 2 (Light)', min: 0.6, max: 0.7, description: 'Basic endurance, improves metabolism' },
                    { name: 'Zone 3 (Moderate)', min: 0.7, max: 0.8, description: 'Aerobic fitness, efficient cardio' },
                    { name: 'Zone 4 (Hard)', min: 0.8, max: 0.9, description: 'Anaerobic threshold, performance' },
                    { name: 'Zone 5 (Maximum)', min: 0.9, max: 1.0, description: 'Peak performance, short bursts' }
                ];
                
                let zonesHTML = '';
                
                zones.forEach(zone => {
                    let minBPM, maxBPM;
                    
                    if (restingHR && hrReserve) {
                        // Using Karvonen formula for more accuracy
                        minBPM = Math.round((hrReserve * zone.min) + restingHR);
                        maxBPM = Math.round((hrReserve * zone.max) + restingHR);
                    } else {
                        // Simple percentage of max HR
                        minBPM = Math.round(maxHR * zone.min);
                        maxBPM = Math.round(maxHR * zone.max);
                    }
                    
                    zonesHTML += `
                        <div style="margin-bottom: 15px; padding: 15px; background: #f8f9fa; border-radius: 5px;">
                            <strong>${zone.name}</strong><br>
                            ${minBPM} - ${maxBPM} BPM<br>
                            <small>${zone.description}</small>
                        </div>
                    `;
                });
                
                const resultElement = document.getElementById('heart-rate-result');
                const zonesContainer = document.getElementById('zones-container');
                
                zonesContainer.innerHTML = `
                    <p><strong>Maximum Heart Rate:</strong> ${maxHR} BPM</p>
                    ${restingHR ? `<p><strong>Resting Heart Rate:</strong> ${restingHR} BPM</p>` : ''}
                    <div style="margin-top: 20px;">
                        <h4>Target Heart Rate Zones:</h4>
                        ${zonesHTML}
                    </div>
                `;
                
                resultElement.style.display = 'block';
            }
        });
    }
});
