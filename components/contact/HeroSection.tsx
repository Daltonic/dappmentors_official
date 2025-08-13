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
              Contact Us
            </span>
            <div className="w-2 h-2 bg-[#D2145A] rounded-full animate-pulse"></div>
          </div>

          <h1 className="font-cambo text-5xl md:text-7xl lg:text-8xl font-normal tracking-tight text-gray-900 dark:text-white mb-8">
            Let&apos;s Build the{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D2145A] to-[#FF4081] animate-pulse">
              Decentralized Future
            </span>{" "}
            Together
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed mb-12">
            Whether you have questions about our tutorials, want to join our
            Academy, or need professional Web3 development services, we&apos;d
            love to hear from you!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="group bg-gradient-to-r from-[#D2145A] to-[#FF4081] text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-500 hover:scale-105 hover:shadow-2xl">
              <span className="flex items-center gap-2">
                Get In Touch
                <svg
                  className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </span>
            </button>
            <button className="group bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-2 border-[#D2145A] text-[#D2145A] px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 hover:bg-[#D2145A] hover:text-white">
              Book Mentorship
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
