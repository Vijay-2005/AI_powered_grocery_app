import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Firebase configuration object with direct values
const firebaseConfig = {
  apiKey: "AIzaSyB9ywv6YSslYPcWnuB4D6dJD7I3rTf-Bjs",
  authDomain: "groceryapp-71a7a.firebaseapp.com",
  projectId: "groceryapp-71a7a",
  storageBucket: "groceryapp-71a7a.appspot.com",
  messagingSenderId: "508088090919",
  appId: "1:508088090919:web:fd495cc1f01ea60b7ae902"
};

// Razorpay configuration
export const razorpayConfig = {
  keyId: "rzp_live_9I5c7lMfDfXmNm",
  keySecret: "vuTaJEhJ64Wmo27GAPQbLsf2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app; 