import React from 'react';

interface NotificationProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  onClose: () => void;
}

const getColor = (type?: string) => {
  switch (type) {
    case 'success':
      return '#4caf50';
    case 'error':
      return '#f44336';
    case 'info':
    default:
      return '#2196f3';
  }
};

const Notification: React.FC<NotificationProps> = ({
  message,
  type = 'info',
  onClose,
}) => {
  if (!message) return null;
  return (
    <div
      style={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        background: getColor(type),
        color: '#fff',
        padding: '16px 24px',
        borderRadius: 4,
        zIndex: 2000,
      }}
    >
      {message}
      <button
        onClick={onClose}
        style={{
          marginLeft: 16,
          background: 'transparent',
          color: '#fff',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        X
      </button>
    </div>
  );
};

export default Notification;
