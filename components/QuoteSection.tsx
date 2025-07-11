"use client";
import { useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import SuccessModal from "./SuccessModal";

// Custom Date Picker Modal Component
const DatePickerModal = ({
  isOpen,
  onClose,
  onSelectDate,
  selectedDate,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSelectDate: (date: string) => void;
  selectedDate: string;
}) => {
  const { t } = useTranslation();
  const [currentMonth, setCurrentMonth] = useState(
    selectedDate ? new Date(selectedDate).getMonth() : new Date().getMonth()
  );
  const [currentYear, setCurrentYear] = useState(
    selectedDate
      ? new Date(selectedDate).getFullYear()
      : new Date().getFullYear()
  );

  const months = t("calendar.months") || [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const daysShort = t("calendar.daysShort") || [
    "Su",
    "Mo",
    "Tu",
    "We",
    "Th",
    "Fr",
    "Sa",
  ];

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const formatDate = (year: number, month: number, day: number) => {
    return `${year}-${String(month + 1).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`;
  };

  const parseDate = (dateString: string) => {
    if (!dateString) return null;
    const [year, month, day] = dateString.split("-").map(Number);
    return { year, month: month - 1, day };
  };

  const selectedDateObj = parseDate(selectedDate);

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="w-12 h-12"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isSelected =
        selectedDateObj &&
        selectedDateObj.year === currentYear &&
        selectedDateObj.month === currentMonth &&
        selectedDateObj.day === day;

      const today = new Date();
      const isToday =
        today.getFullYear() === currentYear &&
        today.getMonth() === currentMonth &&
        today.getDate() === day;

      const isPast =
        new Date(currentYear, currentMonth, day) <
        new Date(today.getFullYear(), today.getMonth(), today.getDate());

      days.push(
        <button
          key={day}
          type="button"
          onClick={() => {
            const dateStr = formatDate(currentYear, currentMonth, day);
            onSelectDate(dateStr);
            onClose();
          }}
          disabled={isPast}
          className={`w-12 h-12 text-sm rounded-lg flex items-center justify-center transition-colors font-medium ${
            isPast
              ? "text-gray-300 cursor-not-allowed"
              : isSelected
              ? "bg-orange-500 text-white shadow-lg"
              : isToday
              ? "bg-orange-100 text-orange-600 font-bold border-2 border-orange-300"
              : "hover:bg-orange-50 text-gray-700 hover:text-orange-600"
          }`}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-800">
            {t("quote.moveDate")}
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg
              className="w-5 h-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Calendar */}
        <div className="p-6">
          {/* Month/Year Navigation */}
          <div className="flex items-center justify-between mb-6">
            <button
              type="button"
              onClick={() => {
                if (currentMonth === 0) {
                  setCurrentMonth(11);
                  setCurrentYear(currentYear - 1);
                } else {
                  setCurrentMonth(currentMonth - 1);
                }
              }}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title={t("quote.previousMonth")}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <div className="font-bold text-lg text-gray-800">
              {months[currentMonth]} {currentYear}
            </div>

            <button
              type="button"
              onClick={() => {
                if (currentMonth === 11) {
                  setCurrentMonth(0);
                  setCurrentYear(currentYear + 1);
                } else {
                  setCurrentMonth(currentMonth + 1);
                }
              }}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title={t("quote.nextMonth")}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          {/* Days of week header */}
          <div className="grid grid-cols-7 gap-1 mb-4">
            {daysShort.map((day, index) => (
              <div
                key={index}
                className="w-12 h-10 flex items-center justify-center text-sm font-bold text-gray-600"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-1">{renderCalendar()}</div>

          {/* Today button */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={() => {
                const today = new Date();
                const dateStr = formatDate(
                  today.getFullYear(),
                  today.getMonth(),
                  today.getDate()
                );
                onSelectDate(dateStr);
                onClose();
              }}
              className="w-full bg-orange-100 text-orange-600 py-2 px-4 rounded-lg hover:bg-orange-200 transition-colors font-medium"
            >
              {t("calendar.today") || "Today"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function QuoteSection() {
  const { t } = useTranslation();
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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
        alert("Failed to submit quote. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting quote:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeModal = () => {
    setShowSuccessModal(false);
  };

  const displayDate = formData.moveDate
    ? new Date(formData.moveDate).toLocaleDateString()
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
              Get Your Free Quote
            </h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Ready to move? Get a personalized quote in minutes. Just tell us
              your name and we&apos;ll take care of the rest!
            </p>
          </div>

          <div className="max-w-2xl mx-auto bg-white p-10 rounded-2xl shadow-2xl border border-orange-100">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label className="block text-gray-700 font-semibold mb-3 text-lg">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all text-lg"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-3 text-lg">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all text-lg"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-3 text-lg">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all text-lg"
                  placeholder="(555) 123-4567"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-3 text-lg">
                  Your Moving Date
                </label>
                <button
                  type="button"
                  onClick={() => setShowDatePicker(true)}
                  className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all bg-white text-left flex items-center justify-between hover:bg-gray-50 text-lg"
                >
                  <span
                    className={displayDate ? "text-gray-900" : "text-gray-500"}
                  >
                    {displayDate || "Select your preferred moving date"}
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
                  Additional Information
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={5}
                  className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all resize-vertical text-lg"
                  placeholder="Tell us about your move... special items, stairs, distance, etc."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-orange-400 to-orange-500 text-white font-bold py-5 rounded-xl hover:from-orange-500 hover:to-orange-600 transition-all shadow-lg text-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
              >
                {isSubmitting ? "Submitting..." : "Get My Free Quote"}
              </button>

              <p className="text-center text-gray-500 text-sm mt-4">
                * Only your name is required. We&apos;ll contact you to gather
                additional details.
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
