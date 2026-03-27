import { useState } from "react";
import axios from "axios";
import API_URL from "../config";
import toast from "react-hot-toast";

function Contact() {
  const [form, setForm] = useState({
    nama: "",
    email: "",
    telepon: "",
    pesan: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.nama.trim()) newErrors.nama = "Nama wajib diisi";
    else if (form.nama.trim().length < 3)
      newErrors.nama = "Nama minimal 3 karakter";
    if (!form.email.trim()) newErrors.email = "Email wajib diisi";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Format email tidak valid";
    if (form.telepon && !/^[0-9+\-\s]{8,15}$/.test(form.telepon))
      newErrors.telepon = "Format telepon tidak valid";
    if (!form.pesan.trim()) newErrors.pesan = "Pesan wajib diisi";
    else if (form.pesan.trim().length < 10)
      newErrors.pesan = "Pesan minimal 10 karakter";
    return newErrors;
  };

  const handleSubmit = async () => {
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${API_URL}/api/contacts`, form);
      toast.success("Pesan berhasil dikirim!");
      setForm({ nama: "", email: "", telepon: "", pesan: "" });
      setErrors({});
    } catch {
      toast.error("Gagal mengirim pesan, coba lagi.");
    }
    setLoading(false);
  };

  const contactInfo = [
    {
      icon: "📍",
      title: "Alamat",
      value: "Jl. Contoh No. 123, Jakarta, Indonesia",
    },
    { icon: "📞", title: "Telepon", value: "+62 812 3456 7890" },
    { icon: "✉️", title: "Email", value: "info@mycompany.com" },
  ];

  return (
    <section id="contact" className="py-24 bg-dark-300 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="section-title">Hubungi Kami</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Info */}
          <div className="flex flex-col gap-8 justify-center">
            {contactInfo.map((info, i) => (
              <div key={i} className="flex items-start gap-4">
                <span className="text-3xl">{info.icon}</span>
                <div>
                  <h4 className="text-primary font-semibold mb-1">
                    {info.title}
                  </h4>
                  <p className="text-gray-400">{info.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="flex flex-col gap-4">
            {status && (
              <div
                className={`p-4 rounded-lg text-center text-sm font-medium ${status.type === "success" ? "bg-green-900/50 text-green-400 border border-green-700" : "bg-red-900/50 text-red-400 border border-red-700"}`}
              >
                {status.message}
              </div>
            )}

            <div>
              <input
                className={`input-field ${errors.nama ? "border-primary" : ""}`}
                type="text"
                name="nama"
                placeholder="Nama Anda"
                value={form.nama}
                onChange={handleChange}
              />
              {errors.nama && (
                <p className="text-primary text-xs mt-1">⚠️ {errors.nama}</p>
              )}
            </div>

            <div>
              <input
                className={`input-field ${errors.email ? "border-primary" : ""}`}
                type="email"
                name="email"
                placeholder="Email Anda"
                value={form.email}
                onChange={handleChange}
              />
              {errors.email && (
                <p className="text-primary text-xs mt-1">⚠️ {errors.email}</p>
              )}
            </div>

            <div>
              <input
                className={`input-field ${errors.telepon ? "border-primary" : ""}`}
                type="text"
                name="telepon"
                placeholder="Telepon Anda (opsional)"
                value={form.telepon}
                onChange={handleChange}
              />
              {errors.telepon && (
                <p className="text-primary text-xs mt-1">⚠️ {errors.telepon}</p>
              )}
            </div>

            <div>
              <textarea
                className={`input-field resize-none ${errors.pesan ? "border-primary" : ""}`}
                name="pesan"
                placeholder="Pesan Anda"
                rows="5"
                value={form.pesan}
                onChange={handleChange}
              />
              {errors.pesan && (
                <p className="text-primary text-xs mt-1">⚠️ {errors.pesan}</p>
              )}
            </div>

            <button
              className={`btn-primary w-full ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "⏳ Mengirim..." : "Kirim Pesan"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
