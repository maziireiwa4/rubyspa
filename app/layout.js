//app/layout.js
"use client";
import Link from "next/link";
import { useContext } from "react";
import { UserContext, UserProvider } from "../contexts/UserContext";
import { auth } from "../utils/firebase";
import { signOut } from "firebase/auth";

export default function RootLayout({ children }) {
  const { user, setUser } = useContext(UserContext);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <html lang="vi" suppressHydrationWarning>
      <body>
        <UserProvider>
          <header>
            <nav>
              <Link href="/">Trang Chủ</Link>
              <Link href="/spa" style={{ marginLeft: "10px" }}>Dịch Vụ Spa</Link>
              <Link href="/products" style={{ marginLeft: "10px" }}>Sản Phẩm</Link>
              <Link href="/products/cart" style={{ marginLeft: "10px" }}>Giỏ Hàng</Link>
              <Link href="/book" style={{ marginLeft: "10px" }}>Đặt Lịch</Link>
              <Link href="/blog" style={{ marginLeft: "10px" }}>Blog</Link>
              <Link href="/reviews" style={{ marginLeft: "10px" }}>Đánh Giá</Link>
              <Link href="/consultation" style={{ marginLeft: "10px" }}>Tư Vấn</Link>
              {user ? (
                <button onClick={handleLogout} style={{ marginLeft: "10px" }}>Đăng xuất</button>
              ) : (
                <Link href="/login" style={{ marginLeft: "10px" }}>Đăng nhập</Link>
              )}
            </nav>
          </header>
          <main>{children}</main>
          <footer>
            <p>© 2025 Ruby Spa. Tất cả quyền được bảo lưu.</p>
          </footer>
        </UserProvider>
      </body>
    </html>
  );
}