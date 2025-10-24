
import { GoogleGenAI, Type } from "@google/genai";
import { AdCreative, AdGenerationParams } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

const adGenerationSchema = {
  type: Type.OBJECT,
  properties: {
    ads: {
      type: Type.ARRAY,
      description: "Uma lista de 3 criativos de anúncio gerados.",
      items: {
        type: Type.OBJECT,
        properties: {
          headline: {
            type: Type.STRING,
            description: "O título (headline) do anúncio. Curto, chamativo e impactante."
          },
          body: {
            type: Type.STRING,
            description: "O corpo de texto do anúncio. Persuasivo, detalhando a oferta e os benefícios."
          },
          ctaText: {
            type: Type.STRING,
            description: "O texto para o botão de call-to-action, alinhado com o CTA final desejado."
          }
        },
        required: ["headline", "body", "ctaText"]
      }
    }
  },
  required: ["ads"]
};

export const generateAds = async (params: AdGenerationParams): Promise<AdCreative[]> => {
  const { product, offer, goal, cta } = params;

  const prompt = `
    Com base nos seguintes detalhes, gere 3 criativos de anúncio únicos e de alta qualidade:

    - Produto/Serviço que eu vendo: "${product}"
    - A oferta específica é: "${offer}"
    - A finalidade do criativo (objetivo) é: "${goal}"
    - O Call to Action (CTA) final deve ser: "${cta}"

    Para cada criativo, crie um título, um corpo de texto e o texto do botão de CTA.
    O tom deve ser profissional, persuasivo e focado em conversão. Adapte o estilo de cada criativo para ser diferente um do outro.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "Você é um especialista em copywriting e marketing digital, especializado na criação de anúncios de alta conversão para redes sociais e Google Ads. Sua tarefa é gerar variações de anúncios com base nas informações fornecidas.",
        responseMimeType: "application/json",
        responseSchema: adGenerationSchema,
        temperature: 0.8,
        topP: 0.95,
      },
    });

    const jsonText = response.text.trim();
    const parsedJson = JSON.parse(jsonText);
    
    if (parsedJson && Array.isArray(parsedJson.ads)) {
      return parsedJson.ads;
    }

    throw new Error("Formato de resposta da IA inválido.");

  } catch (error) {
    console.error("Erro ao gerar anúncios:", error);
    throw new Error("Não foi possível gerar os anúncios. Tente novamente.");
  }
};
