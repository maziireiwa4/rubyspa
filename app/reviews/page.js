"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { db } from "@/utils/firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";

export default function ReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const { register, handleSubmit, reset } = useForm();
  const reviewsCollectionRef = collection(db, "reviews");

  useEffect(() => {
    async function fetchReviews() {
      const snapshot = await getDocs(reviewsCollectionRef);
      const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setReviews(list);
    }
    fetchReviews();
  }, [reviewsCollectionRef]); // Thêm dependency để ESLint không cảnh báo

  const onSubmit = async (data) => {
    try {
      await addDoc(reviewsCollectionRef, data);
      reset();
      const snapshot = await getDocs(reviewsCollectionRef);
      const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setReviews(list);
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Đánh Giá & Phản Hồi</h1>
      <div className="space-y-2 mb-4">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.id} className="border p-2 rounded">
              <p className="font-bold">
                {review.name} - {review.rating} sao
              </p>
              <p>{review.comment}</p>
            </div>
          ))
        ) : (
          <p>Chưa có đánh giá nào.</p>
        )}
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <input
          type="text"
          placeholder="Tên của bạn"
          {...register("name", { required: true })}
          className="w-full border p-2"
        />
        <div className="flex items-center">
          <label className="mr-2">Điểm đánh giá:</label>
          <select
            {...register("rating", { required: true })}
            className="border p-2"
          >
            <option value="">Chọn</option>
            <option value="1">1 sao</option>
            <option value="2">2 sao</option>
            <option value="3">3 sao</option>
            <option value="4">4 sao</option>
            <option value="5">5 sao</option>
          </select>
        </div>
        <textarea
          placeholder="Phản hồi của bạn"
          {...register("comment", { required: true })}
          className="w-full border p-2"
        />
        <button
          type="submit"
          className="bg-green-500 text-white py-2 px-4 rounded"
        >
          Gửi Đánh Giá
        </button>
      </form>
    </div>
  );
}
