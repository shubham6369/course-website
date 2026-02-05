// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function () {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');

    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function () {
            navMenu.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', function (event) {
            if (!navMenu.contains(event.target) && !mobileMenuToggle.contains(event.target)) {
                navMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            }
        });

        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function () {
                navMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            });
        });
    }
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll to Top Button
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    color: white;
    border: none;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(16, 185, 129, 0.4);
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
`;

document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', function () {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.style.opacity = '1';
        scrollToTopBtn.style.visibility = 'visible';
    } else {
        scrollToTopBtn.style.opacity = '0';
        scrollToTopBtn.style.visibility = 'hidden';
    }
});

scrollToTopBtn.addEventListener('click', function () {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollToTopBtn.addEventListener('mouseenter', function () {
    this.style.transform = 'translateY(-5px)';
    this.style.boxShadow = '0 6px 25px rgba(16, 185, 129, 0.6)';
});

scrollToTopBtn.addEventListener('mouseleave', function () {
    this.style.transform = 'translateY(0)';
    this.style.boxShadow = '0 4px 15px rgba(16, 185, 129, 0.4)';
});

// Active Navigation Link
function setActiveNavLink() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-menu a');

    navLinks.forEach(link => {
        link.classList.remove('active');
        const linkPath = new URL(link.href).pathname;
        if (linkPath === currentPath || (currentPath === '/' && linkPath.endsWith('index.html'))) {
            link.classList.add('active');
        }
    });
}

setActiveNavLink();

// Animation on Scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.stat-card, .cta-content, .content-section');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(20px)';

                setTimeout(() => {
                    entry.target.style.transition = 'all 0.6s ease';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);

                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    elements.forEach(element => {
        observer.observe(element);
    });
}

// Run animation on scroll when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', animateOnScroll);
} else {
    animateOnScroll();
}

// Counter Animation for Stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');

    counters.forEach(counter => {
        const target = counter.textContent.trim();
        const hasPlus = target.includes('+');
        const number = parseInt(target.replace(/[^0-9]/g, ''));

        if (!isNaN(number)) {
            let current = 0;
            const increment = number / 100;
            const duration = 2000; // 2 seconds
            const stepTime = duration / 100;

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const timer = setInterval(() => {
                            current += increment;
                            if (current >= number) {
                                current = number;
                                clearInterval(timer);
                            }

                            let displayValue;
                            if (number >= 1000) {
                                displayValue = (current / 1000).toFixed(0) + 'K';
                            } else {
                                displayValue = Math.floor(current).toString();
                            }

                            counter.textContent = displayValue + (hasPlus ? '+' : '');
                        }, stepTime);

                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.5
            });

            observer.observe(counter);
        }
    });
}

animateCounters();

// Loading Placeholder Images
function createPlaceholderImage(width, height, text) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    // Gradient background - Emerald Green Theme
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#10b981'); // Primary
    gradient.addColorStop(1, '#059669'); // Primary Dark
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Add pattern
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.arc(
            Math.random() * width,
            Math.random() * height,
            Math.random() * 50 + 20,
            0,
            Math.PI * 2
        );
        ctx.fill();
    }

    // Text
    ctx.fillStyle = '#ffffff';
    ctx.font = `bold ${Math.max(16, width / 15)}px Inter, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Simple text wrapping
    const words = text.split(' ');
    let line = '';
    const lines = [];
    const maxWidth = width * 0.9;

    for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        const metrics = ctx.measureText(testLine);
        const testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0) {
            lines.push(line);
            line = words[n] + ' ';
        } else {
            line = testLine;
        }
    }
    lines.push(line);

    const lineHeight = Math.max(20, width / 12);
    const startY = height / 2 - ((lines.length - 1) * lineHeight) / 2;

    for (let i = 0; i < lines.length; i++) {
        ctx.fillText(lines[i], width / 2, startY + (i * lineHeight));
    }

    return canvas.toDataURL();
}

// Generate all placeholder images
document.addEventListener('DOMContentLoaded', function () {
    // Hero Image
    const heroImage = document.getElementById('heroImage');
    if (heroImage) {
        // Only set if src fails or is empty (but for this demo we overwrite)
        heroImage.src = createPlaceholderImage(500, 400, 'Learning Illustration');
    }

    // Course/General Placeholders
    const placeholderImgs = document.querySelectorAll('.placeholder-img');
    placeholderImgs.forEach(img => {
        const width = parseInt(img.getAttribute('width')) || 300;
        const height = parseInt(img.getAttribute('height')) || 180;
        const text = img.getAttribute('data-text') || 'Course Image';
        img.src = createPlaceholderImage(width, height, text);
    });
});

// Create placeholder for Google Play badge
const playStoreBadge = document.getElementById('playStoreBadge');
if (playStoreBadge && !playStoreBadge.src) {
    const canvas = document.createElement('canvas');
    canvas.width = 200;
    canvas.height = 60;
    const ctx = canvas.getContext('2d');

    // Black background with rounded corners
    ctx.fillStyle = '#000000';
    ctx.roundRect = function (x, y, width, height, radius) {
        this.beginPath();
        this.moveTo(x + radius, y);
        this.lineTo(x + width - radius, y);
        this.quadraticCurveTo(x + width, y, x + width, y + radius);
        this.lineTo(x + width, y + height - radius);
        this.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        this.lineTo(x + radius, y + height);
        this.quadraticCurveTo(x, y + height, x, y + height - radius);
        this.lineTo(x, y + radius);
        this.quadraticCurveTo(x, y, x + radius, y);
        this.closePath();
        this.fill();
    };
    ctx.roundRect(0, 0, 200, 60, 5);

    // Text
    ctx.fillStyle = '#ffffff';
    ctx.font = '10px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('GET IT ON', 100, 20);
    ctx.font = 'bold 16px Arial';
    ctx.fillText('Google Play', 100, 40);

    playStoreBadge.src = canvas.toDataURL();
}

console.log('The Mann Maker - Website Loaded Successfully!');
