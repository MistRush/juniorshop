/**
 * JuniorShop - E-commerce Application
 * Main JavaScript file for SPA navigation, cart management, and product display
 */

// ========================================
// PRODUCT DATA
// ========================================
const products = [
  {
    id: 1,
    name: "Dřevěný vláček s vagónky",
    category: "hracky",
    subcategory: "drevene",
    price: 599,
    originalPrice: null,
    image: "🚂",
    description: "Krásný dřevěný vláček s barevnými vagónky je ideální hračka pro malé strojvůdce. Vyroben z kvalitního dřeva, bezpečné barvy, vhodné pro děti od 3 let.",
    age: "3-6",
    gender: "unisex",
    stock: 15,
    badge: null
  },
  {
    id: 2,
    name: "Kreativní sada pro malování",
    category: "tvoreni",
    subcategory: "malovani",
    price: 349,
    originalPrice: 449,
    image: "🎨",
    description: "Kompletní sada pro malé umělce. Obsahuje barvy, štětce a plátna. Rozvíjí kreativitu a jemnou motoriku.",
    age: "6-9",
    gender: "unisex",
    stock: 23,
    badge: "sale"
  },
  {
    id: 3,
    name: "Interaktivní kniha - Zvířátka",
    category: "knihy",
    subcategory: "interaktivni",
    price: 289,
    originalPrice: null,
    image: "📖",
    description: "Interaktivní kniha se zvuky zvířat. Stiskni obrázek a uslyšíš, jak zvířátko mluví!",
    age: "0-3",
    gender: "unisex",
    stock: 8,
    badge: "new"
  },
  {
    id: 4,
    name: "Plyšový medvídek Teddy",
    category: "hracky",
    subcategory: "plysove",
    price: 459,
    originalPrice: null,
    image: "🧸",
    description: "Měkoučký plyšový medvídek, ideální kamarád na spaní. Hypoalergenní materiály.",
    age: "0-3",
    gender: "unisex",
    stock: 34,
    badge: null
  },
  {
    id: 5,
    name: "Stavebnice LEGO City",
    category: "hracky",
    subcategory: "stavebnice",
    price: 1299,
    originalPrice: 1499,
    image: "🏗️",
    description: "Stavebnice města s auty, budovami a figurkami. 450 dílků pro hodiny zábavy.",
    age: "6-9",
    gender: "boy",
    stock: 12,
    badge: "sale"
  },
  {
    id: 6,
    name: "Panenka s příslušenstvím",
    category: "hracky",
    subcategory: "panenky",
    price: 789,
    originalPrice: null,
    image: "👧",
    description: "Krásná panenka s šatníkem a doplňky. Včetně hřebenu a zrcátka.",
    age: "3-6",
    gender: "girl",
    stock: 19,
    badge: null
  },
  {
    id: 7,
    name: "Dřevěné puzzle - Dinosauři",
    category: "hracky",
    subcategory: "puzzle",
    price: 199,
    originalPrice: null,
    image: "🦕",
    description: "Barevné dřevěné puzzle s dinosaury. 24 dílků, ideální pro začátečníky.",
    age: "3-6",
    gender: "unisex",
    stock: 45,
    badge: null
  },
  {
    id: 8,
    name: "Magnetická tabule",
    category: "tvoreni",
    subcategory: "tabule",
    price: 549,
    originalPrice: null,
    image: "📝",
    description: "Oboustranná magnetická tabule - jedna strana na křídu, druhá na fixy.",
    age: "3-6",
    gender: "unisex",
    stock: 7,
    badge: "new"
  },
  {
    id: 9,
    name: "Noční lampička - Hvězdy",
    category: "dekorace",
    subcategory: "osvetleni",
    price: 399,
    originalPrice: null,
    image: "🌟",
    description: "Projektor hvězdné oblohy s uklidňujícími barvami. Pomáhá dětem usnout.",
    age: "0-3",
    gender: "unisex",
    stock: 28,
    badge: null
  },
  {
    id: 10,
    name: "Batoh do školky - Raketa",
    category: "doplnky",
    subcategory: "batohy",
    price: 649,
    originalPrice: 799,
    image: "🎒",
    description: "Ergonomický batoh s motivem rakety. Lehký a prostorný.",
    age: "3-6",
    gender: "boy",
    stock: 16,
    badge: "sale"
  },
  {
    id: 11,
    name: "Vánoční dekorace - Sob",
    category: "sezonni",
    subcategory: "vanoce",
    price: 249,
    originalPrice: null,
    image: "🦌",
    description: "Roztomilý plyšový sob jako vánoční dekorace. Výška 30 cm.",
    age: "0-3",
    gender: "unisex",
    stock: 52,
    badge: "new"
  },
  {
    id: 12,
    name: "Hudební xylofon",
    category: "hracky",
    subcategory: "hudebni",
    price: 329,
    originalPrice: null,
    image: "🎵",
    description: "Barevný dřevěný xylofon s 8 tóny. Rozvíjí hudební sluch a koordinaci.",
    age: "0-3",
    gender: "unisex",
    stock: 21,
    badge: null
  }
];

