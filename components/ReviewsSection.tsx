"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function ReviewsSection() {
  const [currentReview, setCurrentReview] = useState(0);
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

    const element = document.getElementById("reviews");
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  const reviews = [
    {
      id: 1,
      name: "Sarah M.",
      platform: "Yelp",
      rating: 5,
      text: "My belongings hadn't been moved in 9 years. I was really happy with their level of professionalism and speed. Mike and Tom were 15 min early for our scheduled appointment at 10am. I really appreciated them bringing and wearing shoe covers while in my home. All in all they were really polite and reliable. Everything arrived at my new home in perfect condition. I highly recommend them.",
      avatar: "/api/placeholder/60/60"
    },
    {
      id: 2,
      name: "David T.",
      platform: "Yelp",
      rating: 5,
      text: "Outstanding service! Alex and Tom were both very professional and polite. We have used other moving companies in the past and this is by far the most thorough and careful service that we've experienced to date. All items were packed and moved safely (and any surrounding areas were cleaned as well). I'm recommending this company to all my friends and relatives!",
      avatar: "/api/placeholder/60/60"
    },
    {
      id: 3,
      name: "Jennifer S.",
      platform: "Yelp",
      rating: 5,
      text: "This company did a great job moving our entire household. There were 3 workers, and they were clean, knowledgeable, professional, and respectful. They moved everything from our 3-bedroom house and they were quick yet thorough. One item got slightly damaged during the move, so they even came back the next day to fix it. Great service! Would be happy to give 10 stars if I could.",
      avatar: "/api/placeholder/60/60"
    },
    {
      id: 4,
      name: "Robert B.",
      platform: "Yelp",
      rating: 5,
      text: "I used the YELP request to get quotes, these guys were fast and the only 'flat rate' price I got. It was a great price and I was scheduled fast. Two young professionals showed up, polite, quick and efficient. They had professional equipment and handled everything with care. I will use them again and recommend them as a fast and honest option.",
      avatar: "/api/placeholder/60/60"
    },
    {
      id: 5,
      name: "Lisa K.",
      platform: "Yelp",
      rating: 5,
      text: "This team of three were very efficient and did a very thorough job of moving all our furniture and belongings while keeping everything clean as they moved through the house. Three hours moving a 2-bedroom apartment. Would highly recommend and love using local people who do a great job!!",
      avatar: "/api/placeholder/60/60"
    }
  ];

  const nextReview = () => {
    setCurrentReview((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  useEffect(() => {
    const interval = setInterval(nextReview, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="reviews" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-sm font-semibold text-aura-blue-600 mb-4 uppercase tracking-wide">
              testimonial
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Reliable Moving Services in Bay Area – See Our Verified Yelp Reviews
            </h2>
          </div>

          <div className="relative">
            {/* Navigation Arrows */}
            <button
              onClick={prevReview}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
              </svg>
            </button>
            
            <button
              onClick={nextReview}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
              </svg>
            </button>

            {/* Reviews Carousel */}
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentReview * 100}%)` }}
              >
                {reviews.map((review, index) => (
                  <div key={review.id} className="w-full flex-shrink-0 px-4">
                    <div className="bg-white rounded-lg shadow-lg p-8 mx-auto max-w-4xl">
                      <div className="flex items-start space-x-4">
                        <Image
                          src={review.avatar}
                          alt={review.name}
                          width={60}
                          height={60}
                          className="rounded-full"
                        />
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            <div className="flex text-yellow-400 mr-2">
                              {[...Array(review.rating)].map((_, i) => (
                                <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                                </svg>
                              ))}
                            </div>
                            <span className="text-gray-500 text-sm">{review.platform}</span>
                          </div>
                          <p className="text-gray-700 leading-relaxed mb-4">
                            {review.text}
                          </p>
                          <div className="font-semibold text-gray-900">
                            {review.name}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-8 space-x-2">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentReview(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentReview ? 'bg-aura-blue-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
