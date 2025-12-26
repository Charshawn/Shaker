// ==========================================
// GOOGLE SHEETS CONFIGURATION
// ==========================================

const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycbwoXZIOB6-PdzWpUYMYZcA8c9vd3qbFLJDTu6W_9B7nusmYdJjExjw1ugD0r3_i1AkQ/exec';

// ==========================================
// NARRATIVE JOURNEY ORCHESTRATION
// ==========================================

// Track which sections have been activated (for typing - only plays once)
const activatedSections = new Set();

// Track visible sections (for screens - can reactivate)
const visibleSections = new Set();

// ==========================================
// TYPING ANIMATION SYSTEM
// ==========================================

class TypeAnimation {
    constructor(element) {
        this.element = element;
        this.delay = parseInt(element.dataset.delay) || 0;
        this.hasPlayed = false;
    }

    play() {
        if (this.hasPlayed) return;

        setTimeout(() => {
            this.element.classList.add('typing');
            this.hasPlayed = true;
        }, this.delay);
    }
}

// Initialize all typed lines
const typedLines = new Map();

function initializeTypedLines() {
    document.querySelectorAll('.typed-line').forEach(line => {
        const animation = new TypeAnimation(line);
        typedLines.set(line, animation);
    });
}

// ==========================================
// SECTION ACTIVATION SYSTEM
// ==========================================

function activateSection(section) {
    const sectionName = section.dataset.section;

    // Skip if already activated
    if (activatedSections.has(sectionName)) return;

    activatedSections.add(sectionName);

    // Trigger typing animations for this section
    const typedNarrative = section.querySelector('.typed-narrative');
    if (typedNarrative) {
        const lines = typedNarrative.querySelectorAll('.typed-line');
        lines.forEach(line => {
            const animation = typedLines.get(line);
            if (animation) {
                animation.play();
            }
        });
    }

    // Screen activation is handled separately in the observer
}

// ==========================================
// SCREEN PROGRESSION SYSTEM (BIDIRECTIONAL: 1 ↔ 2 ↔ 3 ↔ 4 ↔ 5)
// ==========================================

function showScreen(screenNumber) {
    const screen = document.querySelector(`.app-screen[data-screen="${screenNumber}"]`);

    if (!screen) return;

    // Show this screen
    screen.classList.add('visible');
}

function hideScreen(screenNumber) {
    const screen = document.querySelector(`.app-screen[data-screen="${screenNumber}"]`);

    if (!screen) return;

    // Hide this screen
    screen.classList.remove('visible');
}

// ==========================================
// SCROLL OBSERVATION SYSTEM (BIDIRECTIONAL)
// ==========================================

const sectionObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            const section = entry.target;
            const sectionName = section.dataset.section;
            const progress = entry.intersectionRatio;

            if (entry.isIntersecting && progress > 0.3) {
                // Section is coming into view
                visibleSections.add(sectionName);

                // Activate typing (only first time)
                activateSection(section);

                // Always show/activate screen when in view
                const screenNum = section.dataset.screen;
                if (screenNum) {
                    showScreen(parseInt(screenNum));
                }
            } else {
                // Section is leaving view
                visibleSections.delete(sectionName);

                // Hide screen when leaving view
                const screenNum = section.dataset.screen;
                if (screenNum) {
                    hideScreen(parseInt(screenNum));
                }
            }
        });
    },
    {
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
        rootMargin: '-10% 0px -20% 0px'
    }
);

// ==========================================
// ENTRANCE SECTION - AUTO-ACTIVATE
// ==========================================

function initializeEntranceSection() {
    const entranceSection = document.querySelector('.entrance-section');
    if (entranceSection) {
        // Auto-activate entrance section on load
        setTimeout(() => {
            activateSection(entranceSection);
        }, 300);
    }
}

// ==========================================
// FORM HANDLING
// ==========================================

