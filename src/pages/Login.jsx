import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import mockUsers from "../data/mockUsers";
import { motion } from "framer-motion";

function ParticlesBackground() {
  return (
    <div className="absolute inset-0 z-0">
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] via-[#121212] to-[#0a0a0a]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(183,28,28,0.15),transparent)]" />
    </div>
  );
}

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    const foundUser = mockUsers.find(
      (u) => u.username === username && u.password === password
    );

    if (foundUser) {
      login(foundUser.username, foundUser.role);
      navigate(foundUser.role === "admin" ? "/admin" : "/user");
    } else {
      setError("Неверный логин или пароль");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#121212] overflow-hidden">
      <ParticlesBackground />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 bg-[#1e1e1e]/90 border border-red-800/40 rounded-2xl p-10 shadow-lg shadow-black/60 w-full max-w-md backdrop-blur-md"
      >
        <h1 className="text-4xl font-extrabold text-center bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent mb-8">
          Вход в DotaHub
        </h1>

        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-400 text-center mb-4"
          >
            {error}
          </motion.p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <motion.input
            type="text"
            placeholder="Логин"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 rounded-lg bg-[#2a2a2a]/80 border border-red-800/30 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-red-500 transition"
            whileFocus={{ scale: 1.02 }}
          />
          <motion.input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-lg bg-[#2a2a2a]/80 border border-red-800/30 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-red-500 transition"
            whileFocus={{ scale: 1.02 }}
          />
          <motion.button
            type="submit"
            className="w-full py-3 rounded-lg font-bold bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 transition duration-300 shadow-lg hover:shadow-red-600/50"
            whileTap={{ scale: 0.97 }}
          >
            Войти
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
