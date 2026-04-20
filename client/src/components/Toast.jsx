import React, { useEffect } from 'react';
import './Toast.css';

function Toast({ message, type = 'info', show, onClose }) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className={`fc-toast fc-toast-${type}`}>
      <p className="fc-toast-message">{message}</p>
      <button className="fc-toast-close" onClick={onClose}>×</button>
    </div>
  );
}

export default Toast;