let shakeCount = 0;
const shakeBox = document.getElementById('shakeBox');
const shakeCountDisplay = document.getElementById('shakeCount');
const resetBtn = document.getElementById('resetBtn');

// Click handler
shakeBox.addEventListener('click', () => {
    shake();
});

// Device motion handler for mobile shake detection
if (window.DeviceMotionEvent) {
    let lastX, lastY, lastZ;
    let shakeThreshold = 15;

    window.addEventListener('devicemotion', (event) => {
        const acceleration = event.accelerationIncludingGravity;
        const currentX = acceleration.x;
        const currentY = acceleration.y;
        const currentZ = acceleration.z;

        if (lastX !== undefined) {
            const deltaX = Math.abs(currentX - lastX);
            const deltaY = Math.abs(currentY - lastY);
            const deltaZ = Math.abs(currentZ - lastZ);

            if (deltaX > shakeThreshold || deltaY > shakeThreshold || deltaZ > shakeThreshold) {
                shake();
            }
        }

        lastX = currentX;
        lastY = currentY;
        lastZ = currentZ;
    });
}

// Shake function
function shake() {
    shakeCount++;
    shakeCountDisplay.textContent = shakeCount;

    // Add shake animation
    shakeBox.classList.add('shaking');

    // Remove animation class after it completes
    setTimeout(() => {
        shakeBox.classList.remove('shaking');
    }, 500);

    // Save to localStorage
    localStorage.setItem('shakeCount', shakeCount);
}

// Reset button handler
resetBtn.addEventListener('click', () => {
    shakeCount = 0;
    shakeCountDisplay.textContent = shakeCount;
    localStorage.removeItem('shakeCount');
});

// Load saved count on page load
window.addEventListener('load', () => {
    const savedCount = localStorage.getItem('shakeCount');
    if (savedCount) {
        shakeCount = parseInt(savedCount);
        shakeCountDisplay.textContent = shakeCount;
    }
});
