"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import MakeDonation from "../projects/makedonation/MakeDonation";
import { ArrowLeft, X } from "lucide-react";

export default function ModalButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);

  const handleBack = () => {
    if (step > 0) {
      setStep(0);
    } else {
      setIsOpen(false);
    }
  };

  const closeModal = () => {
    setIsOpen(false);
    setStep(0);
  };

  return (
    <div className="flex items-center justify-center">
      {/* Initial Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-[#D2145A] text-white px-6 py-3 rounded-lg shadow-lg transition-colors duration-300 hover:bg-slate-300 hover:text-[#B1124E] font-bold"
        >
          Donate Now
        </button>
      )}

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-lg w-full max-w-6xl relative p-6"
          >
            {/* Navigation Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between mb-4 bg-white pb-4 border-b">
              <button
                onClick={handleBack}
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="h-5 w-5 mr-1" />
                Back
              </button>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Modal Content */}
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="overflow-y-auto max-h-[80vh]"
            >
              <div className="relative">
                <MakeDonation />
              </div>
            </motion.div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
