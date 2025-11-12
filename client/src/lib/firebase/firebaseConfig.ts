// Import the functions you need from the SDKs you need
import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
// 	apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
// 	authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
// 	projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
// 	storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
// 	messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
// 	appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
// 	measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
// };

const firebaseConfig = {
  apiKey: "AIzaSyCN0PIXk5rO-R3QdloEqLLscmQYu-Gwcc0",
  authDomain: "central-eatery.firebaseapp.com",
  projectId: "central-eatery",
  storageBucket: "central-eatery.firebasestorage.app",
  messagingSenderId: "735662423815",
  appId: "1:735662423815:web:a00076d1fccd468e800fa2",
  measurementId: "G-M0X0LN7CYB"
};

// Initialize Firebase if it hasn't been initialized
const app: FirebaseApp = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

// Initialize Auth if it hasn't been initialized
const auth: Auth = getAuth(app);

// Initialize Firestore if it hasn't been initialized
const firestore = getFirestore(app);


export { app, auth, firestore };