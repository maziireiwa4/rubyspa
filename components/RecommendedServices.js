// components/RecommendedServices.js
import { useEffect, useState } from 'react';

export default function RecommendedServices() {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    // Giả sử bạn lưu trữ sở thích của khách trong localStorage dưới key 'favoriteServices'
    const favorites = JSON.parse(localStorage.getItem('favoriteServices')) || [];
    // Logic để lấy danh sách gợi ý, ví dụ: nếu khách thích 'massage', gợi ý các dịch vụ liên quan
    // Ở đây chỉ là ví dụ tĩnh
    const sampleRecommendations = favorites.length
      ? favorites.map(service => ({ title: service, description: `Trải nghiệm ${service} đỉnh cao` }))
      : [{ title: 'Massage', description: 'Trải nghiệm massage thư giãn' }];
    setRecommendations(sampleRecommendations);
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Gợi ý cho bạn</h2>
      <ul>
        {recommendations.map((rec, index) => (
          <li key={index} className="mb-2 border p-2 rounded">
            <h3 className="font-semibold">{rec.title}</h3>
            <p>{rec.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
