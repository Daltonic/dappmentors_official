// Footer Section

import Image from "next/image";

const FooterSection = () => {
  const footerLinks = {
    Learn: ["Premium Courses", "Bootcamps", "Free Tutorials", "eBooks"],
    Services: [
      "Smart Contract Development",
      "dApp Development",
      "Technical Writing",
      "Developer Hiring",
    ],
    Community: ["Discord", "YouTube Channel", "LinkedIn", "X (Twitter)"],
    Company: ["About Us", "Blog", "Contact", "Privacy Policy"],
  };

  return (
    <footer className="bg-gray-900 dark:bg-black text-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative">
                <div className="h-10 w-10 rounded-2xl overflow-hidden relative group-hover:scale-110 transition-transform duration-500">
                  <Image
                    src="/assets/images/logo.png"
                    alt="Dapp Mentors Logo"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-2xl"
                    priority
                  />
                </div>
                {/* Animated ring around logo */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#D2145A] to-[#FF4081] opacity-0 group-hover:opacity-20 transition-opacity duration-500 animate-pulse"></div>
              </div>

              <div>
                <h3 className="text-2xl font-bold">Dapp Mentors</h3>
                <p className="text-gray-400 text-sm">Blockchain Academy</p>
              </div>
            </div>

            <p className="text-gray-400 mb-6 leading-relaxed">
              Empowering developers, entrepreneurs, and technologists to excel
              in Web3 and decentralized applications. Join our global community
              and start building the future today.
            </p>

            <div className="flex gap-4">
              <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-[#D2145A] transition-colors duration-300 cursor-pointer">
                <span className="text-lg">📺</span>
              </div>
              <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-[#D2145A] transition-colors duration-300 cursor-pointer">
                <span className="text-lg">💼</span>
              </div>
              <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-[#D2145A] transition-colors duration-300 cursor-pointer">
                <span className="text-lg">🐦</span>
              </div>
              <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-[#D2145A] transition-colors duration-300 cursor-pointer">
                <span className="text-lg">💬</span>
              </div>
            </div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-lg font-semibold mb-4">{title}</h4>
              <ul className="space-y-2">
                {links.map((link, index) => (
                  <li key={index}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors duration-300"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 mb-4 md:mb-0">
              © 2025 Dapp Mentors. All rights reserved.
            </div>
            <div className="flex gap-6 text-gray-400">
              <a
                href="#"
                className="hover:text-white transition-colors duration-300"
              >
                Terms
              </a>
              <a
                href="#"
                className="hover:text-white transition-colors duration-300"
              >
                Privacy
              </a>
              <a
                href="#"
                className="hover:text-white transition-colors duration-300"
              >
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
