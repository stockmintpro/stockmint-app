// File: js/common.js - SOLUSI FINAL
// ===== BASE PATH =====
// Untuk GitHub Pages: '/stockmint-app'
// Untuk localhost: '' (kosong)
const BASE_PATH = '/stockmint-app'; // ← INI SATU-SATUNYA YANG PERLU DIUBAH

// ===== LOAD ELEMENTS =====
function loadCommonElements() {
    // Pastikan BASE_PATH diakhiri dengan slash jika tidak kosong
    const base = BASE_PATH ? BASE_PATH + '/' : '';
    
    const sidebarHTML = `
        <!-- Hamburger Menu -->
        <button class="hamburger-menu" id="hamburgerBtn">
            <i class="fas fa-bars"></i>
        </button>
        
        <!-- Sidebar -->
        <div class="sidebar-overlay" id="sidebarOverlay"></div>
        <div class="sidebar" id="sidebar">
            <!-- Logo Section -->
            <div class="logo-container">
                <img src="https://i.ibb.co.com/XxvfRDyV/logo-stockmint-png.png" 
                     alt="StockMint Logo" 
                     class="logo"
                     onerror="this.style.display='none'; document.getElementById('fallbackLogo').style.display='flex';">
                
                <div class="logo-fallback" id="fallbackLogo" style="display: none;">
                    SM
                </div>
                
                <div class="logo-text">
                    <div class="logo-title">StockMint</div>
                    <div class="logo-subtitle">Precision Inventory &<br>Profit Tracking</div>
                </div>
            </div>

            <!-- Menu - SEMUA LINK MENGGUNAKAN base -->
            <div class="menu">
                <a href="${base}dashboard.html" class="menu-item">
                    <i class="fas fa-home"></i>
                    <span class="menu-text">Dashboard</span>
                </a>
                
                <a href="${base}masterdata.html" class="menu-item">
                    <i class="fas fa-database"></i>
                    <span class="menu-text">Master Data</span>
                </a>
                
                <!-- Business Entities Group -->
                <div class="menu-group">
                    <div class="menu-group-title">
                        BUSINESS ENTITIES
                        <i class="fas fa-chevron-right"></i>
                    </div>
                    <div class="submenu-items">
                        <a href="${base}entities/company.html" class="menu-item submenu-item">
                            <i class="fas fa-building"></i>
                            <span class="menu-text">Company</span>
                        </a>
                        <a href="${base}entities/warehouses.html" class="menu-item submenu-item">
                            <i class="fas fa-warehouse"></i>
                            <span class="menu-text">Warehouses</span>
                        </a>
                        <a href="${base}entities/suppliers.html" class="menu-item submenu-item">
                            <i class="fas fa-truck-loading"></i>
                            <span class="menu-text">Suppliers</span>
                        </a>
                        <a href="${base}entities/customers.html" class="menu-item submenu-item">
                            <i class="fas fa-users"></i>
                            <span class="menu-text">Customers</span>
                        </a>
                    </div>
                </div>
                
                <a href="${base}products.html" class="menu-item">
                    <i class="fas fa-boxes"></i>
                    <span class="menu-text">Products</span>
                </a>
                
                <a href="${base}purchases.html" class="menu-item">
                    <i class="fas fa-shopping-cart"></i>
                    <span class="menu-text">Purchases</span>
                </a>
                
                <a href="${base}sales.html" class="menu-item">
                    <i class="fas fa-chart-line"></i>
                    <span class="menu-text">Sales</span>
                </a>
                
                <a href="${base}calculator.html" class="menu-item">
                    <i class="fas fa-calculator"></i>
                    <span class="menu-text">Price Calculator</span>
                </a>
                
                <a href="${base}reports.html" class="menu-item">
                    <i class="fas fa-file-alt"></i>
                    <span class="menu-text">Reports</span>
                </a>
                
                <a href="${base}settings.html" class="menu-item">
                    <i class="fas fa-cog"></i>
                    <span class="menu-text">Settings</span>
                </a>
                
                <a href="${base}help.html" class="menu-item">
                    <i class="fas fa-question-circle"></i>
                    <span class="menu-text">Help</span>
                </a>
            </div>

            <!-- User Section -->
            <div class="user-section">
                <div class="user-avatar">AJ</div>
                <div class="user-info">
                    <h4>Admin Joko</h4>
                    <p>Administrator</p>
                </div>
            </div>
        </div>
    `;
    
    const navbarHTML = `
        <!-- Top Navbar -->
        <div class="top-navbar" id="topNavbar">
            <div class="top-navbar-content">
                <img id="userAvatar" src="" alt="User">
                <div class="user-info-nav">
                    <div class="user-name" id="userName">Admin Joko</div>
                    <div class="user-package" id="userPackage">Pro</div>
                </div>
            </div>
            <button id="logoutBtn" class="btn" style="background: #dc3545; color: white; padding: 8px 16px;">
                <i class="fas fa-sign-out-alt"></i> Logout
            </button>
        </div>
    `;
    
    // Insert HTML
    document.body.insertAdjacentHTML('afterbegin', sidebarHTML);
    document.body.insertAdjacentHTML('afterbegin', navbarHTML);
    
    // Initialize
    initCommon();
}

