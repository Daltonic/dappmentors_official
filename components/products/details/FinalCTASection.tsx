import { Product } from "@/utils/interfaces";

// Final CTA Section
interface FinalCTAProps {
  product: Product;
  onEnroll: () => void;
}

const FinalCTASection: React.FC<FinalCTAProps> = ({ product, onEnroll }) => {
  return (
    <section className="py-20 bg-gradient-to-r from-[#D2145A] to-[#FF4081] relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        <h2 className="text-4xl md:text-6xl font-cambo font-normal text-white mb-8">
          Ready to Transform Your Career?
        </h2>

        <p className="text-xl text-white/90 mb-12 leading-relaxed">
          Join {(product.studentsEnrolled || 0).toLocaleString()}+ students who
          are already building the future with blockchain technology.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
          <div className="flex items-center gap-2 text-white">
            <span className="text-2xl">✓</span>
            <span>30-day money-back guarantee</span>
          </div>
          <div className="flex items-center gap-2 text-white">
            <span className="text-2xl">✓</span>
            <span>Lifetime access</span>
          </div>
          <div className="flex items-center gap-2 text-white">
            <span className="text-2xl">✓</span>
            <span>Expert support</span>
          </div>
        </div>

        <button
          onClick={onEnroll}
          className="group bg-white text-[#D2145A] px-12 py-6 rounded-2xl font-bold text-xl transition-all duration-500 hover:scale-105 hover:shadow-2xl"
        >
          <span className="flex items-center gap-3">
            Enroll Now - ${product.price}
            <svg
              className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </span>
        </button>
      </div>
    </section>
  );
};

export default FinalCTASection;
