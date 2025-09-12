// Web3 Education Section
import { Service } from "@/utils/interfaces";
import ServiceCard from "../shared/ServiceCard";

interface EducationSectionProps {
  onGetQuote: (service: Service) => void;
}

const EducationSection = ({ onGetQuote }: EducationSectionProps) => {
  const educationServices: Partial<Service>[] = [
    {
      title: "Free Tutorials",
      description:
        "Access our YouTube channel and blog for step-by-step guides on Web3 development, covering Solidity, Rust, Next.js, and blockchains like Solana, Alephium, Sia, and ICP Bitfinity.",
      features: [
        "YouTube Channel",
        "Blog Tutorials",
        "Real-world Projects",
        "Multiple Blockchains",
      ],
      icon: "📚",
      price: "Free",
      type: "Education",
    },
    {
      title: "Dapp Mentors Academy",
      description:
        "Join our premium membership platform for exclusive access to in-depth courses, books, and video content. Master advanced topics like DeFi, NFTs, and decentralized storage.",
      features: [
        "Premium Courses",
        "Exclusive Books",
        "Video Content",
        "Advanced Topics",
      ],
      icon: "🎓",
      price: "Premium",
      type: "Education",
    },
    {
      title: "Live Workshops & Hackathons",
      description:
        "Participate in virtual workshops and hackathons to gain hands-on experience, collaborate with peers, and showcase your skills in the Web3 ecosystem.",
      features: [
        "Virtual Workshops",
        "Hackathons",
        "Peer Collaboration",
        "Skill Showcase",
      ],
      icon: "⚡",
      price: "Event-based",
      type: "Education",
    },
  ];

  return (
    <section className="py-20 bg-white dark:bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-cambo font-normal text-gray-900 dark:text-white mb-6">
            Web3 Development Education
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
            Unlock the skills to build cutting-edge decentralized applications
            with our expertly crafted educational resources.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {educationServices.map((service, index) => (
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

export default EducationSection;
