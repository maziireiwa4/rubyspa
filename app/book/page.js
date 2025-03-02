"use client"; // Bắt buộc để Firebase chỉ chạy trên client

import { useEffect, useState } from "react";
import { db } from "@/utils/firebase";
import { collection, addDoc } from "firebase/firestore";

export default function BookingPage() {
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    setDataLoaded(true); // Đợi client load xong
  }, []);

  if (!dataLoaded) {
    return <p>Đang tải...</p>;
  }

  return <p>Form đặt lịch sẽ hiển thị sau khi tải dữ liệu.</p>;
}
