import {
  EventStruct,
  PostProp,
  PostStruct,
  ProductProp,
  ProductStruct,
  ProjectStruct,
  RecentBlogPageStruct,
} from "@/utils/interfaces";

export const navlinks = [
  { label: "Home", link: "/" },
  { label: "Products", link: "/products" },
  { label: "Services", link: "/services" },
  { label: "About", link: "/about" },
  { label: "Contact", link: "/contact" },
  { label: "Blogs", link: "/blogs" },
];

export const events: EventStruct[] = [
  {
    id: 1,
    title: "Web3 Submit",
    image: "/images/home/Content(9).png",
    slug: "web3_submit_lagos",
    description:
      "Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator lipsum as it is sometimes know information on its origins, as well as a random Lip sum gen m Ipsum, giving information on its origins, as well as a ran dom Lipsum generator ls origins, as well as a ranwell as ai orem Ipsum, giving information on.",
    objective:
      "Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator lipsum as it is sometimes know information on its origins, as well as a random Lip sum gen m Ipsum, giving information on its origins, as well as a ran dom Lipsum generator ls origins, as well as a ranwell as ai orem Ipsum, giving information on.",
    involvement:
      "Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator lipsum as it is sometimes know information on its origins, as well as a random Lip sum gen m Ipsum, giving information on its origins, as well as a ran dom Lipsum generator ls origins, as well as a ranwell as ai orem Ipsum, giving information on.",
  },
  {
    id: 2,
    title: "Hackathon Lagos",
    image: "/images/home/Content(10).png",
    slug: "hackathon_lagos",
    description:
      "Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator lipsum as it is sometimes know information on its origins, as well as a random Lip sum gen m Ipsum, giving information on its origins, as well as a ran dom Lipsum generator ls origins, as well as a ranwell as ai orem Ipsum, giving information on.",
    objective:
      "Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator lipsum as it is sometimes know information on its origins, as well as a random Lip sum gen m Ipsum, giving information on its origins, as well as a ran dom Lipsum generator ls origins, as well as a ranwell as ai orem Ipsum, giving information on.",
    involvement:
      "Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator lipsum as it is sometimes know information on its origins, as well as a random Lip sum gen m Ipsum, giving information on its origins, as well as a ran dom Lipsum generator ls origins, as well as a ranwell as ai orem Ipsum, giving information on.",
  },
  {
    id: 3,
    title: "Los Angeles Codes",
    image: "/images/home/EmpowerSection.jpeg",
    slug: "los_angeles_code",
    description:
      "Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator lipsum as it is sometimes know information on its origins, as well as a random Lip sum gen m Ipsum, giving information on its origins, as well as a ran dom Lipsum generator ls origins, as well as a ranwell as ai orem Ipsum, giving information on.",
    objective:
      "Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator lipsum as it is sometimes know information on its origins, as well as a random Lip sum gen m Ipsum, giving information on its origins, as well as a ran dom Lipsum generator ls origins, as well as a ranwell as ai orem Ipsum, giving information on.",
    involvement:
      "Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator lipsum as it is sometimes know information on its origins, as well as a random Lip sum gen m Ipsum, giving information on its origins, as well as a ran dom Lipsum generator ls origins, as well as a ranwell as ai orem Ipsum, giving information on.",
  },
  {
    id: 4,
    title: "Women in Tech",
    image: "/images/home/Content.png",
    slug: "women_in_tech",
    description:
      "Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator lipsum as it is sometimes know information on its origins, as well as a random Lip sum gen m Ipsum, giving information on its origins, as well as a ran dom Lipsum generator ls origins, as well as a ranwell as ai orem Ipsum, giving information on.",
    objective:
      "Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator lipsum as it is sometimes know information on its origins, as well as a random Lip sum gen m Ipsum, giving information on its origins, as well as a ran dom Lipsum generator ls origins, as well as a ranwell as ai orem Ipsum, giving information on.",
    involvement:
      "Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator lipsum as it is sometimes know information on its origins, as well as a random Lip sum gen m Ipsum, giving information on its origins, as well as a ran dom Lipsum generator ls origins, as well as a ranwell as ai orem Ipsum, giving information on.",
  },
  {
    id: 5,
    title: "Code out of Poverty",
    image: "/images/home/Content 2.png",
    slug: "code_out_of_poverty",
    description:
      "Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator lipsum as it is sometimes know information on its origins, as well as a random Lip sum gen m Ipsum, giving information on its origins, as well as a ran dom Lipsum generator ls origins, as well as a ranwell as ai orem Ipsum, giving information on.",
    objective:
      "Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator lipsum as it is sometimes know information on its origins, as well as a random Lip sum gen m Ipsum, giving information on its origins, as well as a ran dom Lipsum generator ls origins, as well as a ranwell as ai orem Ipsum, giving information on.",
    involvement:
      "Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator lipsum as it is sometimes know information on its origins, as well as a random Lip sum gen m Ipsum, giving information on its origins, as well as a ran dom Lipsum generator ls origins, as well as a ranwell as ai orem Ipsum, giving information on.",
  },
  {
    id: 6,
    title: "2025 Tech Confrence",
    image: "/images/home/Frame 35046.png",
    slug: "2025_tech_confrence",
    description:
      "Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator lipsum as it is sometimes know information on its origins, as well as a random Lip sum gen m Ipsum, giving information on its origins, as well as a ran dom Lipsum generator ls origins, as well as a ranwell as ai orem Ipsum, giving information on.",
    objective:
      "Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator lipsum as it is sometimes know information on its origins, as well as a random Lip sum gen m Ipsum, giving information on its origins, as well as a ran dom Lipsum generator ls origins, as well as a ranwell as ai orem Ipsum, giving information on.",
    involvement:
      "Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator lipsum as it is sometimes know information on its origins, as well as a random Lip sum gen m Ipsum, giving information on its origins, as well as a ran dom Lipsum generator ls origins, as well as a ranwell as ai orem Ipsum, giving information on.",
  },
];

