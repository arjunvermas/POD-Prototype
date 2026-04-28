import React from 'react';

const Button = ({ children, onClick, type = 'button', variant = 'primary', className = '', disabledRef = false }) => {
  const baseStyles = "px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-lg";
  
  const variants = {
    primary: "bg-primary text-white shadow-primary/20 hover:shadow-primary/30 hover:bg-primary-dark",
    secondary: "bg-secondary text-white shadow-secondary/20 hover:shadow-secondary/30",
    outline: "bg-white border border-gray-100 text-gray-900 shadow-gray-200/50 hover:bg-gray-50",
    ghost: "bg-transparent text-gray-400 hover:text-primary transition-colors shadow-none"
  };

  return (
    <button 
      type={type} 
      onClick={onClick} 
      disabled={disabledRef}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
