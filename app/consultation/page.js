// app/consultation/page.js
'use client';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { db } from '@/utils/firebase';
import { collection, addDoc } from 'firebase/firestore';

export default function ConsultationPage() {
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await addDoc(collection(db, 'consultations'), data);
      setMessage('Đăng ký tư vấn thành công!');
      reset();
    } catch (error) {
      setMessage('Có lỗi xảy ra, vui lòng thử lại.');
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Đăng ký Tư vấn trực tuyến</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input className="w-full border p-2" placeholder="Tên của bạn" {...register('name', { required: true })} />
        <input className="w-full border p-2" type="email" placeholder="Email" {...register('email', { required: true })} />
        <input className="w-full border p-2" type="tel" placeholder="Số điện thoại" {...register('phone', { required: true })} />
        <textarea className="w-full border p-2" placeholder="Vấn đề cần tư vấn" {...register('query', { required: true })} />
        <button type="submit" className="bg-purple-500 text-white py-2 px-4 rounded" disabled={loading}>
          {loading ? 'Đang gửi...' : 'Đăng ký tư vấn'}
        </button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
}
