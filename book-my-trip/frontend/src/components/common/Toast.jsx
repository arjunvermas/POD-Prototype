import React, { useEffect } from 'react';
import { CheckCircle, XCircle, X } from 'lucide-react';

const Toast = ({ message, type = 'success', onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const bgColors = {
    success: "bg-green-500",
    error: "bg-red-500",
    info: "bg-primary"
  };

  return (
    <div className={`fixed bottom-8 right-8 z-[100] ${bgColors[type]} text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center space-x-4 animate-fade-in`}>
      {type === 'success' ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
      <span className="font-bold text-sm">{message}</span>
      <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-lg transition-colors">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Toast;
