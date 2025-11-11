import React from 'react';
import { FaCheckCircle, FaExclamationTriangle, FaTimes } from 'react-icons/fa';

interface AlertProps {
  variant: 'success' | 'danger';
  onClose?: () => void;
  className?: string;
  children?: React.ReactNode;
  message?: string; // Keeping for backward compatibility
}

const Alert: React.FC<AlertProps> = ({
  variant,
  onClose,
  className = '',
  children,
  message,
}) => {
  const styles = {
    success: 'bg-green-500/20 text-white',
    danger: 'bg-red-500/20 text-white',
  };

  const displayMessage = children || message;

  return (
    <div
      className={`mt-4 p-3 rounded-md flex items-center gap-2 relative ${
        styles[variant]
      } ${className}`}
    >
      {variant === 'success' ? <FaCheckCircle /> : <FaExclamationTriangle />}
      <span className='flex-1'>{displayMessage}</span>
      {onClose && (
        <button
          onClick={onClose}
          className='text-white hover:opacity-75 transition-opacity'
          aria-label='Close alert'
        >
          <FaTimes />
        </button>
      )}
    </div>
  );
};

export default Alert;
