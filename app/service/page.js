// app/service/[id]/page.js
'use client';
import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';
import { db } from '@/utils/firebase';
import { doc, getDoc } from 'firebase/firestore';

export default function ServiceDetail() {
  const router = useRouter();
const { id } = router.query || {}; 

  const [service, setService] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchService = async () => {
        const docRef = doc(db, 'services', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setService(docSnap.data());
        }
      };
      fetchService();
    }
  }, [id]);

  if (!service) return <p>Đang tải...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{service.title}</h1>
      <p>{service.description}</p>
      {/* Thêm các thông tin khác về dịch vụ nếu cần */}
    </div>
  );
}
