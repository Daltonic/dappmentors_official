// Developer Hiring Section
import { Service } from "@/utils/interfaces";
import ServiceCard from "../shared/ServiceCard";

interface DeveloperHiringSectionProps {
  onGetQuote: (service: Service) => void;
}

const DeveloperHiringSection = ({
  onGetQuote,
}: DeveloperHiringSectionProps) => {
  const hiringServices: Partial<Service>[] = [
    {
      title: "Hiring Support",
      description:
        "Source and vet developers proficient in Solidity, Rust, and modern Web3 frameworks to join your team.",
      icon: "🔍",
      features: [
        "Candidate Sourcing",
        "Technical Screening",
        "Interview Support",
        "Onboarding Assistance",
      ],
      price: "Custom",
      type: "Hiring",
    },
    {
      title: "Project-Based Talent",
      description:
        "Hire our in-house developers for short-term or long-term projects, ensuring high-quality deliverables.",
      icon: "👥",
      features: [
        "Dedicated Developers",
        "Project Management",
        "Quality Assurance",
        "Timely Delivery",
      ],
      price: "Custom",
      type: "Hiring",
    },
    {
      title: "Community Talent Pool",
      description:
        "Leverage our network of over 5,000+ Web3 developers to find the right fit for your needs.",
      icon: "🌐",
      features: [
        "Network Access",
        "Talent Matching",
        "Skill Verification",
        "Community Integration",
      ],
      price: "Custom",
      type: "Hiring",
    },
  ];

  return (
    <section className="py-20 bg-white dark:bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-cambo font-normal text-gray-900 dark:text-white mb-6">
            Developer Hiring & Team Building
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
            Need top-tier Web3 talent for your project? We connect you with
            skilled blockchain developers from our community.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {hiringServices.map((service, index) => (
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

export default DeveloperHiringSection;
