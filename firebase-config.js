// Firebase Configuration for Fashion Flow
// This file contains all Firebase-related configurations and utilities

// Firebase SDK imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";
import { getFirestore, collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, orderBy, where, onSnapshot } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDTGUWQZghHRwNy6KN438pHUF16CEH4gzI",
    authDomain: "fashionflow-ae3c0.firebaseapp.com",
    databaseURL: "https://fashionflow-ae3c0-default-rtdb.firebaseio.com",
    projectId: "fashionflow-ae3c0",
    storageBucket: "fashionflow-ae3c0.firebasestorage.app",
    messagingSenderId: "945995719833",
    appId: "1:945995719833:web:44c61d8acef67858f20408",
    measurementId: "G-6PSNSQSVPB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

// Firebase Collections
const COLLECTIONS = {
    PRODUCTS: 'products',
    USERS: 'users',
    ORDERS: 'orders',
    REVIEWS: 'reviews',
    CATEGORIES: 'categories',
    SETTINGS: 'settings'
};

// Firebase Storage Paths
const STORAGE_PATHS = {
    PRODUCT_IMAGES: 'products/images',
    USER_AVATARS: 'users/avatars',
    BANNER_IMAGES: 'banners'
};

// Export Firebase services
export {
    app,
    analytics,
    db,
    auth,
    storage,
    COLLECTIONS,
    STORAGE_PATHS,
    // Firestore functions
    collection,
    addDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    doc,
    query,
    orderBy,
    where,
    onSnapshot,
    // Auth functions
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
    // Storage functions
    ref,
    uploadBytes,
    getDownloadURL,
    deleteObject
}; 