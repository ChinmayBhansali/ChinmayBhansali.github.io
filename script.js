// Update copyright year
document.getElementById('year').textContent = new Date().getFullYear();

// Theme switcher functionality
const toggleSwitch = document.querySelector('#checkbox');
const currentTheme = localStorage.getItem('theme');

// Check if a theme preference exists in localStorage
if (currentTheme) {
    document.body.classList.add(currentTheme);

    // Update toggle position if dark theme is active
    if (currentTheme === 'dark-theme') {
        toggleSwitch.checked = true;
    }
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
