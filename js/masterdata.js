// Master Data Functions
document.addEventListener('DOMContentLoaded', function() {
    updateDataCount();
    loadLastBackupDate();
    
    // Event listener untuk file upload
    document.getElementById('excelFile').addEventListener('change', handleFileUpload);
    
    // Event listener untuk konfirmasi modal
    document.getElementById('confirmActionBtn').addEventListener('click', function() {
        const actionType = this.getAttribute('data-action');
        executeAction(actionType);
    });
});

// Update data count display
function updateDataCount() {
    const entities = ['company', 'warehouses', 'suppliers', 'customers'];
    
    entities.forEach(entity => {
        const data = JSON.parse(localStorage.getItem(entity) || '[]');
        document.getElementById(`count-${entity}`).textContent = data.length;
    });
}

// Load last backup date
function loadLastBackupDate() {
    const lastBackup = localStorage.getItem('lastBackupDate');
    if (lastBackup) {
        document.getElementById('last-backup-date').textContent = 
            new Date(lastBackup).toLocaleString('id-ID');
    } else {
        document.getElementById('last-backup-date').textContent = 'Belum ada backup';
    }
}

// Show confirmation modal
function showConfirmation(actionType) {
    const modal = document.getElementById('confirmationModal');
    const title = document.getElementById('modalTitle');
    const message = document.getElementById('modalMessage');
    const confirmBtn = document.getElementById('confirmActionBtn');
    
    confirmBtn.setAttribute('data-action', actionType);
    
    if (actionType === 'new') {
        title.textContent = 'Mulai Baru';
        message.textContent = 'Apakah Anda yakin ingin memulai data master baru? Data master yang lama akan dihapus dan diganti dengan template standar.';
        confirmBtn.innerHTML = '<i class="fas fa-play"></i> Ya, Mulai Baru';
    } else if (actionType === 'reset') {
        title.textContent = 'Reset Data';
        message.textContent = 'PERINGATAN: Tindakan ini akan menghapus SEMUA data dari sistem termasuk master data dan transaksi. Tindakan ini tidak dapat dibatalkan!';
        confirmBtn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Ya, Hapus Semua';
    }
    
    modal.style.display = 'flex';
}

// Close modal
function closeModal() {
    document.getElementById('confirmationModal').style.display = 'none';
    document.getElementById('progressModal').style.display = 'none';
}

// Show progress modal
function showProgress(title, message) {
    document.getElementById('progressTitle').textContent = title;
    document.getElementById('progressMessage').textContent = message;
    document.getElementById('progressFill').style.width = '0%';
    document.getElementById('progressModal').style.display = 'flex';
    
    // Animate progress bar
    setTimeout(() => {
        document.getElementById('progressFill').style.width = '100%';
    }, 100);
}

// Execute action based on type
function executeAction(actionType) {
    closeModal();
    
    if (actionType === 'new') {
        startNewSetup();
    } else if (actionType === 'reset') {
        resetAllData();
    }
}

// 1. Mulai Baru - Setup data master awal
function startNewSetup() {
    showProgress('Memulai Setup Baru', 'Menyiapkan data master standar...');
    
    // Default data template
    const defaultData = {
        company: [
            {
                id: 1,
                name: "Perusahaan Anda",
                address: "Alamat perusahaan",
                phone: "(021) 12345678",
                email: "info@perusahaan.com",
                taxId: "01.234.567.8-012.345",
                createdAt: new Date().toISOString()
            }
        ],
        warehouses: [
            {
                id: 1,
                code: "GUD-001",
                name: "Gudang Utama",
                location: "Jl. Raya No. 123",
                capacity: 1000,
                manager: "Manager Gudang",
                phone: "(021) 87654321",
                status: "active",
                createdAt: new Date().toISOString()
            }
        ],
        suppliers: [],
        customers: []
    };
    
    setTimeout(() => {
        // Save default data to localStorage
        Object.keys(defaultData).forEach(key => {
            localStorage.setItem(key, JSON.stringify(defaultData[key]));
        });
        
        setTimeout(() => {
            closeModal();
            updateDataCount();
            showNotification('success', 'Data master baru berhasil disetup!');
        }, 500);
    }, 1500);
}

// 2. Migrasi Data - Import dari Excel
function showFileUpload() {
    document.getElementById('excelFile').click();
}

