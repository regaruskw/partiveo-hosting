// Modal Functions
function showLogin() {
    closeAllModals();
    document.getElementById('loginModal').style.display = 'block';
}

function showRegister() {
    closeAllModals();
    document.getElementById('registerModal').style.display = 'block';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

function closeAllModals() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.style.display = 'none';
    });
}

// Close modal when clicking outside
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
}

// Smooth scroll functions
function scrollToServers() {
    document.getElementById('servers').scrollIntoView({ behavior: 'smooth' });
}

function scrollToPricing() {
    document.getElementById('pricing').scrollIntoView({ behavior: 'smooth' });
}

// Handle Login
function handleLogin(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    
    // Simulated login - In production, this would connect to your backend
    setTimeout(() => {
        alert('Giriş başarılı! Hoş geldiniz.');
        closeModal('loginModal');
    }, 500);
}

// Handle Register
function handleRegister(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    
    // Simulated registration - In production, this would connect to your backend
    setTimeout(() => {
        alert('Kayıt başarılı! Hoş geldiniz.');
        closeModal('registerModal');
    }, 500);
}

// Handle Contact Form
function handleContactForm(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    
    // Simulated form submission - In production, this would send to your backend
    setTimeout(() => {
        alert('Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.');
        event.target.reset();
    }, 500);
}

// Open Order Modal
function openOrderModal(gameName) {
    closeAllModals();
    const modal = document.getElementById('orderModal');
    const gameSelect = document.getElementById('gameSelect');
    
    if (gameName) {
        gameSelect.value = gameName;
        updateOrderSummary();
    }
    
    modal.style.display = 'block';
}

// Select Plan
function selectPlan(planName, price) {
    scrollToPricing();
    setTimeout(() => {
        openOrderModal();
        document.getElementById('planSelect').value = planName;
        updateOrderSummary();
    }, 500);
}

// Update Order Summary
function updateOrderSummary() {
    const gameSelect = document.getElementById('gameSelect');
    const planSelect = document.getElementById('planSelect');
    
    const game = gameSelect.value;
    const plan = planSelect.value;
    const price = planSelect.selectedOptions[0]?.dataset.price || 0;
    
    document.getElementById('summaryGame').textContent = game || '-';
    document.getElementById('summaryPlan').textContent = plan || '-';
    document.getElementById('summaryTotal').textContent = price ? `₺${price}/ay` : '₺0/ay';
}

// Event listeners for order form
document.addEventListener('DOMContentLoaded', function() {
    const gameSelect = document.getElementById('gameSelect');
    const planSelect = document.getElementById('planSelect');
    
    if (gameSelect) {
        gameSelect.addEventListener('change', updateOrderSummary);
    }
    
    if (planSelect) {
        planSelect.addEventListener('change', updateOrderSummary);
    }
});

// Handle Order
function handleOrder(event) {
    event.preventDefault();
    
    const gameSelect = document.getElementById('gameSelect');
    const planSelect = document.getElementById('planSelect');
    const game = gameSelect.value;
    const plan = planSelect.value;
    const price = planSelect.selectedOptions[0]?.dataset.price || 0;
    
    // Simulated order processing - In production, this would connect to your backend
    const orderData = {
        game: game,
        plan: plan,
        price: price,
        timestamp: new Date().toISOString()
    };
    
    console.log('Order Data:', orderData);
    
    // Show loading state
    const submitBtn = event.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'İşleniyor...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        closeModal('orderModal');
        showSuccessNotification(`
            Siparişiniz başarıyla alındı! 
            ${game} sunucunuz ${plan} paketiyle 60 saniye içinde hazır olacak.
            Sunucu bilgileriniz e-posta adresinize gönderilecektir.
        `);
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        event.target.reset();
        updateOrderSummary();
    }, 1500);
}

// Success Notification
function showSuccessNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'success-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-check-circle"></i>
            <div>
                <h4>Başarılı!</h4>
                <p>${message}</p>
            </div>
            <button onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add to body
    document.body.appendChild(notification);
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 3000;
        animation: slideIn 0.3s;
    `;
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// Add notification styles
const style = document.createElement('style');
style.textContent = `
    .success-notification {
        background-color: var(--card-bg);
        border: 1px solid var(--success-color);
        border-radius: 12px;
        padding: 1.5rem;
        max-width: 400px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    }
    
    .notification-content {
        display: flex;
        gap: 1rem;
        align-items: flex-start;
    }
    
    .notification-content i.fa-check-circle {
        color: var(--success-color);
        font-size: 2rem;
    }
    
    .notification-content h4 {
        margin-bottom: 0.25rem;
        color: var(--text-primary);
    }
    
    .notification-content p {
        color: var(--text-secondary);
        font-size: 0.9rem;
    }
    
    .notification-content button {
        background: none;
        border: none;
        color: var(--text-secondary);
        cursor: pointer;
        font-size: 1.25rem;
        padding: 0;
        margin-left: auto;
    }
    
    .notification-content button:hover {
        color: var(--text-primary);
    }
    
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Add scroll animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
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
    const animatedElements = document.querySelectorAll('.feature-card, .server-card, .pricing-card, .location-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s, transform 0.6s';
        observer.observe(el);
    });
});