// ===== KONFIGURASI PATH =====
// Untuk GitHub Pages: '/stockmint-app'
// Untuk localhost: ''
const BASE_PATH = '/stockmint-app';

// ===== EKSEKUSI SAAT DOKUMEN SIAP =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('StockMint Pro - Initializing...');
    
    // Hanya load elemen dinamis jika tidak ada sidebar statis
    if (!document.querySelector('.sidebar')) {
        loadCommonElements();
    } else {
        // Jika sidebar sudah ada, setup logo
        setupLogo();
    }
    
    // Inisialisasi semua fungsi
    initCommonFunctions();
});

// ===== FUNGSI LOAD ELEMEN DINAMIS =====
function loadCommonElements() {
    const base = getBasePath();
    
    const sidebarHTML = `
        <!-- Sidebar -->
        <aside class="sidebar">
            <div class="logo">
                <div class="logo-container">
                    <img src="${base}assets/images/logo-stockmint.png" 
                         alt="StockMint Logo" 
                         class="logo-img"
                         onerror="this.src='${base}images/logo-stockmint.png'; this.onerror=null;">
                    <div class="logo-text">
                        <h1>StockMint <span class="pro-badge">Pro</span></h1>
                        <div class="logo-tagline">Precision Inventory & Profit Tracking</div>
                    </div>
                </div>
            </div>
            
            <nav class="nav-menu">
                <ul>
                    <li><a href="${base}dashboard.html"><i class="fas fa-tachometer-alt"></i> Dashboard</a></li>
                    <li><a href="${base}masterdata.html"><i class="fas fa-database"></i> Master Data</a></li>
                    
                    <!-- Business Entities Submenu -->
                    <div class="nav-subheader" id="businessEntitiesToggle">
                        BUSINESS ENTITIES
                        <i class="fas fa-chevron-down"></i>
                    </div>
                    <div class="entities-submenu" id="businessEntitiesMenu">
                        <li><a href="${base}entities/company.html"><i class="fas fa-building"></i> Company</a></li>
                        <li><a href="${base}entities/warehouses.html"><i class="fas fa-warehouse"></i> Warehouses</a></li>
                        <li><a href="${base}entities/suppliers.html"><i class="fas fa-truck"></i> Suppliers</a></li>
                        <li><a href="${base}entities/customers.html"><i class="fas fa-users"></i> Customers</a></li>
                    </div>
                    
                    <li><a href="${base}products.html"><i class="fas fa-boxes"></i> Products</a></li>
                    <li><a href="${base}purchases.html"><i class="fas fa-shopping-cart"></i> Purchases</a></li>
                    <li><a href="${base}sales.html"><i class="fas fa-chart-line"></i> Sales</a></li>
                    
                    <div class="nav-subheader">TOOLS</div>
                    <li><a href="${base}calculator.html"><i class="fas fa-calculator"></i> Price Calculator</a></li>
                    <li><a href="${base}reports.html"><i class="fas fa-chart-bar"></i> Reports</a></li>
                    
                    <div class="nav-subheader">SETTINGS</div>
                    <li><a href="${base}settings.html"><i class="fas fa-cog"></i> Settings</a></li>
                    <li><a href="${base}contacts.html"><i class="fas fa-address-book"></i> Contacts</a></li>
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
        setupLogo(); // Setup logo setelah dimasukkan
    }
}

// ===== FUNGSI INISIALISASI =====
function initCommonFunctions() {
    initMobileMenu();
    initBusinessEntitiesToggle();
    updateDateTime();
    setActiveMenu();
    setupLogout();
    
    // Update waktu setiap menit
    setInterval(updateDateTime, 60000);
}

// ===== SETUP LOGO =====
function setupLogo() {
    const logoImg = document.querySelector('.logo-img');
    if (logoImg) {
        // Coba berbagai sumber logo
        const logoUrls = [
            'https://i.ibb.co.com/XxvfRDyV/logo-stockmint-png.png',
            'https://i.ibb.co/XxvfRDyV/logo-stockmint-png.png',
            `${getBasePath()}assets/images/logo-stockmint.png`,
            `${getBasePath()}images/logo-stockmint.png`,
            `${getBasePath()}logo-stockmint.png`
        ];
        
        let currentIndex = 0;
        
        function tryNextLogo() {
            if (currentIndex < logoUrls.length) {
                logoImg.src = logoUrls[currentIndex];
                currentIndex++;
            }
        }
        
        logoImg.onerror = tryNextLogo;
        
        // Coba load pertama
        tryNextLogo();
    }
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

// ===== BUSINESS ENTITIES TOGGLE =====
function initBusinessEntitiesToggle() {
    const toggle = document.getElementById('businessEntitiesToggle');
    const menu = document.getElementById('businessEntitiesMenu');
    
    if (toggle && menu) {
        // Cek apakah kita di halaman Master Data atau Entities
        const currentPath = window.location.pathname;
        const isMasterDataPage = currentPath.includes('masterdata') || 
                                currentPath.includes('company') ||
                                currentPath.includes('warehouses') ||
                                currentPath.includes('suppliers') ||
                                currentPath.includes('customers');
        
        // Jika di dashboard, sembunyikan Business Entities
        if (currentPath.includes('dashboard') || currentPath === '/' || currentPath === BASE_PATH || 
            currentPath.includes('index')) {
            menu.style.maxHeight = '0';
            menu.style.overflow = 'hidden';
            toggle.classList.add('collapsed');
        } else if (isMasterDataPage) {
            // Jika di halaman Master Data atau Entities, tampilkan
            menu.style.maxHeight = '500px';
            toggle.classList.remove('collapsed');
        }
        
        // Toggle functionality
        toggle.addEventListener('click', function() {
            if (menu.style.maxHeight === '0px' || menu.style.maxHeight === '') {
                menu.style.maxHeight = '500px';
                this.classList.remove('collapsed');
            } else {
                menu.style.maxHeight = '0';
                this.classList.add('collapsed');
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
    
    // Update elements
    document.querySelectorAll('#currentTime, .time').forEach(el => {
        el.textContent = timeString;
    });
    
    document.querySelectorAll('#currentDate, .date').forEach(el => {
        if (el.classList.contains('date-long') || el.dataset.format === 'long') {
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
    if (currentPage === '' || currentPage === BASE_PATH.replace(/\//g, '')) {
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
        
        // Simple matching
        if (currentPage === itemPage) {
            item.parentElement.classList.add('active');
            return;
        }
        
        // Match entities pages
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
    // Show confirmation
    if (confirm('Apakah Anda yakin ingin logout dari StockMint Pro?')) {
        // Clear user data
        const itemsToKeep = ['language', 'theme'];
        Object.keys(localStorage).forEach(key => {
            if (!itemsToKeep.includes(key)) {
                localStorage.removeItem(key);
            }
        });
        
        // Redirect to index.html
        window.location.href = getBasePath() + 'index.html';
    }
}

// ===== HELPER FUNCTIONS =====
function getBasePath() {
    return BASE_PATH ? BASE_PATH + '/' : '';
}

function navigateTo(url) {
    window.location.href = getBasePath() + url;
}

// ===== GLOBAL FUNCTIONS =====
window.updateDateTime = updateDateTime;
window.setActiveMenu = setActiveMenu;
window.logout = logout;
window.navigateTo = navigateTo;
window.getBasePath = getBasePath;
