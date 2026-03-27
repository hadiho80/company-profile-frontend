const serviceList = [
  {
    icon: "🌐",
    title: "Web Development",
    description:
      "Kami membangun website modern, responsif, dan cepat sesuai kebutuhan bisnis Anda.",
  },
  {
    icon: "📱",
    title: "Mobile App",
    description:
      "Aplikasi mobile iOS dan Android yang intuitif dan mudah digunakan.",
  },
  {
    icon: "🎨",
    title: "UI/UX Design",
    description:
      "Desain tampilan yang menarik dan pengalaman pengguna yang menyenangkan.",
  },
  {
    icon: "📈",
    title: "Digital Marketing",
    description:
      "Strategi pemasaran digital untuk meningkatkan brand awareness dan penjualan.",
  },
];

function Services() {
  return (
    <section id="services" style={styles.section}>
      <h2 style={styles.title}>Layanan Kami</h2>
      <div style={styles.container}>
        {serviceList.map((service, index) => (
          <div key={index} style={styles.card}>
            <span style={styles.icon}>{service.icon}</span>
            <h3 style={styles.cardTitle}>{service.title}</h3>
            <p style={styles.cardText}>{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

const styles = {
  section: {
    padding: "80px 24px",
    backgroundColor: "#16213e",
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
    backgroundColor: "#0f3460",
    borderRadius: "12px",
    padding: "32px 24px",
    flex: "1 1 200px",
    maxWidth: "260px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
  },
  icon: {
    fontSize: "40px",
  },
  cardTitle: {
    fontSize: "20px",
    fontWeight: "bold",
    margin: "16px 0 8px",
  },
  cardText: {
    color: "#a8a8b3",
    lineHeight: "1.6",
  },
};

export default Services;
