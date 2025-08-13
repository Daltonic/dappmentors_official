// Professional Services Section
const ServicesSection = () => {
  const services = [
    {
      title: "Smart Contract Development",
      description: "Secure and efficient smart contracts in Solidity and Rust",
      icon: "⚡",
      gradient: "from-yellow-500 to-orange-500",
    },
    {
      title: "Full-Stack dApp Creation",
      description:
        "Complete decentralized applications with React, Next.js, and Tailwind CSS",
      icon: "🌐",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      title: "Technical Writing",
      description:
        "Clear documentation and educational content for your Web3 projects",
      icon: "📝",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      title: "Developer Hiring",
      description: "Find and hire skilled Web3 developers for your team",
      icon: "👥",
      gradient: "from-purple-500 to-pink-500",
    },
  ];

  return (
    <section className="py-20 bg-white dark:bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-cambo font-normal text-gray-900 dark:text-white mb-6">
            Professional Services
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Looking to build a custom dApp, smart contract, or Web3 solution?
            Our team offers comprehensive development services.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-gray-50 dark:bg-gray-900 rounded-3xl p-8 hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
            >
              <div
                className={`w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}
              >
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                {service.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center bg-gradient-to-r from-gray-50 to-purple-50 dark:from-gray-900 dark:to-purple-900/20 rounded-3xl p-12">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to Start Your Project?
          </h3>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Get a custom quote by emailing us with your project details
          </p>
          <button className="bg-gradient-to-r from-[#D2145A] to-[#FF4081] text-white px-10 py-4 rounded-2xl font-bold text-lg hover:scale-105 transition-all duration-300 hover:shadow-xl">
            Get Quote
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
