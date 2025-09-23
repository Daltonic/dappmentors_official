// Mentorship Section
import { Service } from "@/utils/interfaces";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface MentorshipSectionProps {
  services: Service[];
}

const MentorshipSection = ({ services }: MentorshipSectionProps) => {
  const service = services[0];
  const router = useRouter();

  if (!service) {
    return null; // Or render a fallback
  }

  const featureDescriptions = [
    "Book private mentorship to debug code, design dApps, or navigate specific challenges in smart contract development.",
    "Work with mentors to create a personalized roadmap for transitioning from Web2 to Web3, tailored to your goals.",
    "Receive expert advice on building secure, scalable dApps, from ideation to deployment on various blockchains.",
    "Strategize your career path in Web3, identify key skills, and prepare for interviews with leading blockchain companies.",
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-purple-50 dark:from-[#1A1A1A] dark:to-purple-900/10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-cambo font-normal text-gray-900 dark:text-white mb-8">
              {service.title}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              {service.description}
            </p>

            <div className="space-y-6">
              {service.features?.map((feature, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div
                    className={`w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center text-white`}
                  >
                    {index === 0 ? "👨‍🏫" : index === 1 ? "🗺️" : "🚀"}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2">
                      {feature}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {featureDescriptions[index]}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 bg-gradient-to-r from-[#D2145A]/10 to-[#FF4081]/10 rounded-2xl p-6 border border-[#D2145A]/20">
              <p className="text-gray-800 dark:text-gray-200 font-semibold mb-2">
                How to Book:
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Email us at the{" "}
                <Link href="/contact" className="underline font-semibold">
                  contact page
                </Link>{" "}
                or reach out via Discord to schedule your session.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-8 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl blur-2xl"></div>
            <div className="relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl p-8 border border-gray-200/50 dark:border-gray-700/50">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Mentorship Benefits
                </h3>
              </div>

              <div className="space-y-6">
                <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-2xl p-6">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                    Accelerated Learning
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Skip months of trial and error with direct guidance from
                    experts
                  </p>
                </div>

                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-2xl p-6">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                    Real-world Projects
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Work on actual dApp projects that you can add to your
                    portfolio
                  </p>
                </div>

                <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-2xl p-6">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                    Career Guidance
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Get advice on building your Web3 career and landing
                    opportunities
                  </p>
                </div>
              </div>

              <button
                onClick={() => router.push(`/services/${service.slug}`)}
                className="w-full mt-8 bg-gradient-to-r from-[#D2145A] to-[#FF4081] text-white py-4 px-6 rounded-xl font-bold text-lg hover:scale-105 transition-all duration-300"
              >
                Get Quote
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MentorshipSection;
