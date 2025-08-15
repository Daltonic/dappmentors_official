// Services Section
const ServicesSection = () => {
  const services = [
    {
      icon: "📄",
      title: "Smart Contract Development",
      description:
        "Build secure, upgradable contracts using Solidity, Rust, or Vyper with comprehensive testing and auditing.",
      features: [
        "Security Audits",
        "Gas Optimization",
        "Upgradeable Contracts",
        "Multi-chain Support",
      ],
    },
    {
      icon: "🔧",
      title: "Full-Stack dApp Development",
      description:
        "Create scalable dApps with React, Next.js, and frameworks like Truffle and Anchor for seamless user experiences.",
      features: [
        "Frontend Integration",
        "Backend APIs",
        "Wallet Connection",
        "Responsive Design",
      ],
    },
    {
      icon: "✍️",
      title: "Technical Writing",
      description:
        "Get high-quality tutorials, documentation, or whitepapers to elevate your brand and educate your community.",
      features: [
        "API Documentation",
        "Tutorials",
        "Whitepapers",
        "Blog Content",
      ],
    },
    {
      icon: "👥",
      title: "Developer Hiring",
      description:
        "Tap into our 5,450+ community to find skilled Web3 talent for your blockchain projects and startups.",
      features: [
        "Talent Matching",
        "Technical Screening",
        "Portfolio Review",
        "Cultural Fit",
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
            Bring Your Web3 Vision to Life
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
            Our expert team offers end-to-end solutions to accelerate your Web3
            projects from concept to production.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 border border-gray-200/50 dark:border-gray-700/50"
            >
              <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>

              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                {service.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                {service.description}
              </p>

              <div className="space-y-2">
                {service.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-[#D2145A] rounded-full"></div>
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center bg-gradient-to-r from-[#D2145A]/5 to-[#FF4081]/5 rounded-3xl p-8">
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            Ready to discuss your Web3 project? Get a personalized quote and
            timeline for your development needs.
          </p>
          <button className="bg-gradient-to-r from-[#D2145A] to-[#FF4081] text-white px-8 py-4 rounded-2xl font-semibold hover:scale-105 transition-all duration-300">
            Get a Quote
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
