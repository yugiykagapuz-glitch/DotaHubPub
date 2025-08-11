import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";

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

export default function UserDashboard() {
  const sections = [
    {
      title: "Мои матчи",
      desc: "Статистика и результаты твоих последних игр.",
      icon: "🎮"
    },
    {
      title: "Друзья",
      desc: "Список друзей и их активность.",
      icon: "👥"
    },
    {
      title: "Новости Dota 2",
      desc: "Последние патчи, турниры и обновления.",
      icon: "📰"
    }
  ];

  return (
    <div className="bg-[#121212] text-gray-100 min-h-screen relative overflow-hidden">
      <ParticlesBackground />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(183,28,28,0.15),transparent)] z-0" />

      <section className="relative z-10 max-w-6xl mx-auto py-16 px-6">
        <motion.h1
          className="text-4xl md:text-5xl font-extrabold text-center bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent drop-shadow-lg"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Личный кабинет DotaHub
        </motion.h1>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {sections.map((sec, i) => (
            <motion.div
              key={i}
              className="bg-[#1e1e1e] rounded-lg p-6 shadow-lg hover:shadow-red-600/50 border border-red-800/30 transition transform hover:scale-105"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
            >
              <div className="text-5xl mb-4">{sec.icon}</div>
              <h3 className="text-2xl font-bold text-red-500">{sec.title}</h3>
              <p className="mt-2 text-gray-400">{sec.desc}</p>
              <Link
                to="#"
                className="inline-block mt-4 px-6 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm font-semibold shadow-lg hover:shadow-red-600/50 transition duration-300"
              >
                Перейти
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
