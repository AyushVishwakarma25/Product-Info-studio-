
import { GoogleGenAI, Modality, Type, GenerateContentResponse } from "@google/genai";
import type { GenerateImageParams, GeneratedImage } from '../types';

const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const result = reader.result as string;
            // Remove "data:image/jpeg;base64," prefix
            resolve(result.split(',')[1]);
        };
        reader.onerror = error => reject(error);
    });
};

const buildPrompt = async (params: GenerateImageParams): Promise<any[]> => {
    const { 
        productImage, 
        productDescription,
        aspectRatio, 
        modelGender, 
        modelPersona,
        skinTone,
        clothingType,
        outfitChoice, 
        outfitReferenceImage, 
        stylePreset, 
        customStyleConcept,
        poseSuggestion
    } = params;

    const productBase64 = await fileToBase64(productImage);

    let parts: any[] = [
        {
            inlineData: {
                data: productBase64,
                mimeType: productImage.type,
            },
        }
    ];

    let outfitDescription = `an AI-suggested ${clothingType} outfit that is stylish and perfectly suited for their profession. For example, a Jewelry Influencer could be in a Saree, while a Fitness Influencer should be in athleisure.`;
    if (outfitChoice === 'Upload Reference' && outfitReferenceImage) {
        const outfitBase64 = await fileToBase64(outfitReferenceImage);
        parts.push({
            inlineData: {
                data: outfitBase64,
                mimeType: outfitReferenceImage.type,
            },
        });
        outfitDescription = `an outfit inspired by the provided reference image, matching the vibe of ${clothingType}.`;
    }

    const styleDescription = customStyleConcept || `a clean, professional ${stylePreset} style`;
    
    const textPrompt = `
      **Task:** Create a professional product advertisement image by compositing the provided product image into a new scene.

      **Inputs:**
      - **Product Image:** The first image provided.
      - **Outfit Reference Image:** The second image provided (if any).

      **Instructions:**
      1.  **Isolate Product:** Take the product from the 'Product Image' and remove its background. Product description: "${productDescription}".
      2.  **Create Scene:** Generate a new, photorealistic scene featuring an Indian ${modelGender} model with a ${skinTone} skin tone, representing the '${modelPersona}' persona.
      3.  **Style Model:** The model should wear ${outfitDescription}.
      4.  **Compose:** Place the isolated product into the new scene. The model should be interacting with the product in the following pose: "${poseSuggestion}".
      5.  **Final Touches:** The overall image should have a professional '${styleDescription}' aesthetic. The final image aspect ratio must be ${aspectRatio}.

      **Required Text Output:**
      After generating the composite image, provide the following text in this exact format:
      caption: [A catchy social media caption for the image]
      hashtags: [#hashtag1 #hashtag2 #hashtag3 #hashtag4 #hashtag5]
    `;

    parts.push({ text: textPrompt });

    return parts;
};

export const generateInfluencerImage = async (params: GenerateImageParams): Promise<GeneratedImage[]> => {
    if (!process.env.API_KEY) {
        throw new Error("API_KEY environment variable not set.");
    }
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const parts = await buildPrompt(params);

    try {
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image-preview',
            contents: { parts: parts },
            config: {
                responseModalities: [Modality.IMAGE, Modality.TEXT],
            },
        });

        const generatedImages: GeneratedImage[] = [];
        let imageUrl: string | null = null;
        let caption: string = "A great shot of our new product!";
        let hashtags: string = "#product #new #style";

        const textParts: string[] = [];

        // Ensure response.candidates exists and has content
        if (!response.candidates || response.candidates.length === 0 || !response.candidates[0].content) {
             throw new Error("Received an invalid response from the AI. It might have been blocked for safety reasons.");
        }

        for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
                const base64ImageBytes: string = part.inlineData.data;
                imageUrl = `data:${part.inlineData.mimeType};base64,${base64ImageBytes}`;
            } else if (part.text) {
                textParts.push(part.text);
            }
        }
        
        // Attempt to parse caption and hashtags from text parts
        const fullText = textParts.join('\n');
        const captionMatch = fullText.match(/caption:(.*?)(hashtags:|$)/is);
        const hashtagsMatch = fullText.match(/hashtags:(.*)/is);

        if (captionMatch && captionMatch[1]) {
            caption = captionMatch[1].replace(/\[|\]/g, '').trim();
        } else {
             // Fallback if structured text is not found
             caption = fullText.split('\n').filter(line => line.length > 10 && !line.startsWith('#'))[0] || caption;
        }

        if (hashtagsMatch && hashtagsMatch[1]) {
            hashtags = hashtagsMatch[1].trim();
        }

        if (imageUrl) {
            generatedImages.push({
                id: `gen-${Date.now()}`,
                imageUrl,
                caption,
                hashtags,
            });
        } else {
            console.error("AI response did not contain an image. Full text response:", fullText);
            throw new Error("The AI did not return an image. Please try refining your prompt or check for safety blocks.");
        }

        return generatedImages;

    } catch (error) {
        console.error("Error generating image with Gemini API:", error);
        // Pass a more specific error message if available, otherwise use a generic one.
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
        throw new Error(`Failed to generate image. ${errorMessage}`);
    }
};
