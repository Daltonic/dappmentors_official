// Bootcamps Section
const BootcampsSection = () => {
  const bootcamps = [
    {
      title: "Solana dApp Development Bootcamp",
      description:
        "4-week intensive program to master Solana development with Rust and Anchor framework.",
      duration: "4 weeks",
      schedule: "Virtual",
      price: "$899",
      nextDate: "March 2025",
      features: [
        "Live Coding Sessions",
        "Group Projects",
        "Mentor Support",
        "Discord Community",
      ],
      gradient: "from-purple-500 to-indigo-500",
    },
    {
      title: "Advanced Smart Contract Design & Security",
      description:
        "8-week deep dive into secure smart contract architecture and advanced development patterns.",
      duration: "8 weeks",
      schedule: "Hybrid",
      price: "$1,299",
      nextDate: "April 2025",
      features: [
        "Security Audits",
        "Real-world Projects",
        "Expert Feedback",
        "Certificate",
      ],
      gradient: "from-red-500 to-pink-500",
    },
    {
      title: "Full-Stack Web3 Development with Next.js",
      description:
        "6-week comprehensive program covering full-stack dApp development with modern frameworks.",
      duration: "6 weeks",
      schedule: "Virtual",
      price: "$1,099",
      nextDate: "May 2025",
      features: [
        "Next.js & React",
        "TypeScript",
        "Web3 Integration",
        "Portfolio Projects",
      ],
      gradient: "from-blue-500 to-cyan-500",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-purple-50 dark:from-[#1A1A1A] dark:to-purple-900/10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-cambo font-normal text-gray-900 dark:text-white mb-6">
            Intensive Web3 Bootcamps
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
            Accelerate your Web3 expertise with our immersive bootcamps designed
            to transform you into a confident blockchain developer.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {bootcamps.map((bootcamp, index) => (
            <div
              key={index}
              className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl p-8 border border-gray-200/50 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-500 group"
            >
              <div className="mb-6">
                <div
                  className={`w-20 h-20 bg-gradient-to-br ${bootcamp.gradient} rounded-3xl flex items-center justify-center text-3xl mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}
                >
                  🚀
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-3xl font-bold text-gray-900 dark:text-white">
                      {bootcamp.price}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Full program
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm font-semibold">
                      {bootcamp.nextDate}
                    </div>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {bootcamp.title}
              </h3>

              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                {bootcamp.description}
              </p>

              <div className="flex justify-between items-center mb-6 text-sm">
                <span className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-gray-700 dark:text-gray-300">
                  {bootcamp.duration}
                </span>
                <span className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-gray-700 dark:text-gray-300">
                  {bootcamp.schedule}
                </span>
              </div>

              <div className="space-y-3 mb-8">
                {bootcamp.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-gradient-to-r from-[#D2145A] to-[#FF4081] rounded-full"></div>
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <button
                className={`w-full py-3 px-6 bg-gradient-to-r ${bootcamp.gradient} text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg`}
              >
                Reserve Spot
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BootcampsSection;
