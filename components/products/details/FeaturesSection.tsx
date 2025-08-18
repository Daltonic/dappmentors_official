// Features Section
import { ProductFeature } from "@/utils/interfaces";

interface FeaturesProps {
  features: ProductFeature[];
}

const FeaturesSection: React.FC<FeaturesProps> = ({ features }) => {
  return (
    <section className="py-20 bg-white dark:bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-cambo font-normal text-gray-900 dark:text-white mb-6">
            What You&apos;ll Master
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Comprehensive learning experience designed to transform you into a
            professional developer
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="group text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-[#D2145A] to-[#FF4081] rounded-3xl flex items-center justify-center text-3xl mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
