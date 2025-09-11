
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-white dark:bg-brand-secondary rounded-lg shadow-md overflow-hidden ${className}`}>
      {children}
    </div>
  );
};
