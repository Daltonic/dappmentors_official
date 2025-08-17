// Related Articles Component

interface RelatedPost {
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  gradient: string;
  image: string;
}

const RelatedArticles: React.FC = () => {
  const relatedPosts: RelatedPost[] = [
    {
      title: "Mastering Solidity: Writing Secure Smart Contracts",
      excerpt: "Learn advanced Solidity patterns and security best practices.",
      category: "Smart Contracts",
      readTime: "12 min",
      gradient: "from-yellow-500 to-orange-500",
      image: "⚡",
    },
    {
      title: "DeFi Development: Building Yield Farming Protocols",
      excerpt: "Step-by-step guide to creating DeFi yield farming mechanisms.",
      category: "DeFi",
      readTime: "18 min",
      gradient: "from-green-500 to-emerald-500",
      image: "🌱",
    },
    {
      title: "Web3 Security: Protecting Your dApps",
      excerpt: "Essential security practices for decentralized applications.",
      category: "Security",
      readTime: "14 min",
      gradient: "from-red-500 to-pink-500",
      image: "🛡️",
    },
  ];

  const handleArticleClick = (title: string) => {
    // In a real app, this would navigate to the article
    console.log(`Navigate to article: ${title}`);
  };

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-purple-50 dark:from-[#1A1A1A] dark:to-purple-900/10">
      <div className="max-w-7xl mx-auto px-4">
        <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Related Articles
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          {relatedPosts.map((post, index) => (
            <article
              key={index}
              className="group bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl p-6 hover:shadow-2xl transition-all duration-500 cursor-pointer border border-gray-200/50 dark:border-gray-700/50"
              onClick={() => handleArticleClick(post.title)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleArticleClick(post.title);
                }
              }}
            >
              <div
                className={`w-12 h-12 bg-gradient-to-br ${post.gradient} rounded-xl flex items-center justify-center text-xl mb-4 group-hover:scale-110 transition-transform duration-300`}
              >
                {post.image}
              </div>
              <span
                className={`bg-gradient-to-r ${post.gradient} text-white px-3 py-1 rounded-full text-xs font-semibold mb-3 inline-block`}
              >
                {post.category}
              </span>
              <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-[#D2145A] transition-colors duration-300">
                {post.title}
              </h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                {post.excerpt}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  ⏱️ {post.readTime}
                </span>
                <span className="text-[#D2145A] hover:text-[#FF4081] font-semibold text-sm transition-colors duration-300">
                  Read →
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedArticles;
