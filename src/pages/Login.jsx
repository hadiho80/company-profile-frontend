import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_URL from "../config";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.username.trim()) newErrors.username = "Username wajib diisi";
    if (!form.password.trim()) newErrors.password = "Password wajib diisi";
    return newErrors;
  };

  const handleSubmit = async () => {
    setStatus(null);
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, form);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("admin", JSON.stringify(response.data.admin));
      navigate("/admin/dashboard");
    } catch (error) {
      setStatus(error.response?.data?.message || "Login gagal, coba lagi");
    }
    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <div className="min-h-screen bg-dark-400 flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-dark-100 rounded-2xl p-10 shadow-2xl border border-gray-800">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">MyCompany</h1>
          <h2 className="text-xl font-semibold text-white mb-1">Admin Panel</h2>
          <p className="text-gray-500 text-sm">Masuk untuk mengelola data</p>
        </div>

        {/* Alert */}
        {status && (
          <div className="bg-red-900/50 border border-red-700 text-red-400 px-4 py-3 rounded-lg text-sm text-center mb-6">
            ❌ {status}
          </div>
        )}

        {/* Form */}
        <div className="flex flex-col gap-5">
          <div>
            <label className="block text-gray-400 text-sm font-semibold mb-2">
              Username
            </label>
            <input
              className={`input-field ${errors.username ? "border-primary" : ""}`}
              type="text"
              name="username"
              placeholder="Masukkan username"
              value={form.username}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              autoFocus
            />
            {errors.username && (
              <p className="text-primary text-xs mt-1">⚠️ {errors.username}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-400 text-sm font-semibold mb-2">
              Password
            </label>
            <div className="relative">
              <input
                className={`input-field pr-12 ${errors.password ? "border-primary" : ""}`}
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Masukkan password"
                value={form.password}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
              />
              <button
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                onClick={() => setShowPassword(!showPassword)}
                type="button"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
            {errors.password && (
              <p className="text-primary text-xs mt-1">⚠️ {errors.password}</p>
            )}
          </div>

          <button
            className={`btn-primary w-full mt-2 ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "⏳ Memproses..." : "🔐 Login"}
          </button>

          <a
            href="/"
            className="text-gray-500 hover:text-primary text-sm text-center transition-colors"
          >
            ← Kembali ke Halaman Utama
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;
