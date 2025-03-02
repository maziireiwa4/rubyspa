// app/book/page.js
'use client';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { db } from '@/utils/firebase'; // đảm bảo đã cấu hình firebase.js
import { collection, addDoc } from 'firebase/firestore';

export default function BookingPage() {
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // Lưu thông tin đặt lịch vào collection 'bookings' trong Firestore
      await addDoc(collection(db, 'bookings'), data);
      setMessage('Đặt lịch thành công!');
      reset();
    } catch (error) {
      setMessage('Có lỗi xảy ra, vui lòng thử lại.');
      console.error('Booking error:', error);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Đặt lịch trực tuyến</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block">Tên:</label>
          <input className="w-full border p-2" {...register('name', { required: true })} />
        </div>
        <div>
          <label className="block">Số điện thoại:</label>
          <input className="w-full border p-2" type="tel" {...register('phone', { required: true })} />
        </div>
        <div>
          <label className="block">Ngày đặt:</label>
          <input className="w-full border p-2" type="date" {...register('date', { required: true })} />
        </div>
        <div>
          <label className="block">Giờ đặt:</label>
          <input className="w-full border p-2" type="time" {...register('time', { required: true })} />
        </div>
        <div>
          <label className="block">Dịch vụ:</label>
          <select className="w-full border p-2" {...register('service', { required: true })}>
            <option value="massage">Massage</option>
            <option value="facial">Chăm sóc da mặt</option>
            <option value="body">Chăm sóc cơ thể</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded"
          disabled={loading}
        >
          {loading ? 'Đang xử lý...' : 'Đặt lịch'}
        </button>
        {message && <p className="mt-2">{message}</p>}
      </form>
    </div>
  );
}
