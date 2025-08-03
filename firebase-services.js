// Firebase Services for Fashion Flow
// This file contains all Firebase operations and utilities

import {
    db, auth, storage, COLLECTIONS, STORAGE_PATHS,
    collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, orderBy, where, onSnapshot,
    createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, GoogleAuthProvider, signInWithPopup,
    ref, uploadBytes, getDownloadURL, deleteObject
} from './firebase-config.js';

// ==================== AUTHENTICATION SERVICES ====================

export class AuthService {
    // User registration
    static async signUp(email, password) {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            return { success: true, user: userCredential.user };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    // User login
    static async signIn(email, password) {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            return { success: true, user: userCredential.user };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    // Google sign in
    static async signInWithGoogle() {
        try {
            const provider = new GoogleAuthProvider();
            const userCredential = await signInWithPopup(auth, provider);
            return { success: true, user: userCredential.user };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    // User logout
    static async signOut() {
        try {
            await signOut(auth);
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    // Get current user
    static getCurrentUser() {
        return auth.currentUser;
    }

    // Listen to auth state changes
    static onAuthStateChange(callback) {
        return onAuthStateChanged(auth, callback);
    }
}

// ==================== PRODUCT SERVICES ====================

export class ProductService {
    // Add new product
    static async addProduct(productData) {
        try {
            const docRef = await addDoc(collection(db, COLLECTIONS.PRODUCTS), {
                ...productData,
                createdAt: new Date(),
                updatedAt: new Date()
            });
            return { success: true, id: docRef.id };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    // Get all products
    static async getAllProducts() {
        try {
            const q = query(collection(db, COLLECTIONS.PRODUCTS), orderBy("createdAt", "desc"));
            const querySnapshot = await getDocs(q);
            const products = [];
            querySnapshot.forEach((doc) => {
                products.push({
                    id: doc.id,
                    ...doc.data()
                });
            });
            return { success: true, products };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    // Get product by ID
    static async getProductById(productId) {
        try {
            const docRef = doc(db, COLLECTIONS.PRODUCTS, productId);
            const docSnap = await getDocs(docRef);
            if (docSnap.exists()) {
                return { success: true, product: { id: docSnap.id, ...docSnap.data() } };
            } else {
                return { success: false, error: "Product not found" };
            }
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    // Update product
    static async updateProduct(productId, updatedData) {
        try {
            const productRef = doc(db, COLLECTIONS.PRODUCTS, productId);
            await updateDoc(productRef, {
                ...updatedData,
                updatedAt: new Date()
            });
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    // Delete product
    static async deleteProduct(productId) {
        try {
            const productRef = doc(db, COLLECTIONS.PRODUCTS, productId);
            await deleteDoc(productRef);
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    // Get products by category
    static async getProductsByCategory(category) {
        try {
            const q = query(
                collection(db, COLLECTIONS.PRODUCTS),
                where("category", "==", category),
                orderBy("createdAt", "desc")
            );
            const querySnapshot = await getDocs(q);
            const products = [];
            querySnapshot.forEach((doc) => {
                products.push({
                    id: doc.id,
                    ...doc.data()
                });
            });
            return { success: true, products };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    // Listen to products changes (real-time updates)
    static onProductsChange(callback) {
        const q = query(collection(db, COLLECTIONS.PRODUCTS), orderBy("createdAt", "desc"));
        return onSnapshot(q, (querySnapshot) => {
            const products = [];
            querySnapshot.forEach((doc) => {
                products.push({
                    id: doc.id,
                    ...doc.data()
                });
            });
            callback(products);
        });
    }
}

// ==================== STORAGE SERVICES ====================

export class StorageService {
    // Upload image
    static async uploadImage(file, path = STORAGE_PATHS.PRODUCT_IMAGES) {
        try {
            const storageRef = ref(storage, `${path}/${Date.now()}_${file.name}`);
            const snapshot = await uploadBytes(storageRef, file);
            const downloadURL = await getDownloadURL(snapshot.ref);
            return { success: true, url: downloadURL };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    // Delete image
    static async deleteImage(imageUrl) {
        try {
            const imageRef = ref(storage, imageUrl);
            await deleteObject(imageRef);
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    // Upload multiple images
    static async uploadMultipleImages(files, path = STORAGE_PATHS.PRODUCT_IMAGES) {
        try {
            const uploadPromises = files.map(file => this.uploadImage(file, path));
            const results = await Promise.all(uploadPromises);
            const urls = results.filter(result => result.success).map(result => result.url);
            return { success: true, urls };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }
}

// ==================== ORDER SERVICES ====================

export class OrderService {
    // Add new order
    static async addOrder(orderData) {
        try {
            const docRef = await addDoc(collection(db, COLLECTIONS.ORDERS), {
                ...orderData,
                createdAt: new Date(),
                status: 'pending'
            });
            return { success: true, id: docRef.id };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    // Get user orders
    static async getUserOrders(userId) {
        try {
            const q = query(
                collection(db, COLLECTIONS.ORDERS),
                where("userId", "==", userId),
                orderBy("createdAt", "desc")
            );
            const querySnapshot = await getDocs(q);
            const orders = [];
            querySnapshot.forEach((doc) => {
                orders.push({
                    id: doc.id,
                    ...doc.data()
                });
            });
            return { success: true, orders };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    // Update order status
    static async updateOrderStatus(orderId, status) {
        try {
            const orderRef = doc(db, COLLECTIONS.ORDERS, orderId);
            await updateDoc(orderRef, {
                status,
                updatedAt: new Date()
            });
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }
}

// ==================== REVIEW SERVICES ====================

export class ReviewService {
    // Add new review
    static async addReview(reviewData) {
        try {
            const docRef = await addDoc(collection(db, COLLECTIONS.REVIEWS), {
                ...reviewData,
                createdAt: new Date()
            });
            return { success: true, id: docRef.id };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    // Get product reviews
    static async getProductReviews(productId) {
        try {
            const q = query(
                collection(db, COLLECTIONS.REVIEWS),
                where("productId", "==", productId),
                orderBy("createdAt", "desc")
            );
            const querySnapshot = await getDocs(q);
            const reviews = [];
            querySnapshot.forEach((doc) => {
                reviews.push({
                    id: doc.id,
                    ...doc.data()
                });
            });
            return { success: true, reviews };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    // Delete review
    static async deleteReview(reviewId) {
        try {
            const reviewRef = doc(db, COLLECTIONS.REVIEWS, reviewId);
            await deleteDoc(reviewRef);
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }
}

// ==================== UTILITY FUNCTIONS ====================

export class FirebaseUtils {
    // Convert Firebase timestamp to readable date
    static formatDate(timestamp) {
        if (!timestamp) return '';
        const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
        return date.toLocaleDateString('bn-BD');
    }

    // Generate unique ID
    static generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    // Validate email
    static isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Format price
    static formatPrice(price) {
        return new Intl.NumberFormat('bn-BD', {
            style: 'currency',
            currency: 'BDT'
        }).format(price);
    }
} 