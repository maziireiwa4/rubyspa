
import Link from "next/link";

export default function RootLayout({ children }) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body>
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
          </nav>
        </header>
        <main>{children}</main>
        <footer>
          <p>© 2025 Ruby Spa. Tất cả quyền được bảo lưu.</p>
        </footer>
      </body>
    </html>
  );
}

