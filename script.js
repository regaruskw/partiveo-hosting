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

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(0, 0, 0, 0.98)';
    } else {
        navbar.style.background = 'rgba(0, 0, 0, 0.95)';
    }
});

// Payment Modal Functionality
const modal = document.getElementById('paymentModal');
const closeBtn = document.querySelector('.close');

function selectPlan(planType) {
    const planNames = {
        'starter': 'Başlangıç - ₺29/ay',
        'professional': 'Profesyonel - ₺59/ay',
        'enterprise': 'Enterprise - ₺119/ay'
    };
    
    document.getElementById('selectedPlan').value = planNames[planType];
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Payment Form Submission
document.getElementById('paymentForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Show loading state
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.innerHTML = '<span class="loading"></span> İşleniyor...';
    submitBtn.disabled = true;
    
    // Simulate payment processing
    setTimeout(() => {
        alert('Ödeme başarıyla tamamlandı! Sunucu bilgileriniz e-posta adresinize gönderilecektir.');
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        
        // Reset form
        this.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // Update admin stats
        updateAdminStats();
    }, 2000);
});

// Contact Form Submission
function submitContact(event) {
    event.preventDefault();
    
    const form = event.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.innerHTML = '<span class="loading"></span> Gönderiliyor...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        alert('Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.');
        form.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 1500);
}

// Admin Panel Functionality
let adminData = {
    totalServers: 4847,
    totalCustomers: 2341,
    monthlyRevenue: 284500
};

function updateAdminStats() {
    adminData.totalServers += Math.floor(Math.random() * 3) + 1;
    adminData.totalCustomers += 1;
    adminData.monthlyRevenue += Math.floor(Math.random() * 100) + 50;
    
    document.getElementById('totalServers').textContent = adminData.totalServers.toLocaleString();
    document.getElementById('totalCustomers').textContent = adminData.totalCustomers.toLocaleString();
    document.getElementById('monthlyRevenue').textContent = '₺' + adminData.monthlyRevenue.toLocaleString();
}

function toggleAdmin() {
    const adminPanel = document.getElementById('adminPanel');
    if (adminPanel.style.display === 'none' || adminPanel.style.display === '') {
        adminPanel.style.display = 'block';
        document.body.style.overflow = 'hidden';
        updateAdminStats();
    } else {
        adminPanel.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Secret admin access (Ctrl + Shift + A)
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        toggleAdmin();
    }
});

// Initialize admin stats on page load
document.addEventListener('DOMContentLoaded', function() {
    updateAdminStats();
});

// Card number formatting
document.addEventListener('DOMContentLoaded', function() {
    const cardNumberInput = document.querySelector('input[placeholder="1234 5678 9012 3456"]');
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\s/g, '').replace(/[^0-9]/gi, '');
            let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
            if (formattedValue.length > 19) {
                formattedValue = formattedValue.substring(0, 19);
            }
            e.target.value = formattedValue;
        });
    }
    
    // Expiry date formatting
    const expiryInput = document.querySelector('input[placeholder="MM/YY"]');
    if (expiryInput) {
        expiryInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.substring(0, 2) + '/' + value.substring(2, 4);
            }
            e.target.value = value;
        });
    }
    
    // CVV formatting
    const cvvInput = document.querySelector('input[placeholder="123"]');
    if (cvvInput) {
        cvvInput.addEventListener('input', function(e) {
            e.target.value = e.target.value.replace(/\D/g, '').substring(0, 3);
        });
    }
});

// Scroll animations
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
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.feature-card, .game-card, .pricing-card');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
});

// Dynamic pricing calculator
function calculateCustomPlan() {
    const ram = parseInt(prompt('RAM miktarını GB olarak girin (2-32):'));
    const storage = parseInt(prompt('Depolama miktarını GB olarak girin (20-500):'));
    const slots = parseInt(prompt('Oyuncu slot sayısını girin (10-100):'));
    
    if (ram && storage && slots) {
        const basePrice = 20;
        const ramPrice = ram * 8;
        const storagePrice = storage * 0.5;
        const slotPrice = slots * 1.2;
        
        const totalPrice = Math.round(basePrice + ramPrice + storagePrice + slotPrice);
        
        alert(`Özel planınız: ${ram}GB RAM, ${storage}GB SSD, ${slots} slot\nFiyat: ₺${totalPrice}/ay\n\nBu plan için bizimle iletişime geçin!`);
    }
}

// Add custom plan button to pricing section
document.addEventListener('DOMContentLoaded', function() {
    const pricingGrid = document.querySelector('.pricing-grid');
    if (pricingGrid) {
        const customCard = document.createElement('div');
        customCard.className = 'pricing-card';
        customCard.innerHTML = `
            <div class="pricing-header">
                <h3>Özel Plan</h3>
                <div class="price">
                    <span class="currency">₺</span>
                    <span class="amount">?</span>
                    <span class="period">/ay</span>
                </div>
            </div>
            <ul class="pricing-features">
                <li><i class="fas fa-check"></i> Özel RAM</li>
                <li><i class="fas fa-check"></i> Özel Depolama</li>
                <li><i class="fas fa-check"></i> Özel Slot Sayısı</li>
                <li><i class="fas fa-check"></i> DDoS Koruması</li>
                <li><i class="fas fa-check"></i> 7/24 Öncelikli Destek</li>
                <li><i class="fas fa-check"></i> Tüm Premium Özellikler</li>
            </ul>
            <button class="btn btn-primary pricing-btn" onclick="calculateCustomPlan()">Hesapla</button>
        `;
        pricingGrid.appendChild(customCard);
    }
});

// Performance monitoring
let pageLoadTime = performance.now();
window.addEventListener('load', function() {
    pageLoadTime = performance.now() - pageLoadTime;
    console.log(`Sayfa yükleme süresi: ${pageLoadTime.toFixed(2)}ms`);
});

// Real-time server status simulation
function updateServerStatus() {
    const statuses = ['Online', 'Maintenance', 'High Load'];
    const servers = document.querySelectorAll('.game-card');
    
    servers.forEach(server => {
        const status = statuses[Math.floor(Math.random() * statuses.length)];
        const statusColor = status === 'Online' ? '#00f5ff' : 
                           status === 'Maintenance' ? '#ffaa00' : '#ff4757';
        
        if (!server.querySelector('.server-status')) {
            const statusDiv = document.createElement('div');
            statusDiv.className = 'server-status';
            statusDiv.style.cssText = `
                position: absolute;
                top: 10px;
                right: 10px;
                width: 10px;
                height: 10px;
                border-radius: 50%;
                background: ${statusColor};
                box-shadow: 0 0 10px ${statusColor};
            `;
            server.style.position = 'relative';
            server.appendChild(statusDiv);
        }
    });
}

// Update server status every 30 seconds
setInterval(updateServerStatus, 30000);
document.addEventListener('DOMContentLoaded', updateServerStatus);