// ===== FUNGSI LAINNYA TETAP SAMA =====
function initCommon() {
    initSidebar();
    initNavbar();
    setActiveMenu();
}

function initSidebar() {
    const sidebar = document.getElementById('sidebar');
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    
    if (!sidebar) return;
    
    if (hamburgerBtn) {
        hamburgerBtn.addEventListener('click', () => {
            sidebar.classList.toggle('active');
            if (sidebarOverlay) sidebarOverlay.classList.toggle('active');
        });
    }
    
    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', () => {
            sidebar.classList.remove('active');
            sidebarOverlay.classList.remove('active');
        });
    }
    
    // Business Entities expand
    const currentPath = window.location.pathname;
    const businessEntitiesGroup = document.querySelector('.menu-group');
    
    if (businessEntitiesGroup && (currentPath.includes('masterdata') || currentPath.includes('entities/'))) {
        businessEntitiesGroup.classList.add('expanded');
    }
}

function initNavbar() {
    const user = JSON.parse(localStorage.getItem('stockmint_user') || '{}');
    const userName = document.getElementById('userName');
    const userAvatar = document.getElementById('userAvatar');
    const userPackage = document.getElementById('userPackage');
    
    if (userName) userName.textContent = user.name || user.email;
    if (userPackage) userPackage.textContent = user.package || 'Pro';
    if (userAvatar) {
        userAvatar.src = user.picture || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || user.email)}&background=19BEBB&color=fff`;
    }
    
    // Logout - PASTIKAN PAKAI BASE_PATH
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('stockmint_token');
            localStorage.removeItem('stockmint_user');
            localStorage.removeItem('stockmint_sheet_id');
            // Gunakan base path untuk logout juga
            const base = BASE_PATH ? BASE_PATH + '/' : '';
            window.location.href = base + 'index.html';
        });
    }
}

function setActiveMenu() {
    const currentPath = window.location.pathname;
    
    setTimeout(() => {
        document.querySelectorAll('.menu-item').forEach(item => {
            const href = item.getAttribute('href');
            // Normalisasi path untuk perbandingan
            const normalizedCurrent = currentPath.replace(/\/$/, '');
            const normalizedHref = href.replace(/\/$/, '');
            
            if (normalizedCurrent.endsWith(normalizedHref) || 
                (normalizedCurrent === '' && normalizedHref.includes('dashboard.html'))) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }, 100);
}

// Fungsi utilitas lainnya tetap sama...
function checkAuth() {
    const token = localStorage.getItem('stockmint_token');
    const user = JSON.parse(localStorage.getItem('stockmint_user') || '{}');
    
    if (!token || !user.email) {
        const base = BASE_PATH ? BASE_PATH + '/' : '';
        window.location.href = base + 'index.html';
        return false;
    }
    return true;
}
