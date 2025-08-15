// Community Stats Section
const CommunityStatsSection = () => {
  const stats = [
    {
      number: "5,450+",
      label: "YouTube Subscribers",
      description: "Active learners following our tutorials",
      icon: "📺",
      gradient: "from-red-500 to-pink-500",
    },
    {
      number: "27K+",
      label: "Tutorial Views",
      description: "On our Solana crowdfunding tutorial alone",
      icon: "👀",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      number: "150+",
      label: "Free Resources",
      description: "Tutorials, guides, and blog posts available",
      icon: "📚",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      number: "8+",
      label: "Years Experience",
      description: "In blockchain development and education",
      icon: "⭐",
      gradient: "from-yellow-500 to-orange-500",
    },
  ];

  return (
    <section className="py-20 bg-white dark:bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-cambo font-normal text-gray-900 dark:text-white mb-6">
            Join Our Global Community
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
            Be part of a thriving ecosystem of Web3 developers, entrepreneurs,
            and technologists building the decentralized future.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div
                className={`w-20 h-20 bg-gradient-to-br ${stat.gradient} rounded-3xl flex items-center justify-center text-3xl mx-auto mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}
              >
                {stat.icon}
              </div>
              <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                {stat.number}
              </div>
              <div className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                {stat.label}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommunityStatsSection;
