import { useState } from "react";

// Newsletter Section
const NewsletterSection = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log("Subscribing email:", email);
    setEmail("");
  };

  return (
    <section className="py-20 bg-gradient-to-r from-[#D2145A] to-[#FF4081] relative overflow-hidden">
      <div className="absolute inset-0 bg-black/10"></div>

      <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
        <h2 className="text-4xl md:text-5xl font-cambo font-normal text-white mb-6">
          Stay Updated with Web3 Insights
        </h2>
        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          Get the latest tutorials, guides, and Web3 development insights
          delivered straight to your inbox. Join our community of 5,450+
          developers.
        </p>

        <form
          onSubmit={handleSubscribe}
          className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-8"
        >
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 px-6 py-4 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
            required
          />
          <button
            type="submit"
            className="bg-white text-[#D2145A] px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-all duration-300 hover:scale-105"
          >
            Subscribe
          </button>
        </form>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center text-white/90">
          <div className="flex items-center gap-2">
            <span className="text-2xl">📧</span>
            <span>Weekly Newsletter</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🎯</span>
            <span>No Spam</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">✨</span>
            <span>Expert Insights</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
