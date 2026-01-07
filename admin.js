/**
 * Admin Panel - JavaScript
 * Handles authentication, orders management, and products CRUD
 */

// ========================================
// DEMO PRODUCTS DATA (same as main app)
// ========================================
const products = [
    { id: 1, name: "Dřevěný vláček s vagónky", category: "hracky", price: 599, image: "🚂", stock: 15 },
    { id: 2, name: "Kreativní sada pro malování", category: "tvoreni", price: 349, image: "🎨", stock: 23 },
    { id: 3, name: "Interaktivní kniha - Zvířátka", category: "knihy", price: 289, image: "📖", stock: 8 },
    { id: 4, name: "Plyšový medvídek Teddy", category: "hracky", price: 459, image: "🧸", stock: 34 },
    { id: 5, name: "Stavebnice LEGO City", category: "hracky", price: 1299, image: "🏗️", stock: 12 },
    { id: 6, name: "Panenka s příslušenstvím", category: "hracky", price: 789, image: "👧", stock: 19 },
    { id: 7, name: "Dřevěné puzzle - Dinosauři", category: "hracky", price: 199, image: "🦕", stock: 45 },
    { id: 8, name: "Magnetická tabule", category: "tvoreni", price: 549, image: "📝", stock: 7 },
    { id: 9, name: "Noční lampička - Hvězdy", category: "dekorace", price: 399, image: "🌟", stock: 28 },
    { id: 10, name: "Batoh do školky - Raketa", category: "doplnky", price: 649, image: "🎒", stock: 16 },
    { id: 11, name: "Vánoční dekorace - Sob", category: "sezonni", price: 249, image: "🦌", stock: 52 },
    { id: 12, name: "Hudební xylofon", category: "hracky", price: 329, image: "🎵", stock: 21 }
];

// ========================================
// STATE
// ========================================
let orders = [];
let currentOrderId = null;
let isLoggedIn = false;

// Status labels
const statusLabels = {
    pending: 'Čekající',
    processing: 'Zpracovává se',
    shipped: 'Odesláno',
    delivered: 'Doručeno'
};

// ========================================
// UTILITY FUNCTIONS
// ========================================
function formatPrice(price) {
    return price.toLocaleString('cs-CZ') + ' Kč';
}

