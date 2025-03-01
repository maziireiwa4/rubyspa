import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC8J20vzi4v-qBIzJV_UY3iXd_WdQUPuys",
  authDomain: "rubyspa-99446.firebaseapp.com",
  projectId: "rubyspa-99446",
  storageBucket: "rubyspa-99446.firebasestorage.app",
  messagingSenderId: "810195616823",
  appId: "1:810195616823:web:26398ce010eed0f98babb2"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const productsCollection = collection(db, "products");