const categories = {
  hracky: {
    name: "Hračky",
    icon: "🧸",
    subcategories: [
      { id: "drevene", name: "Dřevěné hračky", icon: "🪵" },
      { id: "plysove", name: "Plyšové hračky", icon: "🧸" },
      { id: "stavebnice", name: "Stavebnice", icon: "🏗️" },
      { id: "panenky", name: "Panenky a panáčci", icon: "👧" },
      { id: "puzzle", name: "Puzzle", icon: "🧩" },
      { id: "hudebni", name: "Hudební hračky", icon: "🎵" }
    ]
  },
  tvoreni: {
    name: "Tvoření",
    icon: "🎨",
    subcategories: [
      { id: "malovani", name: "Malování", icon: "🖌️" },
      { id: "modelovani", name: "Modelování", icon: "🏺" },
      { id: "tabule", name: "Tabule", icon: "📝" }
    ]
  },
  knihy: {
    name: "Knihy",
    icon: "📚",
    subcategories: [
      { id: "interaktivni", name: "Interaktivní knihy", icon: "📖" },
      { id: "pohadky", name: "Pohádky", icon: "🏰" },
      { id: "naucne", name: "Naučné knihy", icon: "🔬" }
    ]
  },
  dekorace: {
    name: "Dekorace",
    icon: "🏠",
    subcategories: [
      { id: "osvetleni", name: "Osvětlení", icon: "💡" },
      { id: "obrazky", name: "Obrázky", icon: "🖼️" },
      { id: "polstare", name: "Polštáře", icon: "🛋️" }
    ]
  },
  doplnky: {
    name: "Doplňky",
    icon: "🎒",
    subcategories: [
      { id: "batohy", name: "Batohy", icon: "🎒" },
      { id: "lahve", name: "Láhve na pití", icon: "🍼" },
      { id: "boxy", name: "Svačinové boxy", icon: "📦" }
    ]
  },
  sezonni: {
    name: "Sezónní",
    icon: "🎄",
    subcategories: [
      { id: "vanoce", name: "Vánoce", icon: "🎄" },
      { id: "velikonoce", name: "Velikonoce", icon: "🐣" },
      { id: "halloween", name: "Halloween", icon: "🎃" }
    ]
  }
};

// ========================================
// STATE MANAGEMENT
// ========================================
let cart = JSON.parse(localStorage.getItem('juniorshop_cart')) || [];
let currentPage = 'home';
let currentCategory = null;
let currentProduct = null;

// Free shipping threshold
const FREE_SHIPPING_THRESHOLD = 1500;
const DEFAULT_SHIPPING = 69;

// ========================================
// UTILITY FUNCTIONS
// ========================================
function formatPrice(price) {
  return price.toLocaleString('cs-CZ') + ' Kč';
}

function saveCart() {
  localStorage.setItem('juniorshop_cart', JSON.stringify(cart));
  updateCartUI();
}

function getCartTotal() {
  return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

function getCartItemCount() {
  return cart.reduce((sum, item) => sum + item.quantity, 0);
}

function getShippingCost() {
  return getCartTotal() >= FREE_SHIPPING_THRESHOLD ? 0 : DEFAULT_SHIPPING;
}

// ========================================
// CART FUNCTIONS
// ========================================
function addToCart(productId, quantity = 1) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const existingItem = cart.find(item => item.id === productId);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity
    });
  }

  saveCart();
  showNotification(`${product.name} přidáno do košíku!`);
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCart();
  renderCartPage();
}

