import { useState } from "react";
import API_URL from "../config";
import axios from "axios";

function Contact() {
  const [form, setForm] = useState({
    nama: "",
    email: "",
    telepon: "",
    pesan: "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors = {};

    if (!form.nama.trim()) {
      newErrors.nama = "Nama wajib diisi";
    } else if (form.nama.trim().length < 3) {
      newErrors.nama = "Nama minimal 3 karakter";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email wajib diisi";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Format email tidak valid";
    }

    if (form.telepon && !/^[0-9+\-\s]{8,15}$/.test(form.telepon)) {
      newErrors.telepon = "Format telepon tidak valid";
    }

    if (!form.pesan.trim()) {
      newErrors.pesan = "Pesan wajib diisi";
    } else if (form.pesan.trim().length < 10) {
      newErrors.pesan = "Pesan minimal 10 karakter";
    }

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
      await axios.post(`${API_URL}/api/contacts`, form);
      setStatus({ type: "success", message: "✅ Pesan berhasil dikirim!" });
      setForm({ nama: "", email: "", telepon: "", pesan: "" });
      setErrors({});
    } catch (error) {
      setStatus({
        type: "error",
        message: "❌ Gagal mengirim pesan, coba lagi.",
      });
    }
    setLoading(false);
  };

  return (
    <section id="contact" style={styles.section}>
      <h2 style={styles.title}>Hubungi Kami</h2>
      <div style={styles.container}>
        <div style={styles.info}>
          <div style={styles.infoItem}>
            <span style={styles.icon}>📍</span>
            <div>
              <h4 style={styles.infoTitle}>Alamat</h4>
              <p style={styles.infoText}>
                Jl. Contoh No. 123, Jakarta, Indonesia
              </p>
            </div>
          </div>
          <div style={styles.infoItem}>
            <span style={styles.icon}>📞</span>
            <div>
              <h4 style={styles.infoTitle}>Telepon</h4>
              <p style={styles.infoText}>+62 812 3456 7890</p>
            </div>
          </div>
          <div style={styles.infoItem}>
            <span style={styles.icon}>✉️</span>
            <div>
              <h4 style={styles.infoTitle}>Email</h4>
              <p style={styles.infoText}>info@mycompany.com</p>
            </div>
          </div>
        </div>

        <div style={styles.form}>
          {status && (
            <div
              style={{
                ...styles.alert,
                backgroundColor:
                  status.type === "success" ? "#1a472a" : "#4a1a1a",
              }}
            >
              {status.message}
            </div>
          )}

          <div>
            <input
              style={{
                ...styles.input,
                borderColor: errors.nama ? "#e94560" : "#a8a8b3",
              }}
              type="text"
              name="nama"
              placeholder="Nama Anda"
              value={form.nama}
              onChange={handleChange}
            />
            {errors.nama && <p style={styles.errorText}>⚠️ {errors.nama}</p>}
          </div>

          <div>
            <input
              style={{
                ...styles.input,
                borderColor: errors.email ? "#e94560" : "#a8a8b3",
              }}
              type="email"
              name="email"
              placeholder="Email Anda"
              value={form.email}
              onChange={handleChange}
            />
            {errors.email && <p style={styles.errorText}>⚠️ {errors.email}</p>}
          </div>

          <div>
            <input
              style={{
                ...styles.input,
                borderColor: errors.telepon ? "#e94560" : "#a8a8b3",
              }}
              type="text"
              name="telepon"
              placeholder="Telepon Anda (opsional)"
              value={form.telepon}
              onChange={handleChange}
            />
            {errors.telepon && (
              <p style={styles.errorText}>⚠️ {errors.telepon}</p>
            )}
          </div>

          <div>
            <textarea
              style={{
                ...styles.textarea,
                borderColor: errors.pesan ? "#e94560" : "#a8a8b3",
              }}
              name="pesan"
              placeholder="Pesan Anda"
              rows="5"
              value={form.pesan}
              onChange={handleChange}
            />
            {errors.pesan && <p style={styles.errorText}>⚠️ {errors.pesan}</p>}
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
            {loading ? "Mengirim..." : "Kirim Pesan"}
          </button>
        </div>
      </div>
    </section>
  );
}

const styles = {
  section: {
    padding: "80px 24px",
    backgroundColor: "#0f3460",
    color: "white",
    textAlign: "center",
  },
  title: {
    fontSize: "clamp(28px, 4vw, 36px)",
    fontWeight: "bold",
    marginBottom: "48px",
    color: "#e94560",
  },
  container: {
    display: "flex",
    justifyContent: "center",
    gap: "48px",
    flexWrap: "wrap",
    textAlign: "left",
    maxWidth: "900px",
    margin: "0 auto",
  },
  info: {
    display: "flex",
    flexDirection: "column",
    gap: "32px",
    flex: "1 1 250px",
  },
  infoItem: {
    display: "flex",
    alignItems: "flex-start",
    gap: "16px",
  },
  icon: {
    fontSize: "28px",
  },
  infoTitle: {
    margin: "0 0 4px",
    fontSize: "16px",
    color: "#e94560",
  },
  infoText: {
    margin: 0,
    color: "#a8a8b3",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    flex: "1 1 300px",
    width: "100%",
    maxWidth: "400px",
  },
  alert: {
    padding: "12px 16px",
    borderRadius: "8px",
    color: "white",
    fontSize: "14px",
    textAlign: "center",
  },
  input: {
    padding: "12px 16px",
    borderRadius: "8px",
    border: "1px solid #a8a8b3",
    backgroundColor: "#16213e",
    color: "white",
    fontSize: "14px",
    width: "100%",
    boxSizing: "border-box",
  },
  textarea: {
    padding: "12px 16px",
    borderRadius: "8px",
    border: "1px solid #a8a8b3",
    backgroundColor: "#16213e",
    color: "white",
    fontSize: "14px",
    resize: "vertical",
    width: "100%",
    boxSizing: "border-box",
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
  },
  errorText: {
    color: "#e94560",
    fontSize: "12px",
    margin: "4px 0 0",
  },
};

export default Contact;
