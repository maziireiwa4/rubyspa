"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { db } from "@/utils/firebase";
import { collection, addDoc } from "firebase/firestore";

export default function ConsultationPage() {
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const consultationsCollectionRef = collection(db, "consultations");

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await addDoc(consultationsCollectionRef, data);
      setMessage("Đăng ký tư vấn thành công!");
      reset();
    } catch (error) {
      console.error("Consultation error:", error);
      setMessage("Có lỗi xảy ra, vui lòng thử lại.");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Đăng ký Tư Vấn Trực Tuyến</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          type="text"
          placeholder="Tên của bạn"
          {...register("name", { required: true })}
          className="w-full border p-2"
        />
        <input
          type="email"
          placeholder="Email"
          {...register("email", { required: true })}
          className="w-full border p-2"
        />
        <input
          type="tel"
          placeholder="Số điện thoại"
          {...register("phone", { required: true })}
          className="w-full border p-2"
        />
        {/* Thêm trường Zalo */}
        <input
          type="tel"
          placeholder="Số Zalo của bạn"
          {...register("zalo", { required: true })}
          className="w-full border p-2"
        />
        <textarea
          placeholder="Vấn đề cần tư vấn"
          {...register("query", { required: true })}
          className="w-full border p-2"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-purple-500 text-white py-2 px-4 rounded"
        >
          {loading ? "Đang gửi..." : "Đăng ký tư vấn"}
        </button>
        {message && <p className="mt-2">{message}</p>}
      </form>
    </div>
  );
}
