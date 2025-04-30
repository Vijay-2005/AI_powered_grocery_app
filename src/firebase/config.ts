import { initializeApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getAnalytics, Analytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyB9ywv6YSslYPcWnuB4D6dJD7I3rTf-Bjs",
  authDomain: "groceryapp-71a7a.firebaseapp.com",
  projectId: "groceryapp-71a7a",
  storageBucket: "groceryapp-71a7a.firebasestorage.app",
  messagingSenderId: "508088090919",
  appId: "1:508088090919:web:fd495cc1f01ea60b7ae902",
  measurementId: "G-QNJLHXE2QH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log('Firebase initialized successfully');

// Initialize services
const auth: Auth = getAuth(app);
const db: Firestore = getFirestore(app);
const analytics: Analytics = getAnalytics(app);

console.log('Auth initialized successfully');

export { auth, db, analytics }; 