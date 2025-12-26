// File: js/common.js
// Fungsi-fungsi yang digunakan di semua halaman

// Load sidebar dan navbar
function loadCommonElements() {
    // Load sidebar
    fetch('includes/sidebar.html')
        .then(response => response.text())
        .then(html => {
            document.body.insertAdjacentHTML('afterbegin', html);
            initSidebar();
        });
    
    // Load navbar
    fetch('includes/navbar.html')
        .then(response => response.text())
        .then(html => {
            document.body.insertAdjacentHTML('afterbegin', html);
            initNavbar();
        });
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
    
    // Set active menu berdasarkan halaman saat ini
    const currentPage = window.location.pathname.split('/').pop();
    document.querySelectorAll('.menu-item').forEach(item => {
        if (item.getAttribute('href') === currentPage || 
            item.getAttribute('data-page') === currentPage.replace('.html', '')) {
            item.classList.add('active');
        }
    });
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
            window.location.href = 'index.html';
        });
    }
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
