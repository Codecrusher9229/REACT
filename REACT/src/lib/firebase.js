import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase configuration object
const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: "reactchat-6cbf5.firebaseapp.com",
    projectId: "reactchat-6cbf5",
    storageBucket: "reactchat-6cbf5.appspot.com",
    messagingSenderId: "220312808083",
    appId: "1:220312808083:web:a588a36b0a07add13d3b66"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);