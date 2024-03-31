import {initializeApp} from 'firebase/app';
import {getAnalytics} from 'firebase/analytics';
import {getDatabase} from 'firebase/database';
import {getAuth} from 'firebase/auth'; // Add this import for Firebase Authentication

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDBk_vWNoTPU9U922XDGJ940vgSfn4YyEU',
  authDomain: 'notely-1d370.firebaseapp.com',
  projectId: 'notely-1d370',
  storageBucket: 'notely-1d370.appspot.com',
  messagingSenderId: '888564843485',
  appId: '1:888564843485:web:58f47116893112a38f6c34',
  measurementId: 'G-5QPN1QEG6J',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Get the database instance
const database = getDatabase(app);
const auth = getAuth(app); // Initialize Firebase Authentication

export { app, database, auth };