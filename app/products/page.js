"use client";
import { useState, useEffect } from "react";
import { db } from "@/utils/firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [isAdmin] = useState(true); // Giả lập quyền admin
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    imageUrl: ""
  });
  const productsCollectionRef = collection(db, "products");

  useEffect(() => {
    async function fetchProducts() {
      const snapshot = await getDocs(productsCollectionRef);
      const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setProducts(list);
    }
    fetchProducts();
  }, [productsCollectionRef]); // Thêm dependency

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      await addDoc(productsCollectionRef, formData);
      setFormData({ name: "", description: "", price: "", imageUrl: "" });
      const snapshot = await getDocs(productsCollectionRef);
      const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setProducts(list);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Sản Phẩm</h1>
      <div>
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="border p-2 mb-2">
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p>{product.description}</p>
              <p className="font-bold">{product.price}₫</p>
              {product.imageUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-32 h-32 object-cover"
                />
              )}
            </div>
          ))
        ) : (
          <p>Chưa có sản phẩm nào.</p>
        )}
      </div>
      {isAdmin && (
        <div className="mt-8 border p-4">
          <h2 className="text-xl font-semibold mb-4">
            Thêm Sản Phẩm Mới (Admin)
          </h2>
          <form onSubmit={handleAddProduct} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Tên sản phẩm"
              value={formData.name}
              onChange={handleChange}
              className="w-full border p-2"
              required
            />
            <textarea
              name="description"
              placeholder="Mô tả sản phẩm"
              value={formData.description}
              onChange={handleChange}
              className="w-full border p-2"
              required
            />
            <input
              type="number"
              name="price"
              placeholder="Giá sản phẩm"
              value={formData.price}
              onChange={handleChange}
              className="w-full border p-2"
              required
            />
            <input
              type="text"
              name="imageUrl"
              placeholder="URL hình ảnh"
              value={formData.imageUrl}
              onChange={handleChange}
              className="w-full border p-2"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              Thêm Sản Phẩm
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
