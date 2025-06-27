// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const cookieNotice = document.getElementById('cookie-notice');
const acceptCookies = document.getElementById('accept-cookies');
const declineCookies = document.getElementById('decline-cookies');
const navbar = document.querySelector('.navbar');
const categoryCards = document.querySelectorAll('.category-card');
const contactForm = document.querySelector('.contact-form');

// Mobile Navigation Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Cookie Notice Management
function showCookieNotice() {
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (!cookieConsent) {
        setTimeout(() => {
            cookieNotice.classList.add('show');
        }, 1000);
    }
}

function hideCookieNotice() {
    cookieNotice.classList.remove('show');
}

acceptCookies.addEventListener('click', () => {
    localStorage.setItem('cookieConsent', 'accepted');
    hideCookieNotice();
    
    // Initialize analytics or other tracking here
    console.log('Cookies accepted - Analytics can be initialized');
});

declineCookies.addEventListener('click', () => {
    localStorage.setItem('cookieConsent', 'declined');
    hideCookieNotice();
    console.log('Cookies declined - Only essential cookies will be used');
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.borderBottom = '1px solid var(--border)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.8)';
        navbar.style.borderBottom = 'none';
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Add animation classes to elements
function initAnimations() {
    const animatedElements = document.querySelectorAll('.category-card, .solution-item, .stat-item');
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// Category card hover effects
categoryCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
    
    card.addEventListener('click', () => {
        const category = card.dataset.category;
        
        // Simple animation feedback
        card.style.transform = 'scale(0.95)';
        setTimeout(() => {
            card.style.transform = 'translateY(-8px) scale(1.02)';
            // Navigate to products page after animation
            window.location.href = 'products.html';
        }, 150);
    });
});

// Contact form handling
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Show loading state
        const submitBtn = contactForm.querySelector('.btn-primary');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            submitBtn.textContent = 'Message Sent!';
            submitBtn.style.background = 'var(--secondary-color)';
            
            // Reset form
            contactForm.reset();
            
            // Reset button after delay
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.background = 'var(--primary-color)';
                submitBtn.disabled = false;
            }, 3000);
            
            console.log('Form submitted:', data);
        }, 2000);
    });
}

// Stats counter animation
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const finalValue = stat.textContent;
        const numericValue = parseInt(finalValue.replace(/\D/g, ''));
        const suffix = finalValue.replace(/\d/g, '');
        
        if (numericValue) {
            let currentValue = 0;
            const increment = numericValue / 50;
            const timer = setInterval(() => {
                currentValue += increment;
                if (currentValue >= numericValue) {
                    stat.textContent = finalValue;
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.floor(currentValue) + suffix;
                }
            }, 50);
        }
    });
}

// Parallax effect for hero section
function initParallax() {
    const hero = document.querySelector('.hero');
    const chipAnimation = document.querySelector('.chip-animation');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.5;
        
        if (chipAnimation) {
            chipAnimation.style.transform = `translateY(${parallax}px)`;
        }
    });
}

// Product category filter and search
function initProductFilters() {
    // This could be expanded for actual product filtering
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search products...';
    searchInput.style.cssText = `
        width: 100%;
        max-width: 400px;
        padding: 12px 16px;
        border: 1px solid var(--border);
        border-radius: 8px;
        font-family: var(--font-family);
        margin: 20px auto;
        display: block;
    `;
    
    const productSection = document.querySelector('.product-categories .container');
    if (productSection) {
        productSection.insertBefore(searchInput, productSection.querySelector('.category-grid'));
        
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            categoryCards.forEach(card => {
                const cardText = card.textContent.toLowerCase();
                if (cardText.includes(searchTerm)) {
                    card.style.display = 'block';
                    card.style.opacity = '1';
                } else {
                    card.style.opacity = '0.3';
                }
            });
        });
    }
}

