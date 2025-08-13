// Expertise Section
const ExpertiseSection = () => {
  const expertise = [
    {
      skill: "Smart Contract Development",
      level: 95,
      color: "from-blue-500 to-cyan-500",
    },
    {
      skill: "Blockchain Ecosystems",
      level: 90,
      color: "from-emerald-500 to-teal-500",
    },
    {
      skill: "Modern Tech Stacks",
      level: 88,
      color: "from-orange-500 to-red-500",
    },
    {
      skill: "Decentralized Storage",
      level: 85,
      color: "from-purple-500 to-pink-500",
    },
    {
      skill: "Security & Auditing",
      level: 92,
      color: "from-indigo-500 to-purple-500",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-[#1A1A1A] dark:to-blue-900/10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-cambo font-normal text-gray-900 dark:text-white mb-8">
              Our Expertise
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              Our team brings over{" "}
              <span className="text-[#D2145A] font-bold">eight years</span> of
              experience in blockchain development, full-stack software
              engineering, and technical education.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-12">
              Led by{" "}
              <span className="font-semibold text-gray-900 dark:text-white">
                Darlington Gospel
              </span>
              , a seasoned blockchain developer and educator.
            </p>

            <div className="space-y-6">
              {expertise.map((item, index) => (
                <div key={index} className="group">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {item.skill}
                    </span>
                    <span className="text-[#D2145A] font-bold">
                      {item.level}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${item.color} rounded-full transition-all duration-1000 group-hover:animate-pulse`}
                      style={{ width: `${item.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-8 bg-gradient-to-r from-[#D2145A]/20 to-[#FF4081]/20 rounded-3xl blur-2xl"></div>
            <div className="relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl p-8 border border-gray-200/50 dark:border-gray-700/50">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Technologies We Master
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  "Solidity",
                  "Rust",
                  "React",
                  "Next.js",
                  "TypeScript",
                  "Tailwind CSS",
                  "Solana",
                  "IPFS",
                ].map((tech, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-xl p-4 text-center font-semibold text-gray-900 dark:text-white hover:scale-105 transition-transform duration-300"
                  >
                    {tech}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExpertiseSection;
