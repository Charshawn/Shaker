// ==========================================
// HERO HEADLINE WORD CASCADE
// ==========================================

// Split headline into individual words for cascade animation
const headline = document.querySelector('.hero-headline');
if (headline) {
    const text = headline.textContent;
    const words = text.split(' ');
    headline.innerHTML = words.map(word => `<span class="word">${word} </span>`).join('');
}

// ==========================================
// LEFT-TO-RIGHT SWIPE TRANSITION FOR PHONE SCREENS
// ==========================================

const screen1 = document.getElementById('screen1');
const screen2 = document.getElementById('screen2');
let currentScreen = 1;
let cycleInterval;

function cycleScreens() {
    if (currentScreen === 1) {
        // Current screen exits to the right
        screen1.classList.add('exiting');

        // Next screen enters from the left
        setTimeout(() => {
            screen1.classList.remove('active');
            screen2.classList.add('active');
            screen1.classList.remove('exiting');
        }, 100);

        currentScreen = 2;
    } else {
        // Current screen exits to the right
        screen2.classList.add('exiting');

        // Next screen enters from the left
        setTimeout(() => {
            screen2.classList.remove('active');
            screen1.classList.add('active');
            screen2.classList.remove('exiting');
        }, 100);

        currentScreen = 1;
    }
}

// Start cycling after initial page load
setTimeout(() => {
    cycleInterval = setInterval(cycleScreens, 5000);
}, 3000);

// ==========================================
// HIGHLY INTERACTIVE SCROLL-LINKED ANIMATIONS
// ==========================================

// Scroll state
let scrollY = 0;
let targetScrollY = 0;
let scrollVelocity = 0;
let lastScrollY = 0;

// Update scroll position
function updateScroll() {
    targetScrollY = window.pageYOffset;
    scrollVelocity = Math.abs(targetScrollY - lastScrollY);
    lastScrollY = targetScrollY;
}

window.addEventListener('scroll', updateScroll, { passive: true });

// Calculate element scroll progress (0 to 1)
function getScrollProgress(element) {
    const rect = element.getBoundingClientRect();
    const elementTop = rect.top;
    const elementHeight = rect.height;
    const windowHeight = window.innerHeight;

    // Element is centered in viewport = 1, offscreen = 0
    const scrollProgress = 1 - Math.abs(elementTop - (windowHeight / 2)) / (windowHeight / 2 + elementHeight / 2);

    return Math.max(0, Math.min(1, scrollProgress));
}

// Easing functions for different effects
const easing = {
    easeOutCubic: (t) => 1 - Math.pow(1 - t, 3),
    easeOutQuart: (t) => 1 - Math.pow(1 - t, 4),
    easeOutElastic: (t) => {
        const c4 = (2 * Math.PI) / 3;
        return t === 0 ? 0 : t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
    }
};

