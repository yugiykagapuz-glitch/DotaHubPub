import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useRef } from "react";

function ParticlesBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let particles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        dx: (Math.random() - 0.5) * 0.3,
        dy: (Math.random() - 0.5) * 0.3,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(255, 0, 0, 0.8)";
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        p.x += p.dx;
        p.y += p.dy;

        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
      });
      requestAnimationFrame(draw);
    };

    draw();
    return () => window.removeEventListener("resize", resize);
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0" />;
}

export default function SteamLoginSuccess() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      login(token);

      // Получаем роль пользователя и перенаправляем
      fetch("http://localhost:5000/api/user/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((userData) => {
          setTimeout(() => {
            if (userData.role === "admin") {
              navigate("/admin");
            } else {
              navigate("/userdashboard");
            }
          }, 1500); // задержка для анимации
        });
    }
  }, [searchParams, login, navigate]);

  return (
    <div className="bg-[#121212] text-gray-100 min-h-screen flex items-center justify-center relative overflow-hidden">
      <ParticlesBackground />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(183,28,28,0.2),transparent)] animate-pulse z-0" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 text-center"
      >
        <h1 className="text-4xl font-bold text-red-500 mb-4">
          Успешный вход через Steam
        </h1>
        <p className="text-gray-300 text-lg">
          Перенаправляем вас в личный кабинет...
        </p>

        <motion.div
          className="mt-6 w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full mx-auto animate-spin"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1 }}
        />
      </motion.div>
    </div>
  );
}
