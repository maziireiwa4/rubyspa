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
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
