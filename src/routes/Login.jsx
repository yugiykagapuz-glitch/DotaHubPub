import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useRef, useEffect } from "react";

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

    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        dx: (Math.random() - 0.5) * 0.3,
        dy: (Math.random() - 0.5) * 0.3
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(255, 0, 0, 0.8)";
      particles.forEach(p => {
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

export default function Login() {
  return (
    <div className="relative flex items-center justify-center min-h-screen bg-[#121212] overflow-hidden">
      {/* Фоновые частицы */}
      <ParticlesBackground />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(183,28,28,0.15),transparent)] z-0" />

      {/* Форма */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-[#1e1e1e] border border-red-800/30 rounded-xl shadow-lg shadow-red-900/30 p-8 w-full max-w-md relative z-10"
      >
        <h1 className="text-3xl font-bold text-center text-red-500 mb-6">
          Вход в Dota2Stream
        </h1>
        <form className="space-y-5">
          <div>
            <label className="block mb-2 text-gray-300">Email</label>
            <input
              type="email"
              className="w-full p-3 rounded-lg bg-[#0d0d0d] border border-red-800/40 focus:border-red-500 focus:ring-2 focus:ring-red-600 outline-none text-gray-200"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block mb-2 text-gray-300">Пароль</label>
            <input
              type="password"
              className="w-full p-3 rounded-lg bg-[#0d0d0d] border border-red-800/40 focus:border-red-500 focus:ring-2 focus:ring-red-600 outline-none text-gray-200"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold shadow-lg hover:shadow-red-600/50 transition duration-300"
          >
            Войти
          </button>
        </form>
        <p className="mt-6 text-center text-gray-400">
          Нет аккаунта?{" "}
          <Link to="/" className="text-red-500 hover:underline">
            Вернуться на главную
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