export const months = [
  "JAN 2024",
  "FEB 2024",
  "MAR 2024",
  "APR 2024",
  "MAY 2024",
  "JUN 2024",
  "JUL 2024",
  "AUG 2024",
  "SEP 2024",
  "OCT 2024",
  "NOV 2024",
  "DEC 2024",
];

export const posts: PostStruct[] = [
  {
    id: 1,
    title: "HopeHarbor Fundraiser - India",
    date: "Nov 21, 2023",
    description:
      "Lorem ipsum dolor sit amet consectetur. Pharetra sit lorem sed convallis vulputate.",
    image: "/images/blog/Content.png",
    slug: "hope_harbor_fundraiser_india",
  },
  {
    id: 2,
    title: "Children’s Upliftment Quest",
    date: "Nov 21, 2023",
    description:
      "Lorem ipsum dolor sit amet consectetur. Pharetra sit lorem sed convallis vulputate.",
    image: "/images/blog/Content1.png",
    slug: "childrens_upliftment_quest",
  },
  {
    id: 3,
    title: "HopeHarbor Fundraiser - Syria",
    date: "Nov 21, 2023",
    description:
      "Lorem ipsum dolor sit amet consectetur. Pharetra sit lorem sed convallis vulputate.",
    image: "/images/blog/Content(1).png",
    slug: "hope_harbor_fundraiser_syria",
  },
  {
    id: 4,
    title: "HopeHarbor Fundraiser - Syria",
    date: "Nov 21, 2023",
    description:
      "Lorem ipsum dolor sit amet consectetur. Pharetra sit lorem sed convallis vulputate.",
    image: "/images/blog/Content(2).png",
    slug: "hope_harbor_fundraiser_syria_2",
  },
  {
    id: 5,
    title: "Children’s Upliftment Quest",
    date: "Nov 21, 2023",
    description:
      "Lorem ipsum dolor sit amet consectetur. Pharetra sit lorem sed convallis vulputate.",
    image: "/images/blog/Content(3).png",
    slug: "childrens_upliftment_quest_2",
  },
  {
    id: 6,
    title: "HopeHarbor Fundraiser - Syria",
    date: "Nov 21, 2023",
    description:
      "Lorem ipsum dolor sit amet consectetur. Pharetra sit lorem sed convallis vulputate.",
    image: "/images/blog/Content(4).png",
    slug: "hope_harbor_fundraiser_syria_3",
  },
];

