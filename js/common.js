// ===== KONFIGURASI PATH =====
// Untuk GitHub Pages: '/stockmint-app'
// Untuk localhost: ''
const BASE_PATH = '/stockmint-app';

// ===== EKSEKUSI SAAT DOKUMEN SIAP =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('common.js loaded - BASE_PATH:', BASE_PATH);
    
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
                <div class="logo-brand">
                    <h2><i class="fas fa-boxes"></i> StockMint</h2>
                    <span class="pro-badge">Pro</span>
                </div>
                <div class="logo-tagline">
                    Precision Inventory & Profit Tracking
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
                <a href="${base}login.html" class="logout-btn" title="Logout">
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
    
    // Update elements with different selectors
    document.querySelectorAll('#currentTime, .time').forEach(el => {
        el.textContent = timeString;
    });
    
    document.querySelectorAll('#currentDate, .date').forEach(el => {
        if (el.classList.contains('date-long')) {
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
    
    // Handle root path
    if (currentPage === '' || currentPage === BASE_PATH) {
        currentPage = 'dashboard.html';
    }
    
    // Remove active class from all
    document.querySelectorAll('.nav-menu li').forEach(li => {
        li.classList.remove('active');
    });
    
    // Set active based on current page
    document.querySelectorAll('.nav-menu a').forEach(item => {
        const href = item.getAttribute('href');
        const itemPage = href.substring(href.lastIndexOf('/') + 1);
        
        // Simple matching for main pages
        if (currentPage === itemPage) {
            item.parentElement.classList.add('active');
            return;
        }
        
        // For entities folder
        if (currentPage.includes('company') && itemPage.includes('company')) {
            item.parentElement.classList.add('active');
        }
        if (currentPage.includes('warehouses') && itemPage.includes('warehouses')) {
            item.parentElement.classList.add('active');
        }
        if (currentPage.includes('suppliers') && itemPage.includes('suppliers')) {
            item.parentElement.classList.add('active');
        }
        if (currentPage.includes('customers') && itemPage.includes('customers')) {
            item.parentElement.classList.add('active');
        }
    });
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
    // Clear all user data
    localStorage.removeItem('currentUser');
    localStorage.removeItem('stockmint_user');
    localStorage.removeItem('stockmint_token');
    
    // Redirect to login
    const base = BASE_PATH ? BASE_PATH + '/' : '';
    window.location.href = base + 'login.html';
}

// ===== HELPER FUNCTIONS =====
function getBasePath() {
    return BASE_PATH ? BASE_PATH + '/' : '';
}

function navigateTo(url) {
    const base = getBasePath();
    window.location.href = base + url;
}

// ===== MAKE FUNCTIONS GLOBALLY AVAILABLE =====
window.updateDateTime = updateDateTime;
window.setActiveMenu = setActiveMenu;
window.logout = logout;
window.navigateTo = navigateTo;
window.getBasePath = getBasePath;
