import { products } from "@/data/global";
import ProductCard from "../shared/ProductCard";

// Bootcamps Section
const BootcampsSection = () => {
  const bootcamps = products.filter((product) => product.type === "Bootcamp");

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
            <ProductCard product={bootcamp} key={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BootcampsSection;