export const project: ProjectStruct[] = [
  {
    id: 1,
    title: "Hackathon Competitions",
    description:
      "Innovation thrives in collaboration. Our Hackathon Competition brings together developers to solve real-world problems.",
    image: "/images/home/Content.png",
    raised: 50000,
    goal: 50000,
    completed: true,
    slug: "hackathon_competitions",
  },
  {
    id: 2,
    title: "Computer Gadget Donations",
    description:
      "Help us bridge the digital divide. Through our Computer Gadget Donations program, we provide essential tech to those in need.",
    image: "/images/home/Content 2.png",
    raised: 25000,
    goal: 50000,
    completed: false,
    slug: "computer_gadget_donations",
  },
  {
    id: 3,
    title: "Web3 Events",
    description:
      "Dive into the future of technology with our Web3 initiatives. We host workshops, webinars, and community meetups.",
    image: "/images/home/Content(1).png",
    raised: 25000,
    goal: 50000,
    completed: false,
    slug: "web3_events",
  },
  {
    id: 4,
    title: "Computer Gadget Donations",
    description:
      "Help us bridge the digital divide. Through our Computer Gadget Donations program, we collect and distribute laptops, tablets, and other devices to underprivileged students and families. Your old gadgets can spark new opportunities for learning and growth.",
    image: "/images/home/Content(11).png",
    raised: 25000,
    goal: 50000,
    completed: false,
    slug: "computer_gadget_donations_1",
  },
  {
    id: 5,
    title: "Web3 Events",
    description:
      "Dive into the future of technology with our Web3 initiatives. We host workshops, webinars, and community meetups.",
    image: "/images/home/Content(3).png",
    raised: 25000,
    goal: 50000,
    completed: false,
    slug: "web3_events_1",
  },
  {
    id: 6,
    title: "Hackathon Competitions",
    description:
      "Innovation thrives in collaboration. Our Hackathon Competition brings together developers to solve real-world problems.",
    image: "/images/home/Content(4).png",
    raised: 25000,
    goal: 50000,
    completed: false,
    slug: "hackathon_competitions_1",
  },
];
export const recent: RecentBlogPageStruct[] = [
  {
    id: 1,
    title: "Empowering Youth Through Online Mentorship",
    date: "Nov 21, 2023",
    description: "Discover inspiring stories from our mentorship program.",
    image: "/images/home/Content(9).png",
    slug: "empowering_youth_through_online_mentorship",
  },
  {
    id: 2,
    title: "Web3 for Social Good",
    date: "Nov 21, 2023",
    description:
      "How decentralized technology can revolutionize charitable efforts.",
    image: "/images/home/Content(10).png",
    slug: "web3_for_social_good",
  },
  {
    id: 3,
    title: "The Impact of Gadget Donations",
    date: "Nov 21, 2023",
    description:
      "Real-life testimonials from beneficiaries of our donation program.",
    image: "/images/home/Content(11).png",
    slug: "the_impact_of_gadget_donations",
  },
];

export const menuLinks = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Projects", href: "/dashboard/projects" },
  { name: "Projects", href: "/dashboard/createProject" },
  { name: "Events", href: "/dashboard/events" },
  { name: "Events", href: "/dashboard/createNewEvent" },
  { name: "Donations", href: "/dashboard/donations" },
  { name: "Blogs", href: "/dashboard/blogs" },
  { name: "Blogs", href: "/dashboard/CreateBlog" },
  { name: "Testimonials", href: "/dashboard/createTestimonials" },
  { name: "Volunteers", href: "/dashboard/volunteers" },
  { name: "Users", href: "/dashboard/users" },
  { name: "Users", href: "/dashboard/createNewUsers" },
];

export const buttonLinks: Record<string, string> = {
  "/dashboard/projects": "/dashboard/createProject",
  "/dashboard/events": "/dashboard/createNewEvent",
  "/dashboard/blogs": "/dashboard/createBlog",
  "/dashboard/users": "/dashboard/createNewUsers",
  "/dashboard/testimonials": "/dashboard/createTestimonials",
};

