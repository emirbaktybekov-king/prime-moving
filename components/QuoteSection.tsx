"use client";

import { useState, useEffect } from "react";
import { useTranslation } from "@/components/TranslationProvider";
import DatePickerModal from "./DatePickerModal";
import SuccessModal from "./SuccessModal";

export default function QuoteSection() {
  const { t, locale } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    moveDate: "",
    message: "",
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log(`[QuoteSection] Rendered with locale: ${locale}`);
  }, [locale]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError(null);
  };

  const handleDateSelect = (date: string) => {
    setFormData({
      ...formData,
      moveDate: date,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email || null,
          phone: formData.phone || null,
          moveDate: formData.moveDate || null,
          message: formData.message || null,
        }),
      });

      if (response.ok) {
        setShowSuccessModal(true);
        setFormData({
          name: "",
          email: "",
          phone: "",
          moveDate: "",
          message: "",
        });
      } else {
        console.error("Failed to submit quote");
        setError(t("quote.error"));
      }
    } catch (error) {
      console.error("Error submitting quote:", error);
      setError(t("quote.error"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeModal = () => {
    setShowSuccessModal(false);
  };

  const displayDate = formData.moveDate
    ? new Date(formData.moveDate).toLocaleDateString(locale)
    : "";

  return (
    <>
      <section
        id="quote"
        className="py-24 bg-gradient-to-br from-orange-50 via-white to-orange-50"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-5xl font-bold text-gray-800 mb-6">
              {t("quote.title")}
            </h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t("quote.description")}
            </p>
          </div>

          <div className="max-w-2xl mx-auto bg-white p-10 rounded-2xl shadow-2xl border border-orange-100">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label className="block text-gray-700 font-semibold mb-3 text-lg">
                  {t("quote.fullName")} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all text-lg"
                  placeholder={t("quote.namePlaceholder")}
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-3 text-lg">
                  {t("quote.email")}
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all text-lg"
                  placeholder={t("quote.emailPlaceholder")}
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-3 text-lg">
                  {t("quote.phone")}
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all text-lg"
                  placeholder={t("quote.phonePlaceholder")}
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-3 text-lg">
                  {t("quote.moveDate")}
                </label>
                <button
                  type="button"
                  onClick={() => setShowDatePicker(true)}
                  className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all bg-white text-left flex items-center justify-between hover:bg-gray-50 text-lg"
                >
                  <span
                    className={displayDate ? "text-gray-900" : "text-gray-500"}
                  >
                    {displayDate || t("quote.moveDatePlaceholder")}
                  </span>
                  <svg
                    className="w-6 h-6 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </button>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-3 text-lg">
                  {t("quote.message")}
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={5}
                  className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all resize-vertical text-lg"
                  placeholder={t("quote.messagePlaceholder")}
                ></textarea>
              </div>

              {error && (
                <p className="text-red-500 text-center text-sm">{error}</p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-orange-400 to-orange-500 text-white font-bold py-5 rounded-xl hover:from-orange-500 hover:to-orange-600 transition-all shadow-lg text-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
              >
                {isSubmitting ? t("quote.submitting") : t("quote.submit")}
              </button>

              <p className="text-center text-gray-500 text-sm mt-4">
                {t("quote.note")}
              </p>
            </form>
          </div>
        </div>
      </section>

      <DatePickerModal
        isOpen={showDatePicker}
        onClose={() => setShowDatePicker(false)}
        onSelectDate={handleDateSelect}
        selectedDate={formData.moveDate}
      />

      <SuccessModal isOpen={showSuccessModal} onClose={closeModal} />
    </>
  );
}
