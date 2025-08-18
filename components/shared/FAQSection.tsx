"use client";

import { FAQs } from "@/utils/interfaces";
import { useState } from "react";

// FAQ Section
interface FAQProps {
  faqs: FAQs[];
  title?: string;
  subtitle?: string;
  sectionClassName?: string;
}

const FAQSection: React.FC<FAQProps> = ({
  faqs,
  title = "Frequently Asked Questions",
  subtitle = "Everything you need to know about this product",
  sectionClassName = "",
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      className={`py-20 bg-gradient-to-br from-gray-50 to-purple-50 dark:from-[#1A1A1A] dark:to-purple-900/10 ${sectionClassName}`}
    >
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-cambo font-normal text-gray-900 dark:text-white mb-6">
            {title}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">{subtitle}</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden"
            >
              <button
                className="w-full px-8 py-6 text-left flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-bold text-gray-900 dark:text-white text-lg">
                  {faq.question}
                </span>
                <span
                  className={`transform transition-transform ${openIndex === index ? "rotate-180" : ""}`}
                >
                  ▼
                </span>
              </button>
              {openIndex === index && (
                <div className="px-8 pb-6">
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
