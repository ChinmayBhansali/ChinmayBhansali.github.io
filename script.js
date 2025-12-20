/* ============================================
   HCI Portfolio - Interactive JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    initThemeToggle();
    initAccessibilityToggle();
    initCustomCursor();
    initNavigation();
    initMobileMenu();
    initScrollAnimations();
    initCounterAnimation();
    initSkillBars();
    initSmoothScroll();
    initParallaxEffects();
    initGradientTransitions();
});

/* ============================================
   Accessibility Mode Toggle
   ============================================ */
function initAccessibilityToggle() {
    const toggle = document.getElementById('a11yToggle');
    const statusText = toggle?.querySelector('.a11y-status');
    const html = document.documentElement;

    if (!toggle) return;

    // Update status text
    function updateStatusText() {
        const isEnabled = html.getAttribute('data-a11y') === 'true';
        if (statusText) {
            statusText.textContent = isEnabled ? 'On' : 'Off';
        }
    }

    // Check for saved preference
    const savedA11y = localStorage.getItem('a11y');
    if (savedA11y === 'true') {
        html.setAttribute('data-a11y', 'true');
    }
    updateStatusText();

    // Toggle accessibility mode on click
    toggle.addEventListener('click', () => {
        const isEnabled = html.getAttribute('data-a11y') === 'true';

        if (isEnabled) {
            html.removeAttribute('data-a11y');
            localStorage.setItem('a11y', 'false');
        } else {
            html.setAttribute('data-a11y', 'true');
            localStorage.setItem('a11y', 'true');
        }

        updateStatusText();
    });

    // Respect prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches && !savedA11y) {
        html.setAttribute('data-a11y', 'true');
        updateStatusText();
    }
}

/* ============================================
   Dynamic Gradient Color Transitions
   ============================================ */
function initGradientTransitions() {
    const orb1 = document.querySelector('.orb-1');
    const orb2 = document.querySelector('.orb-2');
    const orb3 = document.querySelector('.orb-3');

    if (!orb1 || !orb2 || !orb3) return;

    // Color schemes for each section
    const colorSchemes = {
        hero: {
            orb1: '#8b5cf6', // Purple
            orb2: '#f472b6', // Pink
            orb3: '#2dd4bf'  // Teal
        },
        about: {
            orb1: '#2dd4bf', // Teal
            orb2: '#60a5fa', // Blue
            orb3: '#8b5cf6'  // Purple
        },
        projects: {
            orb1: '#f472b6', // Pink
            orb2: '#fb923c', // Orange
            orb3: '#60a5fa'  // Blue
        },
        skills: {
            orb1: '#60a5fa', // Blue
            orb2: '#8b5cf6', // Purple
            orb3: '#2dd4bf'  // Teal
        },
        contact: {
            orb1: '#2dd4bf', // Teal
            orb2: '#f472b6', // Pink
            orb3: '#8b5cf6'  // Purple
        }
    };

    // Get all sections
    const sections = ['hero', 'about', 'projects', 'skills', 'contact'];

    // Interpolate between two hex colors
    function interpolateColor(color1, color2, factor) {
        const hex1 = color1.replace('#', '');
        const hex2 = color2.replace('#', '');

        const r1 = parseInt(hex1.substring(0, 2), 16);
        const g1 = parseInt(hex1.substring(2, 4), 16);
        const b1 = parseInt(hex1.substring(4, 6), 16);

        const r2 = parseInt(hex2.substring(0, 2), 16);
        const g2 = parseInt(hex2.substring(2, 4), 16);
        const b2 = parseInt(hex2.substring(4, 6), 16);

        const r = Math.round(r1 + (r2 - r1) * factor);
        const g = Math.round(g1 + (g2 - g1) * factor);
        const b = Math.round(b1 + (b2 - b1) * factor);

        return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    }

    function updateGradientColors() {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;

        // Find current and next section based on scroll position
        let currentScheme = colorSchemes.hero;
        let nextScheme = colorSchemes.hero;
        let progress = 0;

        for (let i = 0; i < sections.length; i++) {
            const section = document.getElementById(sections[i]);
            if (!section) continue;

            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionMiddle = sectionTop + sectionHeight / 2;

            if (scrollY + windowHeight / 2 >= sectionTop && scrollY + windowHeight / 2 < sectionTop + sectionHeight) {
                currentScheme = colorSchemes[sections[i]];

                // Calculate progress within this section
                const positionInSection = (scrollY + windowHeight / 2) - sectionTop;
                progress = Math.min(positionInSection / sectionHeight, 1);

                // Get next section's colors for interpolation
                if (i < sections.length - 1) {
                    nextScheme = colorSchemes[sections[i + 1]];
                } else {
                    nextScheme = currentScheme;
                }
                break;
            }
        }

        // Interpolate colors based on scroll progress
        const newOrb1Color = interpolateColor(currentScheme.orb1, nextScheme.orb1, progress);
        const newOrb2Color = interpolateColor(currentScheme.orb2, nextScheme.orb2, progress);
        const newOrb3Color = interpolateColor(currentScheme.orb3, nextScheme.orb3, progress);

        // Apply colors with smooth transition
        orb1.style.background = newOrb1Color;
        orb2.style.background = newOrb2Color;
        orb3.style.background = newOrb3Color;
    }

    // Add CSS transition to orbs for smooth color changes
    [orb1, orb2, orb3].forEach(orb => {
        orb.style.transition = 'background 0.3s ease-out';
    });

    // Update on scroll
    window.addEventListener('scroll', updateGradientColors, { passive: true });

    // Initial update
    updateGradientColors();
}

