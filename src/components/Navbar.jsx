function Navbar() {
  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>MyCompany</div>
      <ul style={styles.menu}>
        <li>
          <a href="#about" style={styles.link}>
            About
          </a>
        </li>
        <li>
          <a href="#services" style={styles.link}>
            Services
          </a>
        </li>
        <li>
          <a href="#contact" style={styles.link}>
            Contact
          </a>
        </li>
      </ul>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 40px",
    backgroundColor: "#1a1a2e",
    color: "white",
    flexWrap: "wrap",
    gap: "16px",
    position: "sticky",
    top: 0,
    zIndex: 999,
  },
  logo: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#e94560",
  },
  menu: {
    display: "flex",
    listStyle: "none",
    gap: "24px",
    margin: 0,
    padding: 0,
    flexWrap: "wrap",
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "15px",
  },
};

export default Navbar;
