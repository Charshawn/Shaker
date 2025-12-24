// ==========================================
// SMOOTH PHONE SCREEN CYCLING WITH SWIPE EFFECT
// ==========================================

const screen1 = document.getElementById('screen1');
const screen2 = document.getElementById('screen2');
let currentScreen = 1;
let cycleInterval;

function cycleScreens() {
    if (currentScreen === 1) {
        // Smooth fade and scale transition
        screen1.style.transform = 'scale(1.05) translateX(-30px)';
        screen1.style.opacity = '0';

        setTimeout(() => {
            screen1.classList.remove('active');
            screen2.classList.add('active');
            screen2.style.transform = 'scale(1) translateX(0)';
            screen2.style.opacity = '1';
        }, 750);

        currentScreen = 2;
    } else {
        screen2.style.transform = 'scale(1.05) translateX(-30px)';
        screen2.style.opacity = '0';

        setTimeout(() => {
            screen2.classList.remove('active');
            screen1.classList.add('active');
            screen1.style.transform = 'scale(1) translateX(0)';
            screen1.style.opacity = '1';
        }, 750);

        currentScreen = 1;
    }
}

// Start cycling after initial page load
setTimeout(() => {
    cycleInterval = setInterval(cycleScreens, 5000);
}, 3000);

// ==========================================
// ENHANCED AISLE JOURNEY: SMOOTH SCROLL REVEALS
// ==========================================

const aisleObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Staggered reveal for child elements
                setTimeout(() => {
                    entry.target.classList.add('in-view');
                }, index * 100);
            }
        });
    },
    {
        threshold: 0.25,
        rootMargin: '-80px'
    }
);

// Observe all aisle sections
document.querySelectorAll('.aisle-section').forEach(section => {
    aisleObserver.observe(section);
});

// ==========================================
// SMOOTHER PARALLAX WITH LERP (LINEAR INTERPOLATION)
// ==========================================

let scrollY = window.pageYOffset;
let targetScrollY = scrollY;
let currentScrollY = scrollY;
let ticking = false;

// Smooth scroll interpolation
function lerp(start, end, factor) {
    return start + (end - start) * factor;
}

function smoothParallax() {
    currentScrollY = lerp(currentScrollY, targetScrollY, 0.1);

    // Apply parallax to story blocks with smooth easing
    document.querySelectorAll('.story-block').forEach((block) => {
        const rect = block.getBoundingClientRect();
        const scrollProgress = 1 - Math.abs(rect.top / window.innerHeight);

        if (scrollProgress > 0 && scrollProgress < 1) {
            const offset = (currentScrollY - block.offsetTop + window.innerHeight) * 0.05;
            block.style.transform = `translateY(${offset}px)`;
        }
    });

    // Apply subtle parallax to phone mockup
    const phone = document.querySelector('.phone-mockup');
    if (phone && currentScrollY < window.innerHeight) {
        const phoneOffset = currentScrollY * 0.15;
        phone.style.transform = `translateY(${phoneOffset}px)`;
    }

    // Continue animation loop
    requestAnimationFrame(smoothParallax);
}

// Update target scroll position
window.addEventListener('scroll', () => {
    targetScrollY = window.pageYOffset;
}, { passive: true });

// Start smooth parallax
smoothParallax();

// ==========================================
// ENHANCED SALT SHAKER INTERACTION
// ==========================================

const saltShaker = document.getElementById('saltShakerLogo');
let isShaking = false;

saltShaker.addEventListener('mouseenter', () => {
    if (!isShaking) {
        saltShaker.style.transform = 'scale(1.1) rotate(5deg)';
    }
});

saltShaker.addEventListener('mouseleave', () => {
    if (!isShaking) {
        saltShaker.style.transform = 'scale(1) rotate(0deg)';
    }
});

// Enhanced shake on click with particles effect
saltShaker.addEventListener('click', (e) => {
    if (isShaking) return;

    isShaking = true;
    saltShaker.style.transition = 'none';
    saltShaker.style.animation = 'shake 0.6s cubic-bezier(0.36, 0.07, 0.19, 0.97)';

    // Create particle burst effect
    createParticleBurst(e.clientX, e.clientY);

    setTimeout(() => {
        saltShaker.style.animation = '';
        saltShaker.style.transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
        isShaking = false;
    }, 600);
});

