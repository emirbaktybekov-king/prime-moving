
'use client';
import { useTranslation } from "@/hooks/useTranslation";

export default function HeroSection() {
  const { t } = useTranslation();
  
  const scrollToQuote = () => {
    const quoteSection = document.getElementById('quote');
    if (quoteSection) {
      quoteSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Ccircle cx='7' cy='7' r='3'/%3E%3Ccircle cx='53' cy='7' r='3'/%3E%3Ccircle cx='7' cy='53' r='3'/%3E%3Ccircle cx='53' cy='53' r='3'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-white bg-opacity-20 rounded-full animate-bounce" style={{animationDelay: '0s', animationDuration: '3s'}} />
      <div className="absolute top-40 right-20 w-16 h-16 bg-white bg-opacity-15 rounded-full animate-bounce" style={{animationDelay: '1s', animationDuration: '4s'}} />
      <div className="absolute bottom-40 left-20 w-12 h-12 bg-white bg-opacity-25 rounded-full animate-bounce" style={{animationDelay: '2s', animationDuration: '5s'}} />
      <div className="absolute bottom-20 right-40 w-14 h-14 bg-white bg-opacity-20 rounded-full animate-bounce" style={{animationDelay: '0.5s', animationDuration: '3.5s'}} />

      <div className="container mx-auto px-4 text-center text-white relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center px-6 py-3 bg-white bg-opacity-20 backdrop-blur-sm rounded-full text-white font-medium mb-8 animate-fade-in">
            <span className="mr-2">⭐</span>
            Trusted by 1000+ Happy Customers
          </div>

          {/* Main Heading */}
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight animate-slide-up">
            <span className="block text-white drop-shadow-lg">
              {t('hero.title') || 'Your Moving'}
            </span>
            <span className="block text-yellow-200 drop-shadow-lg">
              {t('hero.subtitle') || 'Experts'}
            </span>
          </h1>

          {/* Description */}
          <p className="text-xl md:text-2xl lg:text-3xl text-orange-100 mb-12 max-w-4xl mx-auto leading-relaxed font-light animate-slide-up" style={{animationDelay: '0.2s'}}>
            {t('hero.description') || 'Professional, reliable, and stress-free moving services. We handle your belongings with care, so you can focus on your new beginning.'}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-slide-up" style={{animationDelay: '0.4s'}}>
            <button
              onClick={scrollToQuote}
              className="bg-white text-orange-600 font-bold py-5 px-10 rounded-full text-xl hover:bg-orange-50 transition-all shadow-2xl transform hover:scale-105 hover:shadow-3xl"
            >
              🚚 Get Free Quote
            </button>
            <button
              onClick={() => {
                const servicesSection = document.getElementById('services');
                if (servicesSection) {
                  servicesSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="border-2 border-white text-white font-bold py-5 px-10 rounded-full text-xl hover:bg-white hover:text-orange-600 transition-all shadow-lg transform hover:scale-105"
            >
              📋 Our Services
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 flex flex-wrap justify-center items-center gap-8 text-orange-100 animate-fade-in" style={{animationDelay: '0.6s'}}>
            <div className="flex items-center">
              <span className="text-2xl mr-2">🛡️</span>
              <span className="font-medium">Fully Insured</span>
            </div>
            <div className="flex items-center">
              <span className="text-2xl mr-2">⚡</span>
              <span className="font-medium">Same Day Service</span>
            </div>
            <div className="flex items-center">
              <span className="text-2xl mr-2">💯</span>
              <span className="font-medium">100% Satisfaction</span>
            </div>
            <div className="flex items-center">
              <span className="text-2xl mr-2">📞</span>
              <span className="font-medium">24/7 Support</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slide-up {
          from { 
            opacity: 0; 
            transform: translateY(30px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        
        .animate-slide-up {
          animation: slide-up 1s ease-out;
        }
      `}</style>
    </section>
  );
}
