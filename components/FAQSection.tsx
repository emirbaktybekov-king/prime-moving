"use client";

import { useState } from "react";

export default function FAQSection() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqs = [
    {
      question: "Why is professional moving important?",
      answer: "Professional moving services ensure your belongings are handled with care, properly packed, and transported safely. Our experienced team knows how to navigate challenges like stairs, narrow doorways, and fragile items, reducing the risk of damage and injury."
    },
    {
      question: "How long does the moving process take?",
      answer: "The duration depends on several factors including the size of your home, distance of the move, and amount of belongings. A typical local residential move takes 4-8 hours, while long-distance moves can take 1-3 days. We provide accurate time estimates during your consultation."
    },
    {
      question: "Is moving messy?",
      answer: "Not when you hire Prime Moving! Our professional team uses protective materials, shoe covers, and careful handling techniques to keep your current and new home clean throughout the moving process. We also clean up any debris or packing materials."
    },
    {
      question: "Why is packing service important?",
      answer: "Professional packing ensures your items are properly protected during transport. Our team uses high-quality materials and proven techniques to prevent damage. Proper packing also maximizes space efficiency and makes unpacking at your new location much easier."
    },
    {
      question: "How often should I hire professional movers?",
      answer: "Most people move every 5-7 years on average. However, you should consider professional movers for any move involving valuable items, long distances, or when you want to reduce stress and ensure everything arrives safely at your new location."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Frequently asked questions.
            </h2>
            <p className="text-gray-600">
              Have a question that's not here? Give us a call now!
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-4 text-left bg-white hover:bg-gray-50 transition-colors flex justify-between items-center"
                >
                  <h3 className="text-lg font-semibold text-gray-900">
                    {faq.question}
                  </h3>
                  <svg
                    className={`w-5 h-5 text-gray-500 transform transition-transform ${
                      openFAQ === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {openFAQ === index && (
                  <div className="px-6 pb-4 bg-gray-50">
                    <p className="text-gray-700 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
