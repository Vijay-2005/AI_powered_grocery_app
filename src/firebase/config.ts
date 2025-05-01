import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Firebase configuration using environment variables
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

// Razorpay configuration using environment variables
export const razorpayConfig = {
  keyId: process.env.REACT_APP_UPI_MERCHANT_ID,
  keySecret: process.env.REACT_APP_UPI_MERCHANT_CODE
};

// Log configuration status (without exposing actual values)
const firebaseConfigKeys = Object.keys(firebaseConfig) as Array<keyof typeof firebaseConfig>;
const razorpayConfigKeys = Object.keys(razorpayConfig) as Array<keyof typeof razorpayConfig>;

console.log('Firebase config loaded:', firebaseConfigKeys.filter(key => !!firebaseConfig[key]).length === 6 ? 'Complete' : 'Incomplete');
console.log('Razorpay config loaded:', razorpayConfigKeys.filter(key => !!razorpayConfig[key]).length === 2 ? 'Complete' : 'Incomplete');

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;