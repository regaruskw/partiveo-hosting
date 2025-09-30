// Game Server Rental Website JavaScript

// Package data
const packages = {
    basic: {
        name: 'Başlangıç',
        price: 29,
        features: ['4 GB RAM', '2 CPU Core', '50 GB SSD', '10 Oyuncu', '7/24 Destek']
    },
    standard: {
        name: 'Standart',
        price: 59,
        features: ['8 GB RAM', '4 CPU Core', '100 GB SSD', '25 Oyuncu', '7/24 Destek', 'Mod Desteği']
    },
    premium: {
        name: 'Premium',
        price: 99,
        features: ['16 GB RAM', '8 CPU Core', '200 GB SSD', '50 Oyuncu', '7/24 Destek', 'Mod Desteği', 'Özel Panel']
    }
};

// Discount rates for different durations
const discounts = {
    1: 0,
    3: 0.1,
    6: 0.15,
    12: 0.25
};

// Current selected package
let selectedPackage = null;

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

// Initialize website functionality
function initializeWebsite() {
    setupNavigation();
    setupContactForm();
    setupBookingForm();
    setupScrollAnimations();
    setupMobileMenu();
}

// Navigation functionality
function setupNavigation() {
    const navbar = document.querySelector('.navbar');
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
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
}

// Mobile menu functionality
function setupMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// Scroll to section function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Package selection
function selectPackage(packageType) {
    selectedPackage = packageType;
    const packageData = packages[packageType];
    
    // Update modal with selected package
    const selectedPackageDiv = document.getElementById('selectedPackage');
    selectedPackageDiv.innerHTML = `
        <strong>${packageData.name}</strong> - ₺${packageData.price}/ay
        <br><small>${packageData.features.join(', ')}</small>
    `;
    
    // Update total price
    updateTotalPrice();
    
    // Show modal
    document.getElementById('bookingModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Update total price based on duration
function updateTotalPrice() {
    if (!selectedPackage) return;
    
    const duration = parseInt(document.getElementById('duration').value);
    const basePrice = packages[selectedPackage].price;
    const discount = discounts[duration];
    const totalPrice = basePrice * (1 - discount);
    
    document.getElementById('totalPrice').textContent = `₺${Math.round(totalPrice)}`;
}

// Close modal
function closeModal() {
    document.getElementById('bookingModal').style.display = 'none';
    document.body.style.overflow = 'auto';
    selectedPackage = null;
}

// Setup booking form
function setupBookingForm() {
    const bookingForm = document.getElementById('bookingForm');
    const durationSelect = document.getElementById('duration');
    
    // Update price when duration changes
    durationSelect.addEventListener('change', updateTotalPrice);
    
    // Handle form submission
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        handleBookingSubmission();
    });
}

// Handle booking form submission
function handleBookingSubmission() {
    const formData = new FormData(document.getElementById('bookingForm'));
    const bookingData = {
        package: selectedPackage,
        serverName: formData.get('serverName'),
        gameType: formData.get('gameType'),
        duration: formData.get('duration'),
        location: formData.get('location'),
        customerName: formData.get('customerName'),
        customerEmail: formData.get('customerEmail'),
        customerPhone: formData.get('customerPhone'),
        totalPrice: document.getElementById('totalPrice').textContent
    };
    
    // Show loading state
    const submitBtn = document.querySelector('#bookingForm button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.innerHTML = '<span class="loading"></span> İşleniyor...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // In a real application, you would send this data to your backend
        console.log('Booking Data:', bookingData);
        
        // Show success message
        showNotification('Rezervasyonunuz başarıyla alındı! En kısa sürede size dönüş yapacağız.', 'success');
        
        // Reset form and close modal
        document.getElementById('bookingForm').reset();
        closeModal();
        
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

// Setup contact form
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        handleContactSubmission();
    });
}

// Handle contact form submission
function handleContactSubmission() {
    const formData = new FormData(document.getElementById('contactForm'));
    const contactData = {
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message')
    };
    
    // Show loading state
    const submitBtn = document.querySelector('#contactForm button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.innerHTML = '<span class="loading"></span> Gönderiliyor...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // In a real application, you would send this data to your backend
        console.log('Contact Data:', contactData);
        
        // Show success message
        showNotification('Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.', 'success');
        
        // Reset form
        document.getElementById('contactForm').reset();
        
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

// Show notification
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#2ecc71' : '#3498db'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 3000;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Setup scroll animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.package-card, .feature-card, .game-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
}

// Close modal when clicking outside
window.addEventListener('click', function(e) {
    const modal = document.getElementById('bookingModal');
    if (e.target === modal) {
        closeModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        margin-left: auto;
        padding: 0.25rem;
        border-radius: 50%;
        transition: background-color 0.3s ease;
    }
    
    .notification-close:hover {
        background-color: rgba(255, 255, 255, 0.2);
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
    }
`;
document.head.appendChild(style);

// Utility functions
function formatPrice(price) {
    return new Intl.NumberFormat('tr-TR', {
        style: 'currency',
        currency: 'TRY'
    }).format(price);
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\+]?[0-9\s\-\(\)]{10,}$/;
    return re.test(phone);
}

// Add form validation
function validateForm(formId) {
    const form = document.getElementById(formId);
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = '#e74c3c';
            isValid = false;
        } else {
            input.style.borderColor = '#e1e5e9';
        }
        
        // Email validation
        if (input.type === 'email' && input.value && !validateEmail(input.value)) {
            input.style.borderColor = '#e74c3c';
            isValid = false;
        }
        
        // Phone validation
        if (input.type === 'tel' && input.value && !validatePhone(input.value)) {
            input.style.borderColor = '#e74c3c';
            isValid = false;
        }
    });
    
    return isValid;
}

// Enhanced form submission with validation
function handleBookingSubmission() {
    if (!validateForm('bookingForm')) {
        showNotification('Lütfen tüm alanları doğru şekilde doldurun.', 'error');
        return;
    }
    
    const formData = new FormData(document.getElementById('bookingForm'));
    const bookingData = {
        package: selectedPackage,
        serverName: formData.get('serverName'),
        gameType: formData.get('gameType'),
        duration: formData.get('duration'),
        location: formData.get('location'),
        customerName: formData.get('customerName'),
        customerEmail: formData.get('customerEmail'),
        customerPhone: formData.get('customerPhone'),
        totalPrice: document.getElementById('totalPrice').textContent,
        timestamp: new Date().toISOString()
    };
    
    // Show loading state
    const submitBtn = document.querySelector('#bookingForm button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.innerHTML = '<span class="loading"></span> İşleniyor...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        console.log('Booking Data:', bookingData);
        showNotification('Rezervasyonunuz başarıyla alındı! En kısa sürede size dönüş yapacağız.', 'success');
        document.getElementById('bookingForm').reset();
        closeModal();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

function handleContactSubmission() {
    if (!validateForm('contactForm')) {
        showNotification('Lütfen tüm alanları doğru şekilde doldurun.', 'error');
        return;
    }
    
    const formData = new FormData(document.getElementById('contactForm'));
    const contactData = {
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message'),
        timestamp: new Date().toISOString()
    };
    
    const submitBtn = document.querySelector('#contactForm button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.innerHTML = '<span class="loading"></span> Gönderiliyor...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        console.log('Contact Data:', contactData);
        showNotification('Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.', 'success');
        document.getElementById('contactForm').reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
}