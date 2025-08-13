// Connect Section
const ConnectSection = () => {
  const socialLinks = [
    {
      name: "Website",
      url: "dappmentors.org",
      icon: "🌐",
      color: "from-blue-500 to-cyan-500",
    },
    {
      name: "YouTube",
      url: "Dapp Mentors YouTube Channel",
      icon: "📺",
      color: "from-red-500 to-pink-500",
    },
    {
      name: "LinkedIn",
      url: "Dapp Mentors LinkedIn",
      icon: "💼",
      color: "from-blue-600 to-blue-700",
    },
    {
      name: "Discord",
      url: "Join our Discord community",
      icon: "💬",
      color: "from-indigo-500 to-purple-500",
    },
    {
      name: "X (Twitter)",
      url: "Follow us for updates",
      icon: "🐦",
      color: "from-gray-700 to-gray-900",
    },
    {
      name: "Email",
      url: "contact@dappmentors.org",
      icon: "📧",
      color: "from-emerald-500 to-teal-500",
    },
  ];

  return (
    <section className="py-20 bg-white dark:bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-cambo font-normal text-gray-900 dark:text-white mb-6">
            Join the Decentralized Future
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed mb-12">
            Dapp Mentors is more than just a learning platform—its a movement to
            empower developers to shape the future of the internet. Join our
            community today and start building the decentralized applications of
            tomorrow!
          </p>

          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">
            {socialLinks.map((link, index) => (
              <a key={index} href="#" className="group block">
                <div
                  className={`bg-gradient-to-br ${link.color} rounded-2xl p-6 text-white hover:shadow-xl transition-all duration-300 group-hover:scale-105`}
                >
                  <div className="text-3xl mb-3">{link.icon}</div>
                  <h3 className="font-bold text-sm mb-1">{link.name}</h3>
                  <p className="text-xs opacity-80 truncate">{link.url}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConnectSection;
