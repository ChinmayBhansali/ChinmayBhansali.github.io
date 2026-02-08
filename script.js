// Minimal JS for portfolio
// Smooth scroll is handled by CSS (scroll-behavior: smooth)

// Add subtle scroll effect to nav if needed
document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('.nav');

    // Optional: Add scrolled class to nav for styling
    const handleScroll = () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
});
