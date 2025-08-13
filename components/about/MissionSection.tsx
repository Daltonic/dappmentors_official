// Mission Section
const MissionSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-purple-50 dark:from-[#1A1A1A] dark:to-purple-900/10 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-[#D2145A]/5 to-[#FF4081]/5"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-0.5 bg-gradient-to-r from-[#D2145A] to-[#FFBAD4]"></div>
            <span className="text-[#D2145A] font-semibold text-sm uppercase tracking-wider">
              Our Mission
            </span>
            <div className="w-12 h-0.5 bg-gradient-to-r from-[#FFBAD4] to-[#D2145A]"></div>
          </div>

          <h2 className="text-4xl md:text-6xl font-cambo font-normal text-gray-900 dark:text-white mb-8 max-w-4xl mx-auto">
            Democratizing Web3 Development Through{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D2145A] to-[#FF4081]">
              Education & Mentorship
            </span>
          </h2>

          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
            We aim to empower individuals and groups to build innovative,
            secure, and scalable decentralized applications that leverage the
            power of blockchain technology. Whether you&apos;re a seasoned
            developer or just starting out, we&apos;re here to help you navigate
            the complexities of Web3 and turn your ideas into profitable
            creations.
          </p>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
