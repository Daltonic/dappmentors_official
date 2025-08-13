// Who We Are Section
const WhoWeAreSection = () => {
  return (
    <section className="py-20 bg-white dark:bg-[#0A0A0A] relative">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-3xl blur-2xl"></div>
            <div className="relative bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-3xl p-8 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center text-3xl mb-6">
                🚀
              </div>
              <h2 className="text-4xl md:text-5xl font-cambo font-normal text-gray-900 dark:text-white mb-6">
                Who We Are
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                Dapp Mentors is a dedicated Blockchain Academy and community
                passionate about guiding developers, entrepreneurs, and
                technologists into the exciting world of Web3 and decentralized
                applications (dApps).
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                Based in{" "}
                <span className="text-[#D2145A] font-semibold">
                  Port Harcourt, Rivers
                </span>
                , our team of experienced blockchain developers and educators is
                committed to empowering the next generation of Web3 innovators.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-6 text-white transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="text-3xl mb-3">🎓</div>
                <h3 className="text-xl font-bold mb-2">Education</h3>
                <p className="text-emerald-100 text-sm">
                  Comprehensive Web3 learning resources
                </p>
              </div>

              <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-3xl p-6 text-white transform -rotate-3 hover:rotate-0 transition-transform duration-500 mt-8">
                <div className="text-3xl mb-3">🤝</div>
                <h3 className="text-xl font-bold mb-2">Mentorship</h3>
                <p className="text-orange-100 text-sm">
                  One-on-one guidance from experts
                </p>
              </div>

              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-6 text-white transform rotate-2 hover:rotate-0 transition-transform duration-500">
                <div className="text-3xl mb-3">🌐</div>
                <h3 className="text-xl font-bold mb-2">Community</h3>
                <p className="text-indigo-100 text-sm">
                  Vibrant network of Web3 enthusiasts
                </p>
              </div>

              <div className="bg-gradient-to-br from-pink-500 to-rose-500 rounded-3xl p-6 text-white transform -rotate-2 hover:rotate-0 transition-transform duration-500 mt-4">
                <div className="text-3xl mb-3">⚡</div>
                <h3 className="text-xl font-bold mb-2">Innovation</h3>
                <p className="text-pink-100 text-sm">
                  Cutting-edge Web3 solutions
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAreSection;