// Animate story sections with vertical cascade
function animateStorySections() {
    const sections = document.querySelectorAll('.aisle-section');

    sections.forEach((section) => {
        const progress = getScrollProgress(section);
        const aisleType = section.dataset.aisle;

        const label = section.querySelector('.story-label');
        const heading = section.querySelector('.story-heading');
        const text = section.querySelector('.story-text');
        const background = section.querySelector('.aisle-section::before') || section;

        // Different choreography for each section
        if (aisleType === 'problem') {
            // Label drops from above
            if (label) {
                const labelProgress = easing.easeOutCubic(Math.max(0, (progress - 0.1) * 1.5));
                label.style.opacity = labelProgress;
                label.style.transform = `translateY(${(1 - labelProgress) * -40}px) rotate(${(1 - labelProgress) * -2}deg)`;
            }

            // Heading rises from below
            if (heading) {
                const headingProgress = easing.easeOutQuart(Math.max(0, (progress - 0.2) * 1.4));
                heading.style.opacity = headingProgress;
                heading.style.transform = `translateY(${(1 - headingProgress) * 50}px) scale(${0.95 + headingProgress * 0.05})`;
            }

            // Text fades in place
            if (text) {
                const textProgress = easing.easeOutCubic(Math.max(0, (progress - 0.3) * 1.3));
                text.style.opacity = textProgress;
                text.style.filter = `blur(${(1 - textProgress) * 8}px)`;
            }
        } else if (aisleType === 'tension') {
            // Label rises from below
            if (label) {
                const labelProgress = easing.easeOutCubic(Math.max(0, (progress - 0.1) * 1.5));
                label.style.opacity = labelProgress;
                label.style.transform = `translateY(${(1 - labelProgress) * 30}px)`;
            }

            // Heading drops from above
            if (heading) {
                const headingProgress = easing.easeOutQuart(Math.max(0, (progress - 0.2) * 1.4));
                heading.style.opacity = headingProgress;
                heading.style.transform = `translateY(${(1 - headingProgress) * -50}px) scale(${0.95 + headingProgress * 0.05})`;
            }

            // Text slides up
            if (text) {
                const textProgress = easing.easeOutCubic(Math.max(0, (progress - 0.3) * 1.3));
                text.style.opacity = textProgress;
                text.style.transform = `translateY(${(1 - textProgress) * 20}px)`;
            }
        } else if (aisleType === 'solution') {
            // Label scales from larger
            if (label) {
                const labelProgress = easing.easeOutCubic(Math.max(0, (progress - 0.1) * 1.5));
                label.style.opacity = labelProgress;
                label.style.transform = `scale(${1.05 - labelProgress * 0.05})`;
            }

            // Heading rises with elastic bounce
            if (heading) {
                const headingProgress = easing.easeOutElastic(Math.max(0, (progress - 0.2) * 1.4));
                heading.style.opacity = Math.min(1, progress * 2);
                heading.style.transform = `translateY(${(1 - headingProgress) * 40}px) scale(${0.95 + headingProgress * 0.05})`;
            }

            // Text letter-spacing effect
            if (text) {
                const textProgress = easing.easeOutCubic(Math.max(0, (progress - 0.3) * 1.3));
                text.style.opacity = textProgress;
                text.style.letterSpacing = `${(1 - textProgress) * 0.2}em`;
            }
        }

        // Background parallax
        section.style.setProperty('--bg-opacity', progress);
    });
}

// Add CSS variable support for background
if (!document.querySelector('style[data-scroll-bg]')) {
    const style = document.createElement('style');
    style.textContent = `
        .aisle-section::before {
            opacity: var(--bg-opacity, 0);
        }
    `;
    style.setAttribute('data-scroll-bg', 'true');
    document.head.appendChild(style);
}

// Performance: Detect reduced motion preference
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Animate underlines on story text emphasis
function animateUnderlines() {
    document.querySelectorAll('.aisle-section').forEach(section => {
        const progress = getScrollProgress(section);
        const em = section.querySelector('.story-text em');

        if (em && progress > 0.6) {
            const underlineProgress = Math.min(1, (progress - 0.6) * 2.5);
            const afterEl = em;
            if (afterEl) {
                afterEl.style.setProperty('--underline-width', `${underlineProgress * 100}%`);
            }
        }
    });
}

// Add underline animation CSS variable
if (!document.querySelector('style[data-underline]')) {
    const style = document.createElement('style');
    style.textContent = `
        .story-text em::after {
            width: var(--underline-width, 0);
            transition: width 0.3s cubic-bezier(0.22, 1, 0.36, 1);
        }
    `;
    style.setAttribute('data-underline', 'true');
    document.head.appendChild(style);
}

// ==========================================
// MAIN ANIMATION LOOP WITH RAF
// ==========================================

let currentScrollY = 0;

// Smooth scroll interpolation
function lerp(start, end, factor) {
    return start + (end - start) * factor;
}

function mainAnimationLoop() {
    // Skip animations if user prefers reduced motion
    if (prefersReducedMotion) {
        requestAnimationFrame(mainAnimationLoop);
        return;
    }

    // Smooth interpolation
    currentScrollY = lerp(currentScrollY, targetScrollY, 0.08);

    // Run all scroll-linked animations
    animateStorySections();
    animateUnderlines();

    // Subtle parallax for phone mockup in hero
    const phone = document.querySelector('.phone-mockup');
    if (phone && targetScrollY < window.innerHeight) {
        const phoneOffset = currentScrollY * 0.12;
        phone.style.transform = `translateY(${phoneOffset}px)`;
    }

    // Parallax for story backgrounds (only for visible sections)
    const sections = document.querySelectorAll('.aisle-section');
    sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            const parallaxY = (rect.top - window.innerHeight / 2) * 0.08;
            section.style.backgroundPosition = `center ${parallaxY}px`;
        }
    });

    // Continue animation loop
    requestAnimationFrame(mainAnimationLoop);
}

// Start main animation loop
mainAnimationLoop();

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
    const colors = ['#56725E', '#3E4F46', '#8B694D', '#8BA888'];
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
    const colors = ['#56725E', '#3E4F46', '#8B694D', '#10B981', '#8BA888'];
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
