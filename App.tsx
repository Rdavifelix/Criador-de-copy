
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import InputField from './components/InputField';
import Button from './components/Button';
import AdCard from './components/AdCard';
import { generateAds } from './services/geminiService';
import { AdCreative, AdGenerationParams } from './types';

const App: React.FC = () => {
  const [formData, setFormData] = useState<AdGenerationParams>({
    product: '',
    offer: '',
    goal: '',
    cta: '',
  });
  const [generatedAds, setGeneratedAds] = useState<AdCreative[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setGeneratedAds([]);

    try {
      const ads = await generateAds(formData);
      setGeneratedAds(ads);
// Fix: Improved error handling to safely access the error message.
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || 'Ocorreu um erro desconhecido.');
      } else {
        setError('Ocorreu um erro desconhecido.');
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  // Fix: Added a type guard to prevent calling .trim() on a non-string value.
  const isFormIncomplete = Object.values(formData).some(value => typeof value === 'string' && value.trim() === '');

  return (
    <div className="min-h-screen font-sans">
      <Header />
      <main className="container mx-auto px-4 pb-16">
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="bg-base-200 p-8 rounded-2xl shadow-2xl space-y-6 border border-base-300">
            <InputField
              id="product"
              label="O que você vende?"
              value={formData.product}
              onChange={handleInputChange}
              placeholder="Ex: Software de gestão financeira para PMEs"
              type="textarea"
            />
            <InputField
              id="offer"
              label="Qual é a sua oferta?"
              value={formData.offer}
              onChange={handleInputChange}
              placeholder="Ex: 30 dias de teste grátis, sem necessidade de cartão de crédito"
              type="textarea"
            />
            <InputField
              id="goal"
              label="Qual a finalidade do criativo?"
              value={formData.goal}
              onChange={handleInputChange}
              placeholder="Ex: Gerar leads qualificados através do teste gratuito"
              type="text"
            />
            <InputField
              id="cta"
              label="Qual deve ser o CTA final?"
              value={formData.cta}
              onChange={handleInputChange}
              placeholder="Ex: Começar meu teste grátis"
              type="text"
            />
            <div className="pt-4">
              <Button type="submit" isLoading={isLoading} disabled={isFormIncomplete}>
                Gerar Anúncios
              </Button>
            </div>
          </form>
        </div>

        <div className="mt-16 max-w-6xl mx-auto">
          {error && (
            <div className="text-center p-4 bg-red-500/20 text-red-400 rounded-lg">
              <p><strong>Erro:</strong> {error}</p>
            </div>
          )}

          {generatedAds.length > 0 && (
            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-center text-content-100">Criativos Gerados</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {generatedAds.map((ad, index) => (
                  <AdCard key={index} ad={ad} />
                ))}
              </div>
            </div>
          )}

          {!isLoading && generatedAds.length === 0 && !error && (
             <div className="text-center text-content-200 p-8 border-2 border-dashed border-base-300 rounded-xl">
                <h3 className="text-xl font-semibold">Seus anúncios aparecerão aqui</h3>
                <p>Preencha os campos acima e clique em "Gerar Anúncios" para começar.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
