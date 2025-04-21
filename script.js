// Update copyright year
document.getElementById('year').textContent = new Date().getFullYear();

// Theme switcher functionality
const toggleSwitch = document.querySelector('#checkbox');
const currentTheme = localStorage.getItem('theme');

// Check if the user's device prefers dark mode
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Check if a theme preference exists in localStorage
if (currentTheme) {
    document.body.classList.add(currentTheme);

    // Update toggle position if dark theme is active
    if (currentTheme === 'dark-theme') {
        toggleSwitch.checked = true;
    }
} else if (prefersDarkScheme.matches) {
    // If no theme is saved but device prefers dark mode, apply dark theme
    document.body.classList.add('dark-theme');
    toggleSwitch.checked = true;
    localStorage.setItem('theme', 'dark-theme');
}

// Function to switch theme
function switchTheme(e) {
    // Small delay to allow the toggle animation to complete
    setTimeout(() => {
        if (e.target.checked) {
            document.body.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark-theme');
        } else {
            document.body.classList.remove('dark-theme');
            localStorage.setItem('theme', '');
        }
    }, 150);
}

// Event listener for theme switch
toggleSwitch.addEventListener('change', switchTheme);

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Animate elements on scroll
const animatedElements = document.querySelectorAll('.animated-element');

function checkScroll() {
    const triggerBottom = window.innerHeight * 0.8;

    animatedElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;

        if (elementTop < triggerBottom) {
            element.classList.add('show');
        }
    });
}

// Initial check
checkScroll();

// Check on scroll
window.addEventListener('scroll', checkScroll);

// Custom Cursor Animation
(function() {
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    // Variables for cursor animation
    let mouseX = 0;
    let mouseY = 0;
    let dotX = 0;
    let dotY = 0;
    let outlineX = 0;
    let outlineY = 0;

    // Animation speed (lower = faster)
    const dotSpeed = 0.2;  // Faster for the dot
    const outlineSpeed = 0.1;  // Slower for the outline

    // Update cursor position
    function updateCursorPosition() {
        // Calculate smooth movement
        dotX += (mouseX - dotX) * dotSpeed;
        dotY += (mouseY - dotY) * dotSpeed;
        outlineX += (mouseX - outlineX) * outlineSpeed;
        outlineY += (mouseY - outlineY) * outlineSpeed;

        // Apply position
        cursorDot.style.transform = `translate(${dotX}px, ${dotY}px) translate(-50%, -50%)`;
        cursorOutline.style.transform = `translate(${outlineX}px, ${outlineY}px) translate(-50%, -50%)`;

        // Continue animation
        requestAnimationFrame(updateCursorPosition);
    }

    // Track mouse movement
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Hide cursor when mouse leaves window
    document.addEventListener('mouseout', () => {
        cursorDot.style.opacity = '0';
        cursorOutline.style.opacity = '0';
    });

    // Show cursor when mouse enters window
    document.addEventListener('mouseover', () => {
        cursorDot.style.opacity = '1';
        cursorOutline.style.opacity = '1';
    });

    // Add pulse effect on click
    document.addEventListener('mousedown', () => {
        cursorDot.style.transform = `translate(${dotX}px, ${dotY}px) translate(-50%, -50%) scale(0.7)`;
        cursorOutline.style.transform = `translate(${outlineX}px, ${outlineY}px) translate(-50%, -50%) scale(1.4)`;
    });

    document.addEventListener('mouseup', () => {
        cursorDot.style.transform = `translate(${dotX}px, ${dotY}px) translate(-50%, -50%) scale(1)`;
        cursorOutline.style.transform = `translate(${outlineX}px, ${outlineY}px) translate(-50%, -50%) scale(1)`;
    });

    // Add hover effect for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .theme-switch, .project-card, .skill-tag, .social-links a, .social-footer a, .experience-card');

    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursorDot.classList.add('hover');
            cursorOutline.classList.add('hover');
        });

        element.addEventListener('mouseleave', () => {
            cursorDot.classList.remove('hover');
            cursorOutline.classList.remove('hover');
        });
    });

    // Start animation
    updateCursorPosition();

    // Add trailing effect for cursor outline
    let trail = [];
    const trailLength = 5;

    function updateTrail() {
        trail.push({ x: mouseX, y: mouseY });

        if (trail.length > trailLength) {
            trail.shift();
        }

        if (trail.length > 1) {
            const lastPoint = trail[trail.length - 1];
            const angle = Math.atan2(lastPoint.y - outlineY, lastPoint.x - outlineX);
            const distance = Math.sqrt(Math.pow(lastPoint.x - outlineX, 2) + Math.pow(lastPoint.y - outlineY, 2));

            // Only apply the trailing effect when the mouse is moving fast enough
            if (distance > 5) {
                // Store the base transform for the outline
                const baseTransform = `translate(${outlineX}px, ${outlineY}px) translate(-50%, -50%)`;

                // Add rotation and stretching for the trailing effect
                cursorOutline.style.transform = `${baseTransform} rotate(${angle}rad) scaleX(${1 + distance * 0.01})`;
            } else {
                // Reset to base transform when not moving fast
                cursorOutline.style.transform = `translate(${outlineX}px, ${outlineY}px) translate(-50%, -50%)`;
            }
        }

        requestAnimationFrame(updateTrail);
    }

    updateTrail();

    // Update cursor colors when theme changes
    toggleSwitch.addEventListener('change', () => {
        // The cursor colors are defined in CSS variables, so they will update automatically
        // This is just to ensure any transition effects are applied
        setTimeout(() => {
            cursorDot.style.transition = 'background-color 0.3s ease, width 0.3s, height 0.3s';
            cursorOutline.style.transition = 'border-color 0.3s ease, width 0.3s, height 0.3s, transform 0.3s';
        }, 200);
    });
})();