export const products: ProductProp[] = [
  {
    title: "Solana dApp Development Bootcamp",
    description:
      "Build a complete crowdfunding platform in 6 weeks with hands-on instruction. Master Rust, Anchor, and React integration.",
    type: "Bootcamp",
    duration: "6 weeks",
    level: "Intermediate",
    price: "$299",
    image: "🚀",
    imageSrc: "/assets/images/products/solana.jpg",
    alt: "Solana dApp Development Bootcamp",
    gradient: "from-purple-500 to-indigo-500",
    features: [
      "Live Sessions",
      "1-on-1 Mentoring",
      "Project Portfolio",
      "Certificate",
    ],
  },
  {
    title: "Solidity for Smart Contract Development",
    description:
      "Master Ethereum smart contract development with comprehensive modules covering security, testing, and deployment.",
    type: "Course",
    duration: "4 weeks",
    level: "Beginner",
    price: "$199",
    image: "⚡",
    imageSrc: "/assets/images/products/ethereum.jpg",
    alt: "Solidity Smart Contract Development Course",
    gradient: "from-yellow-500 to-orange-500",
    features: [
      "Self-paced",
      "Code Examples",
      "Assignments",
      "Community Access",
    ],
  },
  {
    title: "Decentralized Storage Mastery",
    description:
      "Learn IPFS, Filecoin, and Sia integration for scalable, decentralized data storage solutions in your dApps.",
    type: "EBook",
    duration: "2 weeks",
    level: "Intermediate",
    price: "$149",
    image: "🗄️",
    imageSrc: "/assets/images/products/filecoin.jpg",
    alt: "Decentralized Storage Mastery Course",
    gradient: "from-green-500 to-emerald-500",
    features: ["PDF Guide", "Video Tutorials", "Code Repository", "Updates"],
  },
  {
    title: "DeFi Protocol Development",
    description:
      "Build advanced DeFi protocols with yield farming, liquidity pools, and governance mechanisms.",
    type: "Course",
    duration: "8 weeks",
    level: "Advanced",
    price: "$399",
    image: "💰",
    imageSrc: "/assets/images/products/defi.jpg",
    alt: "DeFi Protocol Development Course",
    gradient: "from-blue-500 to-cyan-500",
    features: [
      "Advanced Projects",
      "Real Protocols",
      "Gas Optimization",
      "Security Audits",
    ],
  },
  {
    title: "NFT Marketplace Creation",
    description:
      "Create and deploy your own NFT marketplace with advanced features like royalties and lazy minting.",
    type: "Course",
    duration: "5 weeks",
    level: "Intermediate",
    price: "$249",
    image: "🎨",
    imageSrc: "/assets/images/products/nft.jpg",
    alt: "NFT Marketplace Creation Course",
    gradient: "from-pink-500 to-rose-500",
    features: [
      "Full Stack",
      "IPFS Integration",
      "Smart Contracts",
      "Frontend UI",
    ],
  },
  {
    title: "Web3 Security Fundamentals",
    description:
      "Learn to identify and prevent common vulnerabilities in smart contracts and dApps.",
    type: "Bootcamp",
    duration: "3 weeks",
    level: "Intermediate",
    price: "$179",
    image: "🔐",
    imageSrc: "/assets/images/products/security.jpg",
    alt: "Web3 Security Fundamentals Course",
    gradient: "from-red-500 to-orange-500",
    features: [
      "Vulnerability Testing",
      "Audit Tools",
      "Best Practices",
      "Case Studies",
    ],
  },
];

