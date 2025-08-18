import Image from "next/image";
import Link from "next/link";
import { FaDiscord, FaYoutube, FaLinkedin, FaTwitter } from "react-icons/fa";

const FooterSection = () => {
  // Define footer links based on navlinks and contactMethods
  const footerLinks = {
    Learn: [
      { label: "Premium Courses", link: "/products" },
      { label: "Bootcamps", link: "/products" },
      { label: "Free Tutorials", link: "/blogs" },
      { label: "eBooks", link: "/products" },
    ],
    Services: [
      { label: "Smart Contract Development", link: "/services" },
      { label: "dApp Development", link: "/services" },
      { label: "Technical Writing", link: "/services" },
      { label: "Developer Hiring", link: "/services" },
    ],
    Community: [
      {
        label: "Discord",
        link: "https://discord.gg/PgFDUVT6n9",
        icon: <FaDiscord />,
      },
      {
        label: "YouTube Channel",
        link: "https://youtube.com/@dappmentors",
        icon: <FaYoutube />,
      },
      {
        label: "LinkedIn",
        link: "https://linkedin.com/company/dappmentors",
        icon: <FaLinkedin />,
      },
      {
        label: "X (Twitter)",
        link: "https://twitter.com/iDaltonic",
        icon: <FaTwitter />,
      },
    ],
    Company: [
      { label: "About Us", link: "/about" },
      { label: "Blog", link: "/blogs" },
      { label: "Contact", link: "/contact" },
      { label: "Privacy Policy", link: "/privacy" },
    ],
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
              <a
                href="https://discord.gg/PgFDUVT6n9"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-500 transition-colors duration-300"
              >
                <FaDiscord className="text-lg" />
              </a>
              <a
                href="https://youtube.com/@dappmentors"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gradient-to-r hover:from-red-500 hover:to-pink-500 transition-colors duration-300"
              >
                <FaYoutube className="text-lg" />
              </a>
              <a
                href="https://linkedin.com/company/dappmentors"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-600 transition-colors duration-300"
              >
                <FaLinkedin className="text-lg" />
              </a>
              <a
                href="https://twitter.com/iDaltonic"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gradient-to-r hover:from-gray-600 hover:to-gray-800 transition-colors duration-300"
              >
                <FaTwitter className="text-lg" />
              </a>
            </div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-lg font-semibold mb-4">{title}</h4>
              <ul className="space-y-2">
                {links.map((item, index) => (
                  <li key={index}>
                    {item.link.startsWith("http") ? (
                      <Link
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2"
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <Link
                        href={item.link}
                        className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2"
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 mb-4 md:mb-0">
              © {new Date().getFullYear()} Dapp Mentors. All rights reserved.
            </div>
            <div className="flex gap-6 text-gray-400">
              <Link
                href="/privacy"
                className="hover:text-white transition-colors duration-300"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
