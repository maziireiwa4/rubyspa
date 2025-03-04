"use client";
import { useState, useEffect, useCallback } from "react";
import { db } from "@/utils/firebase";
import { collection, getDocs } from "firebase/firestore";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [paymentMessage, setPaymentMessage] = useState("");
  const cartCollectionRef = collection(db, "cart");

  const fetchCart = useCallback(async () => {
    const snapshot = await getDocs(cartCollectionRef);
    const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setCartItems(items);
  }, [cartCollectionRef]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const handlePayment = async () => {
    try {
      setPaymentMessage("Đang chuyển hướng đến ZaloPay...");
      setTimeout(() => {
        setPaymentMessage("Thanh toán thành công!");
      }, 2000);
    } catch (error) {
      console.error("Payment error:", error);
      setPaymentMessage("Thanh toán thất bại.");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Giỏ Hàng</h1>
      {cartItems.length > 0 ? (
        cartItems.map((item) => (
          <div key={item.id} className="border p-2 mb-2">
            <p className="font-semibold">{item.productName}</p>
            <p>Số lượng: {item.quantity}</p>
          </div>
        ))
      ) : (
        <p>Giỏ hàng trống.</p>
      )}
      <button onClick={handlePayment} className="bg-red-500 text-white py-2 px-4 rounded mt-4">Thanh toán qua ZaloPay</button>
      {paymentMessage && <p className="mt-2">{paymentMessage}</p>}
    </div>
  );
}
