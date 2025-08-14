import React, { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext(null); // ✅ экспортируем явно

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Автовход, если токен уже есть в localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch("http://localhost:5000/api/user/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.ok ? res.json() : null)
        .then((data) => {
          if (data) setUser(data);
        })
        .catch((err) => console.error("Ошибка при автологине:", err));
    }
  }, []);

  const login = (token) => {
    if (!token) return;
    localStorage.setItem("token", token);
    fetch("http://localhost:5000/api/user/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.ok ? res.json() : null)
      .then((data) => {
        if (data) setUser(data);
      })
      .catch((err) => console.error("Ошибка при входе:", err));
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext); // ✅ удобный хук
