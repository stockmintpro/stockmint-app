// dashboard.js
document.addEventListener('DOMContentLoaded', function() {
    loadDashboardStats();
    setupRefreshButton();
});

function loadDashboardStats() {
    const statsContainer = document.getElementById('dashboard-stats');
    if (!statsContainer) return;
    
    const statsHTML = `
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-icon" style="background: linear-gradient(135deg, #19BEBB 0%, #0D8C8A 100%);">
                    <i class="fas fa-boxes"></i>
                </div>
                <div class="stat-content">
                    <h3>TOTAL PRODUCTS</h3>
                    <p class="stat-number">142</p>
                    <div class="stat-change positive">
                        <i class="fas fa-arrow-up"></i>
                        <span>12% from last month</span>
                    </div>
                </div>
            </div>
            
            <div class="stat-card">
                <div class="stat-icon" style="background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);">
                    <i class="fas fa-exclamation-triangle"></i>
                </div>
                <div class="stat-content">
                    <h3>LOW STOCK ALERT</h3>
                    <p class="stat-number">8 Items</p>
                    <div class="stat-action">
                        <button class="btn-restock">Need restock</button>
                    </div>
                </div>
            </div>
            
            <div class="stat-card">
                <div class="stat-icon" style="background: linear-gradient(135deg, #10b981 0%, #059669 100%);">
                    <i class="fas fa-chart-line"></i>
                </div>
                <div class="stat-content">
                    <h3>TODAY'S SALES</h3>
                    <p class="stat-number">Rp 3.250.000</p>
                    <div class="stat-change positive">
                        <i class="fas fa-arrow-up"></i>
                        <span>8% from yesterday</span>
                    </div>
                </div>
            </div>
            
            <div class="stat-card">
                <div class="stat-icon" style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);">
                    <i class="fas fa-coins"></i>
                </div>
                <div class="stat-content">
                    <h3>MONTHLY PROFIT</h3>
                    <p class="stat-number">Rp 48.500.000</p>
                    <div class="stat-change positive">
                        <i class="fas fa-arrow-up"></i>
                        <span>15% from last month</span>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="recent-activity">
            <div class="activity-header">
                <h3>Recent Activity</h3>
                <a href="#" class="view-all">View All <i class="fas fa-arrow-right"></i></a>
            </div>
            <div class="activity-list">
                <div class="activity-item">
                    <div class="activity-icon" style="background: linear-gradient(135deg, #19BEBB 0%, #0D8C8A 100%);">
                        <i class="fas fa-box"></i>
                    </div>
                    <div class="activity-content">
                        <div class="activity-title">New product "Premium Widget" added</div>
                        <div class="activity-time">Just now • By Admin Joko</div>
                    </div>
                </div>
                <div class="activity-item">
                    <div class="activity-icon" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
                        <i class="fas fa-shopping-cart"></i>
                    </div>
                    <div class="activity-content">
                        <div class="activity-title">Purchase Order #PO-00123 completed</div>
                        <div class="activity-time">2 hours ago • Supplier ABC</div>
                    </div>
                </div>
                <div class="activity-item">
                    <div class="activity-icon" style="background: linear-gradient(135deg, #10b981 0%, #059669 100%);">
                        <i class="fas fa-chart-line"></i>
                    </div>
                    <div class="activity-content">
                        <div class="activity-title">Monthly sales target achieved 120%</div>
                        <div class="activity-time">Today, 10:30 AM • Sales Department</div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    statsContainer.innerHTML = statsHTML;
}

function setupRefreshButton() {
    const refreshBtn = document.querySelector('.btn-refresh');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', function() {
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Refreshing...';
            this.disabled = true;
            
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-sync-alt"></i> Refresh Data';
                this.disabled = false;
                
                // Simulate data refresh
                const statNumbers = document.querySelectorAll('.stat-number');
                statNumbers.forEach(stat => {
                    const current = parseInt(stat.textContent.replace(/\D/g, ''));
                    if (!isNaN(current)) {
                        const randomChange = Math.floor(Math.random() * 20) + 1;
                        const newValue = Math.floor(current * (1 + randomChange/100));
                        
                        if (stat.textContent.includes('Rp')) {
                            stat.textContent = 'Rp ' + newValue.toLocaleString('id-ID');
                        } else if (stat.textContent.includes('Items')) {
                            stat.textContent = newValue + ' Items';
                        } else {
                            stat.textContent = newValue;
                        }
                    }
                });
                
                alert('Dashboard data has been refreshed!');
            }, 1500);
        });
    }
}