/* ============================================
   Theme Toggle (Light/Dark Mode)
   ============================================ */
function initThemeToggle() {
    const toggle = document.getElementById('themeToggle');
    const html = document.documentElement;

    // Check for saved theme preference or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Apply saved theme or system preference
    if (savedTheme) {
        html.setAttribute('data-theme', savedTheme);
    } else if (!systemPrefersDark) {
        html.setAttribute('data-theme', 'light');
    }

    // Toggle theme on button click
    if (toggle) {
        toggle.addEventListener('click', () => {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';

            if (newTheme === 'dark') {
                html.removeAttribute('data-theme');
            } else {
                html.setAttribute('data-theme', 'light');
            }

            localStorage.setItem('theme', newTheme);

            // Add a subtle animation feedback
            toggle.style.transform = 'scale(0.9)';
            setTimeout(() => {
                toggle.style.transform = 'scale(1)';
            }, 150);
        });
    }

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            if (e.matches) {
                html.removeAttribute('data-theme');
            } else {
                html.setAttribute('data-theme', 'light');
            }
        }
    });
}

/* ============================================
   Custom Cursor
   ============================================ */
function initCustomCursor() {
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');

    if (!cursor || !follower) return;

    // Check for touch device
    if ('ontouchstart' in window) {
        cursor.style.display = 'none';
        follower.style.display = 'none';
        return;
    }

    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });

    // Smooth follower animation
    function animateFollower() {
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;

        follower.style.left = followerX + 'px';
        follower.style.top = followerY + 'px';

        requestAnimationFrame(animateFollower);
    }
    animateFollower();

    // Hover effects on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-category, .contact-link');

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
            follower.classList.add('hover');
        });

        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
            follower.classList.remove('hover');
        });
    });
}

/* ============================================
   Navigation
   ============================================ */
function initNavigation() {
    const nav = document.getElementById('nav');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;

        // Add scrolled class for background
        if (currentScroll > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        // Update active nav link based on scroll position
        updateActiveNavLink();

        lastScroll = currentScroll;
    });
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;

        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

/* ============================================
   Mobile Menu
   ============================================ */
