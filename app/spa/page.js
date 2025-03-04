"use client";
import { useState, useEffect, useCallback } from "react";
import { db } from "@/utils/firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";

export default function SpaPage() {
  const [services, setServices] = useState([]);
  const [isAdmin] = useState(true);
  const [formData, setFormData] = useState({ title: "", description: "", price: "" });
  const servicesCollectionRef = collection(db, "spaServices");

  const fetchServices = useCallback(async () => {
    const snapshot = await getDocs(servicesCollectionRef);
    const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setServices(list);
  }, [servicesCollectionRef]);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddService = async (e) => {
    e.preventDefault();
    try {
      await addDoc(servicesCollectionRef, formData);
      setFormData({ title: "", description: "", price: "" });
      fetchServices();
    } catch (error) {
      console.error("Error adding service:", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dịch Vụ Spa</h1>
      <div>
        {services.length > 0 ? (
          services.map((service) => (
            <div key={service.id} className="border p-2 mb-2">
              <h2 className="text-xl font-semibold">{service.title}</h2>
              <p>{service.description}</p>
              <p className="font-bold">{service.price}₫</p>
            </div>
          ))
        ) : (
          <p>Chưa có dịch vụ nào.</p>
        )}
      </div>
      {isAdmin && (
        <div className="mt-8 border p-4">
          <h2 className="text-xl font-semibold mb-4">Thêm Dịch Vụ Spa Mới (Admin)</h2>
          <form onSubmit={handleAddService} className="space-y-4">
            <input type="text" name="title" placeholder="Tên dịch vụ" value={formData.title} onChange={handleChange} className="w-full border p-2" required />
            <textarea name="description" placeholder="Mô tả dịch vụ" value={formData.description} onChange={handleChange} className="w-full border p-2" required />
            <input type="number" name="price" placeholder="Giá dịch vụ" value={formData.price} onChange={handleChange} className="w-full border p-2" required />
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Thêm Dịch Vụ</button>
          </form>
        </div>
      )}
    </div>
  );
}
