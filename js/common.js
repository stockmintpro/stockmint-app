// ===== KONFIGURASI PATH =====
// Untuk GitHub Pages: '/stockmint-app'
// Untuk localhost: '' (kosong)
const BASE_PATH = '/stockmint-app'; // Ganti ke '' jika di localhost

// ===== EKSEKUSI SAAT DOKUMEN SIAP =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('StockMint Pro - Common.js loaded | Base Path:', BASE_PATH);
    
    // Hanya load elemen dinamis jika tidak ada sidebar statis
    if (!document.querySelector('.sidebar')) {
        loadCommonElements();
    }
    
    // Inisialisasi semua fungsi
    initCommonFunctions();
});

// ===== FUNGSI LOAD ELEMEN DINAMIS (untuk halaman tanpa sidebar) =====
function loadCommonElements() {
    const base = BASE_PATH ? BASE_PATH + '/' : '';
    
    const sidebarHTML = `
        <!-- Sidebar -->
        <aside class="sidebar">
            <div class="logo">
                <img src="${base}assets/images/logo-stockmint.png" 
                     alt="StockMint Logo" 
                     class="logo-img"
                     onerror="this.style.display='none'; document.getElementById('fallbackLogo').style.display='flex';">
                
                <div id="fallbackLogo" class="logo-fallback" style="display: none;">
                    <i class="fas fa-boxes"></i>
                </div>
                
                <div class="logo-text">
                    <h2>StockMint <span class="pro-badge">Pro</span></h2>
                    <div class="logo-tagline">Precision Inventory & Profit Tracking</div>
                </div>
            </div>
            
            <nav class="nav-menu">
                <ul>
                    <li><a href="${base}dashboard.html"><i class="fas fa-tachometer-alt"></i> Dashboard</a></li>
                    <li><a href="${base}masterdata.html"><i class="fas fa-database"></i> Master Data</a></li>
                    <li class="nav-subheader">BUSINESS ENTITIES</li>
                    <li><a href="${base}entities/company.html"><i class="fas fa-building"></i> Company</a></li>
                    <li><a href="${base}entities/warehouses.html"><i class="fas fa-warehouse"></i> Warehouses</a></li>
                    <li><a href="${base}entities/suppliers.html"><i class="fas fa-truck"></i> Suppliers</a></li>
                    <li><a href="${base}entities/customers.html"><i class="fas fa-users"></i> Customers</a></li>
                    <li class="nav-subheader">OPERATIONS</li>
                    <li><a href="${base}products.html"><i class="fas fa-boxes"></i> Products</a></li>
                    <li><a href="${base}purchases.html"><i class="fas fa-shopping-cart"></i> Purchases</a></li>
                    <li><a href="${base}sales.html"><i class="fas fa-chart-line"></i> Sales</a></li>
                    <li class="nav-subheader">TOOLS</li>
                    <li><a href="${base}calculator.html"><i class="fas fa-calculator"></i> Price Calculator</a></li>
                    <li><a href="${base}reports.html"><i class="fas fa-chart-bar"></i> Reports</a></li>
                    <li><a href="${base}settings.html"><i class="fas fa-cog"></i> Settings</a></li>
                </ul>
            </nav>
            
            <div class="user-profile">
                <div class="user-avatar">
                    <i class="fas fa-user-circle"></i>
                </div>
                <div class="user-info">
                    <span class="user-name">Admin Joko</span>
                    <span class="user-role">Administrator</span>
                </div>
                <a href="${base}index.html" class="logout-btn" title="Logout">
                    <i class="fas fa-sign-out-alt"></i>
                </a>
            </div>
        </aside>

        <!-- Mobile Menu Toggle -->
        <button class="mobile-menu-toggle" id="mobileMenuToggle">
            <i class="fas fa-bars"></i>
        </button>
    `;
    
    // Insert sidebar jika belum ada
    if (!document.querySelector('.sidebar')) {
        document.body.insertAdjacentHTML('afterbegin', sidebarHTML);
    }
}

// ===== FUNGSI INISIALISASI =====
function initCommonFunctions() {
    initMobileMenu();
    updateDateTime();
    setActiveMenu();
    setupLogout();
    
    // Update waktu setiap menit
    setInterval(updateDateTime, 60000);
    
    // Load logo jika ada fallback
    loadLogo();
}

