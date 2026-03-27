const aboutData = [
  {
    icon: "🏢",
    title: "Siapa Kami",
    description:
      "MyCompany adalah perusahaan yang berdedikasi memberikan layanan terbaik sejak 2010.",
  },
  {
    icon: "🎯",
    title: "Visi Kami",
    description:
      "Menjadi perusahaan terpercaya dan terdepan dalam industri di seluruh Indonesia.",
  },
  {
    icon: "💡",
    title: "Misi Kami",
    description:
      "Menghadirkan solusi inovatif yang membantu klien berkembang dan sukses.",
  },
];

function About() {
  return (
    <section id="about" className="py-24 bg-dark-300 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="section-title">Tentang Kami</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {aboutData.map((item, index) => (
            <div key={index} className="card text-center">
              <span className="text-5xl block mb-4">{item.icon}</span>
              <h3 className="text-xl font-bold text-white mb-3">
                {item.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default About;
