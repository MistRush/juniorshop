/**
 * JuniorShop - E-commerce Application
 * Main JavaScript file for SPA navigation, cart management, and product display
 */

// ========================================
// PRODUCT DATA - Real products from junior.cz
// ========================================
const products = [
  // HRAČKY (Toys)
  {
    id: 1,
    name: "Stavebnice MERKUR – Formule 1",
    category: "hracky",
    subcategory: "stavebnice",
    price: 899,
    originalPrice: null,
    image: "https://www.junior.cz/files/images/product/350/formule-Qb8m.jpeg",
    description: "Klasická kovová stavebnice MERKUR pro malé konstruktéry. Sestavte si vlastní Formuli 1!",
    age: "6-9",
    gender: "boy",
    stock: 15,
    badge: null
  },
  {
    id: 2,
    name: "Stavebnice Mozaika Mravenec Stavitel",
    category: "hracky",
    subcategory: "stavebnice",
    price: 719,
    originalPrice: null,
    image: "https://www.junior.cz/files/images/product/350/stavebnice-mozaika-mravenec-stavitel-zzvM.jpg",
    description: "Kreativní mozaiková stavebnice pro rozvoj jemné motoriky a prostorové představivosti.",
    age: "3-6",
    gender: "unisex",
    stock: 23,
    badge: "new"
  },
  {
    id: 3,
    name: "Vilac - Dřevěné magnetky farma 20 ks",
    category: "hracky",
    subcategory: "drevene",
    price: 348,
    originalPrice: null,
    image: "https://www.junior.cz/files/images/product/350/vilac---drevene-magnetky-farma-20-ks-DKQJ.jpg",
    description: "Sada 20 dřevěných magnetek s motivy farmy. Ideální na lednici nebo magnetickou tabuli.",
    age: "3-6",
    gender: "unisex",
    stock: 34,
    badge: null
  },
  {
    id: 4,
    name: "LEGO® Minecraft® 21269 Výprava do dolu",
    category: "hracky",
    subcategory: "stavebnice",
    price: 715,
    originalPrice: null,
    image: "https://www.junior.cz/files/images/product/350/lego-minecraft21269-vyprava-do-dolu-a-pasovec-9E6o.jpg",
    description: "LEGO Minecraft set s pásovcem a důlním prostředím. Pro fanoušky oblíbené hry!",
    age: "6-9",
    gender: "boy",
    stock: 12,
    badge: null
  },
  {
    id: 5,
    name: "LEGO® Speed Champions Ferrari SF-24 F1®",
    category: "hracky",
    subcategory: "stavebnice",
    price: 649,
    originalPrice: null,
    image: "https://www.junior.cz/files/images/product/350/lego-speed-champions-77242-zavodni-auto-ferrari-sf-24-f1-h0kp.jpg",
    description: "Závodní auto Ferrari SF-24 F1 z řady LEGO Speed Champions. Detailní model pro sběratele.",
    age: "9-12",
    gender: "boy",
    stock: 8,
    badge: "new"
  },
  {
    id: 6,
    name: "Látková panenka Lila ve fialové",
    category: "hracky",
    subcategory: "panenky",
    price: 650,
    originalPrice: null,
    image: "https://www.junior.cz/files/images/product/350/latkova-panenka-daisy-ve-zlute-IokT.webp",
    description: "Měkká látková panenka v krásných fialových šatech. Ideální kamarádka pro nejmenší.",
    age: "0-3",
    gender: "girl",
    stock: 19,
    badge: null
  },
  {
    id: 7,
    name: "Lilliputiens - velký plyšový dráček Joe",
    category: "hracky",
    subcategory: "plysove",
    price: 2217,
    originalPrice: null,
    image: "https://www.junior.cz/files/images/product/350/lilliputiens---velky-plysovy-dracek-joe-R1ZG.jpg",
    description: "Velký plyšový dráček Joe od Lilliputiens. Prémiová kvalita, bezpečné materiály.",
    age: "0-3",
    gender: "unisex",
    stock: 5,
    badge: null
  },
  {
    id: 8,
    name: "Lilliputiens - muchláček dráček Joe",
    category: "hracky",
    subcategory: "plysove",
    price: 560,
    originalPrice: null,
    image: "https://www.junior.cz/files/images/product/350/lilliputiens---muchlacek----dracek-joe-KMF0.jpg",
    description: "Roztomilý muchláček ve tvaru draka. Měkký materiál vhodný pro kojence.",
    age: "0-3",
    gender: "unisex",
    stock: 28,
    badge: null
  },
  {
    id: 9,
    name: "Lilliputiens - dráček Joe muzikant",
    category: "hracky",
    subcategory: "hudebni",
    price: 871,
    originalPrice: null,
    image: "https://www.junior.cz/files/images/product/350/lilliputiens---dracek-joe-muzikant-LIEy.jpg",
    description: "Hudební hračka dráček Joe. Stisknutím vydává příjemné zvuky.",
    age: "0-3",
    gender: "unisex",
    stock: 14,
    badge: null
  },

  // KNIHY (Books)
  {
    id: 10,
    name: "Stela - svítící vyšívání",
    category: "knihy",
    subcategory: "interaktivni",
    price: 389,
    originalPrice: null,
    image: "https://www.junior.cz/files/images/product/350/stela---svitici-vysivani-OpOI.jpg",
    description: "Kreativní kniha se svítícím vyšíváním. Spojení čtení a tvoření v jednom.",
    age: "6-9",
    gender: "girl",
    stock: 21,
    badge: "new"
  },
  {
    id: 11,
    name: "Jedééém!",
    category: "knihy",
    subcategory: "pohadky",
    price: 749,
    originalPrice: null,
    image: "https://www.junior.cz/files/images/product/350/jedeeem-gqdE.jpg",
    description: "Zábavná dětská kniha plná dobrodružství a překvapení.",
    age: "3-6",
    gender: "unisex",
    stock: 16,
    badge: null
  },
  {
    id: 12,
    name: "Děti z Bullerbynu – výroční vydání",
    category: "knihy",
    subcategory: "pohadky",
    price: 380,
    originalPrice: null,
    image: "https://www.junior.cz/files/images/product/350/deti-z-bullerbynu---vyrocni-vydani-58jT.jpg",
    description: "Klasická kniha od Astrid Lindgren ve speciálním výročním vydání.",
    age: "6-9",
    gender: "unisex",
    stock: 32,
    badge: null
  },
  {
    id: 13,
    name: "Hmyzí pohádky z květinové zahrádky",
    category: "knihy",
    subcategory: "pohadky",
    price: 259,
    originalPrice: null,
    image: "https://www.junior.cz/files/images/product/350/Cover_front-1717664212-q32o.jpg",
    description: "Kouzelné pohádky o hmyzu a přírodě. Krásné ilustrace pro nejmenší čtenáře.",
    age: "3-6",
    gender: "unisex",
    stock: 45,
    badge: null
  },
  {
    id: 14,
    name: "Dětská kniha Frank a želvička",
    category: "knihy",
    subcategory: "pohadky",
    price: 369,
    originalPrice: null,
    image: "https://www.junior.cz/files/images/product/350/frank-a-zelvicka-C0Op.jpg",
    description: "Dojemný příběh o přátelství chlapce a želvy.",
    age: "3-6",
    gender: "unisex",
    stock: 18,
    badge: null
  },
  {
    id: 15,
    name: "Můj dům",
    category: "knihy",
    subcategory: "interaktivni",
    price: 259,
    originalPrice: null,
    image: "https://www.junior.cz/files/images/product/350/muj-dum-gTaj.webp",
    description: "Interaktivní kniha o domově a rodině. S okénky a klapkami.",
    age: "0-3",
    gender: "unisex",
    stock: 27,
    badge: null
  },
  {
    id: 16,
    name: "A-BÉ-CÉ-DÉ",
    category: "knihy",
    subcategory: "naucne",
    price: 259,
    originalPrice: null,
    image: "https://www.junior.cz/files/images/product/350/a-be-ce-de-Todu.jpg",
    description: "Zábavná abeceda pro nejmenší. Učení hrou s krásnými obrázky.",
    age: "3-6",
    gender: "unisex",
    stock: 38,
    badge: null
  },
  {
    id: 17,
    name: "O zzzvědavé včele Elle",
    category: "knihy",
    subcategory: "pohadky",
    price: 849,
    originalPrice: null,
    image: "https://www.junior.cz/files/images/product/350/o-zzzvedave-vcele-elle-n4ar.jpg",
    description: "Příběh o zvědavé včelce na cestě za poznáním. Vzdělávací i zábavná.",
    age: "3-6",
    gender: "unisex",
    stock: 11,
    badge: "new"
  },

  // TVOŘENÍ (Crafts)
  {
    id: 18,
    name: "Artissimo - třpytkové pískování Jednorožci",
    category: "tvoreni",
    subcategory: "malovani",
    price: 369,
    originalPrice: null,
    image: "https://www.junior.cz/files/images/product/350/artissimo---trpytkove-piskovani---jednorozci-hYXT.jpg",
    description: "Kreativní sada pro pískování s třpytkami. Vytvořte si kouzelné jednorožce!",
    age: "6-9",
    gender: "girl",
    stock: 24,
    badge: null
  },
  {
    id: 19,
    name: "Sada malování pískem – Pohádky",
    category: "tvoreni",
    subcategory: "malovani",
    price: 359,
    originalPrice: null,
    image: "https://www.junior.cz/files/images/product/350/sada-malovani-piskem--pohadky-Ah9P.jpg",
    description: "Malování barevným pískem s pohádkovými motivy. Kompletní sada.",
    age: "3-6",
    gender: "unisex",
    stock: 31,
    badge: null
  },
  {
    id: 20,
    name: "Žlutý křeček jedlíček",
    category: "tvoreni",
    subcategory: "modelovani",
    price: 250,
    originalPrice: null,
    image: "https://www.junior.cz/files/images/product/350/zluty-krecek-jedlicek-imrk.jpg",
    description: "Kreativní sada pro výrobu vlastního křečka. Zábava pro celou rodinu.",
    age: "6-9",
    gender: "unisex",
    stock: 17,
    badge: null
  },
  {
    id: 21,
    name: "Interaktivní sada Alou do pelíšku!",
    category: "tvoreni",
    subcategory: "modelovani",
    price: 320,
    originalPrice: null,
    image: "https://www.junior.cz/files/images/product/350/interaktivni-sada-alou-do-pelisku-js0k.jpg",
    description: "Interaktivní tvořivá sada pro nejmenší. Propojení hry a učení.",
    age: "0-3",
    gender: "unisex",
    stock: 22,
    badge: null
  },
  {
    id: 22,
    name: "Interaktivní listy Malá velká ručička",
    category: "tvoreni",
    subcategory: "malovani",
    price: 230,
    originalPrice: null,
    image: "https://www.junior.cz/files/images/product/350/interaktivni-listy-mala-velka-rucicka-weIX.jpg",
    description: "Pracovní listy pro rozvoj kresby a jemné motoriky.",
    age: "3-6",
    gender: "unisex",
    stock: 40,
    badge: null
  },
  {
    id: 23,
    name: "Tvořivá sada Panenka s růžovými vlásky",
    category: "tvoreni",
    subcategory: "modelovani",
    price: 1150,
    originalPrice: null,
    image: "https://www.junior.cz/files/images/product/350/latkova-panenka-s-ruzovymi-vlasky-lidske-telo-pfzB.jpg",
    description: "Prémiová tvořivá sada pro výrobu vlastní látkové panenky.",
    age: "9-12",
    gender: "girl",
    stock: 6,
    badge: null
  },
  {
    id: 24,
    name: "Čmáropis",
    category: "tvoreni",
    subcategory: "malovani",
    price: 199,
    originalPrice: null,
    image: "https://www.junior.cz/files/images/product/350/cmaropis-Wixh.jpg",
    description: "Kreativní sešit pro volné čmárání a rozvoj fantazie.",
    age: "3-6",
    gender: "unisex",
    stock: 55,
    badge: "sale"
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
        <img src="${product.image}" alt="${product.name}" loading="lazy" onerror="this.style.display='none'; this.parentElement.innerHTML='<div style=\\'font-size:4rem;display:flex;align-items:center;justify-content:center;height:100%\\'>🧸</div>'">
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
  document.getElementById('mainImage').innerHTML = `<img src="${product.image}" alt="${product.name}" style="max-width: 100%; max-height: 100%; object-fit: contain;" onerror="this.style.display='none'; this.parentElement.innerHTML='<div style=\\'font-size:10rem;display:flex;align-items:center;justify-content:center;height:100%\\'>🧸</div>'">`;

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
        <img src="${item.image}" alt="${item.name}" style="width:100%; height:100%; object-fit:contain;" onerror="this.outerHTML='<div style=\\'font-size:2rem;display:flex;align-items:center;justify-content:center;height:100%\\'>🧸</div>'">
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
        <img src="${item.image}" alt="${item.name}" style="width:100%; height:100%; object-fit:contain;" onerror="this.outerHTML='<div style=\\'font-size:1.5rem;display:flex;align-items:center;justify-content:center;height:100%\\'>🧸</div>'">
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
