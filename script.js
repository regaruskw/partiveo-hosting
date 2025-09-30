// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
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

// Package Selection Function
function selectPackage(packageType) {
    const packageSelect = document.getElementById('package');
    const packageOptions = {
        'starter': 'Başlangıç - ₺29/ay',
        'professional': 'Profesyonel - ₺59/ay',
        'enterprise': 'Kurumsal - ₺99/ay'
    };
    
    packageSelect.value = packageType;
    
    // Scroll to order form
    document.getElementById('order').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
    
    // Highlight the selected package
    highlightSelectedPackage(packageType);
}

// Highlight selected package
function highlightSelectedPackage(packageType) {
    // Remove previous highlights
    document.querySelectorAll('.package-card').forEach(card => {
        card.style.border = '2px solid #e2e8f0';
    });
    
    // Add highlight to selected package
    const selectedCard = document.querySelector(`[onclick="selectPackage('${packageType}')"]`).closest('.package-card');
    if (selectedCard) {
        selectedCard.style.border = '2px solid #6366f1';
        selectedCard.style.transform = 'scale(1.02)';
        
        // Remove highlight after 3 seconds
        setTimeout(() => {
            selectedCard.style.border = '2px solid #e2e8f0';
            selectedCard.style.transform = 'scale(1)';
        }, 3000);
    }
}

// Order Form Submission
document.getElementById('orderForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const orderData = Object.fromEntries(formData);
    
    // Validate form
    if (!validateOrderForm(orderData)) {
        return;
    }
    
    // Show loading state
    const submitBtn = this.querySelector('.btn-submit');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Gönderiliyor...';
    submitBtn.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        showSuccessMessage('Siparişiniz başarıyla alındı! En kısa sürede sizinle iletişime geçeceğiz.');
        this.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
});

// Contact Form Submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const contactData = Object.fromEntries(formData);
    
    // Validate form
    if (!validateContactForm(contactData)) {
        return;
    }
    
    // Show loading state
    const submitBtn = this.querySelector('.btn-submit');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Gönderiliyor...';
    submitBtn.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        showSuccessMessage('Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.');
        this.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
});

// Form Validation Functions
function validateOrderForm(data) {
    const requiredFields = ['package', 'game', 'location', 'name', 'email', 'phone'];
    
    for (let field of requiredFields) {
        if (!data[field] || data[field].trim() === '') {
            showErrorMessage(`Lütfen ${getFieldName(field)} alanını doldurun.`);
            return false;
        }
    }
    
    // Email validation
    if (!isValidEmail(data.email)) {
        showErrorMessage('Lütfen geçerli bir e-posta adresi girin.');
        return false;
    }
    
    // Phone validation
    if (!isValidPhone(data.phone)) {
        showErrorMessage('Lütfen geçerli bir telefon numarası girin.');
        return false;
    }
    
    return true;
}

function validateContactForm(data) {
    const requiredFields = ['name', 'email', 'subject', 'message'];
    
    for (let field of requiredFields) {
        if (!data[field] || data[field].trim() === '') {
            showErrorMessage(`Lütfen ${getFieldName(field)} alanını doldurun.`);
            return false;
        }
    }
    
    // Email validation
    if (!isValidEmail(data.email)) {
        showErrorMessage('Lütfen geçerli bir e-posta adresi girin.');
        return false;
    }
    
    return true;
}

// Utility Functions
function getFieldName(field) {
    const fieldNames = {
        'package': 'Paket',
        'game': 'Oyun',
        'location': 'Lokasyon',
        'name': 'Ad Soyad',
        'email': 'E-posta',
        'phone': 'Telefon',
        'subject': 'Konu',
        'message': 'Mesaj'
    };
    return fieldNames[field] || field;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone);
}

// Message Display Functions
function showSuccessMessage(message) {
    // Remove existing messages
    removeExistingMessages();
    
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    successDiv.style.display = 'block';
    
    // Insert at the top of the form
    const form = document.querySelector('.order-form, .contact-form');
    form.insertBefore(successDiv, form.firstChild);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        successDiv.remove();
    }, 5000);
}

function showErrorMessage(message) {
    // Remove existing messages
    removeExistingMessages();
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
    
    // Insert at the top of the form
    const form = document.querySelector('.order-form, .contact-form');
    form.insertBefore(errorDiv, form.firstChild);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
}

function removeExistingMessages() {
    const existingMessages = document.querySelectorAll('.success-message, .error-message');
    existingMessages.forEach(message => message.remove());
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
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

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.feature-card, .package-card, .game-card');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Counter animation for statistics
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        element.textContent = Math.floor(start);
        
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        }
    }, 16);
}

// Package comparison functionality
function comparePackages() {
    const packages = document.querySelectorAll('.package-card');
    const comparisonData = [];
    
    packages.forEach(package => {
        const name = package.querySelector('h3').textContent;
        const price = package.querySelector('.amount').textContent;
        const features = Array.from(package.querySelectorAll('.package-features li')).map(li => li.textContent.trim());
        
        comparisonData.push({
            name,
            price,
            features
        });
    });
    
    // You can implement a comparison modal here
    console.log('Package comparison data:', comparisonData);
}

// Search functionality for games
function searchGames(query) {
    const gameCards = document.querySelectorAll('.game-card');
    const searchTerm = query.toLowerCase();
    
    gameCards.forEach(card => {
        const gameName = card.querySelector('h3').textContent.toLowerCase();
        if (gameName.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Add search input to games section
document.addEventListener('DOMContentLoaded', () => {
    const gamesSection = document.querySelector('.games .container');
    const gamesTitle = gamesSection.querySelector('h2');
    
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Oyun ara...';
    searchInput.style.cssText = `
        width: 100%;
        max-width: 400px;
        margin: 0 auto 2rem;
        padding: 12px 16px;
        border: 2px solid #e2e8f0;
        border-radius: 8px;
        font-size: 1rem;
        display: block;
    `;
    
    searchInput.addEventListener('input', (e) => {
        searchGames(e.target.value);
    });
    
    gamesTitle.insertAdjacentElement('afterend', searchInput);
});

// FAQ functionality (if you want to add FAQ section)
function toggleFAQ(element) {
    const answer = element.nextElementSibling;
    const icon = element.querySelector('.faq-icon');
    
    if (answer.style.display === 'block') {
        answer.style.display = 'none';
        icon.style.transform = 'rotate(0deg)';
    } else {
        answer.style.display = 'block';
        icon.style.transform = 'rotate(180deg)';
    }
}

// Cookie consent (basic implementation)
function showCookieConsent() {
    if (!localStorage.getItem('cookieConsent')) {
        const consentBanner = document.createElement('div');
        consentBanner.innerHTML = `
            <div style="position: fixed; bottom: 0; left: 0; right: 0; background: #1e293b; color: white; padding: 1rem; text-align: center; z-index: 1000;">
                <p>Bu web sitesi deneyiminizi geliştirmek için çerezler kullanır. 
                <button onclick="acceptCookies()" style="background: #6366f1; color: white; border: none; padding: 8px 16px; border-radius: 4px; margin-left: 1rem; cursor: pointer;">Kabul Et</button>
                </p>
            </div>
        `;
        document.body.appendChild(consentBanner);
    }
}

function acceptCookies() {
    localStorage.setItem('cookieConsent', 'true');
    document.querySelector('[style*="position: fixed"]').remove();
}

// Initialize cookie consent
document.addEventListener('DOMContentLoaded', showCookieConsent);

// Performance optimization: Lazy loading for images
function lazyLoadImages() {
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

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', lazyLoadImages);