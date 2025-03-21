// src/components/ui/Button.js
import React from 'react';

const Button = ({ children, onClick, className }) => {
  return (
    <button className={`px-4 py-2 bg-blue-600 text-white rounded-lg ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
    