function updateCartQuantity(productId, quantity) {
  const item = cart.find(item => item.id === productId);
  if (item) {
    item.quantity = Math.max(1, quantity);
    saveCart();
    renderCartPage();
  }
}

function clearCart() {
  cart = [];
  saveCart();
  renderCartPage();
}

function updateCartUI() {
  const cartBadge = document.querySelector('.cart-badge');
  const cartTotal = document.getElementById('cartTotal');

  if (cartBadge) {
    cartBadge.setAttribute('data-count', getCartItemCount());
  }

  if (cartTotal) {
    cartTotal.textContent = formatPrice(getCartTotal());
  }
}

// ========================================
// NOTIFICATION
// ========================================
function showNotification(message) {
  // Remove existing notification
  const existing = document.querySelector('.notification');
  if (existing) existing.remove();

  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.innerHTML = `
    <span>✓</span> ${message}
  `;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #28a745;
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 9999;
    animation: slideIn 0.3s ease;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 600;
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
// RENDER FUNCTIONS
// ========================================
function renderProductCard(product) {
  const badgeHTML = product.badge ?
    `<span class="product-badge ${product.badge}">${product.badge === 'sale' ? 'Sleva' : 'Novinka'}</span>` : '';

  const originalPriceHTML = product.originalPrice ?
    `<span class="price-original">${formatPrice(product.originalPrice)}</span>` : '';

  return `
    <div class="product-card" data-product-id="${product.id}">
      ${badgeHTML}
      <div class="product-image">
        <div style="font-size: 5rem;">${product.image}</div>
      </div>
      <div class="product-info">
        <span class="product-category">${categories[product.category]?.name || product.category}</span>
        <h3 class="product-name" data-product="${product.id}">${product.name}</h3>
        <div class="product-price">
          <span class="price-current">${formatPrice(product.price)}</span>
          ${originalPriceHTML}
        </div>
        <div class="product-actions">
          <button class="btn-add-cart" data-add-cart="${product.id}">
            🛒 Do košíku
          </button>
          <button class="btn-wishlist">♡</button>
        </div>
      </div>
    </div>
  `;
}

function renderProducts(containerId, productList) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = productList.map(renderProductCard).join('');
}

function renderHomePage() {
  // Featured products (with badges or random)
  const featured = products.filter(p => p.badge === 'sale').slice(0, 4);
  if (featured.length < 4) {
    const remaining = products.filter(p => !featured.includes(p)).slice(0, 4 - featured.length);
    featured.push(...remaining);
  }
  renderProducts('featuredProducts', featured);

  // New products
  const newProducts = products.filter(p => p.badge === 'new').slice(0, 4);
  if (newProducts.length < 4) {
    const remaining = products.filter(p => !newProducts.includes(p)).slice(0, 4 - newProducts.length);
    newProducts.push(...remaining);
  }
  renderProducts('newProducts', newProducts);
}

function renderCategoryPage(categoryId) {
  const category = categories[categoryId];
  if (!category) return;

  currentCategory = categoryId;

  // Update breadcrumb and title
  document.getElementById('categoryBreadcrumb').textContent = category.name;
  document.getElementById('categoryTitle').textContent = category.name;

  // Render subcategories
  const subcatGrid = document.getElementById('subcategoryGrid');
  subcatGrid.innerHTML = category.subcategories.map(sub => `
    <div class="subcategory-card" data-subcategory="${sub.id}">
      <span class="icon">${sub.icon}</span>
      <span class="name">${sub.name}</span>
    </div>
  `).join('');

  // Render products
  const categoryProducts = products.filter(p => p.category === categoryId);
  document.getElementById('productsCount').textContent = `Nalezeno ${categoryProducts.length} produktů`;
  renderProducts('categoryProducts', categoryProducts);
}

