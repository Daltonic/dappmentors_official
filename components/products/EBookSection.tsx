// eBooks Section
const EBooksSection = () => {
  const ebooks = [
    {
      title: "The Complete Guide to Solidity Smart Contracts",
      description:
        "Comprehensive guide covering Solidity from basics to advanced patterns, security best practices, and real-world applications.",
      pages: "280+ pages",
      format: "PDF & ePub",
      price: "$49",
      topics: [
        "Solidity Fundamentals",
        "Security Patterns",
        "Gas Optimization",
        "Testing Strategies",
      ],
      icon: "📘",
      rating: "4.9/5",
    },
    {
      title: "Building dApps on Solana: From Zero to Hero",
      description:
        "Step-by-step guide to mastering Solana development with Rust, Anchor framework, and advanced dApp architecture.",
      pages: "320+ pages",
      format: "PDF & ePub",
      price: "$59",
      topics: [
        "Rust Programming",
        "Anchor Framework",
        "Program Architecture",
        "Client Integration",
      ],
      icon: "📗",
      rating: "4.8/5",
    },
    {
      title: "Decentralized Storage: Mastering IPFS, Filecoin, and Sia",
      description:
        "Complete guide to implementing decentralized storage solutions in your Web3 applications with practical examples.",
      pages: "200+ pages",
      format: "PDF & ePub",
      price: "$39",
      topics: [
        "IPFS Integration",
        "Filecoin Networks",
        "Sia Storage",
        "Data Security",
      ],
      icon: "📙",
      rating: "4.7/5",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-r from-[#D2145A] to-[#FF4081] relative overflow-hidden">
      <div className="absolute inset-0 bg-black/10"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-cambo font-normal text-white mb-6">
            Expert Web3 eBooks
          </h2>
          <p className="text-xl text-white/90 max-w-4xl mx-auto">
            Master Web3 concepts with our expertly written eBooks, packed with
            actionable insights and practical guidance.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {ebooks.map((ebook, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-500 group"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  {ebook.icon}
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-white">
                    {ebook.price}
                  </div>
                  <div className="text-white/70 text-sm">★ {ebook.rating}</div>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-white mb-4">
                {ebook.title}
              </h3>

              <p className="text-white/80 mb-6 leading-relaxed">
                {ebook.description}
              </p>

              <div className="flex justify-between items-center mb-6 text-sm">
                <span className="bg-white/20 text-white px-3 py-1 rounded-full">
                  {ebook.pages}
                </span>
                <span className="bg-white/20 text-white px-3 py-1 rounded-full">
                  {ebook.format}
                </span>
              </div>

              <div className="space-y-2 mb-8">
                {ebook.topics.map((topic, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-white/60 rounded-full"></div>
                    <span className="text-white/70 text-sm">{topic}</span>
                  </div>
                ))}
              </div>

              <button className="w-full bg-white text-[#D2145A] py-3 px-6 rounded-xl font-semibold transition-all duration-300 hover:bg-gray-100 hover:scale-105">
                Download eBook
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EBooksSection;
