import { Service } from "@/utils/interfaces";
import { useState } from "react";

const QuoteModal = ({
  isOpen,
  onClose,
  service,
}: {
  isOpen: boolean;
  onClose: () => void;
  service: Service | null;
}) => {
  // State for the contact form
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  if (!isOpen || !service) return null;

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Contact request sent for ${service.title}`);
    onClose();
  };

  const handlePayment = () => {
    alert(`Processing payment for ${service.title} at ${service.price}`);
    onClose();
  };

  const isFixedPrice =
    typeof service.price === "number" ||
    (typeof service.price === "string" && !isNaN(parseFloat(service.price)));

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">{service.title} - Get Quote</h2>
        <p className="mb-6">Select your preferred option:</p>

        {isFixedPrice && (
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Standard Pricing</h3>
            <p>Price: ${service.price}</p>
            <button
              onClick={handlePayment}
              className="mt-2 bg-gradient-to-r from-[#D2145A] to-[#FF4081] text-white px-6 py-2 rounded-xl font-bold hover:scale-105 transition-all duration-300"
            >
              Pay Now
            </button>
          </div>
        )}

        <div>
          <h3 className="font-semibold mb-2">Custom Pricing</h3>
          <form onSubmit={handleContactSubmit}>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
              className="w-full px-4 py-2 mb-2 bg-gray-50 dark:bg-gray-800 border rounded-xl"
              required
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your Email"
              className="w-full px-4 py-2 mb-2 bg-gray-50 dark:bg-gray-800 border rounded-xl"
              required
            />
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Your Message"
              className="w-full px-4 py-2 mb-4 bg-gray-50 dark:bg-gray-800 border rounded-xl"
              rows={3}
              required
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-[#D2145A] to-[#FF4081] text-white px-6 py-2 rounded-xl font-bold hover:scale-105 transition-all duration-300"
            >
              Send Request
            </button>
          </form>
        </div>

        <button onClick={onClose} className="mt-4 text-gray-500">
          Close
        </button>
      </div>
    </div>
  );
};

export default QuoteModal;
