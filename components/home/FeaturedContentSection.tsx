// Featured Content Section
const FeaturedContentSection = () => {
  const contentItems = [
    {
      title: "How to Build a Solana Crowdfunding dApp",
      type: "YouTube Tutorial",
      views: "2.7K views",
      description:
        "Complete step-by-step guide to building a decentralized crowdfunding platform on Solana",
      image: "🎥",
      gradient: "from-red-500 to-pink-500",
    },
    {
      title: "Mastering Solidity: Secure Smart Contracts",
      type: "Blog Post",
      views: "1.2K reads",
      description:
        "Essential security patterns and best practices for Ethereum smart contract development",
      image: "📖",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      title: "Decentralized Storage with IPFS and Filecoin",
      type: "Tutorial Series",
      views: "800 reads",
      description:
        "Learn to integrate decentralized storage solutions into your Web3 applications",
      image: "💾",
      gradient: "from-green-500 to-emerald-500",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-purple-50 dark:from-[#1A1A1A] dark:to-purple-900/10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-0.5 bg-gradient-to-r from-[#D2145A] to-[#FFBAD4]"></div>
            <span className="text-[#D2145A] font-semibold text-sm uppercase tracking-wider">
              Free Resources
            </span>
            <div className="w-12 h-0.5 bg-gradient-to-r from-[#FFBAD4] to-[#D2145A]"></div>
          </div>

          <h2 className="text-4xl md:text-5xl font-cambo font-normal text-gray-900 dark:text-white mb-6">
            Featured Tutorials & Insights
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
            Access our growing library of free Web3 tutorials, guides, and
            insights to accelerate your learning journey.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {contentItems.map((item, index) => (
            <div
              key={index}
              className="group bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 border border-gray-200/50 dark:border-gray-700/50 cursor-pointer"
            >
              <div className="flex items-center gap-4 mb-6">
                <div
                  className={`w-14 h-14 bg-gradient-to-br ${item.gradient} rounded-2xl flex items-center justify-center text-xl group-hover:scale-110 transition-transform duration-300`}
                >
                  {item.image}
                </div>
                <div>
                  <div className="text-sm text-[#D2145A] font-semibold">
                    {item.type}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {item.views}
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-[#D2145A] transition-colors duration-300">
                {item.title}
              </h3>

              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                {item.description}
              </p>

              <button className="text-[#D2145A] hover:text-[#FF4081] font-semibold transition-colors duration-300">
                Read More →
              </button>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button className="border-2 border-[#D2145A] text-[#D2145A] hover:bg-[#D2145A] hover:text-white px-8 py-4 rounded-2xl font-semibold hover:scale-105 transition-all duration-300">
            Explore All Content
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedContentSection;
