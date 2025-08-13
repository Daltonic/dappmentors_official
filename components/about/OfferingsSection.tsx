// Offerings Section
const OfferingsSection = () => {
  const offerings = [
    {
      title: "Tutorials & Free Content",
      description:
        "Explore our free YouTube videos and blog tutorials covering Web3 development, including Solidity, Rust, Next.js, and more.",
      icon: "📚",
      gradient: "from-blue-500 to-cyan-500",
      features: [
        "YouTube Videos",
        "Blog Tutorials",
        "Step-by-step Guides",
        "Multiple Blockchains",
      ],
    },
    {
      title: "Dapp Mentors Academy",
      description:
        "Join our exclusive membership platform for access to premium courses, books, and video content.",
      icon: "🎓",
      gradient: "from-emerald-500 to-teal-500",
      features: [
        "Premium Courses",
        "Exclusive Books",
        "Video Content",
        "In-depth Learning",
      ],
    },
    {
      title: "Private Mentorship",
      description:
        "Book one-on-one sessions with our expert mentors to resolve specific challenges and get personalized guidance.",
      icon: "👨‍🏫",
      gradient: "from-orange-500 to-red-500",
      features: [
        "One-on-one Sessions",
        "Code Debugging",
        "Project Guidance",
        "Expert Mentors",
      ],
    },
    {
      title: "Professional Services",
      description:
        "We offer Web3 development services, including smart contract development and full-stack dApp creation.",
      icon: "⚙️",
      gradient: "from-purple-500 to-pink-500",
      features: [
        "Smart Contracts",
        "Full-stack dApps",
        "Technical Writing",
        "Developer Hiring",
      ],
    },
    {
      title: "Community Engagement",
      description:
        "Connect with our vibrant community on Discord, LinkedIn, and X to network and share knowledge.",
      icon: "🌐",
      gradient: "from-indigo-500 to-purple-500",
      features: [
        "Discord Community",
        "LinkedIn Network",
        "X Updates",
        "Knowledge Sharing",
      ],
    },
  ];

  return (
    <section className="py-20 bg-white dark:bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-cambo font-normal text-gray-900 dark:text-white mb-6">
            What We Offer
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Comprehensive resources designed for developers of all levels, from
            beginners to advanced practitioners.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {offerings.map((offering, index) => (
            <div
              key={index}
              className="group relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl p-8 hover:shadow-2xl transition-all duration-700 border border-gray-200/50 dark:border-gray-700/50 hover:border-transparent"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${offering.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl`}
              ></div>

              <div
                className={`w-16 h-16 bg-gradient-to-br ${offering.gradient} rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}
              >
                {offering.icon}
              </div>

              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {offering.title}
              </h3>

              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                {offering.description}
              </p>

              <div className="space-y-2">
                {offering.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-gradient-to-r from-[#D2145A] to-[#FF4081] rounded-full"></div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OfferingsSection;
