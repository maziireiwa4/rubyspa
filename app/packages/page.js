// app/packages/page.js
'use client';
import { useEffect, useState } from 'react';
import { db } from '@/utils/firebase';
import { collection, getDocs } from 'firebase/firestore';

export default function PackagesPage() {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    const fetchPackages = async () => {
      const querySnapshot = await getDocs(collection(db, 'packages'));
      const list = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPackages(list);
    };
    fetchPackages();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Các gói dịch vụ</h1>
      {packages.length > 0 ? (
        packages.map(pkg => (
          <div key={pkg.id} className="border rounded p-4 mb-4">
            <h2 className="text-xl font-semibold">{pkg.title}</h2>
            <p>{pkg.description}</p>
            <p className="font-bold text-lg">{pkg.price}₫</p>
          </div>
        ))
      ) : (
        <p>Chưa có gói dịch vụ nào.</p>
      )}
    </div>
  );
}