export const postx: PostProp[] = [
  {
    title: "How to Build a Solana Crowdfunding dApp: A Step-by-Step Guide",
    excerpt:
      "Learn how to create a decentralized crowdfunding platform on Solana using Rust and Anchor. This comprehensive tutorial walks you through setting up smart contracts, integrating a React front-end, and deploying your dApp.",
    category: "Solana",
    readTime: "15 min read",
    publishDate: "July 15, 2025",
    topics: ["Solana", "Rust", "Anchor", "React", "Smart Contracts"],
    imageSrc: "/assets/images/blogs/solana.jpg",
    alt: "Solana Crowdfunding dApp",
    icon: "🚀",
    gradient: "from-purple-500 to-indigo-500",
    featured: true,
    relatedProduct: "Solana dApp Development Bootcamp",
  },
  {
    title: "Mastering Solidity: Writing Secure Smart Contracts for Ethereum",
    excerpt:
      "A beginner-friendly guide to writing secure, upgradable smart contracts using Solidity. Includes best practices to avoid vulnerabilities like reentrancy attacks and comprehensive security patterns.",
    category: "Smart Contracts",
    readTime: "12 min read",
    publishDate: "June 28, 2025",
    topics: ["Solidity", "Ethereum", "Security", "Truffle", "Hardhat"],
    imageSrc: "/assets/images/blogs/ethereum.jpg",
    alt: "Solidity Smart Contracts",
    icon: "⚡",
    gradient: "from-yellow-500 to-orange-500",
    featured: true,
    relatedProduct: "Solidity for Smart Contract Development",
  },
  {
    title: "Decentralized Storage 101: Using IPFS, Filecoin, and Sia",
    excerpt:
      "Explore decentralized storage solutions and learn how to integrate IPFS, Filecoin, and Sia into your dApps for secure, scalable data management and enhanced user privacy.",
    category: "Decentralized Storage",
    readTime: "10 min read",
    publishDate: "May 20, 2025",
    topics: ["IPFS", "Filecoin", "Sia", "Storage", "dApp Architecture"],
    imageSrc: "/assets/images/blogs/sia.jpg",
    alt: "Decentralized Storage Solutions",
    icon: "🗄️",
    gradient: "from-green-500 to-emerald-500",
    featured: true,
    relatedProduct:
      "Decentralized Storage: Mastering IPFS, Filecoin, and Sia eBook",
  },
  {
    title: "Building Scalable DeFi Protocols with Polygon",
    excerpt:
      "Discover how to develop decentralized finance (DeFi) applications on Polygon with high scalability and low transaction costs. This guide covers smart contract development and frontend integration.",
    category: "DeFi",
    readTime: "14 min read",
    publishDate: "August 10, 2025",
    topics: ["Polygon", "DeFi", "Smart Contracts", "Web3.js", "Scalability"],
    imageSrc: "/assets/images/blogs/defi.jpg",
    alt: "Polygon DeFi Protocols",
    icon: "💸",
    gradient: "from-blue-500 to-cyan-500",
    featured: true,
    relatedProduct: "Polygon DeFi Development Course",
  },
  {
    title: "NFT Marketplace Development with Flow",
    excerpt:
      "Learn to build a non-fungible token (NFT) marketplace on the Flow blockchain. This tutorial includes setting up Cadence smart contracts and integrating with a Next.js frontend.",
    category: "NFTs",
    readTime: "13 min read",
    publishDate: "July 30, 2025",
    topics: ["Flow", "NFTs", "Cadence", "Next.js", "Blockchain"],
    imageSrc: "/assets/images/blogs/nft.jpg",
    alt: "NFT Marketplace on Flow",
    icon: "🎨",
    gradient: "from-pink-500 to-rose-500",
    featured: true,
    relatedProduct: "NFT Marketplace Development Bootcamp",
  },
  {
    title: "Zero-Knowledge Proofs: A Beginner’s Guide to zk-SNARKs",
    excerpt:
      "Dive into the world of zero-knowledge proofs and learn how to implement zk-SNARKs for privacy-focused blockchain applications. Includes practical examples using Circom and SnarkJS.",
    category: "Privacy",
    readTime: "16 min read",
    publishDate: "June 15, 2025",
    topics: ["zk-SNARKs", "Privacy", "Circom", "SnarkJS", "Cryptography"],
    imageSrc: "/assets/images/blogs/zk.jpg",
    alt: "Zero-Knowledge Proofs",
    icon: "🔒",
    gradient: "from-teal-500 to-blue-500",
    featured: true,
    relatedProduct: "Zero-Knowledge Proofs Masterclass",
  },
];

