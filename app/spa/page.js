//app/spa/page.js
"use client";
import { useState, useEffect, useCallback } from "react";
import { db } from "@/utils/firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { useForm } from "react-hook-form";
import { useAuth } from "@/utils/auth";

export default function SpaPage() {
  const { user, isAdmin, loading } = useAuth();
  const [services, setServices] = useState([]);
  const { register, handleSubmit, reset } = useForm();
  const servicesCollectionRef = collection(db, "services");

  const fetchServices = useCallback(async () => {
    const snapshot = await getDocs(servicesCollectionRef);
    setServices(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  }, []);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  const onSubmit = async (data) => {
    if (!isAdmin) return;
    try {
      await addDoc(servicesCollectionRef, data);
      reset();
      fetchServices();
    } catch (error) {
      console.error("Lỗi khi thêm dịch vụ:", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dịch Vụ Spa</h1>
      {services.map((service) => (
        <div key={service.id} className="border-b py-2">
          <h2 className="text-xl font-semibold">{service.name}</h2>
          <p>{service.description}</p>
          <p className="text-green-600 font-semibold">{service.price} VNĐ</p>
        </div>
      ))}

      {isAdmin && !loading && (
        <div className="mt-8 border p-4">
          <h2 className="text-xl font-semibold mb-4">Thêm Dịch Vụ Mới (Admin)</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <input type="text" placeholder="Tên dịch vụ" {...register("name", { required: true })} className="w-full border p-2" />
            <textarea placeholder="Mô tả dịch vụ" {...register("description", { required: true })} className="w-full border p-2" />
            <input type="number" placeholder="Giá dịch vụ" {...register("price", { required: true })} className="w-full border p-2" />
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Thêm Dịch Vụ</button>
          </form>
        </div>
      )}
    </div>
  );
}
