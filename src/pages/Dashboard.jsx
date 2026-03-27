import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_URL from "../config";
import TableSkeleton from "../components/Skeleton";

function Dashboard() {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const admin = JSON.parse(localStorage.getItem("admin") || "{}");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/admin");
      return;
    }
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_URL}/api/contacts`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setContacts(response.data);
      setError(null);
    } catch (error) {
      if (error.response?.status === 401) handleLogout();
      else setError("Gagal mengambil data");
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_URL}/api/contacts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setContacts(contacts.filter((c) => c.id !== id));
      setDeleteId(null);
    } catch {
      alert("Gagal menghapus data");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    navigate("/admin");
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const filtered = contacts.filter(
    (c) =>
      c.nama.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()),
  );

  const totalPages =
    perPage === "all" ? 1 : Math.ceil(filtered.length / perPage);
  const paginated =
    perPage === "all"
      ? filtered
      : filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };
  const handlePerPage = (e) => {
    setPerPage(e.target.value === "all" ? "all" : Number(e.target.value));
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-dark-400">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-dark-100 border-b border-gray-800 px-8 py-4">
        <div className="flex justify-between items-center flex-wrap gap-3">
          <div className="flex items-center gap-4">
            <span className="text-xl font-bold text-primary">MyCompany</span>
            <span className="text-gray-500 text-sm hidden sm:block">
              Admin Panel
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-400 text-sm hidden sm:block">
              👤 {admin.nama || admin.username}
            </span>
            <button
              className="border border-primary text-primary px-4 py-2 rounded-lg text-sm hover:bg-primary hover:text-white transition-all duration-200"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="flex justify-between items-start flex-wrap gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-primary mb-1">
              Data Pesan Masuk
            </h1>
            <p className="text-gray-500 text-sm">
              Menampilkan {paginated.length} dari {filtered.length} pesan
            </p>
          </div>
          <button
            className="border border-primary text-primary px-4 py-2 rounded-lg text-sm hover:bg-primary hover:text-white transition-all duration-200"
            onClick={fetchContacts}
          >
            🔄 Refresh
          </button>
        </div>

        {/* Stats */}
        {!loading && !error && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-dark-100 rounded-xl p-5 border border-gray-800">
              <p className="text-gray-500 text-xs mb-1">Total Pesan</p>
              <p className="text-3xl font-bold text-white">{contacts.length}</p>
            </div>
            <div className="bg-dark-100 rounded-xl p-5 border border-gray-800">
              <p className="text-gray-500 text-xs mb-1">Hari Ini</p>
              <p className="text-3xl font-bold text-primary">
                {
                  contacts.filter((c) => {
                    const today = new Date().toDateString();
                    return new Date(c.created_at).toDateString() === today;
                  }).length
                }
              </p>
            </div>
            <div className="bg-dark-100 rounded-xl p-5 border border-gray-800">
              <p className="text-gray-500 text-xs mb-1">Minggu Ini</p>
              <p className="text-3xl font-bold text-white">
                {
                  contacts.filter((c) => {
                    const weekAgo = new Date();
                    weekAgo.setDate(weekAgo.getDate() - 7);
                    return new Date(c.created_at) >= weekAgo;
                  }).length
                }
              </p>
            </div>
            <div className="bg-dark-100 rounded-xl p-5 border border-gray-800">
              <p className="text-gray-500 text-xs mb-1">Hasil Pencarian</p>
              <p className="text-3xl font-bold text-white">{filtered.length}</p>
            </div>
          </div>
        )}

        {/* Toolbar */}
        <div className="flex flex-wrap gap-4 items-center mb-6">
          <input
            className="input-field flex-1 min-w-[200px] max-w-sm"
            type="text"
            placeholder="🔍 Cari nama atau email..."
            value={search}
            onChange={handleSearch}
          />
          <div className="flex items-center gap-3">
            <label className="text-gray-400 text-sm whitespace-nowrap">
              Tampilkan:
            </label>
            <select
              className="input-field w-auto cursor-pointer"
              value={perPage === "all" ? "all" : perPage}
              onChange={handlePerPage}
            >
              <option value={5}>5 data</option>
              <option value={10}>10 data</option>
              <option value={20}>20 data</option>
              <option value="all">Semua</option>
            </select>
          </div>
        </div>

        {/* States */}
        {loading && <TableSkeleton />}
        {error && (
          <div className="text-center py-20 text-primary">❌ {error}</div>
        )}

        {/* Table */}
        {!loading && !error && (
          <>
            <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-800 mb-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-dark-300">
                    <th className="px-4 py-4 text-left text-primary font-bold whitespace-nowrap">
                      No
                    </th>
                    <th className="px-4 py-4 text-left text-primary font-bold whitespace-nowrap">
                      Nama
                    </th>
                    <th className="px-4 py-4 text-left text-primary font-bold whitespace-nowrap">
                      Email
                    </th>
                    <th className="px-4 py-4 text-left text-primary font-bold whitespace-nowrap">
                      Telepon
                    </th>
                    <th className="px-4 py-4 text-left text-primary font-bold">
                      Pesan
                    </th>
                    <th className="px-4 py-4 text-left text-primary font-bold whitespace-nowrap">
                      Tanggal
                    </th>
                    <th className="px-4 py-4 text-left text-primary font-bold whitespace-nowrap">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginated.length === 0 ? (
                    <tr>
                      <td
                        colSpan="7"
                        className="px-4 py-16 text-center text-gray-500"
                      >
                        📭 Tidak ada data ditemukan
                      </td>
                    </tr>
                  ) : (
                    paginated.map((contact, index) => (
                      <tr
                        key={contact.id}
                        className={`border-t border-gray-800 hover:bg-dark-300 transition-colors ${index % 2 === 0 ? "bg-dark-200" : "bg-dark-100"}`}
                      >
                        <td className="px-4 py-3 text-gray-400">
                          {perPage === "all"
                            ? index + 1
                            : (currentPage - 1) * perPage + index + 1}
                        </td>
                        <td className="px-4 py-3 text-white font-medium">
                          {contact.nama}
                        </td>
                        <td className="px-4 py-3 text-gray-300">
                          {contact.email}
                        </td>
                        <td className="px-4 py-3 text-gray-300">
                          {contact.telepon || "-"}
                        </td>
                        <td className="px-4 py-3 text-gray-300 max-w-xs">
                          <p className="line-clamp-2">{contact.pesan}</p>
                        </td>
                        <td className="px-4 py-3 text-gray-400 whitespace-nowrap">
                          {formatDate(contact.created_at)}
                        </td>
                        <td className="px-4 py-3">
                          <button
                            className="bg-red-900/40 text-red-400 border border-red-800 px-3 py-1.5 rounded-lg text-xs hover:bg-red-800 hover:text-white transition-all duration-200 whitespace-nowrap"
                            onClick={() => setDeleteId(contact.id)}
                          >
                            🗑️ Hapus
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {perPage !== "all" && totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 flex-wrap">
                <button
                  className="px-4 py-2 rounded-lg bg-dark-300 text-gray-400 text-sm hover:bg-dark-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  ← Prev
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${page === currentPage ? "bg-primary text-white" : "bg-dark-300 text-gray-400 hover:bg-dark-200"}`}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                  ),
                )}

                <button
                  className="px-4 py-2 rounded-lg bg-dark-300 text-gray-400 text-sm hover:bg-dark-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                >
                  Next →
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Modal Hapus */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-6">
          <div className="bg-dark-100 rounded-2xl p-8 max-w-md w-full border border-gray-800 shadow-2xl">
            <h3 className="text-xl font-bold text-primary mb-3">
              ⚠️ Konfirmasi Hapus
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Yakin ingin menghapus data ini? Tindakan ini tidak bisa
              dibatalkan.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                className="px-5 py-2.5 rounded-lg border border-gray-600 text-gray-400 text-sm hover:border-gray-400 transition-colors"
                onClick={() => setDeleteId(null)}
              >
                Batal
              </button>
              <button
                className="px-5 py-2.5 rounded-lg bg-primary text-white text-sm font-bold hover:bg-opacity-90 transition-colors"
                onClick={() => handleDelete(deleteId)}
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
