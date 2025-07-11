'use client';
import { useTranslation } from "@/hooks/useTranslation";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SuccessModal({ isOpen, onClose }: SuccessModalProps) {
  const { t } = useTranslation();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 shadow-2xl">
        <div className="text-center">
          <div className="text-6xl mb-4">✅</div>
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            {t('modal.thankYou')}
          </h3>
          <p className="text-gray-600 mb-6">
            {t('modal.message')}
          </p>
          <button
            onClick={onClose}
            className="bg-gradient-to-r from-orange-400 to-orange-500 text-white px-6 py-3 rounded-lg hover:from-orange-500 hover:to-orange-600 transition-all font-semibold"
          >
            {t('modal.close')}
          </button>
        </div>
      </div>
    </div>
  );
}