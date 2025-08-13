// Professional Development Services Section
const ProfessionalServicesSection = () => {
  const services = [
    {
      title: "Smart Contract Development",
      description:
        "We design, develop, and audit secure smart contracts using Solidity, Rust, and Vyper for blockchains like Solana, Alephium, and Ethereum.",
      icon: "⚡",
      gradient: "from-yellow-500 to-orange-500",
      features: [
        "Solidity & Rust",
        "Multi-chain Support",
        "Security Audits",
        "Gas Optimization",
      ],
    },
    {
      title: "Full-Stack dApp Development",
      description:
        "Build robust decentralized applications with front-end technologies (React, Next.js, TypeScript, Tailwind CSS) and back-end frameworks.",
      icon: "🌐",
      gradient: "from-blue-500 to-cyan-500",
      features: [
        "React & Next.js",
        "TypeScript",
        "Modern UI/UX",
        "Web3 Integration",
      ],
    },
    {
      title: "Decentralized Storage & Identity",
      description:
        "Integrate decentralized storage (IPFS, Filecoin, Sia, Arweave) and decentralized identity (DID) systems to enhance your dApp's functionality.",
      icon: "🗄️",
      gradient: "from-green-500 to-emerald-500",
      features: [
        "IPFS Integration",
        "Filecoin & Arweave",
        "DID Systems",
        "Data Security",
      ],
    },
    {
      title: "Custom Web3 Projects",
      description:
        "From DeFi platforms to NFT marketplaces and play-to-earn games, we deliver tailored solutions to meet your business needs.",
      icon: "🎮",
      gradient: "from-purple-500 to-pink-500",
      features: [
        "DeFi Platforms",
        "NFT Marketplaces",
        "P2E Games",
        "Custom Solutions",
      ],
    },
    {
      title: "Smart Contract Auditing",
      description:
        "Ensure your smart contracts are secure and optimized with our thorough auditing services, following industry best practices.",
      icon: "🔒",
      gradient: "from-red-500 to-pink-500",
      features: [
        "Security Analysis",
        "Code Review",
        "Best Practices",
        "Optimization",
      ],
    },
    {
      title: "Technical Architecture",
      description:
        "Get expert guidance on designing scalable, secure, and efficient Web3 architectures for your decentralized applications.",
      icon: "🏗️",
      gradient: "from-indigo-500 to-purple-500",
      features: [
        "System Design",
        "Scalability",
        "Security Planning",
        "Performance",
      ],
    },
  ];

  return (
    <section className="py-20 bg-white dark:bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-0.5 bg-gradient-to-r from-[#D2145A] to-[#FFBAD4]"></div>
            <span className="text-[#D2145A] font-semibold text-sm uppercase tracking-wider">
              Professional Services
            </span>
            <div className="w-12 h-0.5 bg-gradient-to-r from-[#FFBAD4] to-[#D2145A]"></div>
          </div>

          <h2 className="text-4xl md:text-5xl font-cambo font-normal text-gray-900 dark:text-white mb-6">
            Professional Web3 Development
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
            Bring your Web3 ideas to life with our end-to-end development
            solutions, built on modern tech stacks and blockchain expertise.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative bg-gray-50 dark:bg-gray-900 rounded-3xl p-8 hover:shadow-2xl transition-all duration-700 border border-gray-200/50 dark:border-gray-700/50 hover:border-transparent overflow-hidden"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
              ></div>

              <div className="relative z-10">
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}
                >
                  {service.icon}
                </div>

                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {service.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  {service.description}
                </p>

                <div className="space-y-2 mb-8">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-gradient-to-r from-[#D2145A] to-[#FF4081] rounded-full"></div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                <button className="w-full bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 text-gray-900 dark:text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-[#D2145A] group-hover:to-[#FF4081] group-hover:text-white hover:scale-105">
                  Get Quote
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16 bg-gradient-to-r from-[#D2145A]/5 to-[#FF4081]/5 rounded-3xl p-12">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to Build Your Web3 Project?
          </h3>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Contact us at contact@dappmentors.org with your project details for
            a custom quote.
          </p>
          <button className="bg-gradient-to-r from-[#D2145A] to-[#FF4081] text-white px-10 py-4 rounded-2xl font-bold text-lg hover:scale-105 transition-all duration-300 hover:shadow-xl">
            Start Your Project
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProfessionalServicesSection;
