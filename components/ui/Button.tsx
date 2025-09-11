
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', fullWidth = false, ...props }) => {
  const baseClasses = 'px-4 py-2 rounded-md font-semibold text-sm transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-brand-dark';
  const variantClasses = {
    primary: 'bg-brand-accent text-white hover:bg-indigo-700 disabled:bg-indigo-300 dark:disabled:bg-indigo-800 disabled:cursor-not-allowed focus:ring-brand-accent',
    secondary: 'bg-slate-200 text-slate-800 hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600 focus:ring-slate-500',
  };
  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button className={`${baseClasses} ${variantClasses[variant]} ${widthClass} flex items-center justify-center`} {...props}>
      {children}
    </button>
  );
};
