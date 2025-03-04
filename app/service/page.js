"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { db } from "@/utils/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function ServiceDetail() {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Thêm state để bắt lỗi

  useEffect(() => {
    if (!id) {
      setError("Không tìm thấy ID dịch vụ.");
      setLoading(false);
      return;
    }

    const fetchService = async () => {
      setLoading(true);
      setError(null);

      try {
        const docRef = doc(db, "services", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setService(docSnap.data());
        } else {
          setError("Dịch vụ không tồn tại.");
        }
      } catch (error) {
        setError("Lỗi khi tải dịch vụ: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [id]);

  if (loading) return <p className="text-gray-500">Đang tải...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!service) return <p className="text-gray-500">Không có dữ liệu.</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{service.title}</h1>
      <p>{service.description}</p>
    </div>
  );
}