function renderProductPage(productId) {
  const product = products.find(p => p.id === parseInt(productId));
  if (!product) return;

  currentProduct = product;

  // Update breadcrumb
  document.getElementById('productBreadcrumb').textContent = product.name;

  // Update main image
  document.getElementById('mainImage').innerHTML = `<div style="font-size: 15rem; display: flex; align-items: center; justify-content: center; height: 100%;">${product.image}</div>`;

  // Update product info
  document.getElementById('productTitle').textContent = product.name;
  document.getElementById('productPrice').textContent = formatPrice(product.price);

  const originalPrice = document.getElementById('productOriginalPrice');
  if (product.originalPrice) {
    originalPrice.textContent = formatPrice(product.originalPrice);
    originalPrice.style.display = 'inline';
  } else {
    originalPrice.style.display = 'none';
  }

  document.getElementById('productDescription').textContent = product.description;

  // Stock status
  const stockEl = document.getElementById('productStock');
  if (product.stock > 10) {
    stockEl.innerHTML = '<span>✓</span> Skladem';
    stockEl.className = 'product-stock';
  } else if (product.stock > 0) {
    stockEl.innerHTML = `<span>!</span> Posledních ${product.stock} kusů`;
    stockEl.className = 'product-stock low';
  } else {
    stockEl.innerHTML = '<span>✗</span> Vyprodáno';
    stockEl.className = 'product-stock out';
  }

  // Category link
  const catLink = document.getElementById('productCategoryLink');
  catLink.textContent = categories[product.category]?.name || product.category;
  catLink.setAttribute('data-category', product.category);

  // Update shipping info
  updateShippingProgress();

  // Reset quantity
  document.getElementById('quantityInput').value = 1;
}

function renderCartPage() {
  const cartItemsList = document.getElementById('cartItemsList');
  const emptyCart = document.getElementById('emptyCart');
  const cartSummary = document.getElementById('cartSummary');
  const cartHeader = document.querySelector('.cart-header');

  document.getElementById('cartItemCount').textContent = getCartItemCount();

  if (cart.length === 0) {
    cartItemsList.innerHTML = '';
    emptyCart.style.display = 'block';
    cartSummary.style.display = 'none';
    cartHeader.style.display = 'none';
    return;
  }

  emptyCart.style.display = 'none';
  cartSummary.style.display = 'block';
  cartHeader.style.display = 'flex';

  cartItemsList.innerHTML = cart.map(item => `
    <div class="cart-item" data-cart-item="${item.id}">
      <div class="cart-item-image">
        <div style="font-size: 3rem; display: flex; align-items: center; justify-content: center; height: 100%;">${item.image}</div>
      </div>
      <div class="cart-item-info">
        <h4>${item.name}</h4>
      </div>
      <div class="cart-item-quantity">
        <div class="quantity-controls">
          <button class="quantity-btn" data-cart-minus="${item.id}">−</button>
          <input type="number" class="quantity-input" value="${item.quantity}" min="1" data-cart-qty="${item.id}">
          <button class="quantity-btn" data-cart-plus="${item.id}">+</button>
        </div>
      </div>
      <div class="cart-item-price">${formatPrice(item.price)}</div>
      <div class="cart-item-total">${formatPrice(item.price * item.quantity)}</div>
      <button class="cart-item-remove" data-cart-remove="${item.id}">✕</button>
    </div>
  `).join('');

  // Update summary
  const subtotal = getCartTotal();
  const shipping = getShippingCost();

  document.getElementById('subtotal').textContent = formatPrice(subtotal);
  document.getElementById('shippingCost').textContent = shipping === 0 ? 'Zdarma' : formatPrice(shipping);
  document.getElementById('totalPrice').textContent = formatPrice(subtotal + shipping);

  // Update shipping progress
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);
  document.getElementById('cartShippingProgress').style.width = progress + '%';

  if (subtotal >= FREE_SHIPPING_THRESHOLD) {
    document.getElementById('cartShippingText').innerHTML = '🎉 <strong>Máte dopravu zdarma!</strong>';
  } else {
    const remaining = FREE_SHIPPING_THRESHOLD - subtotal;
    document.getElementById('cartShippingText').innerHTML = `Dokupte ještě za <strong>${formatPrice(remaining)}</strong> a máte dopravu zdarma!`;
  }
}

