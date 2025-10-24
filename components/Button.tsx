
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, isLoading = false, ...props }) => {
  return (
    <button
      {...props}
      disabled={isLoading || props.disabled}
      className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-brand-primary to-brand-secondary hover:from-brand-light hover:to-brand-primary text-white font-bold py-3 px-6 rounded-lg shadow-lg transform hover:-translate-y-1 transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
    >
      {isLoading ? (
        <>
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Gerando...
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
