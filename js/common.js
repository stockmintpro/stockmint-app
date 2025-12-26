// File: js/common.js
// Fungsi-fungsi yang digunakan di semua halaman

// Base Path untuk semua link
const BASE_PATH = window.location.hostname.includes('github.io') ? '/stockmint-app' : '';

// Load sidebar dan navbar langsung dari string HTML
function loadCommonElements() {
    // SIDEBAR HTML - PERBAIKI SEMUA LINK
    const sidebarHTML = `
        <!-- Hamburger Menu -->
        <button class="hamburger-menu" id="hamburgerBtn">
            <i class="fas fa-bars"></i>
        </button>
        
        <!-- Overlay untuk menutup sidebar di HP -->
        <div class="sidebar-overlay" id="sidebarOverlay"></div>
        
        <!-- Sidebar -->
        <div class="sidebar" id="sidebar">
            <!-- Logo Section -->
            <div class="logo-container">
                <img src="https://i.ibb.co.com/XxvfRDyV/logo-stockmint-png.png" 
                     alt="StockMint Logo" 
                     class="logo"
                     id="mainLogo"
                     onerror="this.style.display='none'; document.getElementById('fallbackLogo').style.display='flex';">
                
                <div class="logo-fallback" id="fallbackLogo" style="display: none;">
                    SM
                </div>
                
                <div class="logo-text">
                    <div class="logo-title">StockMint</div>
                    <div class="logo-subtitle">Precision Inventory &<br>Profit Tracking</div>
                </div>
            </div>

            <!-- Menu -->
            <div class="menu">
                <!-- PERBAIKI SEMUA LINK DENGAN BASE_PATH -->
                <a href="${BASE_PATH}/dashboard.html" class="menu-item">
                    <i class="fas fa-home"></i>
                    <span class="menu-text">Dashboard</span>
                </a>
                
                <a href="${BASE_PATH}/masterdata.html" class="menu-item">
                    <i class="fas fa-database"></i>
                    <span class="menu-text">Master Data</span>
                </a>
                
                <!-- Business Entities Group (Collapsible) -->
                <div class="menu-group">
                    <div class="menu-group-title">
                        BUSINESS ENTITIES
                        <i class="fas fa-chevron-right"></i>
                    </div>
                    <div class="submenu-items">
                        <a href="${BASE_PATH}/entities/company.html" class="menu-item submenu-item">
                            <i class="fas fa-building"></i>
                            <span class="menu-text">Company</span>
                        </a>
                        <a href="${BASE_PATH}/entities/warehouses.html" class="menu-item submenu-item">
                            <i class="fas fa-warehouse"></i>
                            <span class="menu-text">Warehouses</span>
                        </a>
                        <a href="${BASE_PATH}/entities/suppliers.html" class="menu-item submenu-item">
                            <i class="fas fa-truck-loading"></i>
                            <span class="menu-text">Suppliers</span>
                        </a>
                        <a href="${BASE_PATH}/entities/customers.html" class="menu-item submenu-item">
                            <i class="fas fa-users"></i>
                            <span class="menu-text">Customers</span>
                        </a>
                    </div>
                </div>
                
                <!-- Lanjutkan perbaikan untuk semua link lainnya... -->
                <a href="${BASE_PATH}/products.html" class="menu-item">
                    <i class="fas fa-boxes"></i>
                    <span class="menu-text">Products</span>
                </a>
                
                <a href="${BASE_PATH}/purchases.html" class="menu-item">
                    <i class="fas fa-shopping-cart"></i>
                    <span class="menu-text">Purchases</span>
                </a>
                
                <a href="${BASE_PATH}/sales.html" class="menu-item">
                    <i class="fas fa-chart-line"></i>
                    <span class="menu-text">Sales</span>
                </a>
                
                <a href="${BASE_PATH}/calculator.html" class="menu-item">
                    <i class="fas fa-calculator"></i>
                    <span class="menu-text">Price Calculator</span>
                </a>
                
                <a href="${BASE_PATH}/reports.html" class="menu-item">
                    <i class="fas fa-file-alt"></i>
                    <span class="menu-text">Reports</span>
                </a>
                
                <a href="${BASE_PATH}/settings.html" class="menu-item">
                    <i class="fas fa-cog"></i>
                    <span class="menu-text">Settings</span>
                </a>
                
                <a href="${BASE_PATH}/help.html" class="menu-item">
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
    
    // NAVBAR HTML - PERBAIKI LOGOUT
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
 }

// Load sidebar dan navbar langsung dari string HTML
function loadCommonElements() {
    // SIDEBAR HTML
    const sidebarHTML = `
        <!-- Hamburger Menu -->
        <button class="hamburger-menu" id="hamburgerBtn">
            <i class="fas fa-bars"></i>
        </button>
        
        <!-- Overlay untuk menutup sidebar di HP -->
        <div class="sidebar-overlay" id="sidebarOverlay"></div>
        
        <!-- Sidebar -->
        <div class="sidebar" id="sidebar">
            <!-- Logo Section -->
            <div class="logo-container">
                <img src="https://i.ibb.co.com/XxvfRDyV/logo-stockmint-png.png" 
                     alt="StockMint Logo" 
                     class="logo"
                     id="mainLogo"
                     onerror="this.style.display='none'; document.getElementById('fallbackLogo').style.display='flex';">
                
                <div class="logo-fallback" id="fallbackLogo" style="display: none;">
                    SM
                </div>
                
                <div class="logo-text">
                    <div class="logo-title">StockMint</div>
                    <div class="logo-subtitle">Precision Inventory &<br>Profit Tracking</div>
                </div>
            </div>

            <!-- Menu -->
            <div class="menu">
                <a href="dashboard.html" class="menu-item">
                    <i class="fas fa-home"></i>
                    <span class="menu-text">Dashboard</span>
                </a>
                
                <a href="masterdata.html" class="menu-item">
                    <i class="fas fa-database"></i>
                    <span class="menu-text">Master Data</span>
                </a>
                
                <!-- Business Entities Group (Collapsible) -->
                <div class="menu-group">
                    <div class="menu-group-title">
                        BUSINESS ENTITIES
                        <i class="fas fa-chevron-right"></i>
                    </div>
                    <div class="submenu-items">
                        <a href="entities/company.html" class="menu-item submenu-item">
                            <i class="fas fa-building"></i>
                            <span class="menu-text">Company</span>
                        </a>
                        <a href="entities/warehouses.html" class="menu-item submenu-item">
                            <i class="fas fa-warehouse"></i>
                            <span class="menu-text">Warehouses</span>
                        </a>
                        <a href="entities/suppliers.html" class="menu-item submenu-item">
                            <i class="fas fa-truck-loading"></i>
                            <span class="menu-text">Suppliers</span>
                        </a>
                        <a href="entities/customers.html" class="menu-item submenu-item">
                            <i class="fas fa-users"></i>
                            <span class="menu-text">Customers</span>
                        </a>
                    </div>
                </div>
                
                <a href="products.html" class="menu-item">
                    <i class="fas fa-boxes"></i>
                    <span class="menu-text">Products</span>
                </a>
                
                <a href="purchases.html" class="menu-item">
                    <i class="fas fa-shopping-cart"></i>
                    <span class="menu-text">Purchases</span>
                </a>
                
                <a href="sales.html" class="menu-item">
                    <i class="fas fa-chart-line"></i>
                    <span class="menu-text">Sales</span>
                </a>
                
                <a href="calculator.html" class="menu-item">
                    <i class="fas fa-calculator"></i>
                    <span class="menu-text">Price Calculator</span>
                </a>
                
                <a href="reports.html" class="menu-item">
                    <i class="fas fa-file-alt"></i>
                    <span class="menu-text">Reports</span>
                </a>
                
                <a href="settings.html" class="menu-item">
                    <i class="fas fa-cog"></i>
                    <span class="menu-text">Settings</span>
                </a>
                
                <a href="help.html" class="menu-item">
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
    
    // NAVBAR HTML
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
    
    // Insert ke dalam body
    const sidebarContainer = document.createElement('div');
    sidebarContainer.innerHTML = sidebarHTML;
    document.body.insertBefore(sidebarContainer, document.body.firstChild);
    
    const navbarContainer = document.createElement('div');
    navbarContainer.innerHTML = navbarHTML;
    document.body.insertBefore(navbarContainer, document.body.firstChild.nextSibling);
    
    // Inisialisasi setelah elements ditambahkan
    setTimeout(() => {
        initCommon();
    }, 100);
}