function initMobileMenu() {
    const toggle = document.getElementById('navToggle');
    const menu = document.getElementById('mobileMenu');
    const links = document.querySelectorAll('.mobile-link');

    if (!toggle || !menu) return;

    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        menu.classList.toggle('active');
        document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
    });

    links.forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('active');
            menu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

/* ============================================
   Scroll Animations (Reveal on Scroll)
   ============================================ */
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Clear transition-delay after reveal so hover animations are immediate
                setTimeout(() => {
                    entry.target.style.transitionDelay = '0s';
                }, 800); // Wait for reveal animation to complete
            }
        });
    }, observerOptions);

    // Add reveal class to elements
    const elementsToReveal = document.querySelectorAll(
        '.section-header, .about-image, .about-content, .project-card, .research-card, .toolkit-section, .contact-content, .contact-visual, .contact-header'
    );

    elementsToReveal.forEach(el => {
        el.classList.add('reveal');
        observer.observe(el);
    });

    // Stagger animation for grid items (delay only applies to initial reveal)
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });

    const researchCards = document.querySelectorAll('.research-card');
    researchCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });
}

/* ============================================
   Counter Animation
   ============================================ */
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');

    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                animateCounter(counter, target);
                observer.unobserve(counter);
            }
        });
    }, observerOptions);

    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element, target) {
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

/* ============================================
   Skill Bars Animation
   ============================================ */
function initSkillBars() {
    const skillItems = document.querySelectorAll('.skill-item');

    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progress = entry.target.querySelector('.skill-progress');
                const level = entry.target.getAttribute('data-level');

                setTimeout(() => {
                    progress.style.width = level + '%';
                }, 200);

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    skillItems.forEach(item => observer.observe(item));
}

/* ============================================
   Smooth Scroll
   ============================================ */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));

            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ============================================
   Parallax Effects
   ============================================ */
function initParallaxEffects() {
    const orbs = document.querySelectorAll('.gradient-orb');

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;

        orbs.forEach((orb, index) => {
            const speed = (index + 1) * 0.1;
            orb.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // Mouse parallax for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;

            const moveX = (clientX - innerWidth / 2) / innerWidth * 30;
            const moveY = (clientY - innerHeight / 2) / innerHeight * 30;

            orbs.forEach((orb, index) => {
                const factor = (index + 1) * 0.5;
                orb.style.transform = `translate(${moveX * factor}px, ${moveY * factor}px)`;
            });
        });
    }
}

/* ============================================
   Magnetic Button Effect
   ============================================ */
document.querySelectorAll('.btn-primary').forEach(button => {
    button.addEventListener('mousemove', function (e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        this.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });

    button.addEventListener('mouseleave', function () {
        this.style.transform = 'translate(0, 0)';
    });
});

/* ============================================
   Typing Effect for Hero (Optional Enhancement)
   ============================================ */
function typeWriter(element, text, speed = 50) {
    let i = 0;
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

/* ============================================
   Tilt Effect for Cards
   ============================================ */
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', function (e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Calculate rotation with max limit of 5 degrees
        const maxTilt = 5;
        let rotateX = (y - centerY) / 20;
        let rotateY = (centerX - x) / 20;

        // Clamp values to max tilt
        rotateX = Math.max(-maxTilt, Math.min(maxTilt, rotateX));
        rotateY = Math.max(-maxTilt, Math.min(maxTilt, rotateY));

        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });

    card.addEventListener('mouseleave', function () {
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

/* ============================================
   Intersection Observer for Lazy Loading
   ============================================ */
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
lazyLoadImages();

/* ============================================
   Console Easter Egg
   ============================================ */
console.log('%c🎨 HCI Portfolio', 'font-size: 24px; font-weight: bold; color: #8b5cf6;');
console.log('%cDesigned with a focus on human-centered experiences', 'font-size: 14px; color: #a1a1aa;');
console.log('%c✨ Interested in the code? Let\'s connect!', 'font-size: 12px; color: #2dd4bf;');
