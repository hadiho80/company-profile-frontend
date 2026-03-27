function About() {
  return (
    <section id="about" style={styles.section}>
      <h2 style={styles.title}>Tentang Kami</h2>
      <div style={styles.container}>
        <div style={styles.card}>
          <span style={styles.icon}>🏢</span>
          <h3>Siapa Kami</h3>
          <p style={styles.text}>
            MyCompany adalah perusahaan yang berdedikasi memberikan layanan
            terbaik sejak 2010.
          </p>
        </div>
        <div style={styles.card}>
          <span style={styles.icon}>🎯</span>
          <h3>Visi Kami</h3>
          <p style={styles.text}>
            Menjadi perusahaan terpercaya dan terdepan dalam industri di seluruh
            Indonesia.
          </p>
        </div>
        <div style={styles.card}>
          <span style={styles.icon}>💡</span>
          <h3>Misi Kami</h3>
          <p style={styles.text}>
            Menghadirkan solusi inovatif yang membantu klien berkembang dan
            sukses.
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-container {
            flex-direction: column !important;
            align-items: center !important;
          }
          .about-card {
            width: 100% !important;
            max-width: 340px !important;
          }
        }
      `}</style>
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
    gap: "24px",
    flexWrap: "wrap",
  },
  card: {
    backgroundColor: "#16213e",
    borderRadius: "12px",
    padding: "32px 24px",
    width: "260px",
    flex: "1 1 240px",
    maxWidth: "300px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
  },
  icon: {
    fontSize: "40px",
  },
  text: {
    color: "#a8a8b3",
    lineHeight: "1.6",
  },
};

export default About;
