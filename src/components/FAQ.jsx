"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "What material do you use for cards?",
      answer: "We use high-grade 30mil PVC stock, the same standard used for credit cards and government IDs. It is durable, waterproof, and heat-resistant."
    },
    {
      question: "How long does shipping take?",
      answer: "Once processed, standard shipping typically takes 3-5 business days across all major metropolitan areas."
    },
    {
      question: "Is my RC data safe with you?",
      answer: "Yes, we use banking-grade encryption for all document uploads. Your files are automatically deleted from our servers 30 days after your card is delivered."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section className="w-full bg-[#f8fafc] py-16 md:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Common Questions
          </h2>
          <p className="text-gray-600">
            Everything you need to know about our precision printing process.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index} 
                className={`rounded-2xl transition-all duration-200 overflow-hidden ${
                  isOpen ? "bg-gray-100" : "bg-gray-50 hover:bg-gray-100/80"
                }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-5 flex items-center justify-between focus:outline-none"
                >
                  <span className="font-bold text-gray-900 text-left text-sm md:text-base">
                    {faq.question}
                  </span>
                  <ChevronDown 
                    size={20} 
                    className={`text-gray-500 transition-transform duration-200 flex-shrink-0 ${
                      isOpen ? "transform rotate-180" : ""
                    }`} 
                  />
                </button>
                
                <div 
                  className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-40 pb-5 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
