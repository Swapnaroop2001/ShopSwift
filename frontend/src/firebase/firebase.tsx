// Import the necessary Firebase SDKs
import { initializeApp } from "firebase/app";
import { getAnalytics, Analytics } from "firebase/analytics";
import { getAuth, Auth } from "firebase/auth";  // Importing Auth if you plan to use Firebase Authentication

// Define the Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAxpTu2hqZo1b_cSxYCTRdoLlsPbvJkqXo",
  authDomain: "shopswift-ff803.firebaseapp.com",
  projectId: "shopswift-ff803",
  storageBucket: "shopswift-ff803.firebasestorage.app",
  messagingSenderId: "151317179553",
  appId: "1:151317179553:web:31539f23ca15e29a7154e0",
  measurementId: "G-77T0L0VE1J",
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase Analytics
const analytics: Analytics = getAnalytics(app);

// Initialize Firebase Authentication
const auth: Auth = getAuth(app);

// Export the app, auth, and analytics objects for use in other files
export { app, auth, analytics };