export const sampleProduct: ProductStruct = {
  id: "solidity-masterclass",
  type: "Course",
  title: "Complete Solidity Smart Contract Development Masterclass",
  subtitle: "Master Ethereum Development from Zero to Professional",
  description:
    "Learn to build production-ready smart contracts and dApps with Solidity, covering security best practices, gas optimization, and real-world project development.",
  longDescription:
    "This comprehensive masterclass takes you from absolute beginner to professional Solidity developer. You'll master smart contract development, security patterns, gas optimization techniques, and build real-world decentralized applications. The course includes hands-on projects, code reviews, and direct access to our community of developers.",
  price: 299,
  originalPrice: 499,
  currency: "USD",
  rating: 4.9,
  totalRatings: 1247,
  studentsEnrolled: 5420,
  duration: "40+ hours",
  level: "All Levels",
  language: "English",
  lastUpdated: "January 2025",
  instructor: {
    name: "Darlington Gospel",
    bio: "Senior Blockchain Developer with 8+ years of experience in Solidity, Rust, and DeFi protocols.",
    avatar: "👨‍💻",
    credentials: [
      "Senior Blockchain Developer",
      "Smart Contract Auditor",
      "DeFi Protocol Architect",
    ],
  },
  features: [
    {
      icon: "🚀",
      title: "Production-Ready Skills",
      description:
        "Learn industry-standard practices used by top DeFi protocols",
    },
    {
      icon: "🔒",
      title: "Security-First Approach",
      description:
        "Master smart contract security patterns and common vulnerabilities",
    },
    {
      icon: "⚡",
      title: "Gas Optimization",
      description:
        "Techniques to minimize transaction costs and improve efficiency",
    },
    {
      icon: "🛠️",
      title: "Real-World Projects",
      description: "Build 5+ complete dApps including DeFi, NFTs, and DAOs",
    },
  ],
  modules: [
    {
      title: "Solidity Fundamentals",
      duration: "8 hours",
      lessons: 15,
      description:
        "Master the basics of Solidity syntax, data types, and contract structure",
    },
    {
      title: "Advanced Smart Contracts",
      duration: "12 hours",
      lessons: 22,
      description:
        "Dive deep into inheritance, libraries, and advanced patterns",
    },
    {
      title: "Security & Best Practices",
      duration: "10 hours",
      lessons: 18,
      description: "Learn security vulnerabilities and how to prevent them",
    },
    {
      title: "DeFi Development",
      duration: "15 hours",
      lessons: 25,
      description: "Build decentralized finance applications and protocols",
    },
  ],
  technologies: [
    "Solidity",
    "Hardhat",
    "OpenZeppelin",
    "React",
    "Web3.js",
    "MetaMask",
  ],
  includes: [
    "40+ hours of video content",
    "5 real-world projects",
    "Smart contract templates",
    "Security audit checklist",
    "Lifetime access",
    "Certificate of completion",
    "Private Discord community",
    "Code reviews & feedback",
  ],
  testimonials: [
    {
      name: "Sarah Chen",
      role: "DeFi Developer at Compound",
      rating: 5,
      comment:
        "This course transformed my understanding of Solidity. The security modules alone are worth the price!",
      avatar: "👩‍💻",
    },
    {
      name: "Marcus Johnson",
      role: "Blockchain Consultant",
      rating: 5,
      comment:
        "Excellent practical approach. I landed my first smart contract job after completing this course.",
      avatar: "👨‍💼",
    },
    {
      name: "Elena Rodriguez",
      role: "Full Stack Developer",
      rating: 5,
      comment:
        "Clear explanations, great projects, and fantastic community support. Highly recommended!",
      avatar: "👩‍🔬",
    },
  ],
  faqs: [
    {
      question: "Do I need prior blockchain experience?",
      answer:
        "No! This course starts from the absolute basics and gradually builds up to advanced concepts. We cover everything you need to know.",
    },
    {
      question: "What if I get stuck on a concept?",
      answer:
        "You'll have access to our private Discord community where you can ask questions and get help from instructors and fellow students.",
    },
    {
      question: "How long do I have access to the course?",
      answer:
        "You get lifetime access to all course materials, including future updates and new content additions.",
    },
    {
      question: "Is there a money-back guarantee?",
      answer:
        "Yes! We offer a 30-day money-back guarantee if you're not satisfied with the course content.",
    },
  ],
  imageUrl: "/assets/images/products/solana.jpg",
  category: "Smart Contracts",
  tags: ["Solidity", "Ethereum", "DeFi", "Security", "Best Practices"],
};
