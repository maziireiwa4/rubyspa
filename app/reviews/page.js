"use client";
import { useEffect, useState } from "react";
import { db } from "@/utils/firebase";
import { collection, getDocs } from "firebase/firestore";

export default function ReviewsPage() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    async function fetchReviews() {
      const querySnapshot = await getDocs(collection(db, "reviews"));
      setReviews(querySnapshot.docs.map(doc => doc.data()));
    }
    fetchReviews();
  }, []);

  return (
    <div>
      <h1>Đánh giá khách hàng</h1>
      {reviews.map((review, index) => (
        <p key={index}>{review.comment}</p>
      ))}
    </div>
  );
}