// Inisialisasi umum
function initCommon() {
    initSidebar();
    initNavbar();
    setActiveMenu();
}

// Inisialisasi sidebar
function initSidebar() {
    const sidebar = document.getElementById('sidebar');
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    
    if (!sidebar) {
        console.error('Sidebar element not found!');
        return;
    }
    
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
    
    // Handle collapsible menu group untuk Business Entities
    const masterDataMenu = document.querySelector('a[href="masterdata.html"]');
    const businessEntitiesGroup = document.querySelector('.menu-group');
    
    if (masterDataMenu && businessEntitiesGroup) {
        // Check if current page is master data or business entities
        const currentPath = window.location.pathname;
        const currentPage = window.location.pathname.split('/').pop();
        const isMasterDataPage = currentPage === 'masterdata.html' || 
                                 currentPage === 'company.html' ||
                                 currentPage === 'warehouses.html' ||
                                 currentPage === 'suppliers.html' ||
                                 currentPage === 'customers.html' ||
                                 currentPath.includes('entities/');
        
        if (isMasterDataPage) {
            businessEntitiesGroup.classList.add('expanded');
            masterDataMenu.classList.add('active');
        }
        
        // Toggle expand/collapse
        const groupTitle = businessEntitiesGroup.querySelector('.menu-group-title');
        if (groupTitle) {
            groupTitle.addEventListener('click', () => {
                businessEntitiesGroup.classList.toggle('expanded');
            });
        }
    }
}

