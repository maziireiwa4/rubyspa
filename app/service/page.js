"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { db } from "@/utils/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function ServiceDetail() {
  const { id } = useParams(); // Lấy id từ URL
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return; // Nếu không có id, thoát sớm

    const fetchService = async () => {
      try {
        const docRef = doc(db, "services", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setService(docSnap.data());
        } else {
          console.error("Dịch vụ không tồn tại");
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [id]);

  if (loading) return <p>Đang tải...</p>;
  if (!service) return <p>Không tìm thấy dịch vụ.</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{service.title}</h1>
      <p>{service.description}</p>
      {/* Thêm các thông tin khác nếu cần */}
    </div>
  );
}
