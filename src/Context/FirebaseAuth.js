import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyD95Xe0VJh4dz_P5nvXMImmz0PbOJJvAiE",
  authDomain: "kahon-login-dev.firebaseapp.com",
  databaseURL: "https://kahon-login-dev-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "kahon-login-dev",
  storageBucket: "kahon-login-dev.appspot.com",
  messagingSenderId: "887734843453",
  appId: "1:887734843453:web:254bcbadb1b0bacbfc9254",
  measurementId: "G-6X07ZJ20Z9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const db = getFirestore(app);
export default app
