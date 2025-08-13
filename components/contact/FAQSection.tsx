"use client";

import { useState } from "react";

// FAQ Section
const FAQSection = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqs = [
    {
      question: "How quickly do you respond to inquiries?",
      answer:
        "We aim to respond within 24-48 hours for email inquiries, and provide real-time responses in our Discord community.",
    },
    {
      question: "What blockchain ecosystems do you specialize in?",
      answer:
        "We have expertise in Solana, Alephium, Sia, ICP Bitfinity, and Ethereum, with projects ranging from crowdfunding dApps to decentralized storage systems.",
    },
    {
      question: "Do you offer beginner-friendly content?",
      answer:
        "Absolutely! Our tutorials and courses are designed for all levels, from complete beginners to advanced practitioners. We provide clear learning paths for everyone.",
    },
    {
      question: "Can you help with existing projects?",
      answer:
        "Yes! We offer debugging services, code reviews, and guidance for existing Web3 projects through our mentorship programs.",
    },
    {
      question: "What's included in the Academy membership?",
      answer:
        "Academy members get access to premium courses, exclusive books, video content, and in-depth learning materials on DeFi, NFTs, and decentralized storage solutions.",
    },
  ];

  return (
    <section className="py-20 bg-white dark:bg-[#0A0A0A]">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-cambo font-normal text-gray-900 dark:text-white mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Quick answers to common questions about our services and community
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              <button
                onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300"
              >
                <span className="font-semibold text-lg text-gray-900 dark:text-white">
                  {faq.question}
                </span>
                <svg
                  className={`w-6 h-6 text-[#D2145A] transition-transform duration-300 ${
                    openFAQ === index ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {openFAQ === index && (
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
