import { useState, useEffect } from "react";
import { db, productsCollection } from "../utils/firebase";
import { getDocs } from "firebase/firestore";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const snapshot = await getDocs(productsCollection);
      setProducts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Sản phẩm</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            {product.name} - {product.price}₫
            <button>Thêm vào giỏ hàng</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
