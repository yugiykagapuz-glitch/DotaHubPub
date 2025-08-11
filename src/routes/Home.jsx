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

export default function Home() {
  return (
    <div className="bg-[#121212] text-gray-100 min-h-screen relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-start text-center px-4 pt-8">
        {/* Фоновые эффекты */}
        <ParticlesBackground />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(183,28,28,0.2),transparent)] animate-pulse z-0" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent drop-shadow-lg">
            Dota 2 Стриминг нового уровня
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto text-gray-300">
            Интеграция с OBS, мощные рандомайзеры и ежемесячные ивенты —
            сделай свой стрим эпичным!
          </p>
          <Link
            to="/login"
            className="inline-block mt-8 px-8 py-3 bg-red-600 hover:bg-red-700 rounded-lg text-lg font-semibold shadow-lg hover:shadow-red-600/50 transition duration-300"
          >
            Начать
          </Link>
        </motion.div>
      </section>

      {/* Features */}
      <section className="py-8 px-6 max-w-6xl mx-auto grid gap-8 md:grid-cols-3 relative z-10">
        {[
          {
            title: "Интеграция с OBS",
            icon: "🎥",
            desc: "Лёгкая настройка и прямое подключение к OBS для безупречных стримов."
          },
          {
            title: "Рандомайзер",
            icon: "🎲",
            desc: "Случайные события и челленджи для максимального фана и вовлечения зрителей."
          },
          {
            title: "Ежемесячные ивенты",
            icon: "🎉",
            desc: "Участвуй в глобальных стримерских битвах и выигрывай призы."
          }
        ].map((feat, i) => (
          <motion.div
            key={i}
            className="bg-[#1e1e1e] rounded-lg p-6 shadow-lg hover:shadow-red-600/50 border border-red-800/30 transition transform hover:scale-105"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.2 }}
            viewport={{ once: true }}
          >
            <div className="text-5xl mb-4">{feat.icon}</div>
            <h3 className="text-2xl font-bold text-red-500">{feat.title}</h3>
            <p className="mt-2 text-gray-400">{feat.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* Call To Action */}
      <section className="bg-gradient-to-r from-red-900 to-black py-8 text-center relative z-10">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Врывайся в битву стримеров!
        </motion.h2>
        <Link
          to="/login"
          className="px-10 py-4 bg-red-600 hover:bg-red-700 rounded-lg text-lg font-semibold shadow-lg hover:shadow-red-600/50 transition duration-300"
        >
          Присоединиться
        </Link>
      </section>
    </div>
  );
}
