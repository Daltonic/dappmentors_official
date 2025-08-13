// Community Engagement Section
const CommunitySection = () => {
  const communityFeatures = [
    {
      platform: "Discord Community",
      description:
        "Connect with thousands of Web3 enthusiasts for real-time discussions, project collaboration, and Q&A sessions.",
      members: "5,000+",
      icon: "💬",
      gradient: "from-indigo-500 to-purple-500",
    },
    {
      platform: "Social Media Updates",
      description:
        "Follow us on LinkedIn and X for the latest Web3 trends, tutorials, and community events.",
      members: "Growing",
      icon: "📱",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      platform: "Exclusive Events",
      description:
        "Participate in AMAs, developer meetups, and Web3 challenges to stay engaged and inspired.",
      members: "All levels",
      icon: "🎉",
      gradient: "from-pink-500 to-rose-500",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-purple-50 dark:from-[#1A1A1A] dark:to-purple-900/10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-cambo font-normal text-gray-900 dark:text-white mb-6">
            Community Engagement & Support
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
            Join our thriving Web3 community to network, learn, and grow
            alongside like-minded developers and innovators.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {communityFeatures.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl p-8 hover:shadow-2xl transition-all duration-700 border border-gray-200/50 dark:border-gray-700/50 hover:border-transparent"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl`}
              ></div>

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}
                  >
                    {feature.icon}
                  </div>
                  <span className="bg-gradient-to-r from-[#D2145A] to-[#FF4081] text-white px-4 py-2 rounded-full text-sm font-bold">
                    {feature.members}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {feature.platform}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                  {feature.description}
                </p>

                <button
                  className={`w-full py-3 px-6 bg-gradient-to-r ${feature.gradient} text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg`}
                >
                  Join Now
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-[#D2145A]/5 to-[#FF4081]/5 rounded-3xl p-12 text-center border border-[#D2145A]/20">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Connect with Our Community
          </h3>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Join thousands of Web3 developers, get support, share projects, and
            stay updated with the latest trends.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-8 py-3 rounded-xl font-semibold hover:scale-105 transition-all duration-300">
              Join Discord
            </button>
            <button className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-3 rounded-xl font-semibold hover:scale-105 transition-all duration-300">
              Follow on LinkedIn
            </button>
            <button className="bg-gradient-to-r from-gray-700 to-gray-900 text-white px-8 py-3 rounded-xl font-semibold hover:scale-105 transition-all duration-300">
              Follow on X
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