async function handleFormSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const emailInput = form.querySelector('.email-input');
    const messageInput = form.querySelector('.message-input');
    const button = form.querySelector('.cta-button');
    const email = emailInput.value.trim();
    const message = messageInput ? messageInput.value.trim() : '';

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
    button.disabled = true;

    try {
        // Submit to Google Sheets
        const formData = new FormData();
        formData.append('email', email);
        formData.append('message', message);

        const response = await fetch(GOOGLE_SHEETS_URL, {
            method: 'POST',
            body: formData
        });

        const result = await response.json();

        if (result.result === 'duplicate') {
            // Duplicate email
            button.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
            button.style.transform = 'scale(1)';
            button.style.opacity = '1';
            button.textContent = 'Already signed up! 👍';
            button.style.background = 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)';
            emailInput.disabled = true;
            console.log('Duplicate email detected');
        } else {
            // Success state with smooth transition
            button.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
            button.style.transform = 'scale(1)';
            button.style.opacity = '1';
            button.textContent = 'You\'re in! 🎉';
            button.style.background = 'linear-gradient(135deg, #10B981 0%, #059669 100%)';

            emailInput.style.borderColor = '#10B981';
            emailInput.style.transform = 'translateY(0) scale(1)';
            emailInput.disabled = true;

            // Create success confetti
            createConfetti();

            console.log('Email successfully saved to Google Sheets');
        }

    } catch (error) {
        // Error state
        console.error('Error submitting email:', error);
        button.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
        button.style.transform = 'scale(1)';
        button.style.opacity = '1';
        button.textContent = 'Oops! Try again';
        button.style.background = 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)';

        // Re-enable button so they can retry
        setTimeout(() => {
            button.textContent = 'Get Free Early Access';
            button.style.background = 'linear-gradient(135deg, #FF6B35 0%, #FF4500 100%)';
            button.disabled = false;
        }, 2000);
    }
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

// Add shake keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0) rotate(0deg); }
        10% { transform: translateX(-8px) rotate(-2deg); }
        20% { transform: translateX(8px) rotate(2deg); }
        30% { transform: translateX(-8px) rotate(-2deg); }
        40% { transform: translateX(8px) rotate(2deg); }
        50% { transform: translateX(-6px) rotate(-1deg); }
        60% { transform: translateX(6px) rotate(1deg); }
        70% { transform: translateX(-4px) rotate(-1deg); }
        80% { transform: translateX(4px) rotate(1deg); }
        90% { transform: translateX(-2px) rotate(0deg); }
    }
`;
document.head.appendChild(style);

// ==========================================
// HEADER BRAND INTERACTION
// ==========================================

const brandTitle = document.querySelector('.brand-title');
let isShaking = false;

if (brandTitle) {
    // Shake on click with particles effect
    brandTitle.addEventListener('click', (e) => {
        if (isShaking) return;

        isShaking = true;
        const brandIcon = brandTitle.querySelector('.brand-icon');

        if (brandIcon) {
            brandIcon.style.transition = 'none';
            brandIcon.style.animation = 'shake 0.6s cubic-bezier(0.36, 0.07, 0.19, 0.97)';

            // Create particle burst effect
            const rect = brandIcon.getBoundingClientRect();
            const x = rect.left + rect.width / 2;
            const y = rect.top + rect.height / 2;
            createParticleBurst(x, y);

            setTimeout(() => {
                brandIcon.style.animation = '';
                brandIcon.style.transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
                isShaking = false;
            }, 600);
        }
    });
}

// Particle burst animation
function createParticleBurst(x, y) {
    const colors = ['#FF6B35', '#FF8C3D', '#FFA500', '#FF9F5C'];
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

// ==========================================
// INITIALIZATION
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize typed lines
    initializeTypedLines();

    // Observe all aisle sections
    document.querySelectorAll('.aisle-section').forEach(section => {
        sectionObserver.observe(section);
    });

    // Observe invitation section
    const invitationSection = document.querySelector('.invitation-section');
    if (invitationSection) {
        sectionObserver.observe(invitationSection);
    }

    // Initialize entrance section
    initializeEntranceSection();

    // Attach form handlers
    document.querySelectorAll('.waitlist-form').forEach(form => {
        form.addEventListener('submit', handleFormSubmit);
    });

    // Smooth input focus effects
    document.querySelectorAll('.email-input, .message-input').forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.style.transform = 'scale(1.01)';
        });

        input.addEventListener('blur', () => {
            input.parentElement.style.transform = 'scale(1)';
        });
    });
});

// ==========================================
// PERFORMANCE: DEBOUNCE RESIZE
// ==========================================

let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Recalculate if needed
    }, 150);
});

// ==========================================
// PREFERS REDUCED MOTION SUPPORT
// ==========================================

if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // Disable animations for accessibility
    document.querySelectorAll('*').forEach(el => {
        el.style.animation = 'none !important';
        el.style.transition = 'none !important';
    });
}
