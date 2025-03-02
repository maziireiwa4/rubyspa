import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";

// Đảm bảo biến môi trường đã được thiết lập
if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
  throw new Error("⚠️ Thiếu cấu hình Firebase! Kiểm tra .env.local");
}

// Cấu hình Firebase từ biến môi trường
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Tránh khởi tạo lại Firebase nếu đã tồn tại
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Kết nối Firestore
export const db = getFirestore(app);

// 🔹 Collection trong Firestore
export const productsCollection = collection(db, "products"); // Sản phẩm
export const bookingsCollection = collection(db, "bookings"); // Đặt lịch
export const reviewsCollection = collection(db, "reviews"); // Đánh giá
export const consultationsCollection = collection(db, "consultations"); // Tư vấn
