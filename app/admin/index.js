// pages/admin/index.js
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { useRouter } from "next/router";

export default function AdminPage() {
  const { user } = useContext(UserContext);
  const router = useRouter();

  if (!user || user.role !== "admin") {
    router.push("/"); // Chuyển hướng nếu không phải admin
    return null;
  }

  return <div>Welcome to Admin Panel!</div>;
}