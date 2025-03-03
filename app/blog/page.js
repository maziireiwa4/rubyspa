"use client";
import { useState, useEffect, useCallback } from "react";
import { db } from "@/utils/firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { useForm } from "react-hook-form";

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [isAdmin] = useState(true);
  const { register, handleSubmit, reset } = useForm();
  const blogPostsCollectionRef = collection(db, "blogPosts");

  const fetchPosts = useCallback(async () => {
    const snapshot = await getDocs(blogPostsCollectionRef);
    const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setPosts(list);
  }, [blogPostsCollectionRef]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const onSubmit = async (data) => {
    try {
      await addDoc(blogPostsCollectionRef, data);
      reset();
      fetchPosts();
    } catch (error) {
      console.error("Error adding blog post:", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Blog & Kiến Thức Làm Đẹp</h1>
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post.id} className="border-b py-2">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p>{post.excerpt}</p>
          </div>
        ))
      ) : (
        <p>Chưa có bài viết nào.</p>
      )}

      {isAdmin && (
        <div className="mt-8 border p-4">
          <h2 className="text-xl font-semibold mb-4">Thêm Bài Viết Mới (Admin)</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <input type="text" placeholder="Tiêu đề bài viết" {...register("title", { required: true })} className="w-full border p-2" />
            <textarea placeholder="Trích dẫn bài viết" {...register("excerpt", { required: true })} className="w-full border p-2" />
            <textarea placeholder="Nội dung bài viết" {...register("content", { required: true })} className="w-full border p-2" />
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Thêm Bài Viết</button>
          </form>
        </div>
      )}
    </div>
  );
}