function renderCheckoutPage() {
  // Render order items
  const orderItems = document.getElementById('orderItems');
  orderItems.innerHTML = cart.map(item => `
    <div class="order-item">
      <div class="order-item-image">
        <div style="font-size: 2rem; display: flex; align-items: center; justify-content: center; height: 100%;">${item.image}</div>
      </div>
      <div class="order-item-info">
        <h5>${item.name}</h5>
        <p>${item.quantity}× ${formatPrice(item.price)}</p>
      </div>
      <div class="order-item-price">${formatPrice(item.price * item.quantity)}</div>
    </div>
  `).join('');

  updateCheckoutSummary();

  // Show/hide free shipping option
  const freeShippingOption = document.getElementById('freeShippingOption');
  if (getCartTotal() >= FREE_SHIPPING_THRESHOLD) {
    freeShippingOption.style.display = 'flex';
  } else {
    freeShippingOption.style.display = 'none';
  }
}

function updateCheckoutSummary() {
  const subtotal = getCartTotal();
  const selectedShipping = document.querySelector('input[name="shipping"]:checked')?.value;

  let shipping = DEFAULT_SHIPPING;
  if (selectedShipping === 'free' || getCartTotal() >= FREE_SHIPPING_THRESHOLD) {
    shipping = 0;
  } else if (selectedShipping === 'ppl') {
    shipping = 99;
  } else if (selectedShipping === 'posta') {
    shipping = 89;
  }

  document.getElementById('checkoutSubtotal').textContent = formatPrice(subtotal);
  document.getElementById('checkoutShipping').textContent = shipping === 0 ? 'Zdarma' : formatPrice(shipping);
  document.getElementById('checkoutTotal').textContent = formatPrice(subtotal + shipping);
}

function updateShippingProgress() {
  const total = getCartTotal();
  const progress = Math.min(100, (total / FREE_SHIPPING_THRESHOLD) * 100);

  const progressFill = document.getElementById('shippingProgressFill');
  if (progressFill) {
    progressFill.style.width = progress + '%';
  }

  const remaining = document.getElementById('shippingRemaining');
  if (remaining) {
    if (total >= FREE_SHIPPING_THRESHOLD) {
      remaining.parentElement.innerHTML = '🎉 <strong>Máte dopravu zdarma!</strong>';
    } else {
      remaining.textContent = formatPrice(FREE_SHIPPING_THRESHOLD - total);
    }
  }
}

// ========================================
// NAVIGATION
// ========================================
function showPage(pageId) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(page => {
    page.classList.remove('active');
  });

  // Show target page
  const targetPage = document.getElementById(`page-${pageId}`);
  if (targetPage) {
    targetPage.classList.add('active');
    currentPage = pageId;

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Page-specific rendering
    if (pageId === 'home') {
      renderHomePage();
    } else if (pageId === 'cart') {
      renderCartPage();
    } else if (pageId === 'checkout') {
      renderCheckoutPage();
      resetCheckoutSteps();
    }
  }
}

function showCategory(categoryId) {
  renderCategoryPage(categoryId);
  showPage('category');
}

function showProduct(productId) {
  renderProductPage(productId);
  showPage('product');
}

// ========================================
// CHECKOUT STEPS
// ========================================
function resetCheckoutSteps() {
  document.querySelectorAll('.checkout-step').forEach((step, index) => {
    step.classList.remove('active', 'completed');
    if (index === 0) step.classList.add('completed');
    if (index === 1) step.classList.add('active');
  });

  document.getElementById('checkoutStep2').classList.remove('hidden');
  document.getElementById('checkoutStep3').classList.add('hidden');
  document.getElementById('checkoutStep4').classList.add('hidden');
}

function goToStep(stepNum) {
  document.querySelectorAll('.checkout-step').forEach((step, index) => {
    step.classList.remove('active', 'completed');
    if (index < stepNum - 1) step.classList.add('completed');
    if (index === stepNum - 1) step.classList.add('active');
  });

  document.getElementById('checkoutStep2').classList.toggle('hidden', stepNum !== 2);
  document.getElementById('checkoutStep3').classList.toggle('hidden', stepNum !== 3);
  document.getElementById('checkoutStep4').classList.toggle('hidden', stepNum !== 4);
}