// ===== MOBILE MENU =====
function initMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const sidebar = document.querySelector('.sidebar');
    
    if (mobileMenuToggle && sidebar) {
        mobileMenuToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
        });
        
        // Close sidebar when clicking outside on mobile
        document.addEventListener('click', function(event) {
            if (window.innerWidth <= 768) {
                const isClickInsideSidebar = sidebar.contains(event.target);
                const isClickOnToggle = mobileMenuToggle.contains(event.target);
                
                if (!isClickInsideSidebar && !isClickOnToggle && sidebar.classList.contains('active')) {
                    sidebar.classList.remove('active');
                }
            }
        });
    }
}

// ===== LOAD LOGO =====
function loadLogo() {
    const base = BASE_PATH ? BASE_PATH + '/' : '';
    const logoImg = document.querySelector('.logo-img');
    
    if (logoImg) {
        // Coba load dari beberapa sumber
        const logoUrls = [
            'https://i.ibb.co.com/XxvfRDyV/logo-stockmint-png.png',
            `${base}assets/images/logo-stockmint.png`,
            `${base}images/logo-stockmint.png`,
            `${base}logo-stockmint.png`
        ];
        
        let currentIndex = 0;
        
        function tryNextLogo() {
            if (currentIndex < logoUrls.length) {
                logoImg.src = logoUrls[currentIndex];
                currentIndex++;
            }
        }
        
        logoImg.onerror = tryNextLogo;
        logoImg.onload = function() {
            console.log('Logo loaded from:', this.src);
        };
        
        // Coba load pertama
        tryNextLogo();
    }
}

// ===== DATE & TIME =====
function updateDateTime() {
    const now = new Date();
    
    // Format time (HH:MM)
    const timeString = now.toLocaleTimeString('id-ID', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
    });
    
    // Format date (DD/MM/YYYY)
    const dateString = now.toLocaleDateString('id-ID', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
    
    // Format date long (Monday, 26 December 2025)
    const dateLongString = now.toLocaleDateString('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
    
    // Update semua elemen waktu
    const timeElements = document.querySelectorAll('#currentTime, .time, .current-time');
    const dateElements = document.querySelectorAll('#currentDate, .date, .current-date');
    
    timeElements.forEach(el => {
        el.textContent = timeString;
    });
    
    dateElements.forEach(el => {
        if (el.classList.contains('date-long') || el.hasAttribute('data-format') && el.getAttribute('data-format') === 'long') {
            el.textContent = dateLongString;
        } else {
            el.textContent = dateString;
        }
    });
}

// ===== ACTIVE MENU HIGHLIGHT =====
function setActiveMenu() {
    const currentPath = window.location.pathname;
    let currentPage = currentPath.substring(currentPath.lastIndexOf('/') + 1);
    
    // Handle root path atau BASE_PATH
    if (currentPage === '' || currentPage === BASE_PATH.replace(/\//g, '')) {
        currentPage = 'dashboard.html';
    }
    
    // Remove active class dari semua menu item
    document.querySelectorAll('.nav-menu li').forEach(li => {
        li.classList.remove('active');
    });
    
    // Set active berdasarkan halaman saat ini
    const menuItems = document.querySelectorAll('.nav-menu a');
    
    menuItems.forEach(item => {
        const href = item.getAttribute('href');
        const itemPage = href.substring(href.lastIndexOf('/') + 1);
        
        // Exact match untuk halaman utama
        if (currentPage === itemPage) {
            item.parentElement.classList.add('active');
            return;
        }
        
        // Match untuk halaman entities
        const isEntityPage = currentPage.includes('company') || currentPage.includes('warehouses') || 
                           currentPage.includes('suppliers') || currentPage.includes('customers');
        
        if (isEntityPage && itemPage.includes(currentPage.replace('.html', ''))) {
            item.parentElement.classList.add('active');
            return;
        }
        
        // Match untuk dashboard/masterdata tanpa folder
        if ((currentPage === 'dashboard.html' && itemPage === 'dashboard.html') ||
            (currentPage === 'masterdata.html' && itemPage === 'masterdata.html')) {
            item.parentElement.classList.add('active');
        }
    });
    
    // Tambah highlight untuk parent jika di sub-folder
    if (currentPath.includes('entities/')) {
        const masterDataLink = document.querySelector('a[href*="masterdata.html"]');
        if (masterDataLink) {
            masterDataLink.parentElement.classList.add('parent-active');
        }
    }
}

// ===== LOGOUT FUNCTION =====
function setupLogout() {
    document.querySelectorAll('.logout-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            logout();
        });
    });
}

