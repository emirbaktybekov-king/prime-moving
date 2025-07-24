"use client";

import Image from "next/image";

export default function Footer() {
  return (
    <>
      {/* Contact Section */}
      <section className="py-20 bg-aura-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-4">
              Professional Moving Services Located in Bay Area – We Can Help
            </h2>
            <p className="text-xl mb-8 text-blue-100">Get in touch</p>
            <p className="text-lg mb-8 text-blue-100 max-w-2xl mx-auto">
              We're always here to help. Contact us if you have any questions or
              would like to receive a free estimate.
            </p>
            <button className="bg-white text-aura-blue-600 font-bold py-3 px-8 rounded-lg hover:bg-blue-50 transition-colors">
              Get a free quote
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-6">
                <Image
                  src="/primeMovingFooterLogo.svg"
                  alt="Prime Moving Logo"
                  width={130}
                  height={100}
                  className="rounded"
                />
              </div>
              <div className="space-y-4">
                <h4 className="font-bold text-lg">Menu</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <a
                      href="#home"
                      className="hover:text-white transition-colors"
                    >
                      Home
                    </a>
                  </li>
                  <li>
                    <a
                      href="#about"
                      className="hover:text-white transition-colors"
                    >
                      About Us
                    </a>
                  </li>
                  <li>
                    <a
                      href="#services"
                      className="hover:text-white transition-colors"
                    >
                      Services
                    </a>
                  </li>
                  <li>
                    <a
                      href="#reviews"
                      className="hover:text-white transition-colors"
                    >
                      Reviews
                    </a>
                  </li>
                  <li>
                    <a
                      href="#blog"
                      className="hover:text-white transition-colors"
                    >
                      Blog
                    </a>
                  </li>
                  <li>
                    <a
                      href="#contact"
                      className="hover:text-white transition-colors"
                    >
                      Contact Us
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a
                    href="/residential-moving"
                    className="hover:text-white transition-colors"
                  >
                    Residential Moving
                  </a>
                </li>
                <li>
                  <a
                    href="/commercial-moving"
                    className="hover:text-white transition-colors"
                  >
                    Commercial Moving
                  </a>
                </li>
                <li>
                  <a
                    href="/packing-services"
                    className="hover:text-white transition-colors"
                  >
                    Packing Services
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6">Contact Info</h4>
              <div className="space-y-4">
                <div>
                  <h5 className="font-semibold mb-2">Address</h5>
                  <p className="text-gray-400">
                    3595 Deep Cove Dr
                    <br />
                    Cumming
                    <br />
                    GA 30041
                  </p>
                </div>
                <div>
                  <a
                    href="mailto:primemove77@gmail.com"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    primemove77@gmail.com
                  </a>
                </div>
                <div>
                  <a
                    href="tel:9297204502"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    (929) 720-4502
                  </a>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6">Follow Us</h4>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>© Prime Moving - All Rights Reserved | Privacy Policy</p>
          </div>
        </div>
      </footer>
    </>
  );
}
