// Call-to-Action Section
const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-[#D2145A] to-[#FF4081] relative overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>

      {/* Floating Elements */}
      <div className="absolute top-10 left-20 w-6 h-6 bg-white/20 rounded-full animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-8 h-8 bg-white/10 rounded-full animate-bounce"></div>
      <div className="absolute top-1/2 left-10 w-4 h-4 bg-white/30 rounded-full animate-ping"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center">
          <h2 className="text-4xl md:text-6xl font-cambo font-normal text-white mb-8">
            Ready to Start Your{" "}
            <span className="text-white/80">Web3 Journey?</span>
          </h2>

          <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto mb-12 leading-relaxed">
            Whether you&apos;re looking to master blockchain development, launch
            a groundbreaking dApp, or hire top Web3 talent, we&apos;re here to
            make it happen.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <button className="bg-white text-[#D2145A] px-10 py-4 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 hover:shadow-xl">
              Get Started Today
            </button>
            <button className="border-2 border-white/50 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-white/10 hover:border-white transition-all duration-300 hover:scale-105">
              View All Services
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">5,000+</div>
              <div className="text-white/70">Community Members</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">100+</div>
              <div className="text-white/70">Projects Delivered</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">8+</div>
              <div className="text-white/70">Years Experience</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
