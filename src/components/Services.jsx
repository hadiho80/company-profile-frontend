import { motion } from "framer-motion";

const serviceList = [
  {
    icon: "🌐",
    title: "Web Development",
    description:
      "Kami membangun website modern, responsif, dan cepat sesuai kebutuhan bisnis Anda.",
    tags: ["React", "Node.js", "MySQL"],
  },
  {
    icon: "📱",
    title: "Mobile App",
    description:
      "Aplikasi mobile iOS dan Android yang intuitif dan mudah digunakan.",
    tags: ["React Native", "Flutter"],
  },
  {
    icon: "🎨",
    title: "UI/UX Design",
    description:
      "Desain tampilan yang menarik dan pengalaman pengguna yang menyenangkan.",
    tags: ["Figma", "Prototype"],
  },
  {
    icon: "📈",
    title: "Digital Marketing",
    description:
      "Strategi pemasaran digital untuk meningkatkan brand awareness dan penjualan.",
    tags: ["SEO", "Social Media", "Ads"],
  },
];

function Services() {
  return (
    <section id="services" className="py-24 bg-dark-200 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="section-title">Layanan Kami</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {serviceList.map((service, index) => (
            <motion.div
              key={index}
              className="card text-center group"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <span className="text-5xl block mb-4 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </span>
              <h3 className="text-lg font-bold text-white mb-3">
                {service.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                {service.description}
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                {service.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs bg-dark-300 text-primary px-2 py-1 rounded-full border border-primary/30"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;
