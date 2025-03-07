// utils/firebase.js
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, collection, getDoc, doc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

// Kiểm tra biến môi trường (đưa lên đầu file)
console.log("Kiểm tra process.env:", process.env); // In toàn bộ process.env
const requiredEnvVars = [
  "NEXT_PUBLIC_FIREBASE_API_KEY",
  "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN",
  "NEXT_PUBLIC_FIREBASE_PROJECT_ID",
  "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET",
  "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID",
  "NEXT_PUBLIC_FIREBASE_APP_ID",
];

requiredEnvVars.forEach((key) => {
  if (!process.env[key]) {
    throw new Error(`⚠️ Thiếu cấu hình Firebase: ${key}. Kiểm tra .env.local`);
  } else {
    console.log(`${key} đã được cấu hình`);
  }
});

// Cấu hình Firebase
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};
console.log("Kiểm tra firebaseConfig:", firebaseConfig); // Thêm dòng này


// Khởi tạo Firebase (tránh khởi tạo lại)
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

// Kiểm tra quyền admin
export const checkAdmin = async (uid) => {
  console.log("Kiểm tra API Key trong checkAdmin:", process.env.NEXT_PUBLIC_FIREBASE_API_KEY); // Thêm dòng này
  if (!uid) return false;
  try {
    const userDoc = await getDoc(doc(db, "users", uid));
    return userDoc.exists() && userDoc.data().role === "admin";
  } catch (error) {
    console.error("Lỗi kiểm tra quyền admin:", error);
    return false;
  }
};