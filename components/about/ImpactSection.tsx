// Impact Section
const ImpactSection = () => {
  const stats = [
    { number: "5,450+", label: "YouTube Subscribers", icon: "📺" },
    { number: "50+", label: "LinkedIn Followers", icon: "💼" },
    { number: "1000+", label: "Tutorial Views", icon: "👀" },
    { number: "8+", label: "Years Experience", icon: "⭐" },
  ];

  return (
    <section className="py-20 bg-gradient-to-r from-[#D2145A] to-[#FF4081] relative overflow-hidden">
      <div className="absolute inset-0 bg-black/10"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-cambo font-normal text-white mb-6">
            Our Impact
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Growing community of Web3 enthusiasts and professionals worldwide
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center text-3xl mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                {stat.icon}
              </div>
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                {stat.number}
              </div>
              <div className="text-white/80 font-semibold">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
