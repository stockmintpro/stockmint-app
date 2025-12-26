// File: js/common.js
// Fungsi-fungsi yang digunakan di semua halaman

// Load sidebar dan navbar
function loadCommonElements() {
    return Promise.all([
        fetch('includes/sidebar.html').then(res => res.text()),
        fetch('includes/navbar.html').then(res => res.text())
    ])
    .then(([sidebarHTML, navbarHTML]) => {
        // Insert sidebar first
        const sidebarContainer = document.createElement('div');
        sidebarContainer.innerHTML = sidebarHTML;
        document.body.insertBefore(sidebarContainer.firstChild, document.body.firstChild);
        
        // Insert navbar after sidebar
        const navbarContainer = document.createElement('div');
        navbarContainer.innerHTML = navbarHTML;
        document.body.insertBefore(navbarContainer.firstChild, document.body.firstChild);
        
        // Initialize after elements are added
        setTimeout(() => {
            initSidebar();
            initNavbar();
            setActiveMenu();
        }, 100);
    })
    .catch(error => {
        console.error('Error loading common elements:', error);
        // Fallback: show error message
        const errorDiv = document.createElement('div');
        errorDiv.innerHTML = `
            <div style="position: fixed; top: 0; left: 0; right: 0; background: #f8d7da; color: #721c24; padding: 10px; text-align: center; z-index: 9999;">
                Error loading page elements. Please check if includes/sidebar.html and includes/navbar.html exist.
            </div>
        `;
        document.body.insertBefore(errorDiv, document.body.firstChild);
    });
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
            window.location.href = 'index.html';
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
            if (href === currentPage || (currentPage === '' && href === 'dashboard.html')) {
                item.classList.add('active');
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
