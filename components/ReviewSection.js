// components/ReviewSection.js
'use client';
import { useEffect, useState } from 'react';
import { db } from '@/utils/firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { useForm } from 'react-hook-form';

export default function ReviewSection() {
  const [reviews, setReviews] = useState([]);
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);

  const fetchReviews = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'reviews'));
      const list = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setReviews(list);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await addDoc(collection(db, 'reviews'), data);
      reset();
      fetchReviews();
    } catch (error) {
      console.error('Error adding review:', error);
    }
    setLoading(false);
  };

  return (
    <div className="p-4 border rounded my-4">
      <h2 className="text-xl font-semibold mb-2">Đánh giá & Phản hồi</h2>
      <div className="space-y-2 mb-4">
        {reviews.length > 0 ? (
          reviews.map(review => (
            <div key={review.id} className="border p-2 rounded">
              <p className="font-bold">{review.name}</p>
              <p>{review.comment}</p>
            </div>
          ))
        ) : (
          <p>Chưa có đánh giá nào.</p>
        )}
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <input
          className="w-full border p-2"
          placeholder="Tên của bạn"
          {...register('name', { required: true })}
        />
        <textarea
          className="w-full border p-2"
          placeholder="Phản hồi của bạn"
          {...register('comment', { required: true })}
        />
        <button
          type="submit"
          className="bg-green-500 text-white py-2 px-4 rounded"
          disabled={loading}
        >
          {loading ? 'Đang gửi...' : 'Gửi đánh giá'}
        </button>
      </form>
    </div>
  );
}
