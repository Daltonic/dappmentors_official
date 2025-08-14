// All Posts Section
const AllPostsSection = () => {
  const allPosts = [
    {
      title: "Building Your First NFT Marketplace on Ethereum",
      excerpt:
        "Step-by-step guide to creating a complete NFT marketplace with minting, trading, and auction features.",
      category: "NFTs",
      readTime: "18 min read",
      publishDate: "July 8, 2025",
      topics: ["NFTs", "Ethereum", "Solidity", "React"],
      gradient: "from-pink-500 to-rose-500",
    },
    {
      title: "DeFi Yield Farming: Building Liquidity Pools with Solidity",
      excerpt:
        "Learn to implement yield farming mechanisms and liquidity pools for your DeFi protocol.",
      category: "DeFi",
      readTime: "22 min read",
      publishDate: "June 15, 2025",
      topics: ["DeFi", "Solidity", "Yield Farming", "Liquidity"],
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      title: "Web3 Security Best Practices: Protecting Your Smart Contracts",
      excerpt:
        "Essential security patterns and practices to prevent common vulnerabilities in smart contracts.",
      category: "Web3 Security",
      readTime: "16 min read",
      publishDate: "May 30, 2025",
      topics: ["Security", "Smart Contracts", "Best Practices"],
      gradient: "from-red-500 to-pink-500",
    },
    {
      title: "Integrating Decentralized Identity (DID) in Your dApp",
      excerpt:
        "Implement self-sovereign identity solutions to enhance user privacy and control in Web3 applications.",
      category: "dApp Development",
      readTime: "14 min read",
      publishDate: "May 10, 2025",
      topics: ["DID", "Identity", "Privacy", "Web3"],
      gradient: "from-indigo-500 to-purple-500",
    },
    {
      title: "Optimizing Gas Costs in Ethereum Smart Contracts",
      excerpt:
        "Advanced techniques and patterns to minimize gas consumption in your Ethereum dApps.",
      category: "Ethereum",
      readTime: "12 min read",
      publishDate: "April 25, 2025",
      topics: ["Ethereum", "Gas Optimization", "Smart Contracts"],
      gradient: "from-gray-500 to-slate-500",
    },
    {
      title: "Cross-Chain Development: Building Multi-Chain dApps",
      excerpt:
        "Learn to develop dApps that work seamlessly across multiple blockchain networks.",
      category: "dApp Development",
      readTime: "20 min read",
      publishDate: "April 12, 2025",
      topics: ["Cross-Chain", "Multi-Chain", "Interoperability"],
      gradient: "from-emerald-500 to-teal-500",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-purple-50 dark:from-[#1A1A1A] dark:to-purple-900/10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-cambo font-normal text-gray-900 dark:text-white mb-6">
            All Blog Posts
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
            Explore our complete collection of Web3 tutorials, guides, and
            insights covering everything from smart contracts to DeFi.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allPosts.map((post, index) => (
            <article
              key={index}
              className="group bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl p-6 hover:shadow-2xl transition-all duration-500 border border-gray-200/50 dark:border-gray-700/50 hover:border-transparent cursor-pointer"
            >
              <div className="mb-4">
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`bg-gradient-to-r ${post.gradient} text-white px-3 py-1 rounded-full text-xs font-semibold`}
                  >
                    {post.category}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {post.publishDate}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 leading-tight group-hover:text-[#D2145A] transition-colors duration-300">
                  {post.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed">
                  {post.excerpt}
                </p>

                <div className="flex flex-wrap gap-1 mb-4">
                  {post.topics.slice(0, 2).map((topic, idx) => (
                    <span
                      key={idx}
                      className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full text-xs"
                    >
                      {topic}
                    </span>
                  ))}
                  {post.topics.length > 2 && (
                    <span className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full text-xs">
                      +{post.topics.length - 2}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                    ⏱️ {post.readTime}
                  </span>
                  <span className="text-[#D2145A] hover:text-[#FF4081] font-semibold text-xs transition-colors duration-300">
                    Read →
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-[#D2145A] to-[#FF4081] text-white px-8 py-4 rounded-2xl font-semibold hover:scale-105 transition-all duration-300 hover:shadow-xl">
            Load More Posts
          </button>
        </div>
      </div>
    </section>
  );
};

export default AllPostsSection;
