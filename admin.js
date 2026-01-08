/**
 * Admin Panel - JavaScript
 * Handles authentication, orders management, and products CRUD
 */

// ========================================
// PRODUCTS DATA - Real products from junior.cz
// ========================================
const products = [
    { id: 1, name: "Stavebnice MERKUR – Formule 1", category: "hracky", price: 899, image: "https://www.junior.cz/files/images/product/350/formule-Qb8m.jpeg", stock: 15 },
    { id: 2, name: "Stavebnice Mozaika Mravenec", category: "hracky", price: 719, image: "https://www.junior.cz/files/images/product/350/stavebnice-mozaika-mravenec-stavitel-zzvM.jpg", stock: 23 },
    { id: 3, name: "Vilac - Dřevěné magnetky farma", category: "hracky", price: 348, image: "https://www.junior.cz/files/images/product/350/vilac---drevene-magnetky-farma-20-ks-DKQJ.jpg", stock: 34 },
    { id: 4, name: "LEGO® Minecraft® Výprava do dolu", category: "hracky", price: 715, image: "https://www.junior.cz/files/images/product/350/lego-minecraft21269-vyprava-do-dolu-a-pasovec-9E6o.jpg", stock: 12 },
    { id: 5, name: "LEGO® Speed Champions Ferrari", category: "hracky", price: 649, image: "https://www.junior.cz/files/images/product/350/lego-speed-champions-77242-zavodni-auto-ferrari-sf-24-f1-h0kp.jpg", stock: 8 },
    { id: 6, name: "Látková panenka Lila", category: "hracky", price: 650, image: "https://www.junior.cz/files/images/product/350/latkova-panenka-daisy-ve-zlute-IokT.webp", stock: 19 },
    { id: 7, name: "Lilliputiens - plyšový dráček Joe", category: "hracky", price: 2217, image: "https://www.junior.cz/files/images/product/350/lilliputiens---velky-plysovy-dracek-joe-R1ZG.jpg", stock: 5 },
    { id: 8, name: "Lilliputiens - muchláček dráček", category: "hracky", price: 560, image: "https://www.junior.cz/files/images/product/350/lilliputiens---muchlacek----dracek-joe-KMF0.jpg", stock: 28 },
    { id: 9, name: "Stela - svítící vyšívání", category: "knihy", price: 389, image: "https://www.junior.cz/files/images/product/350/stela---svitici-vysivani-OpOI.jpg", stock: 21 },
    { id: 10, name: "Jedééém!", category: "knihy", price: 749, image: "https://www.junior.cz/files/images/product/350/jedeeem-gqdE.jpg", stock: 16 },
    { id: 11, name: "Děti z Bullerbynu", category: "knihy", price: 380, image: "https://www.junior.cz/files/images/product/350/deti-z-bullerbynu---vyrocni-vydani-58jT.jpg", stock: 32 },
    { id: 12, name: "O zzzvědavé včele Elle", category: "knihy", price: 849, image: "https://www.junior.cz/files/images/product/350/o-zzzvedave-vcele-elle-n4ar.jpg", stock: 11 },
    { id: 13, name: "Artissimo - pískování Jednorožci", category: "tvoreni", price: 369, image: "https://www.junior.cz/files/images/product/350/artissimo---trpytkove-piskovani---jednorozci-hYXT.jpg", stock: 24 },
    { id: 14, name: "Sada malování pískem – Pohádky", category: "tvoreni", price: 359, image: "https://www.junior.cz/files/images/product/350/sada-malovani-piskem--pohadky-Ah9P.jpg", stock: 31 },
    { id: 15, name: "Žlutý křeček jedlíček", category: "tvoreni", price: 250, image: "https://www.junior.cz/files/images/product/350/zluty-krecek-jedlicek-imrk.jpg", stock: 17 },
    { id: 16, name: "Čmáropis", category: "tvoreni", price: 199, image: "https://www.junior.cz/files/images/product/350/cmaropis-Wixh.jpg", stock: 55 }
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
      <div class="product-image"><img src="${product.image}" alt="${product.name}" style="width:100%;height:100%;object-fit:contain;" onerror="this.outerHTML='<div style=\\'font-size:3rem;text-align:center\\'>🧸</div>'"></div>
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
    const product = products.find(p => p.id === id);
    if (!product) return;

    // Set modal title
    document.getElementById('productModalTitle').textContent = 'Upravit produkt';

    // Fill form with product data
    document.getElementById('editProductId').value = product.id;
    document.getElementById('editProductName').value = product.name || '';
    document.getElementById('editProductPrice').value = product.price || 0;
    document.getElementById('editProductOriginalPrice').value = product.originalPrice || '';
    document.getElementById('editProductCategory').value = product.category || 'hracky';
    document.getElementById('editProductStock').value = product.stock || 0;
    document.getElementById('editProductAge').value = product.age || '3-6';
    document.getElementById('editProductGender').value = product.gender || 'unisex';
    document.getElementById('editProductImage').value = product.image || '';
    document.getElementById('editProductDescription').value = product.description || '';
    document.getElementById('editProductBadge').value = product.badge || '';

    // Update image preview
    updateImagePreview(product.image);

    // Show modal
    document.getElementById('productModal').classList.remove('hidden');
}

