// Why Choose Us Section

const WhyChooseSection = () => {
  const features = [
    {
      icon: "👨‍🏫",
      title: "Expert-Led Learning",
      description:
        "Learn from blockchain expert Darlington Gospel with 8+ years of experience in Solidity, Rust, and modern blockchains like Solana, Alephium, and ICP.",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: "🛠️",
      title: "Hands-On Approach",
      description:
        "Build real-world dApps like crowdfunding platforms, voting systems, and NFT marketplaces through practical tutorials and projects.",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: "🌐",
      title: "Vibrant Community",
      description:
        "Connect with thousands of developers on Discord, LinkedIn, and X for networking, collaboration, and the latest Web3 trends.",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: "🎯",
      title: "Comprehensive Solutions",
      description:
        "From free tutorials to premium education and professional development services, we support every step of your Web3 journey.",
      gradient: "from-orange-500 to-red-500",
    },
  ];

  return (
    <section className="py-20 bg-white dark:bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-0.5 bg-gradient-to-r from-[#D2145A] to-[#FFBAD4]"></div>
            <span className="text-[#D2145A] font-semibold text-sm uppercase tracking-wider">
              Why Choose Us
            </span>
            <div className="w-12 h-0.5 bg-gradient-to-r from-[#FFBAD4] to-[#D2145A]"></div>
          </div>

          <h2 className="text-4xl md:text-5xl font-cambo font-normal text-gray-900 dark:text-white mb-6">
            Why Dapp Mentors?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
            We bridge the gap between Web2 and Web3 with comprehensive
            education, expert guidance, and a supportive community.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="group text-center">
              <div
                className={`w-20 h-20 bg-gradient-to-br ${feature.gradient} rounded-3xl flex items-center justify-center text-3xl mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}
              >
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
