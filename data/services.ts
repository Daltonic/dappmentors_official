// data/services.ts

export const services = [
  {
    id: "edu-bootcamp-001",
    title: "Blockchain Developer Bootcamp",
    description:
      "An intensive 8-week program covering Solidity, Web3.js, and dApp deployment to turn beginners into full-stack blockchain developers.",
    price: 999,
    status: "active",
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2025-09-23T15:30:00Z",
    featured: true,
    thumbnail:
      "https://github.com/Daltonic/ai_image_list/blob/main/dm_s/01_Blockchain%20Developer%20Bootcamp.png?raw=true",
    slug: "blockchain-developer-bootcamp",
    features: [
      "8 weeks of live sessions",
      "Hands-on projects with real-world dApps",
      "Access to private Discord community",
      "Certificate of completion",
    ],
    faqs: [
      {
        question: "What prerequisites are required?",
        answer: "Basic JavaScript knowledge is recommended.",
      },
      {
        question: "Is there job placement assistance?",
        answer: "Yes, we offer resume reviews and interview prep.",
      },
    ],
    icon: "🧠",
    clients: 0,
    packages: [
      {
        name: "Basic",
        price: "$499",
        features: ["Self-paced videos", "Project templates"],
        popular: false,
      },
      {
        name: "Pro",
        price: "$999",
        features: ["Live sessions", "Mentor feedback", "Community access"],
        popular: true,
      },
      {
        name: "Enterprise",
        price: "$1999",
        features: ["Custom curriculum", "Team training", "Ongoing support"],
        popular: false,
      },
    ],
    type: "Education",
  },
  {
    id: "mentorship-001",
    title: "One-on-One Blockchain Mentorship",
    description:
      "Personalized guidance from experienced developers like Daltonic to accelerate your Web3 career with tailored advice and code reviews.",
    price: "Custom",
    status: "active",
    createdAt: "2024-03-20T09:00:00Z",
    updatedAt: "2025-09-23T15:30:00Z",
    featured: false,
    thumbnail:
      "https://github.com/Daltonic/ai_image_list/blob/main/dm_s/02_One-on-One%20Blockchain%20Mentorship.png?raw=true",
    slug: "one-on-one-blockchain-mentorship",
    features: [
      "Weekly 1-hour calls",
      "Unlimited email support",
      "Portfolio review",
      "Career strategy sessions",
    ],
    faqs: [
      {
        question: "How long is each session?",
        answer: "Sessions are 60 minutes, scheduled flexibly.",
      },
      {
        question: "Can I focus on specific topics?",
        answer: "Absolutely, we customize based on your goals.",
      },
    ],
    icon: "👨‍🏫",
    clients: 0,
    packages: [
      {
        name: "Starter",
        price: "$150/session",
        features: ["Single session", "Code review"],
        popular: false,
      },
      {
        name: "Monthly",
        price: "$500/month",
        features: ["4 sessions", "Priority support"],
        popular: true,
      },
      {
        name: "Quarterly",
        price: "$1200/3 months",
        features: ["12 sessions", "Dedicated roadmap"],
        popular: false,
      },
    ],
    type: "Mentorship",
  },
  {
    id: "prof-dapp-dev-001",
    title: "Custom dApp Development",
    description:
      "End-to-end development of decentralized applications using Solidity, React, and IPFS for secure, scalable Web3 solutions.",
    price: "Starting at $5000",
    status: "active",
    createdAt: "2024-02-10T14:00:00Z",
    updatedAt: "2025-09-23T15:30:00Z",
    featured: true,
    thumbnail:
      "https://github.com/Daltonic/ai_image_list/blob/main/dm_s/03_Custom%20dApp%20Development.png?raw=true",
    slug: "custom-dapp-development",
    features: [
      "Full-stack integration",
      "Smart contract auditing",
      "Deployment on Ethereum/Solana",
      "Post-launch maintenance",
    ],
    faqs: [
      {
        question: "What blockchains do you support?",
        answer: "Ethereum, Solana, Polygon, and more.",
      },
      {
        question: "How long does development take?",
        answer: "Typically 4-12 weeks depending on complexity.",
      },
    ],
    icon: "👨‍💻",
    clients: 0,
    packages: [
      {
        name: "MVP",
        price: "$5000",
        features: ["Basic dApp prototype", "Core smart contracts"],
        popular: false,
      },
      {
        name: "Full Build",
        price: "$15000",
        features: ["Complete UI/UX", "Testing and audit", "Deployment"],
        popular: true,
      },
      {
        name: "Enterprise",
        price: "Custom",
        features: [
          "Scalable architecture",
          "Ongoing support",
          "Integration services",
        ],
        popular: false,
      },
    ],
    type: "Professional",
  },
  {
    id: "writing-001",
    title: "Blockchain Content Writing",
    description:
      "Expert-authored articles, whitepapers, and tutorials on Web3 topics, crafted by Daltonic to engage and educate your audience.",
    price: "Starting at $300",
    status: "active",
    createdAt: "2024-05-05T11:00:00Z",
    updatedAt: "2025-09-23T15:30:00Z",
    featured: false,
    thumbnail:
      "https://github.com/Daltonic/ai_image_list/blob/main/dm_s/04_Blockchain%20Content%20Writing.png?raw=true",
    slug: "blockchain-content-writing",
    features: [
      "SEO-optimized content",
      "Technical accuracy",
      "Multiple formats (blog, whitepaper)",
      "Revision rounds",
    ],
    faqs: [
      {
        question: "What topics do you cover?",
        answer: "DeFi, NFTs, smart contracts, and emerging trends.",
      },
      {
        question: "Turnaround time?",
        answer: "3-7 days for standard articles.",
      },
    ],
    icon: "✍️",
    clients: 0,
    packages: [
      {
        name: "Single Article",
        price: "$300",
        features: ["1000 words", "Basic research"],
        popular: false,
      },
      {
        name: "Content Pack",
        price: "$1000",
        features: ["5 articles", "Custom topics"],
        popular: true,
      },
      {
        name: "Whitepaper",
        price: "$2000",
        features: ["Full technical doc", "Graphics included"],
        popular: false,
      },
    ],
    type: "Writing",
  },
  {
    id: "hiring-001",
    title: "Web3 Talent Hiring",
    description:
      "Streamlined recruitment for blockchain roles, connecting you with vetted developers and experts through our network.",
    price: "10% of first-year salary",
    status: "coming-soon",
    createdAt: "2025-08-01T12:00:00Z",
    updatedAt: "2025-09-23T15:30:00Z",
    featured: false,
    thumbnail:
      "https://github.com/Daltonic/ai_image_list/blob/main/dm_s/05_Web3%20Talent%20Hiring.png?raw=true",
    slug: "web3-talent-hiring",
    features: [
      "Candidate sourcing",
      "Technical screening",
      "Interview facilitation",
      "Onboarding support",
    ],
    faqs: [
      {
        question: "What roles do you fill?",
        answer: "Solidity devs, Web3 engineers, DeFi specialists.",
      },
      {
        question: "Is there a guarantee?",
        answer: "90-day replacement policy.",
      },
    ],
    icon: "👷🏼‍♂️",
    clients: 0,
    packages: [
      {
        name: "Junior Hire",
        price: "8% of salary",
        features: ["Sourcing only"],
        popular: false,
      },
      {
        name: "Senior Hire",
        price: "10% of salary",
        features: ["Full screening", "Interview support"],
        popular: true,
      },
      {
        name: "Team Build",
        price: "Custom",
        features: ["Multiple hires", "Strategy consulting"],
        popular: false,
      },
    ],
    type: "Hiring",
  },
];
