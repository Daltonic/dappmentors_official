// Hero Section Component
const HeroSection = () => {
  return (
    <section className="relative w-full bg-gradient-to-br from-gray-50 via-white to-purple-50 dark:from-gray-900 dark:via-[#0A0A0A] dark:to-purple-900/20 py-20 lg:py-32 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-[#D2145A]/10 to-[#FFBAD4]/10 backdrop-blur-sm rounded-full px-6 py-2 mb-8">
            <span className="text-[#D2145A] font-semibold text-sm uppercase tracking-wider">
              About Us
            </span>
            <div className="w-2 h-2 bg-[#D2145A] rounded-full animate-pulse"></div>
          </div>

          <h1 className="font-cambo text-5xl md:text-7xl lg:text-8xl font-normal tracking-tight text-gray-900 dark:text-white mb-8">
            About{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D2145A] to-[#FF4081] animate-pulse">
              Dapp Mentors
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Empowering the next generation of Web3 innovators through education,
            mentorship, and hands-on support.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