// Particle burst animation
function createParticleBurst(x, y) {
    const colors = ['#FF8C00', '#FF6B00', '#FFA500'];
    const particleCount = 12;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            width: 8px;
            height: 8px;
            background: ${colors[i % colors.length]};
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
        `;
        document.body.appendChild(particle);

        const angle = (Math.PI * 2 * i) / particleCount;
        const velocity = 100 + Math.random() * 50;
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity;

        particle.animate([
            { transform: 'translate(0, 0) scale(1)', opacity: 1 },
            { transform: `translate(${tx}px, ${ty}px) scale(0)`, opacity: 0 }
        ], {
            duration: 800,
            easing: 'cubic-bezier(0.22, 1, 0.36, 1)'
        }).onfinish = () => particle.remove();
    }
}

// Add shake keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0) rotate(0deg); }
        10% { transform: translateX(-8px) rotate(-8deg); }
        20% { transform: translateX(8px) rotate(8deg); }
        30% { transform: translateX(-8px) rotate(-8deg); }
        40% { transform: translateX(8px) rotate(8deg); }
        50% { transform: translateX(-6px) rotate(-6deg); }
        60% { transform: translateX(6px) rotate(6deg); }
        70% { transform: translateX(-4px) rotate(-4deg); }
        80% { transform: translateX(4px) rotate(4deg); }
        90% { transform: translateX(-2px) rotate(-2deg); }
    }
`;
document.head.appendChild(style);

// ==========================================
// ENHANCED FORM HANDLING WITH SMOOTH FEEDBACK
// ==========================================

function handleFormSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const emailInput = form.querySelector('.email-input');
    const button = form.querySelector('.cta-button');
    const email = emailInput.value.trim();

    if (!email) {
        // Shake effect on empty submission
        emailInput.style.animation = 'shake 0.4s cubic-bezier(0.36, 0.07, 0.19, 0.97)';
        setTimeout(() => emailInput.style.animation = '', 400);
        return;
    }

    // Smooth loading state
    button.style.transform = 'scale(0.95)';
    button.style.opacity = '0.7';
    button.textContent = 'Adding you...';

    setTimeout(() => {
        // Success state with smooth transition
        button.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
        button.style.transform = 'scale(1)';
        button.style.opacity = '1';
        button.textContent = 'You\'re in! 🎉';
        button.style.background = 'linear-gradient(135deg, #10B981 0%, #059669 100%)';

        emailInput.style.borderColor = '#10B981';
        emailInput.style.transform = 'translateY(0) scale(1)';
        emailInput.disabled = true;
        button.disabled = true;

        // Create success confetti
        createConfetti();

        // Optional: Send to backend
        console.log('Email submitted:', email);
    }, 1200);
}

// Confetti celebration
function createConfetti() {
    const colors = ['#FF8C00', '#FF6B00', '#FFA500', '#10B981', '#FFD700'];
    const confettiCount = 30;

    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                left: 50%;
                top: 40%;
                width: ${Math.random() * 10 + 5}px;
                height: ${Math.random() * 10 + 5}px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
                pointer-events: none;
                z-index: 9999;
            `;
            document.body.appendChild(confetti);

            const angle = Math.random() * Math.PI * 2;
            const velocity = 150 + Math.random() * 100;
            const tx = Math.cos(angle) * velocity;
            const ty = Math.sin(angle) * velocity - 100;

            confetti.animate([
                {
                    transform: 'translate(0, 0) rotate(0deg)',
                    opacity: 1
                },
                {
                    transform: `translate(${tx}px, ${ty}px) rotate(${Math.random() * 720}deg)`,
                    opacity: 0
                }
            ], {
                duration: 1200 + Math.random() * 400,
                easing: 'cubic-bezier(0.22, 1, 0.36, 1)'
            }).onfinish = () => confetti.remove();
        }, i * 30);
    }
}

// Attach to both forms
document.getElementById('waitlistForm').addEventListener('submit', handleFormSubmit);
document.getElementById('waitlistFormFinal').addEventListener('submit', handleFormSubmit);

// ==========================================
// SMOOTH INPUT FOCUS EFFECTS
// ==========================================

document.querySelectorAll('.email-input').forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.style.transform = 'scale(1.01)';
    });

    input.addEventListener('blur', () => {
        input.parentElement.style.transform = 'scale(1)';
    });
});

// ==========================================
// INTERSECTION OBSERVER FOR FINAL CTA
// ==========================================

const ctaObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    },
    { threshold: 0.3 }
);

const finalCta = document.querySelector('.final-cta-content');
if (finalCta) {
    finalCta.style.opacity = '0';
    finalCta.style.transform = 'translateY(40px)';
    finalCta.style.transition = 'opacity 1s cubic-bezier(0.22, 1, 0.36, 1), transform 1s cubic-bezier(0.22, 1, 0.36, 1)';
    ctaObserver.observe(finalCta);
}

// ==========================================
// PERFORMANCE: DEBOUNCE RESIZE
// ==========================================

let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Recalculate positions if needed
        targetScrollY = window.pageYOffset;
        currentScrollY = targetScrollY;
    }, 150);
});

// ==========================================
// PREFERS REDUCED MOTION SUPPORT
// ==========================================

if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // Disable smooth animations for accessibility
    document.querySelectorAll('*').forEach(el => {
        el.style.animation = 'none !important';
        el.style.transition = 'none !important';
    });
}