function updateImagePreview(url) {
    const preview = document.getElementById('imagePreview');
    if (url && url.startsWith('http')) {
        preview.innerHTML = `<img src="${url}" alt="Náhled" onerror="this.outerHTML='<span class=\\'placeholder\\'>Obrázek nelze načíst</span>'">`;
    } else {
        preview.innerHTML = '<span class="placeholder">Zadejte URL obrázku</span>';
    }
}

function saveProduct() {
    const id = parseInt(document.getElementById('editProductId').value);
    const productIndex = products.findIndex(p => p.id === id);

    if (productIndex === -1 && id) {
        showNotification('Produkt nenalezen', 'error');
        return;
    }

    const productData = {
        id: id || Date.now(),
        name: document.getElementById('editProductName').value,
        price: parseInt(document.getElementById('editProductPrice').value) || 0,
        originalPrice: parseInt(document.getElementById('editProductOriginalPrice').value) || null,
        category: document.getElementById('editProductCategory').value,
        stock: parseInt(document.getElementById('editProductStock').value) || 0,
        age: document.getElementById('editProductAge').value,
        gender: document.getElementById('editProductGender').value,
        image: document.getElementById('editProductImage').value,
        description: document.getElementById('editProductDescription').value,
        badge: document.getElementById('editProductBadge').value || null
    };

    if (productIndex !== -1) {
        // Update existing
        products[productIndex] = productData;
        showNotification('Produkt byl upraven!');
    } else {
        // Add new
        products.push(productData);
        showNotification('Produkt byl přidán!');
    }

    // Save to localStorage
    localStorage.setItem('juniorshop_products', JSON.stringify(products));

    // Close modal and refresh
    closeProductModal();
    renderProducts();
}

function deleteProduct(id) {
    if (!confirm('Opravdu chcete smazat tento produkt?')) return;

    const index = products.findIndex(p => p.id === id);
    if (index !== -1) {
        products.splice(index, 1);
        localStorage.setItem('juniorshop_products', JSON.stringify(products));
        renderProducts();
        showNotification('Produkt byl smazán!');
    }
}

function addProduct() {
    // Set modal title
    document.getElementById('productModalTitle').textContent = 'Přidat nový produkt';

    // Clear form
    document.getElementById('editProductId').value = '';
    document.getElementById('editProductName').value = '';
    document.getElementById('editProductPrice').value = '';
    document.getElementById('editProductOriginalPrice').value = '';
    document.getElementById('editProductCategory').value = 'hracky';
    document.getElementById('editProductStock').value = '';
    document.getElementById('editProductAge').value = '3-6';
    document.getElementById('editProductGender').value = 'unisex';
    document.getElementById('editProductImage').value = '';
    document.getElementById('editProductDescription').value = '';
    document.getElementById('editProductBadge').value = '';

    // Clear preview
    updateImagePreview('');

    // Show modal
    document.getElementById('productModal').classList.remove('hidden');
}

function closeProductModal() {
    document.getElementById('productModal').classList.add('hidden');
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

    // Product modal events
    document.getElementById('closeProductModal').addEventListener('click', closeProductModal);
    document.getElementById('cancelProductEdit').addEventListener('click', closeProductModal);
    document.getElementById('saveProductBtn').addEventListener('click', saveProduct);
    document.getElementById('productModal').addEventListener('click', (e) => {
        if (e.target.id === 'productModal') closeProductModal();
    });

    // Image preview update on URL change
    document.getElementById('editProductImage').addEventListener('input', (e) => {
        updateImagePreview(e.target.value);
    });

    // View local orders
    document.getElementById('viewLocalOrders').addEventListener('click', viewLocalOrders);
});
