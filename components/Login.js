// components/Login.js
import { useState } from "react";
import { auth, db, usersCollection } from "../utils/firebase"; // Đảm bảo import auth
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false); // Thêm state để quản lý chế độ đăng ký

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const userData = docSnap.data();
        onLogin({ uid: user.uid, role: userData.role });
      } else {
        await setDoc(docRef, { uid: user.uid, email: user.email, role: "user" });
        onLogin({ uid: user.uid, role: "user" });
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleSignup = async (e) => { // Thêm hàm xử lý đăng ký
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const docRef = doc(db, "users", user.uid);
      await setDoc(docRef, { uid: user.uid, email: user.email, role: "user" });
      onLogin({ uid: user.uid, role: "user" });
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  return (
    <form onSubmit={isSignup ? handleSignup : handleLogin}> {/* Thay đổi onSubmit */}
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">{isSignup ? "Signup" : "Login"}</button>
      <button type="button" onClick={() => setIsSignup(!isSignup)}> {/* Nút chuyển đổi chế độ */}
        {isSignup ? "Switch to Login" : "Switch to Signup"}
      </button>
    </form>
  );
}