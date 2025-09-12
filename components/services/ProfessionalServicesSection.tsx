// Professional Development Services Section
import { Service } from "@/utils/interfaces";
import ServiceCard from "../shared/ServiceCard";

interface ProfessionalServicesSectionProps {
  onGetQuote: (service: Service) => void;
}

const ProfessionalServicesSection = ({
  onGetQuote,
}: ProfessionalServicesSectionProps) => {
  const services: Partial<Service>[] = [
    {
      title: "Smart Contract Development",
      description:
        "We design, develop, and audit secure smart contracts using Solidity, Rust, and Vyper for blockchains like Solana, Alephium, and Ethereum.",
      icon: "⚡",
      features: [
        "Solidity & Rust",
        "Multi-chain Support",
        "Security Audits",
        "Gas Optimization",
      ],
      price: "Custom",
      type: "Professional",
    },
    {
      title: "Full-Stack dApp Development",
      description:
        "Build robust decentralized applications with front-end technologies (React, Next.js, TypeScript, Tailwind CSS) and back-end frameworks.",
      icon: "🌐",
      features: [
        "React & Next.js",
        "TypeScript",
        "Modern UI/UX",
        "Web3 Integration",
      ],
      price: "Custom",
      type: "Professional",
    },
    {
      title: "Decentralized Storage & Identity",
      description:
        "Integrate decentralized storage (IPFS, Filecoin, Sia, Arweave) and decentralized identity (DID) systems to enhance your dApp's functionality.",
      icon: "🗄️",
      features: [
        "IPFS Integration",
        "Filecoin & Arweave",
        "DID Systems",
        "Data Security",
      ],
      price: "Custom",
      type: "Professional",
    },
    {
      title: "Custom Web3 Projects",
      description:
        "From DeFi platforms to NFT marketplaces and play-to-earn games, we deliver tailored solutions to meet your business needs.",
      icon: "🎮",
      features: [
        "DeFi Platforms",
        "NFT Marketplaces",
        "P2E Games",
        "Custom Solutions",
      ],
      price: "Custom",
      type: "Professional",
    },
    {
      title: "Smart Contract Auditing",
      description:
        "Ensure your smart contracts are secure and optimized with our thorough auditing services, following industry best practices.",
      icon: "🔒",
      features: [
        "Security Analysis",
        "Code Review",
        "Best Practices",
        "Optimization",
      ],
      price: "Custom",
      type: "Professional",
    },
    {
      title: "Technical Architecture",
      description:
        "Get expert guidance on designing scalable, secure, and efficient Web3 architectures for your decentralized applications.",
      icon: "🏗️",
      features: [
        "System Design",
        "Scalability",
        "Security Planning",
        "Performance",
      ],
      price: "Custom",
      type: "Professional",
    },
  ];

  return (
    <section className="py-20 bg-white dark:bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-0.5 bg-gradient-to-r from-[#D2145A] to-[#FFBAD4]"></div>
            <span className="text-[#D2145A] font-semibold text-sm uppercase tracking-wider">
              Professional Services
            </span>
            <div className="w-12 h-0.5 bg-gradient-to-r from-[#FFBAD4] to-[#D2145A]"></div>
          </div>

          <h2 className="text-4xl md:text-5xl font-cambo font-normal text-gray-900 dark:text-white mb-6">
            Professional Web3 Development
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
            Bring your Web3 ideas to life with our end-to-end development
            solutions, built on modern tech stacks and blockchain expertise.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              service={service as Service}
              onGetQuote={onGetQuote}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProfessionalServicesSection;
