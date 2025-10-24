
import React, { useState } from 'react';
import { AdCreative } from '../types';

interface AdCardProps {
  ad: AdCreative;
}

const CopyIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
    </svg>
);

const CheckIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);


const AdCard: React.FC<AdCardProps> = ({ ad }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const adText = `Título: ${ad.headline}\n\nCorpo: ${ad.body}\n\nCTA: ${ad.ctaText}`;
    navigator.clipboard.writeText(adText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-base-200 rounded-xl shadow-lg p-6 flex flex-col justify-between border border-base-300 hover:border-brand-primary transition-all duration-300">
      <div>
        <h3 className="text-xl font-bold text-brand-light">{ad.headline}</h3>
        <p className="mt-3 text-content-200 whitespace-pre-wrap">{ad.body}</p>
        <div className="mt-4">
            <span className="inline-block bg-brand-primary/20 text-brand-light text-sm font-semibold mr-2 px-2.5 py-0.5 rounded-full">
                CTA: {ad.ctaText}
            </span>
        </div>
      </div>
      <div className="mt-6 text-right">
        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-2 text-sm font-medium text-content-200 hover:text-brand-light transition-colors duration-200"
        >
          {copied ? <CheckIcon className="w-5 h-5 text-green-400" /> : <CopyIcon className="w-5 h-5" />}
          {copied ? 'Copiado!' : 'Copiar'}
        </button>
      </div>
    </div>
  );
};

export default AdCard;