function formatDate(timestamp) {
    if (!timestamp) return 'N/A';

    let date;
    if (timestamp.toDate) {
        // Firestore Timestamp
        date = timestamp.toDate();
    } else if (timestamp instanceof Date) {
        date = timestamp;
    } else {
        date = new Date(timestamp);
    }

    return date.toLocaleDateString('cs-CZ', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function showNotification(message, type = 'success') {
    const existing = document.querySelector('.admin-notification');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.className = 'admin-notification';
    notification.innerHTML = `<span>${type === 'success' ? '✓' : '✗'}</span> ${message}`;
    notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${type === 'success' ? '#22c55e' : '#ef4444'};
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    z-index: 9999;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 600;
    animation: slideIn 0.3s ease;
  `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add notification animations
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  @keyframes slideOut {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(100%); opacity: 0; }
  }
`;
document.head.appendChild(style);

// ========================================
// AUTHENTICATION
// ========================================
function checkAuth() {
    // Check localStorage for demo auth
    const authToken = localStorage.getItem('juniorshop_admin_auth');

    if (authToken) {
        showDashboard();
    } else {
        showLogin();
    }
}

function showLogin() {
    document.getElementById('loginScreen').classList.remove('hidden');
    document.getElementById('adminDashboard').classList.add('hidden');
    isLoggedIn = false;
}

function showDashboard() {
    document.getElementById('loginScreen').classList.add('hidden');
    document.getElementById('adminDashboard').classList.remove('hidden');
    isLoggedIn = true;

    // Load data
    loadOrders();
    renderProducts();
    checkFirebaseStatus();
}

function handleLogin(e) {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    // Demo authentication
    if (email === 'admin@juniorshop.cz' && password === 'admin123') {
        localStorage.setItem('juniorshop_admin_auth', 'demo_token');
        showDashboard();
        showNotification('Přihlášení úspěšné!');
    } else {
        // Try Firebase auth if available
        if (typeof signIn === 'function') {
            signIn(email, password)
                .then(() => {
                    localStorage.setItem('juniorshop_admin_auth', 'firebase_token');
                    showDashboard();
                    showNotification('Přihlášení úspěšné!');
                })
                .catch(error => {
                    showNotification('Nesprávné přihlašovací údaje', 'error');
                });
        } else {
            showNotification('Nesprávné přihlašovací údaje', 'error');
        }
    }
}

function handleLogout() {
    localStorage.removeItem('juniorshop_admin_auth');

    if (typeof signOut === 'function') {
        signOut();
    }

    showLogin();
    showNotification('Odhlášení úspěšné!');
}

// ========================================
// ORDERS MANAGEMENT
// ========================================
async function loadOrders() {
    orders = [];

    // Try Firebase first
    if (typeof getOrders === 'function' && typeof db !== 'undefined') {
        try {
            orders = await getOrders();
            console.log('✅ Loaded', orders.length, 'orders from Firebase');
        } catch (error) {
            console.error('❌ Error loading from Firebase:', error);
        }
    }

    // Also load local orders
    const localOrders = JSON.parse(localStorage.getItem('juniorshop_orders') || '[]');
    if (localOrders.length > 0) {
        // Merge with Firebase orders (avoid duplicates by orderNumber)
        const existingNumbers = orders.map(o => o.orderNumber);
        const newLocalOrders = localOrders.filter(o => !existingNumbers.includes(o.orderNumber));
        orders = [...orders, ...newLocalOrders.map(o => ({ ...o, isLocal: true }))];
    }

    // Sort by date (newest first)
    orders.sort((a, b) => {
        const dateA = a.createdAt?.toDate?.() || new Date(a.createdAt);
        const dateB = b.createdAt?.toDate?.() || new Date(b.createdAt);
        return dateB - dateA;
    });

    renderOrders();
    updateStats();
}

function renderOrders() {
    const tbody = document.getElementById('ordersTableBody');
    const recentOrders = document.getElementById('recentOrders');
    const badge = document.getElementById('ordersBadge');

    // Update badge
    const pendingCount = orders.filter(o => o.status === 'pending').length;
    badge.textContent = pendingCount;
    badge.style.display = pendingCount > 0 ? 'inline' : 'none';

    if (orders.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" class="empty-state">Zatím žádné objednávky</td></tr>';
        recentOrders.innerHTML = '<p class="empty-state">Zatím žádné objednávky</p>';
        return;
    }

    // Render table
    tbody.innerHTML = orders.map(order => `
    <tr>
      <td><strong>${order.orderNumber}</strong>${order.isLocal ? ' 📱' : ''}</td>
      <td>${order.customer?.firstName || ''} ${order.customer?.lastName || ''}</td>
      <td>${order.items?.length || 0} položek</td>
      <td>${formatPrice(order.totals?.total || 0)}</td>
      <td><span class="status-badge ${order.status}">${statusLabels[order.status] || order.status}</span></td>
      <td>${formatDate(order.createdAt)}</td>
      <td>
        <button class="btn-secondary" onclick="viewOrder('${order.id || order.orderNumber}')">Detail</button>
      </td>
    </tr>
  `).join('');

    // Render recent orders (dashboard)
    recentOrders.innerHTML = orders.slice(0, 5).map(order => `
    <div class="order-row">
      <div>
        <strong>${order.orderNumber}</strong>
        <br><small>${order.customer?.firstName || ''} ${order.customer?.lastName || ''}</small>
      </div>
      <div>${formatPrice(order.totals?.total || 0)}</div>
      <div><span class="status-badge ${order.status}">${statusLabels[order.status] || order.status}</span></div>
      <button class="btn-secondary" onclick="viewOrder('${order.id || order.orderNumber}')">Detail</button>
    </div>
  `).join('');
}

function viewOrder(orderId) {
    const order = orders.find(o => o.id === orderId || o.orderNumber === orderId);
    if (!order) return;

    currentOrderId = order.id || order.orderNumber;

    document.getElementById('modalOrderNumber').textContent = order.orderNumber;
    document.getElementById('orderStatusSelect').value = order.status;

    const body = document.getElementById('orderModalBody');
    body.innerHTML = `
    <div class="order-detail-section">
      <h4>Zákazník</h4>
      <p><strong>${order.customer?.firstName || ''} ${order.customer?.lastName || ''}</strong></p>
      <p>📧 ${order.customer?.email || 'N/A'}</p>
      <p>📞 ${order.customer?.phone || 'N/A'}</p>
    </div>
    
    <div class="order-detail-section">
      <h4>Doručovací adresa</h4>
      <p>${order.customer?.address?.street || ''}</p>
      <p>${order.customer?.address?.city || ''}, ${order.customer?.address?.zip || ''}</p>
    </div>
    
    <div class="order-detail-section">
      <h4>Položky</h4>
      <div class="order-items-list">
        ${(order.items || []).map(item => `
          <div class="order-item-row">
            <span>${item.image || ''} ${item.name} × ${item.quantity}</span>
            <span>${formatPrice(item.price * item.quantity)}</span>
          </div>
        `).join('')}
      </div>
    </div>
    
    <div class="order-detail-section">
      <h4>Shrnutí</h4>
      <p>Mezisoučet: ${formatPrice(order.totals?.subtotal || 0)}</p>
      <p>Doprava (${order.shipping?.method || 'N/A'}): ${formatPrice(order.shipping?.price || 0)}</p>
      <p>Platba: ${order.payment?.method || 'N/A'}</p>
      <p><strong>Celkem: ${formatPrice(order.totals?.total || 0)}</strong></p>
    </div>
    
    ${order.note ? `
      <div class="order-detail-section">
        <h4>Poznámka</h4>
        <p>${order.note}</p>
      </div>
    ` : ''}
    
    <div class="order-detail-section">
      <h4>Informace</h4>
      <p>Vytvořeno: ${formatDate(order.createdAt)}</p>
      <p>Zdroj: ${order.isLocal ? '📱 Lokální' : '☁️ Firebase'}</p>
    </div>
  `;

    document.getElementById('orderModal').classList.remove('hidden');
}

function closeModal() {
    document.getElementById('orderModal').classList.add('hidden');
    currentOrderId = null;
}

async function handleUpdateOrderStatus() {
    const newStatus = document.getElementById('orderStatusSelect').value;
    const order = orders.find(o => o.id === currentOrderId || o.orderNumber === currentOrderId);

    if (!order) return;

    // Try Firebase update
    if (!order.isLocal && typeof updateOrderStatus === 'function' && order.id) {
        try {
            await updateOrderStatus(order.id, newStatus);
            showNotification('Stav objednávky aktualizován!');
        } catch (error) {
            console.error('Error updating order:', error);
            showNotification('Chyba při aktualizaci', 'error');
        }
    } else {
        // Update local order
        const localOrders = JSON.parse(localStorage.getItem('juniorshop_orders') || '[]');
        const idx = localOrders.findIndex(o => o.orderNumber === order.orderNumber);
        if (idx !== -1) {
            localOrders[idx].status = newStatus;
            localStorage.setItem('juniorshop_orders', JSON.stringify(localOrders));
            showNotification('Stav objednávky aktualizován!');
        }
    }

    closeModal();
    loadOrders();
}

// ========================================
// PRODUCTS MANAGEMENT
// ========================================
function renderProducts() {
    const grid = document.getElementById('adminProductsGrid');

    grid.innerHTML = products.map(product => `
    <div class="product-admin-card">
      <div class="product-image">${product.image}</div>
      <h4>${product.name}</h4>
      <div class="price">${formatPrice(product.price)}</div>
      <div class="stock">Skladem: ${product.stock} ks</div>
      <div class="actions">
        <button class="btn-secondary" onclick="editProduct(${product.id})">Upravit</button>
        <button class="btn-danger" onclick="deleteProduct(${product.id})">Smazat</button>
      </div>
    </div>
  `).join('');

    // Update stats
    document.getElementById('totalProducts').textContent = products.length;
}

function editProduct(id) {
    showNotification('Úprava produktů bude brzy dostupná');
}

function deleteProduct(id) {
    showNotification('Mazání produktů bude brzy dostupné');
}

function addProduct() {
    showNotification('Přidání produktů bude brzy dostupné');
}

// ========================================
// STATS
// ========================================
function updateStats() {
    const totalOrders = orders.length;
    const pendingOrders = orders.filter(o => o.status === 'pending').length;
    const totalRevenue = orders.reduce((sum, o) => sum + (o.totals?.total || 0), 0);

    document.getElementById('totalOrders').textContent = totalOrders;
    document.getElementById('pendingOrders').textContent = pendingOrders;
    document.getElementById('totalRevenue').textContent = formatPrice(totalRevenue);
}

// ========================================
// FIREBASE STATUS
// ========================================
function checkFirebaseStatus() {
    const statusEl = document.getElementById('firebaseStatus');
    const localOrdersCount = document.getElementById('localOrdersCount');

    if (typeof db !== 'undefined' && db) {
        statusEl.textContent = 'Připojeno';
        statusEl.className = 'status-badge connected';
    } else {
        statusEl.textContent = 'Nepřipojeno';
        statusEl.className = 'status-badge disconnected';
    }

    const localOrders = JSON.parse(localStorage.getItem('juniorshop_orders') || '[]');
    localOrdersCount.textContent = `${localOrders.length} objednávek`;
}

function viewLocalOrders() {
    const localOrders = JSON.parse(localStorage.getItem('juniorshop_orders') || '[]');
    console.log('Local orders:', localOrders);
    alert(`Lokální objednávky (${localOrders.length}):\n\n` +
        localOrders.map(o => `${o.orderNumber} - ${formatPrice(o.totals?.total || 0)}`).join('\n'));
}

// ========================================
// NAVIGATION
// ========================================
function switchSection(sectionId) {
    // Update nav items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        if (item.dataset.section === sectionId) {
            item.classList.add('active');
        }
    });

    // Update sections
    document.querySelectorAll('.admin-section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(`section-${sectionId}`).classList.add('active');

    // Update title
    const titles = {
        dashboard: 'Přehled',
        orders: 'Objednávky',
        products: 'Produkty',
        settings: 'Nastavení'
    };
    document.getElementById('pageTitle').textContent = titles[sectionId] || 'Admin';
}

// ========================================
// EVENT LISTENERS
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    // Check auth
    checkAuth();

    // Login form
    document.getElementById('loginForm').addEventListener('submit', handleLogin);

    // Logout
    document.getElementById('logoutBtn').addEventListener('click', handleLogout);

    // Navigation
    document.querySelectorAll('.nav-item[data-section]').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            switchSection(item.dataset.section);
        });
    });

    // Order status filter
    document.getElementById('orderStatusFilter').addEventListener('change', (e) => {
        const status = e.target.value;
        const rows = document.querySelectorAll('#ordersTableBody tr');

        rows.forEach(row => {
            if (!status || row.querySelector(`.status-badge.${status}`)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    });

    // Modal
    document.getElementById('closeModal').addEventListener('click', closeModal);
    document.getElementById('orderModal').addEventListener('click', (e) => {
        if (e.target.id === 'orderModal') closeModal();
    });
    document.getElementById('updateOrderStatus').addEventListener('click', handleUpdateOrderStatus);

    // Add product
    document.getElementById('addProductBtn').addEventListener('click', addProduct);

    // View local orders
    document.getElementById('viewLocalOrders').addEventListener('click', viewLocalOrders);
});
