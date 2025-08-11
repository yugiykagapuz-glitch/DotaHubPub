import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-black to-red-900 text-gray-100 shadow-lg border-b border-red-800/30">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Лого */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-3"
        >
          <motion.img
            src="/dota2-logo.png"
            alt="Dota 2 Logo"
            className="w-10 h-10"
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <span className="text-xl font-bold tracking-wide">
            Dota2HubPub
          </span>
        </motion.div>

        {/* Навигация */}
        <nav className="flex gap-6">
          {[
            { label: "Главная", to: "/" },
            { label: "Вход", to: "/login" },
          ].map((item, idx) => (
            <Link
              key={idx}
              to={item.to}
              className="hover:text-red-400 transition duration-300 font-semibold"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
