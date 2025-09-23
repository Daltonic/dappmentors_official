import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

// Featured Content Section
const FeaturedContentSection = () => {
  const contentItems = [
    {
      title: "Build a Full-Stack Web3 & AI DApps with Next.js & Solidity",
      type: "YouTube Tutorial",
      views: "5.5K views",
      description:
        "Learn how to build a full-stack AI dApp using Next.js, Solidity, and more.",

      image: "🎥",
      gradient: "from-red-500 to-pink-500",
      url: `https://www.youtube.com/@dappmentors?sub_confirmation=1`,
    },
    {
      title: "Mastering Solidity: Secure Smart Contracts",
      type: "Blog Post",
      views: "1.2K reads",
      description:
        "Essential security patterns and best practices for Ethereum smart contract development",
      image: "📖",
      gradient: "from-blue-500 to-cyan-500",
      url: "https://dev.to/daltonic",
    },
    {
      title: "GitHub Open Source dApp Codebases",
      type: "GitHub Repo",
      views: "800 stars",
      description:
        "Clone the best dApps from our tutorials and explore the codebases on GitHub",
      image: "💾",
      gradient: "from-green-500 to-emerald-500",
      url: "https://github.com/Daltonic",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-purple-50 dark:from-[#1A1A1A] dark:to-purple-900/10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-0.5 bg-gradient-to-r from-[#D2145A] to-[#FFBAD4]"></div>
            <span className="text-[#D2145A] font-semibold text-sm uppercase tracking-wider">
              Free Resources
            </span>
            <div className="w-12 h-0.5 bg-gradient-to-r from-[#FFBAD4] to-[#D2145A]"></div>
          </div>

          <h2 className="text-4xl md:text-5xl font-cambo font-normal text-gray-900 dark:text-white mb-6">
            Featured Tutorials & Insights
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
            Access our growing library of free Web3 tutorials, guides, and
            insights to accelerate your learning journey.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {contentItems.map((item, index) => (
            <div
              key={index}
              className="group relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 border border-gray-200/50 dark:border-gray-700/50 cursor-pointer"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
              ></div>
              <div className="flex items-center gap-4 mb-6">
                <div
                  className={`w-14 h-14 bg-gradient-to-br ${item.gradient} rounded-2xl flex items-center justify-center text-xl group-hover:scale-110 transition-transform duration-300`}
                >
                  {item.image}
                </div>
                <div>
                  <div className="text-sm text-[#D2145A] font-semibold">
                    {item.type}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {item.views}
                  </div>
                </div>
              </div>

              <Link
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#D2145A] hover:text-[#FF4081] font-semibold transition-colors duration-300"
              >
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-[#D2145A] transition-colors duration-300">
                  {item.title}
                </h3>
              </Link>

              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                {item.description}
              </p>

              <Link
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#D2145A] hover:text-[#FF4081] font-semibold transition-colors duration-300"
              >
                Read More →
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/blogs"
            className="group relative bg-gradient-to-r from-[#D2145A] to-[#FF4081] text-white px-10 py-4 rounded-2xl font-semibold text-base transition-all duration-500 hover:scale-105 hover:shadow-2xl overflow-hidden inline-block"
          >
            <span className="relative z-10 flex items-center gap-2">
              Explore All Content
              <FiArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
            <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedContentSection;