async function completeOrder() {
  // Generate order number
  const orderNum = '#2024' + Math.floor(100000 + Math.random() * 900000);

  // Get form data
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const street = document.getElementById('street').value;
  const city = document.getElementById('city').value;
  const zip = document.getElementById('zip').value;
  const note = document.getElementById('note').value;

  // Get shipping and payment
  const shippingMethod = document.querySelector('input[name="shipping"]:checked')?.value || 'zasilkovna';
  const paymentMethod = document.querySelector('input[name="payment"]:checked')?.value || 'card';

  // Calculate totals
  const subtotal = getCartTotal();
  let shippingPrice = DEFAULT_SHIPPING;
  if (shippingMethod === 'free' || subtotal >= FREE_SHIPPING_THRESHOLD) {
    shippingPrice = 0;
  } else if (shippingMethod === 'ppl') {
    shippingPrice = 99;
  } else if (shippingMethod === 'posta') {
    shippingPrice = 89;
  }

  // Prepare order data
  const orderData = {
    orderNumber: orderNum,
    status: 'pending',
    customer: {
      firstName,
      lastName,
      email,
      phone,
      address: {
        street,
        city,
        zip
      }
    },
    items: cart.map(item => ({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      image: item.image
    })),
    totals: {
      subtotal,
      shipping: shippingPrice,
      total: subtotal + shippingPrice
    },
    shipping: {
      method: shippingMethod,
      price: shippingPrice
    },
    payment: {
      method: paymentMethod
    },
    note: note || null
  };

  // Try to save to Firebase
  try {
    if (typeof saveOrder === 'function' && typeof db !== 'undefined') {
      await saveOrder(orderData);
      console.log('✅ Order saved to Firebase:', orderNum);
    } else {
      console.log('ℹ️ Firebase not configured, order stored locally only');
      // Store in localStorage as backup
      const localOrders = JSON.parse(localStorage.getItem('juniorshop_orders') || '[]');
      localOrders.push({ ...orderData, createdAt: new Date().toISOString() });
      localStorage.setItem('juniorshop_orders', JSON.stringify(localOrders));
    }
  } catch (error) {
    console.error('❌ Error saving order:', error);
    // Store in localStorage as backup
    const localOrders = JSON.parse(localStorage.getItem('juniorshop_orders') || '[]');
    localOrders.push({ ...orderData, createdAt: new Date().toISOString() });
    localStorage.setItem('juniorshop_orders', JSON.stringify(localOrders));
  }

  // Update UI
  document.getElementById('orderNumber').textContent = orderNum;

  // Go to confirmation step
  goToStep(4);

  // Clear cart
  cart = [];
  saveCart();

  showNotification('Objednávka byla úspěšně odeslána!');
}

