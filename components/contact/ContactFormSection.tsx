import { useState, useEffect } from "react";
import Link from "next/link";
import {
  FaCheck,
  FaExclamationTriangle,
  FaSyncAlt,
  FaSpinner,
} from "react-icons/fa";

// Enhanced Contact Form Section with Security Features
const ContactFormSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    serviceType: "",
  });

  // Security states
  const [captcha, setCaptcha] = useState({ question: "", answer: "" });
  const [userCaptchaAnswer, setUserCaptchaAnswer] = useState("");
  const [formTimestamp, setFormTimestamp] = useState(Date.now());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Generate random math captcha
  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 20) + 1;
    const num2 = Math.floor(Math.random() * 20) + 1;
    const operators = ["+", "-", "*"];
    const operator = operators[Math.floor(Math.random() * operators.length)];

    let answer: number;
    let question: string;

    switch (operator) {
      case "+":
        answer = num1 + num2;
        question = `${num1} + ${num2}`;
        break;
      case "-":
        // Ensure positive result
        const larger = Math.max(num1, num2);
        const smaller = Math.min(num1, num2);
        answer = larger - smaller;
        question = `${larger} - ${smaller}`;
        break;
      case "*":
        // Use smaller numbers for multiplication
        const smallNum1 = Math.floor(Math.random() * 10) + 1;
        const smallNum2 = Math.floor(Math.random() * 10) + 1;
        answer = smallNum1 * smallNum2;
        question = `${smallNum1} × ${smallNum2}`;
        break;
      default:
        answer = num1 + num2;
        question = `${num1} + ${num2}`;
    }

    setCaptcha({ question, answer: answer.toString() });
  };

  // Initialize captcha on component mount
  useEffect(() => {
    generateCaptcha();
    setFormTimestamp(Date.now());
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleCaptchaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserCaptchaAnswer(e.target.value);
    if (errors.captcha) {
      setErrors((prev) => ({ ...prev, captcha: "" }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Client-side validation
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters long";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.subject.trim() || formData.subject.trim().length < 5) {
      newErrors.subject = "Subject must be at least 5 characters long";
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters long";
    }

    if (!userCaptchaAnswer || userCaptchaAnswer !== captcha.answer) {
      newErrors.captcha = "Please solve the math problem correctly";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSubmitting) return;

    if (!validateForm()) {
      setSubmitStatus({
        type: "error",
        message: "Please correct the errors above and try again.",
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          captcha: userCaptchaAnswer,
          captchaExpected: captcha.answer,
          timestamp: formTimestamp,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.details) {
          setErrors(data.details);
        }
        setSubmitStatus({
          type: "error",
          message: data.error || "Failed to send message. Please try again.",
        });
      } else {
        setSubmitStatus({
          type: "success",
          message:
            data.message ||
            "Thank you for your message! We'll get back to you soon.",
        });

        // Reset form on success
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
          serviceType: "",
        });
        setUserCaptchaAnswer("");
        generateCaptcha(); // Generate new captcha
        setFormTimestamp(Date.now());
        setErrors({});
      }
    } catch (error) {
      console.error("Contact form error:", error);
      setSubmitStatus({
        type: "error",
        message: "Network error. Please check your connection and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const refreshCaptcha = () => {
    generateCaptcha();
    setUserCaptchaAnswer("");
    if (errors.captcha) {
      setErrors((prev) => ({ ...prev, captcha: "" }));
    }
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

            {/* Status Messages */}
            {submitStatus.type && (
              <div
                className={`mb-6 p-4 rounded-lg ${
                  submitStatus.type === "success"
                    ? "bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 border border-green-200 dark:border-green-800"
                    : "bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300 border border-red-200 dark:border-red-800"
                }`}
              >
                <div className="flex items-center">
                  {submitStatus.type === "success" ? (
                    <FaCheck className="w-5 h-5 mr-2" />
                  ) : (
                    <FaExclamationTriangle className="w-5 h-5 mr-2" />
                  )}
                  {submitStatus.message}
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your Name *"
                    required
                    className={`w-full p-4 rounded-lg bg-white/80 dark:bg-gray-900/80 border ${
                      errors.name
                        ? "border-red-300 dark:border-red-700"
                        : "border-gray-200/50 dark:border-gray-700/50"
                    } focus:ring-2 focus:ring-[#D2145A] outline-none transition-colors`}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {errors.name}
                    </p>
                  )}
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Your Email *"
                    required
                    className={`w-full p-4 rounded-lg bg-white/80 dark:bg-gray-900/80 border ${
                      errors.email
                        ? "border-red-300 dark:border-red-700"
                        : "border-gray-200/50 dark:border-gray-700/50"
                    } focus:ring-2 focus:ring-[#D2145A] outline-none transition-colors`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="Subject *"
                  required
                  className={`w-full p-4 rounded-lg bg-white/80 dark:bg-gray-900/80 border ${
                    errors.subject
                      ? "border-red-300 dark:border-red-700"
                      : "border-gray-200/50 dark:border-gray-700/50"
                  } focus:ring-2 focus:ring-[#D2145A] outline-none transition-colors`}
                />
                {errors.subject && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.subject}
                  </p>
                )}
              </div>

              <div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Your Message *"
                  rows={5}
                  required
                  className={`w-full p-4 rounded-lg bg-white/80 dark:bg-gray-900/80 border ${
                    errors.message
                      ? "border-red-300 dark:border-red-700"
                      : "border-gray-200/50 dark:border-gray-700/50"
                  } focus:ring-2 focus:ring-[#D2145A] outline-none transition-colors resize-vertical`}
                ></textarea>
                {errors.message && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.message}
                  </p>
                )}
              </div>

              <div>
                <select
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={handleInputChange}
                  className="w-full p-4 rounded-lg bg-white/80 dark:bg-gray-900/80 border border-gray-200/50 dark:border-gray-700/50 focus:ring-2 focus:ring-[#D2145A] outline-none transition-colors"
                >
                  <option value="">Select a service (optional)</option>
                  <option value="education">Web3 Education</option>
                  <option value="mentorship">Personalized Mentorship</option>
                  <option value="development">Professional Development</option>
                  <option value="writing">Technical Writing</option>
                  <option value="hiring">Developer Hiring</option>
                  <option value="community">Community Engagement</option>
                </select>
              </div>

              {/* Security Captcha */}
              <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-4 border border-gray-200/50 dark:border-gray-700/50">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Security Check *
                </label>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-mono font-semibold text-gray-900 dark:text-white">
                      {captcha.question} =
                    </span>
                    <input
                      type="number"
                      value={userCaptchaAnswer}
                      onChange={handleCaptchaChange}
                      placeholder="?"
                      required
                      className={`w-20 p-2 rounded-md bg-white dark:bg-gray-900 border ${
                        errors.captcha
                          ? "border-red-300 dark:border-red-700"
                          : "border-gray-300 dark:border-gray-600"
                      } focus:ring-2 focus:ring-[#D2145A] outline-none text-center`}
                    />
                    <button
                      type="button"
                      onClick={refreshCaptcha}
                      className="p-2 text-[#D2145A] hover:text-[#B01149] transition-colors"
                      title="Refresh captcha"
                    >
                      <FaSyncAlt className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                {errors.captcha && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.captcha}
                  </p>
                )}
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Please solve the math problem to prove you&apos;re human
                </p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 ${
                  isSubmitting
                    ? "bg-gray-400 cursor-not-allowed text-white"
                    : "bg-gradient-to-r from-[#D2145A] to-[#FF4081] text-white hover:scale-105 hover:shadow-lg"
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <FaSpinner className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                    Sending Message...
                  </div>
                ) : (
                  "Send Message"
                )}
              </button>

              <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                * Required fields. We typically respond within 24-48 hours.
              </p>
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
                    5,550+
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
                <Link
                  href="https://youtube.com/@dappmentors"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-gradient-to-r from-red-500 to-pink-500 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 hover:scale-105 text-center"
                >
                  Subscribe on YouTube
                </Link>
                <Link
                  href="https://linkedin.com/company/dappmentors"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 hover:scale-105 text-center"
                >
                  Connect on LinkedIn
                </Link>
                <Link
                  href="https://discord.gg/PgFDUVT6n9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 hover:scale-105 text-center"
                >
                  Join Discord Community
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactFormSection;
