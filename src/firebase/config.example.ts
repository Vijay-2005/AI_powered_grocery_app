// This is an example of how to use environment variables with Firebase
// Create a similar file named config.ts with your actual configuration
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Firebase configuration object from environment variables
const firebaseConfig = {
  apiKey: "AIzaSyB9ywv6YSslYPcWnuB4D6dJD7I3rTf-Bjs",
  authDomain: "groceryapp-71a7a.firebaseapp.com",
  projectId: "groceryapp-71a7a",
  storageBucket: "groceryapp-71a7a.appspot.com",
  messagingSenderId: "508088090919",
  appId: "1:508088090919:web:fd495cc1f01ea60b7ae902"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app; 