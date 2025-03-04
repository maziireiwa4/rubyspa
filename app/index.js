import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Chào mừng đến với Ruby Spa</h1>
      <nav>
        <Link href="/spa">Dịch vụ Spa</Link>
        <Link href="/products">Sản phẩm</Link>
        <Link href="/cart">Giỏ hàng</Link>
      </nav>
    </div>
  );
}
