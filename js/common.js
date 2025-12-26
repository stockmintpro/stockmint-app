// ===== KONFIGURASI PATH =====
// Untuk GitHub Pages: '/stockmint-app'
// Untuk localhost: ''
const BASE_PATH = '/stockmint-app';

// ===== EKSEKUSI SAAT DOKUMEN SIAP =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('StockMint Pro - Initializing...');
    
    // Setup logo jika sidebar sudah ada
    if (document.querySelector('.sidebar')) {
        setupLogo();
    }
    
    // Inisialisasi semua fungsi
    initCommonFunctions();
});

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
            } else {
                // Jika semua gagal, tampilkan fallback
                logoImg.style.display = 'none';
                const logoCircle = document.querySelector('.logo-circle');
                if (logoCircle) {
                    logoCircle.innerHTML = '<span style="font-size: 24px; font-weight: bold; color: #19BEBB;">SM</span>';
                }
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

// ===== FUNGSI INISIALISASI =====
function initCommonFunctions() {
    initMobileMenu();
    initMenuToggles();
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

// ===== MENU TOGGLES =====
function initMenuToggles() {
    // Business Entities Toggle
    const businessEntitiesToggle = document.querySelector('[data-toggle="business-entities"]');
    const businessEntitiesMenu = document.getElementById('businessEntitiesMenu');
    
    if (businessEntitiesToggle && businessEntitiesMenu) {
        businessEntitiesToggle.addEventListener('click', function(e) {
            e.preventDefault();
            this.parentElement.classList.toggle('expanded');
            businessEntitiesMenu.classList.toggle('expanded');
        });
    }
    
    // Business Operations Toggle
    const businessOpsToggle = document.querySelector('[data-toggle="business-ops"]');
    const businessOpsMenu = document.getElementById('businessOpsMenu');
    
    if (businessOpsToggle && businessOpsMenu) {
        businessOpsToggle.addEventListener('click', function(e) {
            e.preventDefault();
            this.parentElement.classList.toggle('expanded');
            businessOpsMenu.classList.toggle('expanded');
        });
    }
    
    // Tools Toggle
    const toolsToggle = document.querySelector('[data-toggle="tools"]');
    const toolsMenu = document.getElementById('toolsMenu');
    
    if (toolsToggle && toolsMenu) {
        toolsToggle.addEventListener('click', function(e) {
            e.preventDefault();
            this.parentElement.classList.toggle('expanded');
            toolsMenu.classList.toggle('expanded');
        });
    }
    
    // Settings Toggle
    const settingsToggle = document.querySelector('[data-toggle="settings"]');
    const settingsMenu = document.getElementById('settingsMenu');
    
    if (settingsToggle && settingsMenu) {
        settingsToggle.addEventListener('click', function(e) {
            e.preventDefault();
            this.parentElement.classList.toggle('expanded');
            settingsMenu.classList.toggle('expanded');
        });
    }
    
    // Auto expand based on current page
    autoExpandMenus();
}

// ===== AUTO EXPAND MENUS =====
function autoExpandMenus() {
    const currentPath = window.location.pathname;
    
    // Business Entities
    if (currentPath.includes('company') || currentPath.includes('warehouses') || 
        currentPath.includes('suppliers') || currentPath.includes('customers') ||
        currentPath.includes('masterdata')) {
        const businessEntitiesItem = document.querySelector('[data-toggle="business-entities"]').parentElement;
        const businessEntitiesMenu = document.getElementById('businessEntitiesMenu');
        if (businessEntitiesItem && businessEntitiesMenu) {
            businessEntitiesItem.classList.add('expanded');
            businessEntitiesMenu.classList.add('expanded');
        }
    }
    
    // Business Operations
    if (currentPath.includes('products') || currentPath.includes('purchases') || currentPath.includes('sales')) {
        const businessOpsItem = document.querySelector('[data-toggle="business-ops"]').parentElement;
        const businessOpsMenu = document.getElementById('businessOpsMenu');
        if (businessOpsItem && businessOpsMenu) {
            businessOpsItem.classList.add('expanded');
            businessOpsMenu.classList.add('expanded');
        }
    }
    
    // Tools
    if (currentPath.includes('calculator') || currentPath.includes('reports')) {
        const toolsItem = document.querySelector('[data-toggle="tools"]').parentElement;
        const toolsMenu = document.getElementById('toolsMenu');
        if (toolsItem && toolsMenu) {
            toolsItem.classList.add('expanded');
            toolsMenu.classList.add('expanded');
        }
    }
    
    // Settings
    if (currentPath.includes('settings') || currentPath.includes('contacts') || currentPath.includes('help')) {
        const settingsItem = document.querySelector('[data-toggle="settings"]').parentElement;
        const settingsMenu = document.getElementById('settingsMenu');
        if (settingsItem && settingsMenu) {
            settingsItem.classList.add('expanded');
            settingsMenu.classList.add('expanded');
        }
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
    
    // Update elements
    document.querySelectorAll('#currentTime, .time').forEach(el => {
        el.textContent = timeString;
    });
    
    document.querySelectorAll('#currentDate, .date').forEach(el => {
        el.textContent = dateString;
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
    document.querySelectorAll('.menu-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Set active based on current page
    document.querySelectorAll('.menu-link').forEach(link => {
        const href = link.getAttribute('href');
        const linkPage = href.substring(href.lastIndexOf('/') + 1);
        
        // Simple matching for main pages
        if (currentPage === linkPage || 
            (currentPage.includes(linkPage.replace('.html', '')) && linkPage !== '')) {
            link.parentElement.classList.add('active');
            return;
        }
        
        // Special cases for entities
        if ((currentPage.includes('company') && linkPage.includes('company')) ||
            (currentPage.includes('warehouses') && linkPage.includes('warehouses')) ||
            (currentPage.includes('suppliers') && linkPage.includes('suppliers')) ||
            (currentPage.includes('customers') && linkPage.includes('customers'))) {
            link.parentElement.classList.add('active');
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
        // Clear user data but keep some settings
        const itemsToKeep = ['language', 'theme', 'sidebar_state'];
        Object.keys(localStorage).forEach(key => {
            if (!itemsToKeep.includes(key) && !key.startsWith('stockmint_')) {
                localStorage.removeItem(key);
            }
        });
        
        // Clear specific StockMint data
        localStorage.removeItem('stockmint_user');
        localStorage.removeItem('stockmint_token');
        localStorage.removeItem('currentUser');
        
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
