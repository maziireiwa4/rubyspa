//app/login/page.js
"use client";
import { useState } from "react";
import { auth } from "@/utils/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/");
    } catch (err) {
      setError("Sai tài khoản hoặc mật khẩu.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded">
      <h2 className="text-2xl font-bold mb-4">Đăng Nhập</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2"
          required
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2"
          required
        />
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
          Đăng Nhập
        </button>
      </form>
      
      {/* Thêm liên kết đến trang đăng ký */}
      <p className="mt-4 text-center">
        Chưa có tài khoản?{" "}
        <a href="/register" className="text-blue-500 underline">
          Đăng ký ngay
        </a>
      </p>
    </div>
  );
}
