// Contact Methods Section
const ContactMethodsSection = () => {
  const contactMethods = [
    {
      title: "Email",
      description:
        "Drop us a message for inquiries about our courses, mentorship programs, or professional services.",
      contact: "contact@dappmentors.org",
      responseTime: "24-48 hours",
      icon: "📧",
      gradient: "from-emerald-500 to-teal-500",
      bgPattern: "emerald",
    },
    {
      title: "Discord",
      description:
        "Join our vibrant community to connect with fellow Web3 developers and ask questions in real-time.",
      contact: "discord.gg/dappmentors",
      responseTime: "Real-time",
      icon: "💬",
      gradient: "from-indigo-500 to-purple-500",
      bgPattern: "indigo",
    },
    {
      title: "LinkedIn",
      description:
        "Follow us for updates on Web3 trends, new tutorials, and networking opportunities.",
      contact: "linkedin.com/company/dappmentors",
      responseTime: "1-2 business days",
      icon: "💼",
      gradient: "from-blue-500 to-blue-600",
      bgPattern: "blue",
    },
    {
      title: "X (Twitter)",
      description:
        "Stay in the loop with the latest Web3 news, tips, and community updates.",
      contact: "@DappMentors",
      responseTime: "Same day",
      icon: "🐦",
      gradient: "from-gray-600 to-gray-800",
      bgPattern: "gray",
    },
    {
      title: "YouTube",
      description:
        "Subscribe to our channel for free tutorials and leave a comment to connect with us!",
      contact: "youtube.com/@dappmentors",
      responseTime: "1-3 days",
      icon: "📺",
      gradient: "from-red-500 to-pink-500",
      bgPattern: "red",
    },
  ];

  return (
    <section className="py-20 bg-white dark:bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-0.5 bg-gradient-to-r from-[#D2145A] to-[#FFBAD4]"></div>
            <span className="text-[#D2145A] font-semibold text-sm uppercase tracking-wider">
              Get In Touch
            </span>
            <div className="w-12 h-0.5 bg-gradient-to-r from-[#FFBAD4] to-[#D2145A]"></div>
          </div>

          <h2 className="text-4xl md:text-5xl font-cambo font-normal text-gray-900 dark:text-white mb-6">
            Multiple Ways to Connect
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Choose your preferred communication channel and we&apos;ll get back
            to you soon!
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {contactMethods.map((method, index) => (
            <div
              key={index}
              className="group relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl p-8 hover:shadow-2xl transition-all duration-700 border border-gray-200/50 dark:border-gray-700/50 hover:border-transparent overflow-hidden"
            >
              {/* Gradient Background on Hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${method.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
              ></div>

              {/* Floating Icon */}
              <div
                className={`w-16 h-16 bg-gradient-to-br ${method.gradient} rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 relative z-10`}
              >
                {method.icon}
              </div>

              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {method.title}
              </h3>

              <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                {method.description}
              </p>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-gradient-to-r from-[#D2145A] to-[#FF4081] rounded-full"></div>
                  <span className="font-semibold text-gray-900 dark:text-white text-sm">
                    {method.contact}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-gradient-to-r from-[#FFBAD4] to-[#D2145A] rounded-full"></div>
                  <span className="text-gray-600 dark:text-gray-400 text-sm">
                    Response time: {method.responseTime}
                  </span>
                </div>
              </div>

              <button
                className={`mt-6 w-full py-3 px-6 bg-gradient-to-r ${method.gradient} text-white rounded-xl font-semibold text-sm transition-all duration-300 hover:shadow-lg group-hover:scale-105`}
              >
                Connect Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactMethodsSection;
