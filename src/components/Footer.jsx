import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-black to-red-900 text-gray-400 border-t border-red-800/30">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Текст */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          © {new Date().getFullYear()} Dota2 Stream Hub. Все права защищены.
        </motion.p>

        {/* Ссылки */}
        <div className="flex gap-4">
          {["VK", "YouTube", "Discord"].map((platform, idx) => (
            <motion.a
              key={idx}
              href="#"
              whileHover={{ scale: 1.1 }}
              className="hover:text-red-400 transition duration-300"
            >
              {platform}
            </motion.a>
          ))}
        </div>
      </div>
    </footer>
  );
}
