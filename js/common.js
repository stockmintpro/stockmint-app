// File: js/common.js
// Fungsi-fungsi yang digunakan di semua halaman

// Load sidebar dan navbar
function loadCommonElements() {
    return new Promise((resolve, reject) => {
        // Load sidebar
        fetch('includes/sidebar.html')
            .then(response => response.text())
            .then(html => {
                const sidebarDiv = document.createElement('div');
                sidebarDiv.innerHTML = html;
                document.body.insertBefore(sidebarDiv.firstChild, document.body.firstChild);
                
                // Load navbar setelah sidebar
                return fetch('includes/navbar.html');
            })
            .then(response => response.text())
            .then(html => {
                const navbarDiv = document.createElement('div');
                navbarDiv.innerHTML = html;
                document.body.insertBefore(navbarDiv.firstChild, document.body.firstChild);
                
                initCommon();
                resolve();
            })
            .catch(error => {
                console.error('Error loading common elements:', error);
                reject(error);
            });
    });
}

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
    
    // Handle collapsible menu group
    const masterDataMenu = document.querySelector('a[href="masterdata.html"]');
    const businessEntitiesGroup = document.querySelector('.menu-group');
    
    if (masterDataMenu && businessEntitiesGroup) {
        // Check if current page is master data or business entities
        const currentPath = window.location.pathname;
        const isMasterDataPage = currentPath.includes('masterdata') || 
                                 currentPath.includes('entities/') ||
                                 currentPath.includes('company') ||
                                 currentPath.includes('warehouses') ||
                                 currentPath.includes('suppliers') ||
                                 currentPath.includes('customers');
        
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
    if (userAvatar && user.picture) userAvatar.src = user.picture;
    
    // Logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('stockmint_token');
            localStorage.removeItem('stockmint_user');
            localStorage.removeItem('stockmint_sheet_id');
            window.location.href = 'index.html';
        });
    }
}

// Set active menu berdasarkan halaman saat ini
function setActiveMenu() {
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split('/').pop();
    
    // Remove active class from all menu items
    document.querySelectorAll('.menu-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Set active class for current page
    document.querySelectorAll('.menu-item').forEach(item => {
        const href = item.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'dashboard.html')) {
            item.classList.add('active');
        }
    });
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
