// Premium Courses Section
const CoursesSection = () => {
  const courses = [
    {
      title: "Solidity for Smart Contract Development",
      description:
        "Master Ethereum smart contract development with Solidity, from basics to advanced patterns and security best practices.",
      duration: "40+ hours",
      level: "Beginner to Advanced",
      price: "$299",
      features: [
        "Video Lessons",
        "Hands-on Projects",
        "Certificate",
        "Lifetime Access",
      ],
      icon: "⚡",
      gradient: "from-yellow-500 to-orange-500",
      popular: false,
    },
    {
      title: "Building DeFi Platforms on Solana",
      description:
        "Learn to build decentralized finance applications on Solana using Rust and the Anchor framework.",
      duration: "35+ hours",
      level: "Intermediate",
      price: "$399",
      features: [
        "Live Projects",
        "Rust Programming",
        "Anchor Framework",
        "DeFi Protocols",
      ],
      icon: "💰",
      gradient: "from-emerald-500 to-teal-500",
      popular: true,
    },
    {
      title: "Rust Programming for Blockchain Applications",
      description:
        "Deep dive into Rust programming specifically for blockchain development on modern platforms.",
      duration: "30+ hours",
      level: "Intermediate",
      price: "$349",
      features: [
        "Rust Fundamentals",
        "Blockchain Integration",
        "Performance Optimization",
        "Security Patterns",
      ],
      icon: "🦀",
      gradient: "from-red-500 to-pink-500",
      popular: false,
    },
  ];

  return (
    <section className="py-20 bg-white dark:bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-0.5 bg-gradient-to-r from-[#D2145A] to-[#FFBAD4]"></div>
            <span className="text-[#D2145A] font-semibold text-sm uppercase tracking-wider">
              Premium Courses
            </span>
            <div className="w-12 h-0.5 bg-gradient-to-r from-[#FFBAD4] to-[#D2145A]"></div>
          </div>

          <h2 className="text-4xl md:text-5xl font-cambo font-normal text-gray-900 dark:text-white mb-6">
            In-Depth Video Courses
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
            Comprehensive, expert-led online courses covering Solidity, Rust,
            and modern tech stacks with hands-on projects.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <div
              key={index}
              className="group relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl p-8 hover:shadow-2xl transition-all duration-700 border border-gray-200/50 dark:border-gray-700/50 hover:border-transparent overflow-hidden"
            >
              {course.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-[#D2145A] to-[#FF4081] text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                    Most Popular
                  </div>
                </div>
              )}

              <div
                className={`absolute inset-0 bg-gradient-to-br ${course.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl`}
              ></div>

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${course.gradient} rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}
                  >
                    {course.icon}
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-gray-900 dark:text-white">
                      {course.price}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      One-time payment
                    </div>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {course.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  {course.description}
                </p>

                <div className="flex justify-between items-center mb-6 text-sm">
                  <span className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-gray-700 dark:text-gray-300">
                    {course.duration}
                  </span>
                  <span className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-gray-700 dark:text-gray-300">
                    {course.level}
                  </span>
                </div>

                <div className="space-y-3 mb-8">
                  {course.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-gradient-to-r from-[#D2145A] to-[#FF4081] rounded-full"></div>
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                <button
                  className={`w-full py-3 px-6 bg-gradient-to-r ${course.gradient} text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg`}
                >
                  Enroll Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;
