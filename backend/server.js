// server.js
import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;
const JWT_SECRET = "super_secret_key_123"; // В реальном проекте вынести в .env

// Фейковые пользователи (пароли хэшированы)
const users = [
  {
    username: "admin",
    password: bcrypt.hashSync("admin123", 10),
    role: "admin",
  },
  {
    username: "user",
    password: bcrypt.hashSync("user123", 10),
    role: "user",
  },
];

// Логин
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  const foundUser = users.find((u) => u.username === username);
  if (!foundUser) {
    return res.status(401).json({ message: "Неверный логин или пароль" });
  }

  const isPasswordValid = bcrypt.compareSync(password, foundUser.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Неверный логин или пароль" });
  }

  const token = jwt.sign(
    { username: foundUser.username, role: foundUser.role },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({
    token,
    username: foundUser.username,
    role: foundUser.role,
  });
});

// Проверка токена
app.post("/api/verify", (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.json({ valid: false });
  }

  const token = authHeader.split(" ")[1];
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.json({ valid: false });
    }
    res.json({ valid: true, user: decoded });
  });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
