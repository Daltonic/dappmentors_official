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

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-4 h-4 bg-[#D2145A]/30 rounded-full animate-pulse"></div>
      <div className="absolute top-40 right-20 w-6 h-6 bg-[#FF4081]/20 rounded-full animate-ping"></div>
      <div className="absolute bottom-32 left-1/4 w-3 h-3 bg-purple-500/40 rounded-full animate-bounce"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-[#D2145A]/10 to-[#FFBAD4]/10 backdrop-blur-sm rounded-full px-6 py-2 mb-8 animate-pulse">
            <span className="text-[#D2145A] font-semibold text-sm uppercase tracking-wider">
              Our Services
            </span>
            <div className="w-2 h-2 bg-[#D2145A] rounded-full animate-pulse"></div>
          </div>

          <h1 className="font-cambo text-5xl md:text-7xl lg:text-8xl font-normal tracking-tight text-gray-900 dark:text-white mb-8">
            Empowering Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D2145A] to-[#FF4081] animate-pulse">
              Web3 Journey
            </span>{" "}
            with Expert Solutions
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-5xl mx-auto leading-relaxed">
            From hands-on education to professional development, we provide the
            tools, expertise, and support to bring your Web3 vision to life.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
