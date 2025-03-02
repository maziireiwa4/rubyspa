export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body>
        <header>
          <nav>
            <a href="/">Trang Chủ</a>
            <a href="/spa">Dịch Vụ Spa</a>
            <a href="/products">Sản Phẩm</a>
            <a href="/products/cart">Giỏ Hàng</a>
            <a href="/book">Đặt Lịch</a>
            <a href="/blog">Blog</a>
            <a href="/reviews">Đánh Giá</a>
            <a href="/consultation">Tư Vấn</a>
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