// Theme switching (optional enhancement)
function initThemeToggle() {
    const themeToggle = document.createElement('button');
    themeToggle.innerHTML = '🌙';
    themeToggle.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: none;
        background: var(--primary-color);
        color: white;
        font-size: 20px;
        cursor: pointer;
        z-index: 1000;
        transition: var(--transition);
    `;
    
    document.body.appendChild(themeToggle);
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        themeToggle.innerHTML = document.body.classList.contains('dark-theme') ? '☀️' : '🌙';
    });
}

// Performance optimization - Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Error handling for async operations
function handleErrors() {
    window.addEventListener('error', (e) => {
        console.error('Global error:', e.error);
        // Could send error reports to analytics service
    });
    
    window.addEventListener('unhandledrejection', (e) => {
        console.error('Unhandled promise rejection:', e.reason);
        e.preventDefault();
    });
}

// Sci-fi Effects
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (15 + Math.random() * 10) + 's';
        particlesContainer.appendChild(particle);
    }
}

// Mouse trail effect
function createMouseTrail() {
    let mouseX = 0, mouseY = 0;
    let trail = [];
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Create trail element
        const trailElement = document.createElement('div');
        trailElement.className = 'mouse-trail';
        trailElement.style.left = mouseX + 'px';
        trailElement.style.top = mouseY + 'px';
        document.body.appendChild(trailElement);
        
        // Remove trail element after animation
        setTimeout(() => {
            if (trailElement.parentNode) {
                trailElement.parentNode.removeChild(trailElement);
            }
        }, 800);
    });
}

// Enhanced chip animation with data points
function enhanceChipAnimation() {
    const chipCore = document.querySelector('.chip-core');
    if (chipCore) {
        // Add data points around the chip
        for (let i = 0; i < 8; i++) {
            const dataPoint = document.createElement('div');
            dataPoint.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: rgba(0, 122, 255, 0.8);
                border-radius: 50%;
                top: 50%;
                left: 50%;
                transform-origin: 0 0;
                animation: dataPointOrbit ${8 + i}s linear infinite;
                animation-delay: ${i * 0.5}s;
            `;
            chipCore.appendChild(dataPoint);
        }
        
        // Add orbit animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes dataPointOrbit {
                0% { 
                    transform: translate(-50%, -50%) rotate(0deg) translateX(60px) rotate(0deg);
                    opacity: 0;
                }
                10%, 90% {
                    opacity: 1;
                }
                100% { 
                    transform: translate(-50%, -50%) rotate(360deg) translateX(60px) rotate(-360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Holographic text effect
function initHolographicText() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.addEventListener('mouseenter', () => {
            heroTitle.style.animation = 'holographicGlitch 0.5s ease-in-out';
        });
        
        heroTitle.addEventListener('animationend', () => {
            heroTitle.style.animation = '';
        });
    }
}

// Circuit board background for sections
function addCircuitBackground() {
    const sections = document.querySelectorAll('.product-categories, .solutions, .about');
    sections.forEach(section => {
        const circuitBg = document.createElement('div');
        circuitBg.className = 'circuit-bg';
        section.style.position = 'relative';
        section.insertBefore(circuitBg, section.firstChild);
    });
}

// Enhanced section animations
function initAdvancedAnimations() {
    // Intersection Observer for advanced animations
    const advancedObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
                
                // Add stagger effect for child elements
                const children = entry.target.querySelectorAll('.category-card, .solution-item');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.style.opacity = '1';
                        child.style.transform = 'translateY(0) scale(1)';
                    }, index * 100);
                });
            }
        });
    }, { threshold: 0.1 });
    
    const sections = document.querySelectorAll('.product-categories, .solutions, .about');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px) scale(0.95)';
        section.style.transition = 'all 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)';
        advancedObserver.observe(section);
        
        // Hide child elements initially
        const children = section.querySelectorAll('.category-card, .solution-item');
        children.forEach(child => {
            child.style.opacity = '0';
            child.style.transform = 'translateY(30px) scale(0.9)';
            child.style.transition = 'all 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)';
        });
    });
}

