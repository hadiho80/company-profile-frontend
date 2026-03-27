import { useState } from "react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-dark-100 border-b border-gray-800">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-primary">MyCompany</div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 list-none">
          <li>
            <a
              href="#about"
              className="text-gray-300 hover:text-primary transition-colors duration-200"
            >
              About
            </a>
          </li>
          <li>
            <a
              href="#services"
              className="text-gray-300 hover:text-primary transition-colors duration-200"
            >
              Services
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className="text-gray-300 hover:text-primary transition-colors duration-200"
            >
              Contact
            </a>
          </li>
          <li>
            <a
              href="/admin"
              className="text-gray-300 hover:text-primary transition-colors duration-200"
            >
              Admin
            </a>
          </li>
        </ul>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-white text-2xl focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-dark-100 border-t border-gray-800 px-6 py-4">
          <ul className="flex flex-col gap-4 list-none">
            <li>
              <a
                href="#about"
                className="text-gray-300 hover:text-primary transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#services"
                className="text-gray-300 hover:text-primary transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="text-gray-300 hover:text-primary transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                Contact
              </a>
            </li>
            <li>
              <a
                href="/admin"
                className="text-gray-300 hover:text-primary transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                Admin
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
