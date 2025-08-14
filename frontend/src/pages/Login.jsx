// src/pages/Login.jsx
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function ParticlesBackground() {
  return (
    <canvas
      id="particles-canvas"
      className="absolute inset-0 z-0 pointer-events-none"
    ></canvas>
  );
}

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLocalLogin = async (e) => {
    e.preventDefault();
    const success = await login(username, password);
    if (success) navigate("/");
  };

  const handleSteamLogin = () => {
    window.location.href = "http://localhost:5000/api/auth/steam";
  };

  return (
    <div className="bg-[#121212] text-gray-100 min-h-screen flex items-center justify-center relative overflow-hidden">
      <ParticlesBackground />

      {/* Красная подсветка фона */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(183,28,28,0.2),transparent)] animate-pulse z-0" />

      <motion.div
        className="bg-[#1e1e1e] rounded-xl shadow-lg border border-red-800/30 p-8 w-full max-w-md relative z-10"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">
          Авторизация
        </h1>

        {/* Локальная авторизация */}
        <form onSubmit={handleLocalLogin} className="space-y-4">
          <input
            type="text"
            placeholder="Логин"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-[#121212] border border-gray-700 focus:outline-none focus:border-red-500"
          />
          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-[#121212] border border-gray-700 focus:outline-none focus:border-red-500"
          />
          <button
            type="submit"
            className="w-full py-2 bg-red-600 hover:bg-red-700 rounded-lg font-semibold shadow-lg hover:shadow-red-600/50 transition duration-300"
          >
            Войти
          </button>
        </form>

        {/* Разделитель */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-700" />
          <span className="px-3 text-gray-400 text-sm">или</span>
          <div className="flex-1 h-px bg-gray-700" />
        </div>

        {/* Steam авторизация */}
        <button
          onClick={handleSteamLogin}
          className="w-full py-2 bg-[#171a21] hover:bg-[#1b2838] rounded-lg font-semibold shadow-lg hover:shadow-gray-700/50 transition duration-300 flex items-center justify-center gap-3"
        >
          <img
            src="https://community.cloudflare.steamstatic.com/public/shared/images/header/logo_steam.svg"
            alt="Steam"
            className="h-5"
          />
          Войти через Steam
        </button>

        <p className="mt-6 text-center text-gray-400 text-sm">
          <Link
            to="/"
            className="text-red-500 hover:underline"
          >
            ← Вернуться на главную
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
