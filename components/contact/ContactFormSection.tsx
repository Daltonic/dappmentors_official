import { useState } from "react";

// Contact Form Section
const ContactFormSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    serviceType: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", formData);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-purple-50 dark:from-[#1A1A1A] dark:to-purple-900/10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="text-4xl md:text-5xl font-cambo font-normal text-gray-900 dark:text-white mb-8">
              Send Us a Message
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              Have a specific question or project in mind? Fill out the form and
              we&apos;ll get back to you with personalized assistance.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your Name"
                  className="p-4 rounded-lg bg-white/80 dark:bg-gray-900/80 border border-gray-200/50 dark:border-gray-700/50 focus:ring-2 focus:ring-[#D2145A] outline-none"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Your Email"
                  className="p-4 rounded-lg bg-white/80 dark:bg-gray-900/80 border border-gray-200/50 dark:border-gray-700/50 focus:ring-2 focus:ring-[#D2145A] outline-none"
                />
              </div>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                placeholder="Subject"
                className="w-full p-4 rounded-lg bg-white/80 dark:bg-gray-900/80 border border-gray-200/50 dark:border-gray-700/50 focus:ring-2 focus:ring-[#D2145A] outline-none"
              />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Your Message"
                rows={5}
                className="w-full p-4 rounded-lg bg-white/80 dark:bg-gray-900/80 border border-gray-200/50 dark:border-gray-700/50 focus:ring-2 focus:ring-[#D2145A] outline-none"
              ></textarea>
              <select
                name="serviceType"
                value={formData.serviceType}
                onChange={handleInputChange}
                className="w-full p-4 rounded-lg bg-white/80 dark:bg-gray-900/80 border border-gray-200/50 dark:border-gray-700/50 focus:ring-2 focus:ring-[#D2145A] outline-none"
              >
                <option value="">Select a service</option>
                <option value="education">Web3 Education</option>
                <option value="mentorship">Personalized Mentorship</option>
                <option value="development">Professional Development</option>
                <option value="writing">Technical Writing</option>
                <option value="hiring">Developer Hiring</option>
                <option value="community">Community Engagement</option>
              </select>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#D2145A] to-[#FF4081] text-white py-4 px-6 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
              >
                Send Message
              </button>
            </form>
          </div>

          <div className="relative">
            <div className="absolute -inset-8 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-2xl"></div>
            <div className="relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl p-8 border border-gray-200/50 dark:border-gray-700/50">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                Join Our Growing Community
              </h3>

              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-[#D2145A] mb-2">
                    5,450+
                  </div>
                  <div className="text-gray-600 dark:text-gray-300 font-semibold">
                    YouTube Subscribers
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-[#D2145A] mb-2">
                    50+
                  </div>
                  <div className="text-gray-600 dark:text-gray-300 font-semibold">
                    LinkedIn Followers
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <button className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 hover:scale-105">
                  Subscribe on YouTube
                </button>
                <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 hover:scale-105">
                  Connect on LinkedIn
                </button>
                <button className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 hover:scale-105">
                  Join Discord Community
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactFormSection;
