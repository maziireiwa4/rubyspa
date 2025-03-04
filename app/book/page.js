"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { db } from "@/utils/firebase";
import { collection, addDoc } from "firebase/firestore";

export default function BookingPage() {
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const bookingsCollectionRef = collection(db, "bookings");

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await addDoc(bookingsCollectionRef, data);
      setMessage("Đặt lịch thành công!");
      reset();
    } catch (error) {
      console.error("Booking error:", error);
      setMessage("Có lỗi xảy ra, vui lòng thử lại.");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Đặt Lịch Trực Tuyến</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          type="text"
          placeholder="Tên của bạn"
          {...register("name", { required: true })}
          className="w-full border p-2"
        />
        <input
          type="tel"
          placeholder="Số điện thoại"
          {...register("phone", { required: true })}
          className="w-full border p-2"
        />
        {/* Thêm trường Zalo để lấy số Zalo của khách */}
        <input
          type="tel"
          placeholder="Số Zalo của bạn"
          {...register("zalo", { required: true })}
          className="w-full border p-2"
        />
        <input
          type="date"
          {...register("date", { required: true })}
          className="w-full border p-2"
        />
        <input
          type="time"
          {...register("time", { required: true })}
          className="w-full border p-2"
        />
        <select
          {...register("service", { required: true })}
          className="w-full border p-2"
        >
          <option value="massage">Massage</option>
          <option value="facial">Chăm sóc da mặt</option>
          <option value="body">Chăm sóc cơ thể</option>
        </select>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          {loading ? "Đang xử lý..." : "Đặt Lịch"}
        </button>
        {message && <p className="mt-2">{message}</p>}
      </form>
    </div>
  );
}
