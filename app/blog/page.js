// app/blog/page.js
'use client';
import { useEffect, useState } from 'react';
import { db } from '@/utils/firebase';
import { collection, getDocs } from 'firebase/firestore';

export default function BlogPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const querySnapshot = await getDocs(collection(db, 'blogPosts'));
      const postsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPosts(postsList);
    };
    fetchPosts();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Blog & Kiến thức làm đẹp</h1>
      {posts.length > 0 ? (
        posts.map(post => (
          <div key={post.id} className="border-b py-2">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p>{post.excerpt}</p>
          </div>
        ))
      ) : (
        <p>Chưa có bài viết nào.</p>
      )}
    </div>
  );
}