function logout() {
    // Show confirmation dialog
    if (!confirm('Apakah Anda yakin ingin logout dari StockMint Pro?')) {
        return;
    }
    
    // Clear semua data user dari localStorage
    const itemsToKeep = ['language', 'theme']; // Data yang ingin dipertahankan
    const allKeys = Object.keys(localStorage);
    
    allKeys.forEach(key => {
        if (!itemsToKeep.includes(key)) {
            localStorage.removeItem(key);
        }
    });
    
    // Redirect ke index.html (halaman landing/login)
    const base = BASE_PATH ? BASE_PATH + '/' : '';
    window.location.href = base + 'index.html';
}

// ===== AUTH CHECK (jika diperlukan) =====
function checkAuth() {
    const currentUser = localStorage.getItem('currentUser') || 
                       localStorage.getItem('stockmint_user') || 
                       sessionStorage.getItem('stockmint_user');
    
    // Jika tidak ada user data dan tidak di halaman index, redirect
    const currentPage = window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1);
    const allowedPages = ['index.html', 'login.html', 'register.html', 'forgot-password.html'];
    
    if (!currentUser && !allowedPages.includes(currentPage) && !currentPage.includes('landing')) {
        const base = BASE_PATH ? BASE_PATH + '/' : '';
        window.location.href = base + 'index.html';
        return false;
    }
    
    return true;
}

// ===== HELPER FUNCTIONS =====
function getBasePath() {
    return BASE_PATH ? BASE_PATH + '/' : '';
}

function navigateTo(url) {
    const base = getBasePath();
    window.location.href = base + url;
}

function showNotification(message, type = 'info', duration = 5000) {
    // Buat elemen notifikasi
    const notification = document.createElement('div');
    notification.className = `global-notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 
                         type === 'error' ? 'exclamation-circle' : 
                         type === 'warning' ? 'exclamation-triangle' : 
                         'info-circle'}"></i>
        <span>${message}</span>
        <button class="notification-close"><i class="fas fa-times"></i></button>
    `;
    
    // Tambah ke body
    document.body.appendChild(notification);
    
    // Tambah style jika belum ada
    if (!document.getElementById('notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            .global-notification {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 16px 20px;
                border-radius: 12px;
                color: white;
                display: flex;
                align-items: center;
                gap: 12px;
                z-index: 99999;
                animation: slideInRight 0.3s ease;
                box-shadow: 0 8px 25px rgba(0,0,0,0.2);
                max-width: 400px;
                font-weight: 500;
            }
            .global-notification.success {
                background: linear-gradient(135deg, #19BEBB 0%, #14a5a3 100%);
                border-left: 5px solid #0d8c8a;
            }
            .global-notification.error {
                background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
                border-left: 5px solid #b91c1c;
            }
            .global-notification.warning {
                background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
                border-left: 5px solid #b45309;
            }
            .global-notification.info {
                background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
                border-left: 5px solid #1e40af;
            }
            .notification-close {
                background: transparent;
                border: none;
                color: rgba(255,255,255,0.8);
                cursor: pointer;
                margin-left: auto;
                font-size: 16px;
                padding: 4px;
                border-radius: 4px;
            }
            .notification-close:hover {
                background: rgba(255,255,255,0.1);
            }
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
        `;
        document.head.appendChild(style);
    }
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    });
    
    // Auto remove after duration
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }
    }, duration);
}

// ===== MAKE FUNCTIONS GLOBALLY AVAILABLE =====
window.updateDateTime = updateDateTime;
window.setActiveMenu = setActiveMenu;
window.logout = logout;
window.navigateTo = navigateTo;
window.getBasePath = getBasePath;
window.showNotification = showNotification;

// Jalankan checkAuth jika diperlukan
// window.addEventListener('load', checkAuth);
