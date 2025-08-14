import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function SteamLoginSuccess() {
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const fetchSteamUser = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/auth/steam/success", {
          credentials: "include"
        });
        const data = await res.json();

        if (res.ok && data.token) {
          login(data.token, data.role);
          navigate(data.role === "admin" ? "/admin" : "/user");
        } else {
          navigate("/login");
        }
      } catch (err) {
        console.error("Ошибка Steam входа:", err);
        navigate("/login");
      }
    };

    fetchSteamUser();
  }, [navigate, login]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#121212] text-gray-200">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Вход через Steam...</h1>
        <p className="mt-2 text-gray-400">Пожалуйста, подождите</p>
      </div>
    </div>
  );
}
