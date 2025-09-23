import { useRouter } from "next/navigation";

// Mentorship Booking Section
const MentorshipSection = () => {
  const router = useRouter();

  const scrollToWhyChooseSection = () => {
    const contactFormSection = document.getElementById("contact-form-section");
    if (contactFormSection) {
      contactFormSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="py-20 bg-gradient-to-r from-[#D2145A] to-[#FF4081] relative overflow-hidden">
      <div className="absolute inset-0 bg-black/10"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-cambo font-normal text-white mb-6">
            Book a Mentorship Session
          </h2>
          <p className="text-xl text-white/90 max-w-4xl mx-auto leading-relaxed">
            Ready to take your Web3 skills to the next level? Schedule a
            one-on-one mentorship session with our expert blockchain developers.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-3xl mb-6">
              🎯
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">
              Personalized Guidance
            </h3>
            <p className="text-white/80 leading-relaxed">
              Get tailored advice for your specific goals, from beginner to
              advanced topics like DeFi, NFTs, or decentralized storage.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-3xl mb-6">
              🛠️
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">
              Hands-on Support
            </h3>
            <p className="text-white/80 leading-relaxed">
              Debug smart contracts, design dApps, or navigate specific
              blockchains like Solana or Alephium with expert help.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-3xl mb-6">
              🚀
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">
              Accelerated Learning
            </h3>
            <p className="text-white/80 leading-relaxed">
              Skip months of trial and error with direct guidance from
              experienced blockchain developers and educators.
            </p>
          </div>
        </div>

        <div className="text-center mt-12">
          <div className="space-y-4">
            <p className="text-white/90 text-lg">
              <strong>How to Book:</strong> Head over to the services page or
              Email us
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={scrollToWhyChooseSection}
                className="bg-white text-[#D2145A] px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105"
              >
                Email Us
              </button>
              <button
                onClick={() => router.push("/services")}
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white hover:text-[#D2145A] transition-all duration-300"
              >
                Our Services
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MentorshipSection;