// ========================================
// EVENT LISTENERS
// ========================================
document.addEventListener('DOMContentLoaded', () => {
  // Initialize
  renderHomePage();
  updateCartUI();

  // Navigation clicks
  document.addEventListener('click', (e) => {
    // Page navigation
    const pageLink = e.target.closest('[data-page]');
    if (pageLink) {
      e.preventDefault();
      showPage(pageLink.dataset.page);
      return;
    }

    // Category navigation
    const categoryLink = e.target.closest('[data-category]');
    if (categoryLink) {
      e.preventDefault();
      showCategory(categoryLink.dataset.category);
      return;
    }

    // Product click
    const productName = e.target.closest('[data-product]');
    if (productName) {
      e.preventDefault();
      showProduct(productName.dataset.product);
      return;
    }

    // Product card click (on image area)
    const productCard = e.target.closest('.product-card');
    if (productCard && e.target.closest('.product-image')) {
      e.preventDefault();
      showProduct(productCard.dataset.productId);
      return;
    }

    // Add to cart (product grid)
    const addCartBtn = e.target.closest('[data-add-cart]');
    if (addCartBtn) {
      e.preventDefault();
      addToCart(parseInt(addCartBtn.dataset.addCart));
      return;
    }

    // Cart item controls
    const cartMinus = e.target.closest('[data-cart-minus]');
    if (cartMinus) {
      const item = cart.find(i => i.id === parseInt(cartMinus.dataset.cartMinus));
      if (item) updateCartQuantity(item.id, item.quantity - 1);
      return;
    }

    const cartPlus = e.target.closest('[data-cart-plus]');
    if (cartPlus) {
      const item = cart.find(i => i.id === parseInt(cartPlus.dataset.cartPlus));
      if (item) updateCartQuantity(item.id, item.quantity + 1);
      return;
    }

    const cartRemove = e.target.closest('[data-cart-remove]');
    if (cartRemove) {
      removeFromCart(parseInt(cartRemove.dataset.cartRemove));
      return;
    }

    // Sort buttons
    const sortBtn = e.target.closest('.sort-btn');
    if (sortBtn) {
      document.querySelectorAll('.sort-btn').forEach(btn => btn.classList.remove('active'));
      sortBtn.classList.add('active');
      // TODO: Implement sorting
      return;
    }

    // Filter options
    const filterOption = e.target.closest('.filter-option');
    if (filterOption) {
      filterOption.classList.toggle('active');
      return;
    }

    // Subcategory cards
    const subcatCard = e.target.closest('.subcategory-card');
    if (subcatCard) {
      // Filter products by subcategory
      const subcat = subcatCard.dataset.subcategory;
      const filtered = products.filter(p => p.category === currentCategory && p.subcategory === subcat);
      document.getElementById('productsCount').textContent = `Nalezeno ${filtered.length} produktů`;
      renderProducts('categoryProducts', filtered);
      return;
    }

    // Shipping options
    const shippingOption = e.target.closest('.shipping-option');
    if (shippingOption) {
      document.querySelectorAll('.shipping-option').forEach(opt => opt.classList.remove('selected'));
      shippingOption.classList.add('selected');
      updateCheckoutSummary();
      return;
    }

    // Payment options
    const paymentOption = e.target.closest('.payment-option');
    if (paymentOption) {
      document.querySelectorAll('.payment-option').forEach(opt => opt.classList.remove('selected'));
      paymentOption.classList.add('selected');
      return;
    }
  });

  // Product detail - quantity controls
  document.getElementById('quantityMinus')?.addEventListener('click', () => {
    const input = document.getElementById('quantityInput');
    input.value = Math.max(1, parseInt(input.value) - 1);
  });

  document.getElementById('quantityPlus')?.addEventListener('click', () => {
    const input = document.getElementById('quantityInput');
    input.value = parseInt(input.value) + 1;
  });

  // Product detail - add to cart
  document.getElementById('addToCartDetail')?.addEventListener('click', () => {
    if (currentProduct) {
      const quantity = parseInt(document.getElementById('quantityInput').value);
      addToCart(currentProduct.id, quantity);
    }
  });

  // Clear cart button
  document.getElementById('clearCart')?.addEventListener('click', clearCart);

  // Checkout button
  document.getElementById('checkoutBtn')?.addEventListener('click', () => {
    if (cart.length > 0) {
      showPage('checkout');
    }
  });

  // Checkout step navigation
  document.getElementById('toStep3')?.addEventListener('click', () => goToStep(3));
  document.getElementById('backToStep2')?.addEventListener('click', () => goToStep(2));
  document.getElementById('submitOrder')?.addEventListener('click', (e) => {
    e.preventDefault();

    // Simple validation
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;

    if (!email || !phone || !firstName || !lastName) {
      showNotification('Prosím vyplňte všechna povinná pole');
      return;
    }

    completeOrder();
  });

  // Coupon form
  document.getElementById('couponForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const code = document.getElementById('couponInput').value;
    if (code.toUpperCase() === 'SLEVA10') {
      showNotification('Slevový kód byl aplikován!');
    } else {
      showNotification('Neplatný slevový kód');
    }
  });

  // Filter button (hero)
  document.getElementById('filterBtn')?.addEventListener('click', () => {
    // Get selected filters
    const activeGender = document.querySelector('.filter-option.gender.active');
    const activeAge = document.querySelector('.age-options .filter-option.active');
    const activeCat = document.querySelector('.category-options .filter-option.active');

    if (activeCat) {
      showCategory(activeCat.dataset.cat);
    } else {
      showCategory('hracky');
    }
  });

  // Search
  document.getElementById('searchBtn')?.addEventListener('click', () => {
    const query = document.getElementById('searchInput').value.toLowerCase();
    if (query) {
      const results = products.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
      );

      showPage('category');
      document.getElementById('categoryBreadcrumb').textContent = 'Výsledky hledání';
      document.getElementById('categoryTitle').textContent = `Výsledky pro "${query}"`;
      document.getElementById('subcategoryGrid').innerHTML = '';
      document.getElementById('productsCount').textContent = `Nalezeno ${results.length} produktů`;
      renderProducts('categoryProducts', results);
    }
  });

  document.getElementById('searchInput')?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      document.getElementById('searchBtn').click();
    }
  });
});
