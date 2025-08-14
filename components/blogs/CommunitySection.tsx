// Community Section
const CommunitySection = () => {
  const communityStats = [
    {
      number: "5,450+",
      label: "Community Members",
      icon: "👥",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      number: "150+",
      label: "Blog Posts",
      icon: "📝",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      number: "50K+",
      label: "Monthly Readers",
      icon: "📖",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      number: "8+",
      label: "Years Experience",
      icon: "⭐",
      gradient: "from-orange-500 to-red-500",
    },
  ];

  return (
    <section className="py-20 bg-white dark:bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-cambo font-normal text-gray-900 dark:text-white mb-6">
            Join Our Web3 Community
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
            Connect with thousands of Web3 enthusiasts, get your questions
            answered, and stay ahead in the decentralized future.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {communityStats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div
                className={`w-20 h-20 bg-gradient-to-br ${stat.gradient} rounded-3xl flex items-center justify-center text-3xl mx-auto mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}
              >
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 dark:text-gray-300">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center bg-gradient-to-r from-[#D2145A]/5 to-[#FF4081]/5 rounded-3xl p-12">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Ready to Start Your Web3 Journey?
          </h3>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Explore our blog posts, join our community, and take advantage of
            our premium courses and bootcamps to accelerate your Web3
            development skills.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button className="bg-gradient-to-r from-[#D2145A] to-[#FF4081] text-white px-10 py-4 rounded-2xl font-bold text-lg hover:scale-105 transition-all duration-300 hover:shadow-xl">
              Join Discord Community
            </button>
            <button className="border-2 border-[#D2145A] text-[#D2145A] hover:bg-[#D2145A] hover:text-white px-10 py-4 rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-105">
              View All Courses
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
