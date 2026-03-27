import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API_URL from "../config";
import axios from "axios";

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
    } catch (error) {
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

  // Filter pencarian
  const filtered = contacts.filter(
    (c) =>
      c.nama.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()),
  );

  // Hitung pagination
  const totalPages =
    perPage === "all" ? 1 : Math.ceil(filtered.length / perPage);
  const paginated =
    perPage === "all"
      ? filtered
      : filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

  // Reset ke halaman 1 saat search atau perPage berubah
  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handlePerPage = (e) => {
    setPerPage(e.target.value === "all" ? "all" : Number(e.target.value));
    setCurrentPage(1);
  };

  return (
    <div style={styles.page}>
      {/* Navbar */}
      <nav style={styles.navbar}>
        <div style={styles.navLeft}>
          <span style={styles.logo}>MyCompany</span>
          <span style={styles.navTitle}>Admin Panel</span>
        </div>
        <div style={styles.navRight}>
          <span style={styles.adminName}>
            👤 {admin.nama || admin.username}
          </span>
          <button style={styles.logoutBtn} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

      {/* Content */}
      <div style={styles.content}>
        <div style={styles.pageHeader}>
          <div>
            <h1 style={styles.title}>Data Pesan Masuk</h1>
            <p style={styles.subtitle}>
              Menampilkan {paginated.length} dari {filtered.length} pesan
            </p>
          </div>
          <button style={styles.refreshBtn} onClick={fetchContacts}>
            🔄 Refresh
          </button>
        </div>

        {/* Toolbar */}
        <div style={styles.toolbar}>
          <input
            style={styles.search}
            type="text"
            placeholder="🔍 Cari nama atau email..."
            value={search}
            onChange={handleSearch}
          />

          <div style={styles.perPageWrapper}>
            <label style={styles.perPageLabel}>Tampilkan:</label>
            <select
              style={styles.select}
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

        {loading && <p style={styles.info}>⏳ Memuat data...</p>}
        {error && <p style={styles.errorText}>❌ {error}</p>}

        {!loading && !error && (
          <>
            <div style={styles.tableWrapper}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>No</th>
                    <th style={styles.th}>Nama</th>
                    <th style={styles.th}>Email</th>
                    <th style={styles.th}>Telepon</th>
                    <th style={styles.th}>Pesan</th>
                    <th style={styles.th}>Tanggal</th>
                    <th style={styles.th}>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {paginated.length === 0 ? (
                    <tr>
                      <td
                        colSpan="7"
                        style={{
                          ...styles.td,
                          textAlign: "center",
                          color: "#a8a8b3",
                        }}
                      >
                        📭 Tidak ada data ditemukan
                      </td>
                    </tr>
                  ) : (
                    paginated.map((contact, index) => (
                      <tr
                        key={contact.id}
                        style={{
                          backgroundColor:
                            index % 2 === 0 ? "#16213e" : "#1a2550",
                        }}
                      >
                        <td style={styles.td}>
                          {perPage === "all"
                            ? index + 1
                            : (currentPage - 1) * perPage + index + 1}
                        </td>
                        <td style={styles.td}>{contact.nama}</td>
                        <td style={styles.td}>{contact.email}</td>
                        <td style={styles.td}>{contact.telepon || "-"}</td>
                        <td style={{ ...styles.td, maxWidth: "220px" }}>
                          <p style={styles.pesanText}>{contact.pesan}</p>
                        </td>
                        <td style={{ ...styles.td, whiteSpace: "nowrap" }}>
                          {formatDate(contact.created_at)}
                        </td>
                        <td style={styles.td}>
                          <button
                            style={styles.deleteBtn}
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
              <div style={styles.pagination}>
                <button
                  style={{
                    ...styles.pageBtn,
                    opacity: currentPage === 1 ? 0.4 : 1,
                    cursor: currentPage === 1 ? "not-allowed" : "pointer",
                  }}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  ← Prev
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      style={{
                        ...styles.pageBtn,
                        backgroundColor:
                          page === currentPage ? "#e94560" : "#0f3460",
                        fontWeight: page === currentPage ? "bold" : "normal",
                      }}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                  ),
                )}

                <button
                  style={{
                    ...styles.pageBtn,
                    opacity: currentPage === totalPages ? 0.4 : 1,
                    cursor:
                      currentPage === totalPages ? "not-allowed" : "pointer",
                  }}
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

      {/* Modal Konfirmasi Hapus */}
      {deleteId && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h3 style={styles.modalTitle}>⚠️ Konfirmasi Hapus</h3>
            <p style={styles.modalText}>
              Yakin ingin menghapus data ini? Tindakan ini tidak bisa
              dibatalkan.
            </p>
            <div style={styles.modalButtons}>
              <button
                style={styles.cancelBtn}
                onClick={() => setDeleteId(null)}
              >
                Batal
              </button>
              <button
                style={styles.confirmBtn}
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

const styles = {
  page: { minHeight: "100vh", backgroundColor: "#0f0f23", color: "white" },
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 32px",
    backgroundColor: "#1a1a2e",
    borderBottom: "1px solid #2a2a4a",
    flexWrap: "wrap",
    gap: "12px",
    position: "sticky",
    top: 0,
    zIndex: 999,
  },
  navLeft: { display: "flex", alignItems: "center", gap: "16px" },
  logo: { color: "#e94560", fontSize: "20px", fontWeight: "bold" },
  navTitle: { color: "#a8a8b3", fontSize: "14px" },
  navRight: { display: "flex", alignItems: "center", gap: "16px" },
  adminName: { color: "#a8a8b3", fontSize: "14px" },
  logoutBtn: {
    backgroundColor: "transparent",
    border: "1px solid #e94560",
    color: "#e94560",
    padding: "8px 16px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "13px",
  },
  content: { padding: "32px", maxWidth: "1200px", margin: "0 auto" },
  pageHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "24px",
    flexWrap: "wrap",
    gap: "16px",
  },
  title: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#e94560",
    margin: "0 0 4px",
  },
  subtitle: { color: "#a8a8b3", fontSize: "14px", margin: 0 },
  refreshBtn: {
    backgroundColor: "#0f3460",
    color: "white",
    padding: "10px 20px",
    borderRadius: "8px",
    border: "1px solid #e94560",
    cursor: "pointer",
    fontSize: "14px",
  },
  toolbar: {
    display: "flex",
    gap: "16px",
    alignItems: "center",
    flexWrap: "wrap",
    marginBottom: "24px",
  },
  search: {
    padding: "12px 16px",
    borderRadius: "8px",
    border: "1px solid #2a2a4a",
    backgroundColor: "#1a1a2e",
    color: "white",
    fontSize: "14px",
    flex: "1 1 250px",
    maxWidth: "400px",
    boxSizing: "border-box",
  },
  perPageWrapper: { display: "flex", alignItems: "center", gap: "10px" },
  perPageLabel: { color: "#a8a8b3", fontSize: "14px", whiteSpace: "nowrap" },
  select: {
    padding: "10px 14px",
    borderRadius: "8px",
    border: "1px solid #2a2a4a",
    backgroundColor: "#1a1a2e",
    color: "white",
    fontSize: "14px",
    cursor: "pointer",
  },
  tableWrapper: {
    overflowX: "auto",
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
    marginBottom: "24px",
  },
  table: { width: "100%", borderCollapse: "collapse", fontSize: "14px" },
  th: {
    backgroundColor: "#0f3460",
    color: "#e94560",
    padding: "14px 16px",
    textAlign: "left",
    fontWeight: "bold",
    whiteSpace: "nowrap",
  },
  td: {
    padding: "12px 16px",
    color: "#d0d0d0",
    borderBottom: "1px solid #0f3460",
    verticalAlign: "top",
  },
  pesanText: {
    margin: 0,
    overflow: "hidden",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    maxWidth: "220px",
  },
  deleteBtn: {
    backgroundColor: "#4a1a1a",
    color: "#ff6b6b",
    border: "1px solid #e94560",
    padding: "6px 12px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "12px",
    whiteSpace: "nowrap",
  },
  pagination: {
    display: "flex",
    justifyContent: "center",
    gap: "8px",
    flexWrap: "wrap",
    marginTop: "8px",
  },
  pageBtn: {
    backgroundColor: "#0f3460",
    color: "white",
    border: "1px solid #2a2a4a",
    padding: "8px 14px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "13px",
  },
  info: { color: "#a8a8b3", textAlign: "center", marginTop: "40px" },
  errorText: { color: "#e94560", textAlign: "center", marginTop: "40px" },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.7)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
  },
  modal: {
    backgroundColor: "#1a1a2e",
    borderRadius: "16px",
    padding: "32px",
    maxWidth: "400px",
    width: "90%",
    border: "1px solid #2a2a4a",
    boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
  },
  modalTitle: { color: "#e94560", fontSize: "20px", margin: "0 0 12px" },
  modalText: {
    color: "#a8a8b3",
    fontSize: "14px",
    lineHeight: "1.6",
    margin: "0 0 24px",
  },
  modalButtons: { display: "flex", gap: "12px", justifyContent: "flex-end" },
  cancelBtn: {
    backgroundColor: "transparent",
    border: "1px solid #a8a8b3",
    color: "#a8a8b3",
    padding: "10px 20px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
  },
  confirmBtn: {
    backgroundColor: "#e94560",
    border: "none",
    color: "white",
    padding: "10px 20px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "bold",
  },
};

export default Dashboard;
