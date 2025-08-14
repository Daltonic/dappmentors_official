// Featured Posts Section
const FeaturedPostsSection = () => {
  const featuredPosts = [
    {
      title: "How to Build a Solana Crowdfunding dApp: A Step-by-Step Guide",
      excerpt:
        "Learn how to create a decentralized crowdfunding platform on Solana using Rust and Anchor. This comprehensive tutorial walks you through setting up smart contracts, integrating a React front-end, and deploying your dApp.",
      category: "Solana",
      readTime: "15 min read",
      publishDate: "July 15, 2025",
      topics: ["Solana", "Rust", "Anchor", "React", "Smart Contracts"],
      image: "🚀",
      gradient: "from-purple-500 to-indigo-500",
      featured: true,
      relatedProduct: "Solana dApp Development Bootcamp",
    },
    {
      title: "Mastering Solidity: Writing Secure Smart Contracts for Ethereum",
      excerpt:
        "A beginner-friendly guide to writing secure, upgradable smart contracts using Solidity. Includes best practices to avoid vulnerabilities like reentrancy attacks and comprehensive security patterns.",
      category: "Smart Contracts",
      readTime: "12 min read",
      publishDate: "June 28, 2025",
      topics: ["Solidity", "Ethereum", "Security", "Truffle", "Hardhat"],
      image: "⚡",
      gradient: "from-yellow-500 to-orange-500",
      featured: true,
      relatedProduct: "Solidity for Smart Contract Development",
    },
    {
      title: "Decentralized Storage 101: Using IPFS, Filecoin, and Sia",
      excerpt:
        "Explore decentralized storage solutions and learn how to integrate IPFS, Filecoin, and Sia into your dApps for secure, scalable data management and enhanced user privacy.",
      category: "Decentralized Storage",
      readTime: "10 min read",
      publishDate: "May 20, 2025",
      topics: ["IPFS", "Filecoin", "Sia", "Storage", "dApp Architecture"],
      image: "🗄️",
      gradient: "from-green-500 to-emerald-500",
      featured: true,
      relatedProduct:
        "Decentralized Storage: Mastering IPFS, Filecoin, and Sia eBook",
    },
  ];

  return (
    <section className="py-20 bg-white dark:bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-0.5 bg-gradient-to-r from-[#D2145A] to-[#FFBAD4]"></div>
            <span className="text-[#D2145A] font-semibold text-sm uppercase tracking-wider">
              Featured Posts
            </span>
            <div className="w-12 h-0.5 bg-gradient-to-r from-[#FFBAD4] to-[#D2145A]"></div>
          </div>

          <h2 className="text-4xl md:text-5xl font-cambo font-normal text-gray-900 dark:text-white mb-6">
            Latest Web3 Tutorials & Guides
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
            Practical, hands-on content designed to guide you through every step
            of your Web3 development journey.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {featuredPosts.map((post, index) => (
            <article
              key={index}
              className="group relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-700 border border-gray-200/50 dark:border-gray-700/50 hover:border-transparent"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${post.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
              ></div>

              <div className="relative z-10 p-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${post.gradient} rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}
                  >
                    {post.image}
                  </div>
                  <div className="text-right text-sm">
                    <div className="bg-gradient-to-r from-[#D2145A] to-[#FF4081] text-white px-3 py-1 rounded-full font-semibold mb-1">
                      {post.category}
                    </div>
                    <div className="text-gray-500 dark:text-gray-400">
                      {post.publishDate}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 leading-tight group-hover:text-[#D2145A] transition-colors duration-300">
                  {post.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  {post.excerpt}
                </p>

                {/* Topics */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {post.topics.slice(0, 3).map((topic, idx) => (
                    <span
                      key={idx}
                      className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-3 py-1 rounded-full text-xs font-medium"
                    >
                      {topic}
                    </span>
                  ))}
                  {post.topics.length > 3 && (
                    <span className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-3 py-1 rounded-full text-xs font-medium">
                      +{post.topics.length - 3} more
                    </span>
                  )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
                    ⏱️ {post.readTime}
                  </span>
                  <button className="text-[#D2145A] hover:text-[#FF4081] font-semibold text-sm transition-colors duration-300">
                    Read More →
                  </button>
                </div>

                {/* Related Product */}
                <div className="bg-gradient-to-r from-[#D2145A]/5 to-[#FF4081]/5 rounded-xl p-4 border border-[#D2145A]/20">
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    <strong>Related:</strong> {post.relatedProduct}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedPostsSection;
