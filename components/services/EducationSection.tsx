// Web3 Education Section
const EducationSection = () => {
  const educationServices = [
    {
      title: "Free Tutorials",
      description:
        "Access our YouTube channel and blog for step-by-step guides on Web3 development, covering Solidity, Rust, Next.js, and blockchains like Solana, Alephium, Sia, and ICP Bitfinity.",
      features: [
        "YouTube Channel",
        "Blog Tutorials",
        "Real-world Projects",
        "Multiple Blockchains",
      ],
      icon: "📚",
      gradient: "from-blue-500 to-cyan-500",
      price: "Free",
    },
    {
      title: "Dapp Mentors Academy",
      description:
        "Join our premium membership platform for exclusive access to in-depth courses, books, and video content. Master advanced topics like DeFi, NFTs, and decentralized storage.",
      features: [
        "Premium Courses",
        "Exclusive Books",
        "Video Content",
        "Advanced Topics",
      ],
      icon: "🎓",
      gradient: "from-emerald-500 to-teal-500",
      price: "Premium",
    },
    {
      title: "Live Workshops & Hackathons",
      description:
        "Participate in virtual workshops and hackathons to gain hands-on experience, collaborate with peers, and showcase your skills in the Web3 ecosystem.",
      features: [
        "Virtual Workshops",
        "Hackathons",
        "Peer Collaboration",
        "Skill Showcase",
      ],
      icon: "⚡",
      gradient: "from-orange-500 to-red-500",
      price: "Event-based",
    },
  ];

  return (
    <section className="py-20 bg-white dark:bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-cambo font-normal text-gray-900 dark:text-white mb-6">
            Web3 Development Education
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
            Unlock the skills to build cutting-edge decentralized applications
            with our expertly crafted educational resources.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {educationServices.map((service, index) => (
            <div
              key={index}
              className="group relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl p-8 hover:shadow-2xl transition-all duration-700 border border-gray-200/50 dark:border-gray-700/50 hover:border-transparent"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl`}
              ></div>

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}
                  >
                    {service.icon}
                  </div>
                  <span className="bg-gradient-to-r from-[#D2145A] to-[#FF4081] text-white px-4 py-2 rounded-full text-sm font-bold">
                    {service.price}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {service.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  {service.description}
                </p>

                <div className="space-y-3 mb-8">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-gradient-to-r from-[#D2145A] to-[#FF4081] rounded-full"></div>
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                <button
                  className={`w-full py-3 px-6 bg-gradient-to-r ${service.gradient} text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg`}
                >
                  Get Started
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
