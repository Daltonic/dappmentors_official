// Technical Writing Section
import { Service } from "@/utils/interfaces";
import ServiceCard from "../shared/ServiceCard";

interface TechnicalWritingSectionProps {
  onGetQuote: (service: Service) => void;
}

const TechnicalWritingSection = ({
  onGetQuote,
}: TechnicalWritingSectionProps) => {
  const writingServices: Partial<Service>[] = [
    {
      title: "Technical Articles & Blogs",
      description:
        "Engaging, informative content on Web3 topics, including tutorials, thought leadership pieces, and project case studies.",
      icon: "📝",
      features: ["Medium", "Dev.to", "Your Blog", "Technical Publications"],
      price: "Custom",
      type: "Writing",
    },
    {
      title: "Documentation",
      description:
        "Clear, user-friendly documentation for your dApps, smart contracts, or developer tools to enhance usability and adoption.",
      icon: "📖",
      features: [
        "API Docs",
        "User Guides",
        "Developer Docs",
        "Integration Guides",
      ],
      price: "Custom",
      type: "Writing",
    },
    {
      title: "Whitepapers & Pitch Decks",
      description:
        "Craft compelling whitepapers and pitch decks to showcase your Web3 project to investors and stakeholders.",
      icon: "📊",
      features: [
        "Investor Decks",
        "Technical Papers",
        "Project Overviews",
        "Token Economics",
      ],
      price: "Custom",
      type: "Writing",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-r from-[#D2145A] to-[#FF4081] relative overflow-hidden">
      <div className="absolute inset-0 bg-black/10"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-cambo font-normal text-white mb-6">
            Technical Writing & Content Creation
          </h2>
          <p className="text-xl text-white/90 max-w-4xl mx-auto">
            Elevate your brand&apos;s presence in the Web3 space with
            high-quality technical content.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {writingServices.map((service, index) => (
            <ServiceCard
              key={index}
              service={service as Service}
              onGetQuote={onGetQuote}
              transparent
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechnicalWritingSection;
