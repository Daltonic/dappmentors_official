// Technical Writing Section
const TechnicalWritingSection = () => {
  const writingServices = [
    {
      title: "Technical Articles & Blogs",
      description:
        "Engaging, informative content on Web3 topics, including tutorials, thought leadership pieces, and project case studies.",
      icon: "📝",
      platforms: ["Medium", "Dev.to", "Your Blog", "Technical Publications"],
    },
    {
      title: "Documentation",
      description:
        "Clear, user-friendly documentation for your dApps, smart contracts, or developer tools to enhance usability and adoption.",
      icon: "📖",
      platforms: [
        "API Docs",
        "User Guides",
        "Developer Docs",
        "Integration Guides",
      ],
    },
    {
      title: "Whitepapers & Pitch Decks",
      description:
        "Craft compelling whitepapers and pitch decks to showcase your Web3 project to investors and stakeholders.",
      icon: "📊",
      platforms: [
        "Investor Decks",
        "Technical Papers",
        "Project Overviews",
        "Token Economics",
      ],
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-r from-[#D2145A] to-[#FF4081] relative overflow-hidden">
      <div className="absolute inset-0 bg-black/10"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-cambo font-normal text-white mb-6">
            Technical Writing & Content Creation
          </h2>
          <p className="text-xl text-white/90 max-w-4xl mx-auto">
            Elevate your brand&apos;s presence in the Web3 space with
            high-quality technical content.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {writingServices.map((service, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-500 group"
            >
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                {service.icon}
              </div>

              <h3 className="text-2xl font-bold text-white mb-4">
                {service.title}
              </h3>

              <p className="text-white/80 mb-6 leading-relaxed">
                {service.description}
              </p>

              <div className="space-y-2">
                {service.platforms.map((platform, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-white/60 rounded-full"></div>
                    <span className="text-white/70 text-sm">{platform}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-white/90 text-lg mb-6">
            <strong>Request a Quote:</strong> Reach out via
            contact@dappmentors.org to discuss your content needs.
          </p>
          <button className="bg-white text-[#D2145A] px-10 py-4 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105">
            Get Content Quote
          </button>
        </div>
      </div>
    </section>
  );
};

export default TechnicalWritingSection;
