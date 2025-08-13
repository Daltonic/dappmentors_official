// Why Choose Us Section
const WhyChooseUsSection = () => {
  const benefits = [
    {
      title: "Proven Expertise",
      description:
        "Our team brings over eight years of experience in blockchain development, full-stack engineering, and technical education.",
      icon: "🏆",
      stats: "8+ Years Experience",
    },
    {
      title: "Tailored Solutions",
      description:
        "Whether you're learning Web3, building a dApp, or hiring talent, we customize our services to meet your unique goals.",
      icon: "🎯",
      stats: "100% Customized",
    },
    {
      title: "Hands-On Approach",
      description:
        "Our education and development services focus on practical, real-world applications, ensuring actionable skills and deliverable results.",
      icon: "🛠️",
      stats: "Real-world Focus",
    },
    {
      title: "Community-Driven",
      description:
        "We're more than a service provider—we're a community dedicated to advancing Web3 innovation together.",
      icon: "🤝",
      stats: "5,000+ Community",
    },
  ];

  return (
    <section className="py-20 bg-white dark:bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-0.5 bg-gradient-to-r from-[#D2145A] to-[#FFBAD4]"></div>
            <span className="text-[#D2145A] font-semibold text-sm uppercase tracking-wider">
              Why Choose Us
            </span>
            <div className="w-12 h-0.5 bg-gradient-to-r from-[#FFBAD4] to-[#D2145A]"></div>
          </div>

          <h2 className="text-4xl md:text-5xl font-cambo font-normal text-gray-900 dark:text-white mb-6">
            Why Choose Our Services?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
            We combine deep technical expertise with a passion for education and
            community building to deliver exceptional Web3 solutions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="group text-center">
              <div className="relative mb-8">
                <div className="w-24 h-24 bg-gradient-to-br from-[#D2145A] to-[#FF4081] rounded-3xl flex items-center justify-center text-4xl mx-auto group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg">
                  {benefit.icon}
                </div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-900 px-4 py-1 rounded-full text-xs font-bold text-[#D2145A] border-2 border-[#D2145A]/20">
                  {benefit.stats}
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                {benefit.title}
              </h3>

              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
