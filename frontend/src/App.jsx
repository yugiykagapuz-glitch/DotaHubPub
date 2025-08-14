import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import SteamLoginSuccess from "./pages/SteamLoginSuccess"; // ✅ добавили импорт

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />

            <Route
              path="/admin"
              element={
                <ProtectedRoute role="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/userdashboard"
              element={
                <ProtectedRoute role="user">
                  <UserDashboard />
                </ProtectedRoute>
              }
            />

            {/* ✅ Маршрут для Steam авторизации */}
            <Route path="/SteamLoginSuccess" element={<SteamLoginSuccess />} />
          </Routes>
        </main>
        <Footer />
      </AuthProvider>
    </Router>
  );
}
