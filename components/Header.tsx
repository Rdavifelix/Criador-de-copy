
import React from 'react';

const SparklesIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path
      fillRule="evenodd"
      d="M9.315 7.584C12.195 3.883 16.695 1.5 21.75 1.5a.75.75 0 01.75.75c0 5.056-2.383 9.555-6.084 12.436A6.75 6.75 0 019.75 22.5a.75.75 0 01-.75-.75v-7.19c0-1.767-.933-3.37-2.345-4.226C3.999 9.32 2.25 6.904 2.25 4.5a.75.75 0 01.75-.75c2.404 0 4.817 1.75 5.724 4.043z"
      clipRule="evenodd"
    />
  </svg>
);

const Header: React.FC = () => {
  return (
    <header className="py-6 text-center">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-4">
          <SparklesIcon className="w-10 h-10 text-brand-primary" />
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-light text-transparent bg-clip-text">
            Gerador de Anúncios IA
          </h1>
        </div>
        <p className="mt-4 text-lg text-content-200">
          Crie textos de anúncios de alta conversão em segundos.
        </p>
      </div>
    </header>
  );
};

export default Header;
