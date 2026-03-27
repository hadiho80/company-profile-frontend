function Hero() {
  return (
    <section className="min-h-screen bg-dark-200 flex flex-col items-center justify-center text-center px-6">
      <p className="text-primary font-semibold tracking-widest uppercase text-sm mb-4">
        Selamat Datang
      </p>
      <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
        Solusi Digital untuk <br />
        <span className="text-primary">Bisnis Anda</span>
      </h1>
      <p className="text-gray-400 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed">
        Kami hadir untuk memberikan layanan web development, mobile app, dan
        digital marketing terbaik bagi bisnis Anda.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <a href="#services" className="btn-primary">
          Lihat Layanan
        </a>
        <a
          href="#contact"
          className="px-8 py-3 rounded-lg border border-primary text-primary font-bold hover:bg-primary hover:text-white transition-all duration-300"
        >
          Hubungi Kami
        </a>
      </div>
    </section>
  );
}

export default Hero;
