"use client";

import { useState, useEffect } from "react";
import { useTranslation } from "@/components/TranslationProvider";

interface DatePickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectDate: (date: string) => void;
  selectedDate: string;
}

export default function DatePickerModal({
  isOpen,
  onClose,
  onSelectDate,
  selectedDate,
}: DatePickerModalProps) {
  const { t, locale } = useTranslation();
  const [currentDate, setCurrentDate] = useState(
    selectedDate || new Date().toISOString().split("T")[0]
  );

  useEffect(() => {
    console.log(`[DatePickerModal] Rendered with locale: ${locale}`);
  }, [locale]);

  if (!isOpen) return null;

  const handleDateSelect = (date: string) => {
    onSelectDate(date);
    onClose();
  };

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            {t("quote.moveDate")}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
            aria-label={t("modal.close")} // Changed from quote.close to modal.close
          >
            ✕
          </button>
        </div>

        <div className="mb-4">
          <input
            type="date"
            value={currentDate}
            min={today}
            onChange={(e) => setCurrentDate(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>

        <div className="flex space-x-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
          >
            {t("quote.cancel")}
          </button>
          <button
            onClick={() => handleDateSelect(currentDate)}
            disabled={!currentDate}
            className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50"
          >
            {t("quote.confirm")}
          </button>
        </div>
      </div>
    </div>
  );
}
