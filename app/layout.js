//app/layout.js
"use client";
import Link from "next/link";
import { UserContextProvider } from "../contexts/UserContext"; // Bọc toàn bộ app
import Navbar from "../components/Navbar"; // Tách Navbar ra component riêng

export default function RootLayout({ children }) {
  return (
    <UserContextProvider>
      <html lang="vi" suppressHydrationWarning>
        <body>
          <Navbar />
          <main>{children}</main>
          <footer>
            <p>© 2025 Ruby Spa. Tất cả quyền được bảo lưu.</p>
          </footer>
        </body>
      </html>
    </UserContextProvider>
  );
}
