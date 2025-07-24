"use client";

import { useState, useEffect } from "react";

export default function ServicesSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("services");
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  const services = [
    {
      icon: (
        <svg
          className="w-16 h-16 text-aura-blue-600"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </svg>
      ),
      title: "Residential Moving",
      description:
        "Your belongings play an essential role in your family's comfort and happiness. If they need to be moved safely and efficiently, our residential moving services ensure everything arrives at your new home in perfect condition.",
      link: "/residential-moving",
    },
    {
      icon: (
        <svg
          className="w-16 h-16 text-aura-blue-600"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10z" />
        </svg>
      ),
      title: "Commercial Moving",
      description:
        "Most business owners are unaware that it's very important to have a professional commercial moving service. Every year there are countless businesses that suffer losses due to improper moving procedures.",
      link: "/commercial-moving",
    },
    {
      icon: (
        <svg
          className="w-16 h-16 text-aura-blue-600"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20C20.55 4 21 4.45 21 5S20.55 6 20 6H19V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V6H4C3.45 6 3 5.55 3 5S3.45 4 4 4H7ZM9 3V4H15V3H9ZM7 6V19H17V6H7Z" />
        </svg>
      ),
      title: "Packing Services",
      description:
        "Our technicians use one of the most professional and efficient packing systems available. We ensure your items are properly protected and organized for the safest possible transport to your new location.",
      link: "/packing-services",
    },
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-sm font-semibold text-aura-blue-600 mb-4 uppercase tracking-wide">
              OUR SERVICES
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What we provide
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className={`bg-white p-8 rounded-lg shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 card-hover ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="flex justify-center mb-6">{service.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6 text-center">
                  {service.description}
                </p>
                <div className="text-center">
                  <button className="inline-flex items-center text-aura-blue-600 font-semibold hover:text-aura-blue-700 transition-colors">
                    Read More
                    <svg
                      className="w-4 h-4 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div
              className={`transition-all duration-1000 delay-100 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <div className="text-3xl mb-2">🏆</div>
              <h4 className="font-bold text-gray-900 mb-2">
                High Quality Work
              </h4>
              <p className="text-gray-600 text-sm">
                Your happiness is our top priority
              </p>
            </div>
            <div
              className={`transition-all duration-1000 delay-200 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <div className="text-3xl mb-2">💉</div>
              <h4 className="font-bold text-gray-900 mb-2">Vaccinated</h4>
              <p className="text-gray-600 text-sm">
                Team members are fully vaccinated
              </p>
            </div>
            <div
              className={`transition-all duration-1000 delay-300 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <div className="text-3xl mb-2">💰</div>
              <h4 className="font-bold text-gray-900 mb-2">
                Competitively Priced
              </h4>
              <p className="text-gray-600 text-sm">
                Check our reasonable prices
              </p>
            </div>
            <div
              className={`transition-all duration-1000 delay-400 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <div className="text-3xl mb-2">🛡️</div>
              <h4 className="font-bold text-gray-900 mb-2">Fully Insured</h4>
              <p className="text-gray-600 text-sm">
                $2 million in liability insurance
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