function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    showProgress('Migrasi Data', 'Mengimpor data dari Excel...');
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            
            // Process each sheet
            workbook.SheetNames.forEach(sheetName => {
                const worksheet = workbook.Sheets[sheetName];
                const jsonData = XLSX.utils.sheet_to_json(worksheet);
                
                // Map sheet name to localStorage key
                let key = sheetName.toLowerCase();
                if (key.includes('gudang')) key = 'warehouses';
                if (key.includes('pemasok')) key = 'suppliers';
                if (key.includes('pelanggan')) key = 'customers';
                
                if (['company', 'warehouses', 'suppliers', 'customers'].includes(key)) {
                    localStorage.setItem(key, JSON.stringify(jsonData));
                }
            });
            
            setTimeout(() => {
                closeModal();
                updateDataCount();
                showNotification('success', `Data berhasil diimpor dari ${file.name}`);
                event.target.value = ''; // Reset file input
            }, 1000);
            
        } catch (error) {
            closeModal();
            showNotification('error', 'Gagal membaca file Excel: ' + error.message);
        }
    };
    
    reader.readAsArrayBuffer(file);
}

// 3. Backup Data - Export ke Excel
function backupData() {
    showProgress('Backup Data', 'Mengekspor data ke Excel...');
    
    setTimeout(() => {
        try {
            // Prepare workbook
            const workbook = XLSX.utils.book_new();
            
            // Get all data from localStorage
            const entities = ['company', 'warehouses', 'suppliers', 'customers'];
            
            entities.forEach(entity => {
                const data = JSON.parse(localStorage.getItem(entity) || '[]');
                if (data.length > 0) {
                    const worksheet = XLSX.utils.json_to_sheet(data);
                    const sheetName = entity.charAt(0).toUpperCase() + entity.slice(1);
                    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
                }
            });
            
            // Generate Excel file
            const excelBuffer = XLSX.write(workbook, { 
                bookType: 'xlsx', 
                type: 'array' 
            });
            
            // Create blob and download link
            const blob = new Blob([excelBuffer], { 
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
            });
            
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            const timestamp = new Date().toISOString().split('T')[0];
            
            a.href = url;
            a.download = `StockMint_Backup_${timestamp}.xlsx`;
            document.body.appendChild(a);
            a.click();
            
            // Cleanup
            setTimeout(() => {
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
                
                // Update last backup date
                localStorage.setItem('lastBackupDate', new Date().toISOString());
                loadLastBackupDate();
                
                closeModal();
                showNotification('success', 'Backup data berhasil diunduh!');
            }, 100);
            
        } catch (error) {
            closeModal();
            showNotification('error', 'Gagal membuat backup: ' + error.message);
        }
    }, 1000);
}

// 4. Reset Data - Hapus semua data
function resetAllData() {
    showProgress('Reset Data', 'Menghapus semua data...');
    
    setTimeout(() => {
        // List of all data keys to remove
        const allKeys = [
            'company', 'warehouses', 'suppliers', 'customers',
            'products', 'transactions', 'inventory',
            'settings', 'userData'
        ];
        
        // Remove each key
        allKeys.forEach(key => {
            localStorage.removeItem(key);
        });
        
        // Keep only login data if exists
        const currentUser = localStorage.getItem('currentUser');
        const users = localStorage.getItem('users');
        
        localStorage.clear();
        
        if (currentUser) {
            localStorage.setItem('currentUser', currentUser);
        }
        if (users) {
            localStorage.setItem('users', users);
        }
        
        setTimeout(() => {
            closeModal();
            updateDataCount();
            showNotification('warning', 'Semua data telah dihapus!', 5000);
            
            // Redirect to dashboard after 2 seconds
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 2000);
        }, 500);
    }, 1500);
}

// Helper function for notifications
function showNotification(type, message, duration = 3000) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 
                         type === 'error' ? 'exclamation-circle' : 
                         'exclamation-triangle'}"></i>
        <span>${message}</span>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        display: flex;
        align-items: center;
        gap: 10px;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        ${type === 'success' ? 'background: linear-gradient(135deg, #4CAF50, #45a049);' :
         type === 'error' ? 'background: linear-gradient(135deg, #F44336, #d32f2f);' :
         'background: linear-gradient(135deg, #FF9800, #f57c00);'}
    `;
    
    document.body.appendChild(notification);
    
    // Remove notification after duration
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, duration);
}

// Add notification animations to style
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
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
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
