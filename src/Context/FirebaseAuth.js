import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyD95Xe0VJh4dz_P5nvXMImmz0PbOJJvAiE",
  authDomain: "kahon-login-dev.firebaseapp.com",
  projectId: "kahon-login-dev",
  storageBucket: "kahon-login-dev.appspot.com",
  messagingSenderId: "887734843453",
  appId: "1:887734843453:web:254bcbadb1b0bacbfc9254",
  measurementId: "G-6X07ZJ20Z9", 
  databaseURL: "https://kahon-login-dev-default-rtdb.asia-southeast1.firebasedatabase.app"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const db = getDatabase(app);
export default app




