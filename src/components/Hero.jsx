function Hero() {
  return (
    <section style={styles.section}>
      <h1 style={styles.title}>Selamat Datang di MyCompany</h1>
      <p style={styles.subtitle}>
        Kami hadir untuk memberikan solusi terbaik bagi bisnis Anda
      </p>
      <a href="#contact" style={styles.button}>
        Hubungi Kami
      </a>

      <style>{`
        @media (max-width: 600px) {
          .hero-title { font-size: 28px !important; }
          .hero-subtitle { font-size: 16px !important; }
          .hero-section { padding: 0 16px !important; }
        }
      `}</style>
    </section>
  );
}

const styles = {
  section: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "90vh",
    backgroundColor: "#16213e",
    color: "white",
    textAlign: "center",
    padding: "40px 20px",
  },
  title: {
    fontSize: "clamp(28px, 5vw, 48px)",
    fontWeight: "bold",
    marginBottom: "16px",
    color: "#e94560",
  },
  subtitle: {
    fontSize: "clamp(16px, 2.5vw, 20px)",
    marginBottom: "32px",
    color: "#a8a8b3",
    maxWidth: "600px",
  },
  button: {
    backgroundColor: "#e94560",
    color: "white",
    padding: "14px 32px",
    borderRadius: "8px",
    textDecoration: "none",
    fontSize: "16px",
    fontWeight: "bold",
  },
};

export default Hero;
