//app/products/page.js
"use client";
import { useState, useEffect, useCallback } from "react";
import { db } from "@/utils/firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { useForm } from "react-hook-form";
import { useAuth } from "@/utils/auth";

export default function ProductsPage() {
  const { user, isAdmin, loading } = useAuth();
  const [products, setProducts] = useState([]);
  const { register, handleSubmit, reset } = useForm();
  const productsCollectionRef = collection(db, "products");

  const fetchProducts = useCallback(async () => {
    const snapshot = await getDocs(productsCollectionRef);
    setProducts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const onSubmit = async (data) => {
    if (!isAdmin) return;
    try {
      await addDoc(productsCollectionRef, data);
      reset();
      fetchProducts();
    } catch (error) {
      console.error("Lỗi khi thêm sản phẩm:", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Danh Sách Sản Phẩm</h1>
      {products.map((product) => (
        <div key={product.id} className="border-b py-2">
          <h2 className="text-xl font-semibold">{product.name}</h2>
          <p>{product.description}</p>
          <p className="text-green-600 font-semibold">{product.price} VNĐ</p>
        </div>
      ))}

      {isAdmin && !loading && (
        <div className="mt-8 border p-4">
          <h2 className="text-xl font-semibold mb-4">Thêm Sản Phẩm Mới (Admin)</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <input type="text" placeholder="Tên sản phẩm" {...register("name", { required: true })} className="w-full border p-2" />
            <textarea placeholder="Mô tả sản phẩm" {...register("description", { required: true })} className="w-full border p-2" />
            <input type="number" placeholder="Giá sản phẩm" {...register("price", { required: true })} className="w-full border p-2" />
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Thêm Sản Phẩm</button>
          </form>
        </div>
      )}
    </div>
  );
}
