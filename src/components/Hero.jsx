import { motion } from "framer-motion";

function Hero() {
  return (
    <section className="min-h-screen bg-dark-200 flex flex-col items-center justify-center text-center px-6">
      <motion.p
        className="text-primary font-semibold tracking-widest uppercase text-sm mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Selamat Datang
      </motion.p>
      <motion.h1
        className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        Solusi Digital untuk <br />
        <span className="text-primary">Bisnis Anda</span>
      </motion.h1>
      <motion.p
        className="text-gray-400 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Kami hadir untuk memberikan layanan web development, mobile app, dan
        digital marketing terbaik bagi bisnis Anda.
      </motion.p>
      <motion.div
        className="flex flex-col sm:flex-row gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <a href="#services" className="btn-primary">
          Lihat Layanan
        </a>
        <a
          href="#contact"
          className="px-8 py-3 rounded-lg border border-primary text-primary font-bold hover:bg-primary hover:text-white transition-all duration-300"
        >
          Hubungi Kami
        </a>
      </motion.div>
    </section>
  );
}

export default Hero;
