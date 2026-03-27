import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import BackToTop from "./components/BackToTop";

function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Contact />
      <Footer />
      <BackToTop />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Login />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
