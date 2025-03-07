// pages/login.js
import Login from "../components/Login";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { useRouter } from "next/router";

export default function LoginPage() {
  const { setUser } = useContext(UserContext);
  const router = useRouter();

  const handleLogin = (userData) => {
    setUser(userData);
    router.push("/");
  };

  return (
    <div>
      <h1>Đăng Nhập</h1>
      <Login onLogin={handleLogin} />
    </div>
  );
}