// Enhanced button effects
function enhanceButtons() {
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0) scale(1)';
        });
        
        button.addEventListener('click', (e) => {
            // Ripple effect
            const rect = button.getBoundingClientRect();
            const ripple = document.createElement('span');
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            button.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Data visualization effect
function createDataVisualization() {
    const aboutSection = document.querySelector('.about-visual');
    if (aboutSection) {
        // Add floating data points
        for (let i = 0; i < 15; i++) {
            const dataViz = document.createElement('div');
            dataViz.style.cssText = `
                position: absolute;
                width: 3px;
                height: 3px;
                background: rgba(0, 122, 255, 0.6);
                border-radius: 50%;
                animation: dataFloat ${5 + Math.random() * 5}s ease-in-out infinite;
                animation-delay: ${Math.random() * 5}s;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
            `;
            aboutSection.appendChild(dataViz);
        }
        
        const style = document.createElement('style');
        style.textContent = `
            @keyframes dataFloat {
                0%, 100% { 
                    transform: translateY(0px) scale(1);
                    opacity: 0.3;
                }
                50% { 
                    transform: translateY(-20px) scale(1.5);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Smooth Animations System
function initSmoothAnimations() {
    const animatedSections = document.querySelectorAll('.chapter-section');
    const scrollProgressBar = document.getElementById('scroll-progress-bar');
    
    // Enable animation mode for enhanced experience
    animatedSections.forEach(section => {
        section.classList.add('animate-in');
    });
    
    // Intersection Observer for smooth entry animations
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add in-view class for animations
                entry.target.classList.add('in-view');
                entry.target.classList.remove('animate-in');
                
                // Trigger section-specific animations
                triggerSectionAnimations(entry.target);
            }
        });
    }, { 
        threshold: 0.3,
        rootMargin: '-50px 0px -50px 0px'
    });
    
    // Observe all animated sections
    animatedSections.forEach(section => {
        animationObserver.observe(section);
    });
    
    // Ensure first section is visible immediately
    setTimeout(() => {
        const firstSection = document.querySelector('.chapter-section');
        if (firstSection) {
            firstSection.classList.add('in-view');
            firstSection.classList.remove('animate-in');
        }
    }, 100);
    
    // Scroll progress bar
    function updateScrollProgress() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        if (scrollProgressBar) {
            scrollProgressBar.style.width = scrollPercent + '%';
        }
    }
    
    // Subtle parallax effects
    function updateParallax() {
        const scrollY = window.pageYOffset;
        
        // Parallax for hero elements
        const heroVisual = document.querySelector('.hero-visual');
        if (heroVisual) {
            heroVisual.style.transform = `translateY(${scrollY * 0.1}px)`;
        }
        
        // Parallax for chip animation
        const chipAnimation = document.querySelector('.chip-animation');
        if (chipAnimation) {
            chipAnimation.style.transform = `translateY(${scrollY * 0.05}px)`;
        }
    }
    
    // Throttled scroll handler for performance
    let ticking = false;
    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateScrollProgress();
                updateParallax();
                ticking = false;
            });
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', onScroll);
    
    // Initial calls
    updateScrollProgress();
    updateParallax();
}

// Section-specific animations
function triggerSectionAnimations(section) {
    const sectionClass = section.className;
    
    // Determine section type and trigger appropriate animations
    if (section.classList.contains('hero')) {
        animateHeroElements(section);
    } else if (section.classList.contains('product-categories')) {
        animateProductCards(section);
    } else if (section.classList.contains('solutions')) {
        animateSolutionItems(section);
    } else if (section.classList.contains('about')) {
        animateAboutSection(section);
    } else if (section.classList.contains('contact')) {
        animateContactForm(section);
    } else if (section.classList.contains('product-hero')) {
        animateProductHero(section);
    } else if (section.classList.contains('filter-section')) {
        animateFilterSection(section);
    } else if (section.classList.contains('product-tabs')) {
        animateProductTabs(section);
    }
}

function animateHeroElements(section) {
    const heroTitle = section.querySelector('.hero-title');
    const heroSubtitle = section.querySelector('.hero-subtitle');
    const heroButtons = section.querySelector('.hero-buttons');
    
    setTimeout(() => {
        if (heroTitle) heroTitle.style.animation = 'slideInUp 1s ease-out';
    }, 200);
    
    setTimeout(() => {
        if (heroSubtitle) heroSubtitle.style.animation = 'slideInUp 1s ease-out 0.3s both';
    }, 400);
    
    setTimeout(() => {
        if (heroButtons) heroButtons.style.animation = 'slideInUp 1s ease-out 0.6s both';
    }, 600);
}

function animateProductCards(section) {
    const cards = section.querySelectorAll('.category-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.animation = `slideInUp 0.8s ease-out ${index * 0.1}s both`;
            card.classList.add('card-3d');
        }, index * 100);
    });
}

function animateSolutionItems(section) {
    const items = section.querySelectorAll('.solution-item');
    items.forEach((item, index) => {
        setTimeout(() => {
            item.style.animation = `slideInLeft 0.8s ease-out ${index * 0.15}s both`;
        }, index * 150);
    });
}

function animateAboutSection(section) {
    const techShowcase = section.querySelector('.tech-showcase');
    const stats = section.querySelectorAll('.stat-item');
    
    if (techShowcase) {
        techShowcase.style.animation = 'rotateIn 1.5s ease-out';
    }
    
    stats.forEach((stat, index) => {
        setTimeout(() => {
            stat.style.animation = `bounceIn 0.8s ease-out ${index * 0.2}s both`;
        }, index * 200);
    });
}

function animateContactForm(section) {
    const form = section.querySelector('.contact-form');
    const info = section.querySelector('.contact-info');
    
    if (info) {
        info.style.animation = 'slideInLeft 1s ease-out';
    }
    
    if (form) {
        form.style.animation = 'slideInRight 1s ease-out 0.3s both';
    }
}

// Product page specific animations
function animateProductHero(section) {
    const title = section.querySelector('.hero-title');
    const subtitle = section.querySelector('.hero-subtitle');
    
    if (title) {
        title.style.animation = 'slideInUp 1s ease-out';
    }
    
    if (subtitle) {
        subtitle.style.animation = 'slideInUp 1s ease-out 0.3s both';
    }
}

function animateFilterSection(section) {
    const filterGroups = section.querySelectorAll('.filter-group');
    
    filterGroups.forEach((group, index) => {
        setTimeout(() => {
            group.style.animation = `slideInUp 0.6s ease-out ${index * 0.1}s both`;
        }, index * 100);
    });
}

function animateProductTabs(section) {
    const tabBtns = section.querySelectorAll('.tab-btn');
    const productCards = section.querySelectorAll('.product-card');
    
    // Animate tab buttons
    tabBtns.forEach((btn, index) => {
        setTimeout(() => {
            btn.style.animation = `slideInUp 0.5s ease-out ${index * 0.05}s both`;
        }, index * 50);
    });
    
    // Animate product cards
    productCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.animation = `slideInUp 0.8s ease-out ${index * 0.1}s both`;
            card.classList.add('card-3d');
        }, 300 + (index * 100));
    });
}

// Enhanced 3D card effects
function init3DEffects() {
    const cards = document.querySelectorAll('.category-card, .solution-item');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
        });
    });
}

// Smooth scrolling enhancements
function enhanceSmoothScrolling() {
    // Add smooth scrolling to internal links
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
}

// Add new animation keyframes
function addAnimationKeyframes() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes slideInLeft {
            from {
                opacity: 0;
                transform: translateX(-30px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes slideInRight {
            from {
                opacity: 0;
                transform: translateX(30px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes rotateIn {
            from {
                opacity: 0;
                transform: rotate(-200deg);
            }
            to {
                opacity: 1;
                transform: rotate(0);
            }
        }
        
        @keyframes bounceIn {
            0% {
                opacity: 0;
                transform: scale(0.3);
            }
            50% {
                transform: scale(1.05);
            }
            70% {
                transform: scale(0.9);
            }
            100% {
                opacity: 1;
                transform: scale(1);
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Immediate visibility fallback
    const allSections = document.querySelectorAll('.chapter-section');
    allSections.forEach(section => {
        section.style.opacity = '1';
        section.style.transform = 'translateY(0)';
    });
    
    showCookieNotice();
    initAnimations();
    initParallax();
    initProductFilters();
    handleErrors();
    
    // Initialize sci-fi effects
    createParticles();
    createMouseTrail();
    enhanceChipAnimation();
    initHolographicText();
    addCircuitBackground();
    initAdvancedAnimations();
    enhanceButtons();
    createDataVisualization();
    
    // Initialize smooth animations and effects
    initSmoothAnimations();
    init3DEffects();
    enhanceSmoothScrolling();
    addAnimationKeyframes();
    
    // Optional enhancements (uncomment to enable)
    // initMegaDropdown();
    
    console.log('ChipTech Global website initialized successfully!');
});

// Service Worker registration for PWA capabilities (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('SW registered: ', registration);
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Export functions for potential module usage
export {
    showCookieNotice,
    hideCookieNotice,
    initAnimations,
    animateStats
}; 