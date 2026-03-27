import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API_URL from "../config";
import axios from "axios";

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
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.logo}>MyCompany</h1>
          <h2 style={styles.title}>Admin Panel</h2>
          <p style={styles.subtitle}>Masuk untuk mengelola data</p>
        </div>

        {status && <div style={styles.alert}>❌ {status}</div>}

        <div style={styles.form}>
          <div>
            <label style={styles.label}>Username</label>
            <input
              style={{
                ...styles.input,
                borderColor: errors.username ? "#e94560" : "#2a2a4a",
              }}
              type="text"
              name="username"
              placeholder="Masukkan username"
              value={form.username}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              autoFocus
            />
            {errors.username && (
              <p style={styles.errorText}>⚠️ {errors.username}</p>
            )}
          </div>

          <div>
            <label style={styles.label}>Password</label>
            <div style={styles.passwordWrapper}>
              <input
                style={{
                  ...styles.input,
                  borderColor: errors.password ? "#e94560" : "#2a2a4a",
                  paddingRight: "48px",
                }}
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Masukkan password"
                value={form.password}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
              />
              <button
                style={styles.eyeButton}
                onClick={() => setShowPassword(!showPassword)}
                type="button"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
            {errors.password && (
              <p style={styles.errorText}>⚠️ {errors.password}</p>
            )}
          </div>

          <button
            style={{
              ...styles.button,
              opacity: loading ? 0.7 : 1,
              cursor: loading ? "not-allowed" : "pointer",
            }}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "⏳ Memproses..." : "🔐 Login"}
          </button>

          <a href="/" style={styles.backLink}>
            ← Kembali ke Halaman Utama
          </a>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#0f0f23",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px",
  },
  card: {
    backgroundColor: "#1a1a2e",
    borderRadius: "16px",
    padding: "48px 40px",
    width: "100%",
    maxWidth: "420px",
    boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
    border: "1px solid #2a2a4a",
  },
  header: {
    textAlign: "center",
    marginBottom: "32px",
  },
  logo: {
    color: "#e94560",
    fontSize: "28px",
    fontWeight: "bold",
    margin: "0 0 8px",
  },
  title: {
    color: "white",
    fontSize: "20px",
    margin: "0 0 8px",
  },
  subtitle: {
    color: "#a8a8b3",
    fontSize: "14px",
    margin: 0,
  },
  alert: {
    backgroundColor: "#4a1a1a",
    color: "#ff6b6b",
    padding: "12px 16px",
    borderRadius: "8px",
    fontSize: "14px",
    marginBottom: "16px",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  label: {
    display: "block",
    color: "#a8a8b3",
    fontSize: "13px",
    marginBottom: "8px",
    fontWeight: "bold",
  },
  input: {
    padding: "12px 16px",
    borderRadius: "8px",
    border: "1px solid #2a2a4a",
    backgroundColor: "#0f0f23",
    color: "white",
    fontSize: "14px",
    width: "100%",
    boxSizing: "border-box",
    outline: "none",
  },
  passwordWrapper: {
    position: "relative",
  },
  eyeButton: {
    position: "absolute",
    right: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    padding: 0,
  },
  button: {
    backgroundColor: "#e94560",
    color: "white",
    padding: "14px",
    borderRadius: "8px",
    border: "none",
    fontSize: "16px",
    fontWeight: "bold",
    width: "100%",
    marginTop: "8px",
  },
  errorText: {
    color: "#e94560",
    fontSize: "12px",
    margin: "4px 0 0",
  },
  backLink: {
    color: "#a8a8b3",
    textDecoration: "none",
    fontSize: "13px",
    textAlign: "center",
    display: "block",
  },
};

export default Login;