// Inisialisasi navbar
function initNavbar() {
    // Update user info di navbar
    const user = JSON.parse(localStorage.getItem('stockmint_user') || '{}');
    const userName = document.getElementById('userName');
    const userAvatar = document.getElementById('userAvatar');
    const userPackage = document.getElementById('userPackage');
    
    if (userName) userName.textContent = user.name || user.email;
    if (userPackage) userPackage.textContent = user.package || 'Pro';
    if (userAvatar) {
        if (user.picture) {
            userAvatar.src = user.picture;
        } else {
            userAvatar.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || user.email)}&background=19BEBB&color=fff`;
        }
    }
    
    // Logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('stockmint_token');
            localStorage.removeItem('stockmint_user');
            localStorage.removeItem('stockmint_sheet_id');
            window.location.href = BASE_PATH + '/index.html';
        });
    }
}

// Set active menu berdasarkan halaman saat ini
function setActiveMenu() {
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split('/').pop();
    
    setTimeout(() => {
        const menuItems = document.querySelectorAll('.menu-item');
        if (menuItems.length === 0) return;
        
        // Remove active class from all menu items
        menuItems.forEach(item => {
            item.classList.remove('active');
        });
        
        // Set active class for current page
        menuItems.forEach(item => {
            const href = item.getAttribute('href');
            // Hapus BASE_PATH dari href untuk perbandingan
            const hrefPage = href.replace(BASE_PATH, '').replace(/^\//, '');
            if (hrefPage === currentPage || (currentPage === '' && hrefPage === 'dashboard.html')) {
                item.classList.add('active');
                
                // Jika ini adalah salah satu dari Business Entities, expand group-nya
                if (hrefPage && (hrefPage.includes('company') || hrefPage.includes('warehouses') || 
                    hrefPage.includes('suppliers') || hrefPage.includes('customers') || hrefPage === 'masterdata.html')) {
                    const businessEntitiesGroup = document.querySelector('.menu-group');
                    if (businessEntitiesGroup) {
                        businessEntitiesGroup.classList.add('expanded');
                    }
                }
            }
        });
    }, 200);
}

// Cek autentikasi
function checkAuth() {
    const token = localStorage.getItem('stockmint_token');
    const user = JSON.parse(localStorage.getItem('stockmint_user') || '{}');
    
    if (!token || !user.email) {
        window.location.href = 'index.html';
        return false;
    }
    return true;
}

// Cek apakah dalam mode demo
function isDemoMode() {
    const user = JSON.parse(localStorage.getItem('stockmint_user') || '{}');
    return user.isDemo === true;
}

// Format file size
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}
