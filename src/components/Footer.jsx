function Footer() {
  return (
    <footer className="bg-dark-100 border-t border-gray-800 py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-2xl font-bold text-primary">MyCompany</div>
        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()} MyCompany. All rights reserved.
        </p>
        <div className="flex gap-6">
          <a
            href="#about"
            className="text-gray-500 hover:text-primary text-sm transition-colors"
          >
            About
          </a>
          <a
            href="#services"
            className="text-gray-500 hover:text-primary text-sm transition-colors"
          >
            Services
          </a>
          <a
            href="#contact"
            className="text-gray-500 hover:text-primary text-sm transition-colors"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
