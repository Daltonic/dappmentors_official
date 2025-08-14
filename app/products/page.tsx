import MarketingLayout from "@/components/layouts/MarketingLayout";

// Hero Section Component
const ProductsHeroSection = () => {
  return (
    <section className="relative w-full bg-gradient-to-br from-gray-50 via-white to-purple-50 dark:from-gray-900 dark:via-[#0A0A0A] dark:to-purple-900/20 py-20 lg:py-32 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        ></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-4 h-4 bg-[#D2145A]/30 rounded-full animate-pulse"></div>
      <div className="absolute top-40 right-20 w-6 h-6 bg-[#FF4081]/20 rounded-full animate-ping"></div>
      <div className="absolute bottom-32 left-1/4 w-3 h-3 bg-purple-500/40 rounded-full animate-bounce"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-[#D2145A]/10 to-[#FFBAD4]/10 backdrop-blur-sm rounded-full px-6 py-2 mb-8 animate-pulse">
            <span className="text-[#D2145A] font-semibold text-sm uppercase tracking-wider">
              Premium Products
            </span>
            <div className="w-2 h-2 bg-[#D2145A] rounded-full animate-pulse"></div>
          </div>

          <h1 className="font-cambo text-5xl md:text-7xl lg:text-8xl font-normal tracking-tight text-gray-900 dark:text-white mb-8">
            Master{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D2145A] to-[#FF4081] animate-pulse">
              Web3 Development
            </span>{" "}
            with Our Premium Products
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-5xl mx-auto leading-relaxed">
            Expertly crafted courses, bootcamps, codebases, and eBooks designed
            to transform you into a confident blockchain developer.
          </p>
        </div>
      </div>
    </section>
  );
};

// Premium Courses Section
const PremiumCoursesSection = () => {
  const courses = [
    {
      title: "Solidity for Smart Contract Development",
      description:
        "Master Ethereum smart contract development with Solidity, from basics to advanced patterns and security best practices.",
      duration: "40+ hours",
      level: "Beginner to Advanced",
      price: "$299",
      features: [
        "Video Lessons",
        "Hands-on Projects",
        "Certificate",
        "Lifetime Access",
      ],
      icon: "⚡",
      gradient: "from-yellow-500 to-orange-500",
      popular: false,
    },
    {
      title: "Building DeFi Platforms on Solana",
      description:
        "Learn to build decentralized finance applications on Solana using Rust and the Anchor framework.",
      duration: "35+ hours",
      level: "Intermediate",
      price: "$399",
      features: [
        "Live Projects",
        "Rust Programming",
        "Anchor Framework",
        "DeFi Protocols",
      ],
      icon: "💰",
      gradient: "from-emerald-500 to-teal-500",
      popular: true,
    },
    {
      title: "Rust Programming for Blockchain Applications",
      description:
        "Deep dive into Rust programming specifically for blockchain development on modern platforms.",
      duration: "30+ hours",
      level: "Intermediate",
      price: "$349",
      features: [
        "Rust Fundamentals",
        "Blockchain Integration",
        "Performance Optimization",
        "Security Patterns",
      ],
      icon: "🦀",
      gradient: "from-red-500 to-pink-500",
      popular: false,
    },
  ];

  return (
    <section className="py-20 bg-white dark:bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-0.5 bg-gradient-to-r from-[#D2145A] to-[#FFBAD4]"></div>
            <span className="text-[#D2145A] font-semibold text-sm uppercase tracking-wider">
              Premium Courses
            </span>
            <div className="w-12 h-0.5 bg-gradient-to-r from-[#FFBAD4] to-[#D2145A]"></div>
          </div>

          <h2 className="text-4xl md:text-5xl font-cambo font-normal text-gray-900 dark:text-white mb-6">
            In-Depth Video Courses
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
            Comprehensive, expert-led online courses covering Solidity, Rust,
            and modern tech stacks with hands-on projects.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <div
              key={index}
              className="group relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl p-8 hover:shadow-2xl transition-all duration-700 border border-gray-200/50 dark:border-gray-700/50 hover:border-transparent overflow-hidden"
            >
              {course.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-[#D2145A] to-[#FF4081] text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                    Most Popular
                  </div>
                </div>
              )}

              <div
                className={`absolute inset-0 bg-gradient-to-br ${course.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl`}
              ></div>

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${course.gradient} rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}
                  >
                    {course.icon}
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-gray-900 dark:text-white">
                      {course.price}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      One-time payment
                    </div>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {course.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  {course.description}
                </p>

                <div className="flex justify-between items-center mb-6 text-sm">
                  <span className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-gray-700 dark:text-gray-300">
                    {course.duration}
                  </span>
                  <span className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-gray-700 dark:text-gray-300">
                    {course.level}
                  </span>
                </div>

                <div className="space-y-3 mb-8">
                  {course.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-gradient-to-r from-[#D2145A] to-[#FF4081] rounded-full"></div>
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                <button
                  className={`w-full py-3 px-6 bg-gradient-to-r ${course.gradient} text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg`}
                >
                  Enroll Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Bootcamps Section
const BootcampsSection = () => {
  const bootcamps = [
    {
      title: "Solana dApp Development Bootcamp",
      description:
        "4-week intensive program to master Solana development with Rust and Anchor framework.",
      duration: "4 weeks",
      schedule: "Virtual",
      price: "$899",
      nextDate: "March 2025",
      features: [
        "Live Coding Sessions",
        "Group Projects",
        "Mentor Support",
        "Discord Community",
      ],
      gradient: "from-purple-500 to-indigo-500",
    },
    {
      title: "Advanced Smart Contract Design & Security",
      description:
        "8-week deep dive into secure smart contract architecture and advanced development patterns.",
      duration: "8 weeks",
      schedule: "Hybrid",
      price: "$1,299",
      nextDate: "April 2025",
      features: [
        "Security Audits",
        "Real-world Projects",
        "Expert Feedback",
        "Certificate",
      ],
      gradient: "from-red-500 to-pink-500",
    },
    {
      title: "Full-Stack Web3 Development with Next.js",
      description:
        "6-week comprehensive program covering full-stack dApp development with modern frameworks.",
      duration: "6 weeks",
      schedule: "Virtual",
      price: "$1,099",
      nextDate: "May 2025",
      features: [
        "Next.js & React",
        "TypeScript",
        "Web3 Integration",
        "Portfolio Projects",
      ],
      gradient: "from-blue-500 to-cyan-500",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-purple-50 dark:from-[#1A1A1A] dark:to-purple-900/10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-cambo font-normal text-gray-900 dark:text-white mb-6">
            Intensive Web3 Bootcamps
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
            Accelerate your Web3 expertise with our immersive bootcamps designed
            to transform you into a confident blockchain developer.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {bootcamps.map((bootcamp, index) => (
            <div
              key={index}
              className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl p-8 border border-gray-200/50 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-500 group"
            >
              <div className="mb-6">
                <div
                  className={`w-20 h-20 bg-gradient-to-br ${bootcamp.gradient} rounded-3xl flex items-center justify-center text-3xl mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}
                >
                  🚀
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-3xl font-bold text-gray-900 dark:text-white">
                      {bootcamp.price}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Full program
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm font-semibold">
                      {bootcamp.nextDate}
                    </div>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {bootcamp.title}
              </h3>

              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                {bootcamp.description}
              </p>

              <div className="flex justify-between items-center mb-6 text-sm">
                <span className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-gray-700 dark:text-gray-300">
                  {bootcamp.duration}
                </span>
                <span className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-gray-700 dark:text-gray-300">
                  {bootcamp.schedule}
                </span>
              </div>

              <div className="space-y-3 mb-8">
                {bootcamp.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-gradient-to-r from-[#D2145A] to-[#FF4081] rounded-full"></div>
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <button
                className={`w-full py-3 px-6 bg-gradient-to-r ${bootcamp.gradient} text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg`}
              >
                Reserve Spot
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Codebases Section
const CodebasesSection = () => {
  const codebases = [
    {
      title: "Solana Crowdfunding dApp Codebase",
      description:
        "Complete crowdfunding platform built with Solana, Rust, React, and Next.js. Production-ready with modular architecture.",
      tech: ["Solana", "Rust", "React", "Next.js", "TypeScript"],
      price: "$199",
      features: [
        "Smart Contracts",
        "Frontend Interface",
        "Documentation",
        "Setup Guides",
      ],
      icon: "💰",
      downloads: "150+",
    },
    {
      title: "Decentralized Voting System Template",
      description:
        "Secure and transparent voting dApp with multi-chain support and advanced governance features.",
      tech: ["Solidity", "React", "Hardhat", "IPFS"],
      price: "$149",
      features: [
        "Governance Tokens",
        "Secure Voting",
        "Result Transparency",
        "Admin Panel",
      ],
      icon: "🗳️",
      downloads: "120+",
    },
    {
      title: "NFT Marketplace Framework",
      description:
        "Full-featured NFT marketplace with minting, trading, and auction capabilities across multiple blockchains.",
      tech: ["Solidity", "Next.js", "Tailwind", "Web3.js"],
      price: "$249",
      features: [
        "Minting System",
        "Trading Platform",
        "Auction Mechanism",
        "User Profiles",
      ],
      icon: "🎨",
      downloads: "200+",
    },
    {
      title: "DeFi Yield Farming Platform",
      description:
        "Advanced yield farming platform with staking, liquidity pools, and reward distribution mechanisms.",
      tech: ["Solidity", "React", "Anchor", "Rust"],
      price: "$299",
      features: [
        "Yield Farming",
        "Liquidity Pools",
        "Reward System",
        "Analytics Dashboard",
      ],
      icon: "🌾",
      downloads: "80+",
    },
  ];

  return (
    <section className="py-20 bg-white dark:bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-cambo font-normal text-gray-900 dark:text-white mb-6">
            Production-Ready Codebases
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
            Jump-start your Web3 projects with our professionally developed,
            fully functional codebases designed for seamless integration.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {codebases.map((codebase, index) => (
            <div
              key={index}
              className="group relative bg-gray-50 dark:bg-gray-900 rounded-3xl p-8 hover:shadow-2xl transition-all duration-700 border border-gray-200/50 dark:border-gray-700/50 hover:border-transparent"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#D2145A]/5 to-[#FF4081]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#D2145A] to-[#FF4081] rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                    {codebase.icon}
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-gray-900 dark:text-white">
                      {codebase.price}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {codebase.downloads} downloads
                    </div>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {codebase.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  {codebase.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {codebase.tech.map((tech, idx) => (
                    <span
                      key={idx}
                      className="bg-gradient-to-r from-[#D2145A]/10 to-[#FF4081]/10 text-[#D2145A] px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="space-y-3 mb-8">
                  {codebase.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-gradient-to-r from-[#D2145A] to-[#FF4081] rounded-full"></div>
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                <button className="w-full bg-gradient-to-r from-[#D2145A] to-[#FF4081] text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  Download Codebase
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// eBooks Section
const EBooksSection = () => {
  const ebooks = [
    {
      title: "The Complete Guide to Solidity Smart Contracts",
      description:
        "Comprehensive guide covering Solidity from basics to advanced patterns, security best practices, and real-world applications.",
      pages: "280+ pages",
      format: "PDF & ePub",
      price: "$49",
      topics: [
        "Solidity Fundamentals",
        "Security Patterns",
        "Gas Optimization",
        "Testing Strategies",
      ],
      icon: "📘",
      rating: "4.9/5",
    },
    {
      title: "Building dApps on Solana: From Zero to Hero",
      description:
        "Step-by-step guide to mastering Solana development with Rust, Anchor framework, and advanced dApp architecture.",
      pages: "320+ pages",
      format: "PDF & ePub",
      price: "$59",
      topics: [
        "Rust Programming",
        "Anchor Framework",
        "Program Architecture",
        "Client Integration",
      ],
      icon: "📗",
      rating: "4.8/5",
    },
    {
      title: "Decentralized Storage: Mastering IPFS, Filecoin, and Sia",
      description:
        "Complete guide to implementing decentralized storage solutions in your Web3 applications with practical examples.",
      pages: "200+ pages",
      format: "PDF & ePub",
      price: "$39",
      topics: [
        "IPFS Integration",
        "Filecoin Networks",
        "Sia Storage",
        "Data Security",
      ],
      icon: "📙",
      rating: "4.7/5",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-r from-[#D2145A] to-[#FF4081] relative overflow-hidden">
      <div className="absolute inset-0 bg-black/10"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-cambo font-normal text-white mb-6">
            Expert Web3 eBooks
          </h2>
          <p className="text-xl text-white/90 max-w-4xl mx-auto">
            Master Web3 concepts with our expertly written eBooks, packed with
            actionable insights and practical guidance.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {ebooks.map((ebook, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-500 group"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  {ebook.icon}
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-white">
                    {ebook.price}
                  </div>
                  <div className="text-white/70 text-sm">★ {ebook.rating}</div>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-white mb-4">
                {ebook.title}
              </h3>

              <p className="text-white/80 mb-6 leading-relaxed">
                {ebook.description}
              </p>

              <div className="flex justify-between items-center mb-6 text-sm">
                <span className="bg-white/20 text-white px-3 py-1 rounded-full">
                  {ebook.pages}
                </span>
                <span className="bg-white/20 text-white px-3 py-1 rounded-full">
                  {ebook.format}
                </span>
              </div>

              <div className="space-y-2 mb-8">
                {ebook.topics.map((topic, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-white/60 rounded-full"></div>
                    <span className="text-white/70 text-sm">{topic}</span>
                  </div>
                ))}
              </div>

              <button className="w-full bg-white text-[#D2145A] py-3 px-6 rounded-xl font-semibold transition-all duration-300 hover:bg-gray-100 hover:scale-105">
                Download eBook
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Why Choose Section
const WhyChooseSection = () => {
  const benefits = [
    {
      title: "Expert-Crafted Content",
      description:
        "Developed by a team with over 8 years of blockchain experience, led by Darlington Gospel.",
      icon: "👨‍💻",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      title: "Practical Focus",
      description:
        "Hands-on learning with real-world projects like crowdfunding dApps, voting systems, and NFT platforms.",
      icon: "🛠️",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      title: "Comprehensive Coverage",
      description:
        "Learn cutting-edge technologies (Solidity, Rust, React, Next.js) and blockchains (Solana, Alephium, Sia).",
      icon: "📚",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      title: "Community Support",
      description:
        "Join our 5,450+ member community on Discord, YouTube, and LinkedIn for networking and growth.",
      icon: "👥",
      gradient: "from-orange-500 to-red-500",
    },
  ];

  return (
    <section className="py-20 bg-white dark:bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-cambo font-normal text-gray-900 dark:text-white mb-6">
            Why Choose Dapp Mentors Products?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
            Our products are designed with your success in mind, providing the
            tools and knowledge you need to excel in Web3.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center group">
              <div
                className={`w-20 h-20 bg-gradient-to-br ${benefit.gradient} rounded-3xl flex items-center justify-center text-3xl mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}
              >
                {benefit.icon}
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

// CTA Section
const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-purple-50 dark:from-[#1A1A1A] dark:to-purple-900/10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center bg-gradient-to-r from-[#D2145A]/5 to-[#FF4081]/5 rounded-3xl p-16">
          <h2 className="text-4xl md:text-5xl font-cambo font-normal text-gray-900 dark:text-white mb-6">
            Start Building the Decentralized Future
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-4xl mx-auto">
            Whether you&apos;re mastering smart contracts, launching a dApp, or
            accelerating your project with ready-to-use codebases, our products
            provide the tools you need to succeed.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button className="bg-gradient-to-r from-[#D2145A] to-[#FF4081] text-white px-10 py-4 rounded-2xl font-bold text-lg hover:scale-105 transition-all duration-300 hover:shadow-xl">
              Explore All Products
            </button>
            <button className="border-2 border-[#D2145A] text-[#D2145A] hover:bg-[#D2145A] hover:text-white px-10 py-4 rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-105">
              Contact Us
            </button>
          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-8 text-center">
            <div className="bg-white/50 dark:bg-gray-900/50 rounded-2xl p-6 backdrop-blur-sm">
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                5,450+
              </div>
              <div className="text-gray-600 dark:text-gray-300">
                Community Members
              </div>
            </div>
            <div className="bg-white/50 dark:bg-gray-900/50 rounded-2xl p-6 backdrop-blur-sm">
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                50+
              </div>
              <div className="text-gray-600 dark:text-gray-300">
                Premium Products
              </div>
            </div>
            <div className="bg-white/50 dark:bg-gray-900/50 rounded-2xl p-6 backdrop-blur-sm">
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                8+
              </div>
              <div className="text-gray-600 dark:text-gray-300">
                Years Experience
              </div>
            </div>
          </div>

          <div className="mt-12 bg-gradient-to-r from-[#D2145A]/10 to-[#FF4081]/10 rounded-2xl p-8 border border-[#D2145A]/20">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Get in Touch
            </h3>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div>
                <p className="text-gray-800 dark:text-gray-200 mb-2">
                  <strong>Website:</strong> dappmentors.org
                </p>
                <p className="text-gray-800 dark:text-gray-200 mb-2">
                  <strong>Email:</strong> contact@dappmentors.org
                </p>
              </div>
              <div>
                <p className="text-gray-800 dark:text-gray-200 mb-2">
                  <strong>Discord:</strong> Join our community
                </p>
                <p className="text-gray-800 dark:text-gray-200 mb-2">
                  <strong>YouTube:</strong> Dapp Mentors Channel
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Main Products Page Component
const Page = () => {
  return (
    <MarketingLayout>
      <ProductsHeroSection />
      <PremiumCoursesSection />
      <BootcampsSection />
      <CodebasesSection />
      <EBooksSection />
      <WhyChooseSection />
      <CTASection />
    </MarketingLayout>
  );
};

export default Page;
