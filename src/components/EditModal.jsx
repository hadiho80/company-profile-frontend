import { useState, useEffect } from "react";

function EditModal({ contact, onClose, onSave }) {
  const [form, setForm] = useState({
    nama: "",
    email: "",
    telepon: "",
    pesan: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (contact) {
      setForm({
        nama: contact.nama || "",
        email: contact.email || "",
        telepon: contact.telepon || "",
        pesan: contact.pesan || "",
      });
    }
  }, [contact]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.nama.trim()) newErrors.nama = "Nama wajib diisi";
    if (!form.email.trim()) newErrors.email = "Email wajib diisi";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Format email tidak valid";
    if (form.telepon && !/^[0-9+\-\s]{8,15}$/.test(form.telepon))
      newErrors.telepon = "Format telepon tidak valid";
    if (!form.pesan.trim()) newErrors.pesan = "Pesan wajib diisi";
    return newErrors;
  };

  const handleSubmit = async () => {
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setLoading(true);
    await onSave(contact.id, form);
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-6">
      <div className="bg-dark-100 rounded-2xl p-8 max-w-lg w-full border border-gray-800 shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-primary">✏️ Edit Data</h3>
          <button
            className="text-gray-500 hover:text-white text-2xl transition-colors"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-gray-400 text-sm font-semibold mb-2">
              Nama
            </label>
            <input
              className={`input-field ${errors.nama ? "border-primary" : ""}`}
              type="text"
              name="nama"
              value={form.nama}
              onChange={handleChange}
              placeholder="Nama lengkap"
            />
            {errors.nama && (
              <p className="text-primary text-xs mt-1">⚠️ {errors.nama}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-400 text-sm font-semibold mb-2">
              Email
            </label>
            <input
              className={`input-field ${errors.email ? "border-primary" : ""}`}
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
            />
            {errors.email && (
              <p className="text-primary text-xs mt-1">⚠️ {errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-400 text-sm font-semibold mb-2">
              Telepon
            </label>
            <input
              className={`input-field ${errors.telepon ? "border-primary" : ""}`}
              type="text"
              name="telepon"
              value={form.telepon}
              onChange={handleChange}
              placeholder="Telepon (opsional)"
            />
            {errors.telepon && (
              <p className="text-primary text-xs mt-1">⚠️ {errors.telepon}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-400 text-sm font-semibold mb-2">
              Pesan
            </label>
            <textarea
              className={`input-field resize-none ${errors.pesan ? "border-primary" : ""}`}
              name="pesan"
              value={form.pesan}
              onChange={handleChange}
              placeholder="Pesan"
              rows="4"
            />
            {errors.pesan && (
              <p className="text-primary text-xs mt-1">⚠️ {errors.pesan}</p>
            )}
          </div>

          <div className="flex gap-3 justify-end mt-2">
            <button
              className="px-5 py-2.5 rounded-lg border border-gray-600 text-gray-400 text-sm hover:border-gray-400 transition-colors"
              onClick={onClose}
            >
              Batal
            </button>
            <button
              className={`btn-primary px-5 py-2.5 text-sm ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "⏳ Menyimpan..." : "💾 Simpan"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditModal;
