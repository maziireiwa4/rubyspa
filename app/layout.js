export default function RootLayout({ children }) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body>
        <header>
          <nav>
		  <a href="/">Trang Chủ</a>
		  <a href="/spa" style={{ marginLeft: "10px" }}>Dịch Vụ Spa</a>
		  <a href="/san-pham" style={{ marginLeft: "10px" }}>Sản Phẩm</a>
		  <a href="/gio-hang" style={{ marginLeft: "10px" }}>Giỏ Hàng</a>
		  <a href="/dat-lich" style={{ marginLeft: "10px" }}>Đặt Lịch</a>
		  <a href="/blog" style={{ marginLeft: "10px" }}>Blog</a>
		  <a href="/danh-gia" style={{ marginLeft: "10px" }}>Đánh Giá</a>
		  <a href="/tu-van" style={{ marginLeft: "10px" }}>Tư Vấn</a>
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

