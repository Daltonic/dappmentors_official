import { ArrowRight } from "lucide-react";

// Quote Section
const QuoteSection: React.FC<{
  name: string;
  setName: (val: string) => void;
  email: string;
  setEmail: (val: string) => void;
  message: string;
  setMessage: (val: string) => void;
  projectType: string;
  setProjectType: (val: string) => void;
  budgetRange: string;
  setBudgetRange: (val: string) => void;
  handleContactSubmit: (e: React.FormEvent) => void;
}> = ({
  name,
  setName,
  email,
  setEmail,
  message,
  setMessage,
  projectType,
  setProjectType,
  budgetRange,
  setBudgetRange,
  handleContactSubmit,
}) => {
  return (
    <section id="quote-section" className="py-20 bg-white dark:bg-[#0A0A0A]">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-cambo font-normal text-gray-900 dark:text-white mb-6">
            Get Your Custom Quote
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Tell us about your project and we&apos;ll provide a detailed quote
            within 2 hours.
          </p>
        </div>

        <div className="bg-gray-50 dark:bg-gray-900 rounded-3xl p-8 shadow-xl">
          <form onSubmit={handleContactSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#D2145A]/20 focus:border-[#D2145A] outline-none transition-all"
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#D2145A]/20 focus:border-[#D2145A] outline-none transition-all"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Project Type
                </label>
                <select
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value)}
                  className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#D2145A]/20 focus:border-[#D2145A] outline-none transition-all"
                >
                  <option value="">Select project type</option>
                  <option value="defi">DeFi Protocol</option>
                  <option value="nft">NFT Contract</option>
                  <option value="token">Token Contract</option>
                  <option value="dao">DAO System</option>
                  <option value="marketplace">Marketplace</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Budget Range
                </label>
                <select
                  value={budgetRange}
                  onChange={(e) => setBudgetRange(e.target.value)}
                  className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#D2145A]/20 focus:border-[#D2145A] outline-none transition-all"
                >
                  <option value="">Select budget range</option>
                  <option value="2500-5000">$2,500 - $5,000</option>
                  <option value="5000-15000">$5,000 - $15,000</option>
                  <option value="15000-50000">$15,000 - $50,000</option>
                  <option value="50000+">$50,000+</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Project Description *
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#D2145A]/20 focus:border-[#D2145A] outline-none transition-all resize-none"
                placeholder="Describe your project requirements, timeline, and any specific features needed..."
                required
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                type="button"
                className="w-full px-6 py-4 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300"
                onClick={() => {
                  setName("");
                  setEmail("");
                  setMessage("");
                  setProjectType("");
                  setBudgetRange("");
                }}
              >
                Clear Form
              </button>
              <button
                type="submit"
                className="w-full relative bg-gradient-to-r from-[#D2145A] to-[#FF4081] text-white px-6 py-4 rounded-xl font-semibold transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] overflow-hidden group"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Send Quote Request
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
export default QuoteSection;
