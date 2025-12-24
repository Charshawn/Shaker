// ==========================================
// PHONE SCREEN CYCLING
// ==========================================

const screen1 = document.getElementById('screen1');
const screen2 = document.getElementById('screen2');
let currentScreen = 1;

// Cycle between the two screens every 4 seconds
function cycleScreens() {
    if (currentScreen === 1) {
        screen1.classList.remove('active');
        screen2.classList.add('active');
        currentScreen = 2;
    } else {
        screen2.classList.remove('active');
        screen1.classList.add('active');
        currentScreen = 1;
    }
}

// Start cycling after initial load
setTimeout(() => {
    setInterval(cycleScreens, 4000);
}, 2000);

// ==========================================
// AISLE JOURNEY: SCROLL-DRIVEN REVEALS
// ==========================================

const aisleObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    },
    {
        threshold: 0.3,
        rootMargin: '-50px'
    }
);

// Observe all aisle sections
document.querySelectorAll('.aisle-section').forEach(section => {
    aisleObserver.observe(section);
});

// ==========================================
// PARALLAX EFFECT FOR STORY SECTIONS
// ==========================================

let ticking = false;

function applyParallax() {
    const scrolled = window.pageYOffset;

    // Parallax on story blocks
    document.querySelectorAll('.story-block').forEach((block, index) => {
        const offset = (scrolled - block.offsetTop + window.innerHeight) * 0.1;
        if (Math.abs(offset) < 200) { // Performance guard
            block.style.transform = `translateY(${offset}px)`;
        }
    });

    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(applyParallax);
        ticking = true;
    }
});

// ==========================================
// SALT SHAKER LOGO INTERACTION
// ==========================================

const saltShaker = document.getElementById('saltShakerLogo');
let shakeTimeout;

saltShaker.addEventListener('mouseenter', () => {
    saltShaker.style.animation = 'none';
    setTimeout(() => {
        saltShaker.style.animation = 'gentleBounce 3s ease-in-out infinite';
    }, 10);
});

// Shake on click
saltShaker.addEventListener('click', () => {
    saltShaker.style.animation = 'shake 0.5s ease-in-out';

    clearTimeout(shakeTimeout);
    shakeTimeout = setTimeout(() => {
        saltShaker.style.animation = 'gentleBounce 3s ease-in-out infinite';
    }, 500);
});

// Add shake animation
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0) rotate(0deg); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-4px) rotate(-5deg); }
        20%, 40%, 60%, 80% { transform: translateX(4px) rotate(5deg); }
    }
`;
document.head.appendChild(style);

// ==========================================
// FORM HANDLING
// ==========================================

function handleFormSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const emailInput = form.querySelector('.email-input');
    const button = form.querySelector('.cta-button');
    const email = emailInput.value.trim();

    if (!email) return;

    // Store email (you'll replace this with actual API call)
    console.log('Email submitted:', email);

    // Visual feedback
    button.textContent = 'You\'re in! 🎉';
    button.style.background = 'linear-gradient(135deg, #10B981 0%, #059669 100%)';
    emailInput.disabled = true;
    button.disabled = true;

    // Optional: Send to backend
    // fetch('/api/waitlist', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ email })
    // });

    // Reset after 3 seconds for demo purposes
    setTimeout(() => {
        button.textContent = 'Be part of the first pantry';
        button.style.background = 'linear-gradient(135deg, #FF8C00 0%, #FF6B00 100%)';
        emailInput.disabled = false;
        button.disabled = false;
        emailInput.value = '';
    }, 3000);
}

// Attach to both forms
document.getElementById('waitlistForm').addEventListener('submit', handleFormSubmit);
document.getElementById('waitlistFormFinal').addEventListener('submit', handleFormSubmit);

// ==========================================
// INPUT GLOW EFFECT
// ==========================================

document.querySelectorAll('.email-input').forEach(input => {
    input.addEventListener('focus', () => {
        input.style.transition = 'all 0.3s ease, box-shadow 0.3s ease';
    });
});

// ==========================================
// SMOOTH SCROLL POLISH
// ==========================================

// Add smooth momentum to scroll
document.documentElement.style.scrollBehavior = 'smooth';

// ==========================================
// PERFORMANCE: REDUCE MOTION FOR ACCESSIBILITY
// ==========================================

if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // Disable all animations for users who prefer reduced motion
    document.querySelectorAll('*').forEach(el => {
        el.style.animation = 'none';
        el.style.transition = 'none';
    });
}

// ==========================================
// LOADING ANIMATION
// ==========================================

window.addEventListener('load', () => {
    // Fade in hero content
    document.querySelector('.hero-left').style.opacity = '0';
    document.querySelector('.hero-right').style.opacity = '0';

    setTimeout(() => {
        document.querySelector('.hero-left').style.transition = 'opacity 0.8s ease';
        document.querySelector('.hero-left').style.opacity = '1';
    }, 100);

    setTimeout(() => {
        document.querySelector('.hero-right').style.transition = 'opacity 0.8s ease 0.3s';
        document.querySelector('.hero-right').style.opacity = '1';
    }, 200);
});
