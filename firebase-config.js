/**
 * Firebase Configuration for JuniorShop
 * 
 * IMPORTANT: Replace these demo credentials with your own Firebase project credentials!
 * 
 * To get your own credentials:
 * 1. Go to https://console.firebase.google.com/
 * 2. Create a new project or select existing
 * 3. Go to Project Settings > General > Your apps > Web app
 * 4. Copy the firebaseConfig object and paste it below
 * 5. Enable Firestore Database and Authentication in Firebase Console
 */

// Firebase configuration - REPLACE WITH YOUR OWN!
const firebaseConfig = {
    apiKey: "AIzaSyDemoKeyReplaceMeWithYourOwn",
    authDomain: "juniorshop-demo.firebaseapp.com",
    projectId: "juniorshop-demo",
    storageBucket: "juniorshop-demo.appspot.com",
    messagingSenderId: "123456789012",
    appId: "1:123456789012:web:abcdef123456"
};

// Initialize Firebase
let app, db, auth;

try {
    app = firebase.initializeApp(firebaseConfig);
    db = firebase.firestore();
    auth = firebase.auth();
    console.log('✅ Firebase initialized successfully');
} catch (error) {
    console.error('❌ Firebase initialization error:', error);
    console.log('ℹ️ Make sure to replace demo credentials with your own Firebase config');
}

// ========================================
// FIRESTORE FUNCTIONS
// ========================================

/**
 * Save order to Firestore
 * @param {Object} orderData - Order data to save
 * @returns {Promise<string>} - Order ID
 */
async function saveOrder(orderData) {
    try {
        const docRef = await db.collection('orders').add({
            ...orderData,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        console.log('✅ Order saved with ID:', docRef.id);
        return docRef.id;
    } catch (error) {
        console.error('❌ Error saving order:', error);
        throw error;
    }
}

/**
 * Get all orders from Firestore
 * @returns {Promise<Array>} - Array of orders
 */
async function getOrders() {
    try {
        const snapshot = await db.collection('orders')
            .orderBy('createdAt', 'desc')
            .get();

        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error('❌ Error getting orders:', error);
        throw error;
    }
}

/**
 * Update order status
 * @param {string} orderId - Order ID
 * @param {string} status - New status
 */
async function updateOrderStatus(orderId, status) {
    try {
        await db.collection('orders').doc(orderId).update({
            status: status,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        console.log('✅ Order status updated');
    } catch (error) {
        console.error('❌ Error updating order:', error);
        throw error;
    }
}

/**
 * Delete order
 * @param {string} orderId - Order ID
 */
async function deleteOrder(orderId) {
    try {
        await db.collection('orders').doc(orderId).delete();
        console.log('✅ Order deleted');
    } catch (error) {
        console.error('❌ Error deleting order:', error);
        throw error;
    }
}

// ========================================
// PRODUCTS FUNCTIONS
// ========================================

/**
 * Save product to Firestore
 * @param {Object} productData - Product data
 * @returns {Promise<string>} - Product ID
 */
async function saveProduct(productData) {
    try {
        const docRef = await db.collection('products').add({
            ...productData,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        console.log('✅ Product saved with ID:', docRef.id);
        return docRef.id;
    } catch (error) {
        console.error('❌ Error saving product:', error);
        throw error;
    }
}

/**
 * Get all products from Firestore
 * @returns {Promise<Array>} - Array of products
 */
async function getProducts() {
    try {
        const snapshot = await db.collection('products').get();
        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error('❌ Error getting products:', error);
        throw error;
    }
}

/**
 * Update product
 * @param {string} productId - Product ID
 * @param {Object} productData - Updated product data
 */
async function updateProduct(productId, productData) {
    try {
        await db.collection('products').doc(productId).update(productData);
        console.log('✅ Product updated');
    } catch (error) {
        console.error('❌ Error updating product:', error);
        throw error;
    }
}

/**
 * Delete product
 * @param {string} productId - Product ID
 */
async function deleteProduct(productId) {
    try {
        await db.collection('products').doc(productId).delete();
        console.log('✅ Product deleted');
    } catch (error) {
        console.error('❌ Error deleting product:', error);
        throw error;
    }
}

// ========================================
// AUTH FUNCTIONS
// ========================================

/**
 * Sign in admin with email/password
 * @param {string} email 
 * @param {string} password 
 */
async function signIn(email, password) {
    try {
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        console.log('✅ Admin signed in:', userCredential.user.email);
        return userCredential.user;
    } catch (error) {
        console.error('❌ Sign in error:', error);
        throw error;
    }
}

/**
 * Sign out admin
 */
async function signOut() {
    try {
        await auth.signOut();
        console.log('✅ Admin signed out');
    } catch (error) {
        console.error('❌ Sign out error:', error);
        throw error;
    }
}

/**
 * Get current user
 */
function getCurrentUser() {
    return auth.currentUser;
}

/**
 * Listen for auth state changes
 * @param {Function} callback 
 */
function onAuthStateChanged(callback) {
    return auth.onAuthStateChanged(callback);
}
