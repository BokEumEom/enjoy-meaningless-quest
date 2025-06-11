import React from 'react';
import { X } from 'lucide-react';

interface ExitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ExitModal: React.FC<ExitModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl transform transition-all duration-300 scale-100">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
            <span className="text-3xl">🤔</span>
          </div>
        </div>
        
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Wait...
        </h2>
        
        <p className="text-gray-600 mb-8 text-lg">
          But why would you abandon such a noble journey?
        </p>
        
        <div className="flex gap-4 justify-center">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors duration-200"
          >
            You're right
          </button>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg font-medium hover:from-red-600 hover:to-red-700 transition-all duration-200 transform hover:scale-105"
          >
            Abandon anyway
          </button>
        </div>
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
        >
          <X size={24} />
        </button>
      </div>
    </div>
  );
};

export default ExitModal;