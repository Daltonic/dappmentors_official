import { ProductTestimonial } from "@/utils/interfaces";

// Testimonials Section
interface TestimonialsProps {
  testimonials: ProductTestimonial[];
}

const TestimonialsSection: React.FC<TestimonialsProps> = ({ testimonials }) => {
  return (
    <section className="py-20 bg-white dark:bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-cambo font-normal text-gray-900 dark:text-white mb-6">
            What Students Say
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Join thousands of successful developers who transformed their
            careers
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-8"
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-[#D2145A] to-[#FF4081] rounded-full flex items-center justify-center text-2xl mr-4">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {testimonial.role}
                  </p>
                </div>
              </div>
              <div className="flex text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
              <p className="text-gray-700 dark:text-gray-300 italic">
                &quot;{testimonial.comment}&quot;
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
