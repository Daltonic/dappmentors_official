// Developer Hiring Section
const DeveloperHiringSection = () => {
  return (
    <section className="py-20 bg-white dark:bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-cambo font-normal text-gray-900 dark:text-white mb-6">
            Developer Hiring & Team Building
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
            Need top-tier Web3 talent for your project? We connect you with
            skilled blockchain developers from our community.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-3xl p-8 border border-blue-200/50 dark:border-blue-700/50">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center text-2xl mb-6">
              🔍
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Hiring Support
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Source and vet developers proficient in Solidity, Rust, and modern
              Web3 frameworks to join your team.
            </p>
          </div>

          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-3xl p-8 border border-emerald-200/50 dark:border-emerald-700/50">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center text-2xl mb-6">
              👥
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Project-Based Talent
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Hire our in-house developers for short-term or long-term projects,
              ensuring high-quality deliverables.
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-3xl p-8 border border-purple-200/50 dark:border-purple-700/50">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-2xl mb-6">
              🌐
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Community Talent Pool
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Leverage our network of over 5,000+ Web3 developers to find the
              right fit for your needs.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-gray-50 to-purple-50 dark:from-gray-900 dark:to-purple-900/20 rounded-3xl p-12 text-center">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Find Your Perfect Web3 Developer
          </h3>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Whether you need a Solidity expert, Rust developer, or full-stack
            Web3 engineer, we&apos;ll help you find the perfect match for your
            project.
          </p>
          <button className="bg-gradient-to-r from-[#D2145A] to-[#FF4081] text-white px-10 py-4 rounded-2xl font-bold text-lg hover:scale-105 transition-all duration-300 hover:shadow-xl">
            Discuss Hiring Needs
          </button>
        </div>
      </div>
    </section>
  );
};

export default DeveloperHiringSection;
