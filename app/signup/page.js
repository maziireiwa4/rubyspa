//app/signup/page.js
"use client";
import { useState } from "react";
import { auth, db } from "@/utils/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Lưu thông tin vào Firestore với quyền mặc định là "user"
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        role: "user", // Mặc định không phải admin
      });

      router.push("/login"); // Chuyển hướng về trang đăng nhập
    } catch (err) {
      setError("Đăng ký thất bại. Hãy kiểm tra lại email và mật khẩu.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded">
      <h2 className="text-2xl font-bold mb-4">Đăng Ký</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSignup} className="space-y-4">
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border p-2" required />
        <input type="password" placeholder="Mật khẩu" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border p-2" required />
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Đăng Ký</button>
      </form>
    </div>
  );
}
