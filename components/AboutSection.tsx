"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function AboutSection() {
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

    const element = document.getElementById("about");
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  return (
    <>
      {/* About Us Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div
                className={`transition-all duration-1000 ${
                  isVisible
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-10"
                }`}
              >
                <div className="text-sm font-semibold text-aura-blue-600 mb-4 uppercase tracking-wide">
                  ABOUT US
                </div>
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                  Family-owned & operated
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-8">
                  <strong>Prime Moving</strong> is a family-owned & operated
                  business with combined 15 years of experience in the moving
                  industry.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed mb-8">
                  Welcome to Prime Moving, Bay Area's #1 choice for
                  comprehensive moving services. With a steadfast commitment to
                  excellence, our expert team offers top-notch residential and
                  commercial moving solutions tailored to the unique needs of
                  the Bay Area community and beyond. Proudly serving the region
                  for numerous years, we're dedicated to delivering the most
                  cost-effective and thorough moving services available.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed mb-8">
                  Why choose us? Our commitment to affordability and
                  transparency is reflected in our upfront pricing policy. We
                  believe in providing our customers with clear and honest
                  quotes, ensuring you know exactly what to expect—no surprises,
                  just reliable moving service.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  But don't just take our word for it—our customer testimonials
                  and consistent referrals are a testament to our exceptional
                  service quality and customer care. Experience the Prime Moving
                  difference today and move with confidence tomorrow.
                </p>
              </div>

              <div
                className={`transition-all duration-1000 delay-300 ${
                  isVisible
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-10"
                }`}
              >
                <div className="relative">
                  <div className="bg-white rounded-lg shadow-lg p-8">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-aura-blue-600 mb-2">
                          🏆
                        </div>
                        <div className="text-sm font-semibold text-aura-blue-600 mb-2">
                          Up-Front Pricing!
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-aura-blue-600 mb-2">
                          🛡️
                        </div>
                        <div className="text-sm font-semibold text-aura-blue-600 mb-2">
                          Trusted Company
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-8">
                    <Image
                      src="/api/placeholder/600/400"
                      alt="Professional Prime Moving team performing thorough moving service at a client's residence in Bay Area, ensuring optimal customer satisfaction."
                      width={600}
                      height={400}
                      className="rounded-lg shadow-lg"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="text-sm font-semibold text-aura-blue-600 mb-4 uppercase tracking-wide">
              Statistics
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-12">
              Prime Moving in Numbers
            </h2>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              <div
                className={`transition-all duration-1000 delay-100 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
              >
                <div className="text-4xl font-bold text-aura-blue-600 mb-2">
                  15+
                </div>
                <div className="text-gray-600 font-medium">
                  Years of experience
                </div>
              </div>
              <div
                className={`transition-all duration-1000 delay-200 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
              >
                <div className="text-4xl font-bold text-aura-blue-600 mb-2">
                  5,000
                </div>
                <div className="text-gray-600 font-medium">Happy Customers</div>
              </div>
              <div
                className={`transition-all duration-1000 delay-300 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
              >
                <div className="text-4xl font-bold text-aura-blue-600 mb-2">
                  5 Star
                </div>
                <div className="text-gray-600 font-medium">Rating on Yelp</div>
              </div>
              <div
                className={`transition-all duration-1000 delay-400 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
              >
                <div className="text-4xl font-bold text-aura-blue-600 mb-2">
                  12
                </div>
                <div className="text-gray-600 font-medium">Team members</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
