
import React, { useState, useCallback, useEffect } from 'react';
import type { GenerateImageParams } from '../types';
import { AspectRatio, ModelGender, ModelPersona, OutfitChoice, StylePreset, SkinTone, ClothingType } from '../types';
import { 
  ASPECT_RATIO_OPTIONS, 
  MODEL_GENDER_OPTIONS, 
  MODEL_PERSONA_OPTIONS, 
  STYLE_PRESET_OPTIONS, 
  POSE_SUGGESTIONS,
  CUSTOM_POSE_TRIGGER,
  SKIN_TONE_OPTIONS,
  CLOTHING_TYPE_OPTIONS
} from '../constants';
import { Button } from './ui/Button';
import { Select } from './ui/Select';
import { Icon } from './ui/Icon';

interface SidebarProps {
  onGenerate: (params: GenerateImageParams) => void;
  isLoading: boolean;
}

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="mb-6">
    <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-3">{title}</h3>
    {children}
  </div>
);

export const Sidebar: React.FC<SidebarProps> = ({ onGenerate, isLoading }) => {
  const [productImage, setProductImage] = useState<File | null>(null);
  const [productImagePreview, setProductImagePreview] = useState<string | null>(null);
  const [productDescription, setProductDescription] = useState<string>('');
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>(AspectRatio.Portrait);
  const [modelGender, setModelGender] = useState<ModelGender>(ModelGender.Female);
  const [modelPersona, setModelPersona] = useState<ModelPersona>(ModelPersona.Fashion);
  const [skinTone, setSkinTone] = useState<SkinTone>(SkinTone.Medium);
  const [clothingType, setClothingType] = useState<ClothingType>(ClothingType.Casual);
  const [outfitChoice, setOutfitChoice] = useState<OutfitChoice>(OutfitChoice.AI);
  const [outfitReferenceImage, setOutfitReferenceImage] = useState<File | null>(null);
  const [outfitReferencePreview, setOutfitReferencePreview] = useState<string | null>(null);
  const [stylePreset, setStylePreset] = useState<StylePreset>(StylePreset.Lifestyle);
  const [poseSuggestion, setPoseSuggestion] = useState<string>(POSE_SUGGESTIONS[0]);
  const [customPose, setCustomPose] = useState<string>('');
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setFile: React.Dispatch<React.SetStateAction<File | null>>, setPreview: React.Dispatch<React.SetStateAction<string | null>>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = useCallback(() => {
    if (!productImage) {
      alert("Please upload a product image.");
      return;
    }
    if (!productDescription.trim()) {
      alert("Please enter a product description.");
      return;
    }
    
    const finalPoseSuggestion = poseSuggestion === CUSTOM_POSE_TRIGGER ? customPose : poseSuggestion;
    if (poseSuggestion === CUSTOM_POSE_TRIGGER && !finalPoseSuggestion.trim()) {
      alert("Please enter a custom pose description.");
      return;
    }

    onGenerate({
      productImage,
      productDescription,
      aspectRatio,
      modelGender,
      modelPersona,
      skinTone,
      clothingType,
      outfitChoice,
      outfitReferenceImage: outfitChoice === OutfitChoice.Reference ? outfitReferenceImage : undefined,
      stylePreset,
      poseSuggestion: finalPoseSuggestion,
    });
  }, [productImage, productDescription, aspectRatio, modelGender, modelPersona, skinTone, clothingType, outfitChoice, outfitReferenceImage, stylePreset, poseSuggestion, customPose, onGenerate]);

  return (
    <aside className="w-96 bg-white dark:bg-brand-secondary p-6 flex flex-col h-full shadow-lg overflow-y-auto">
      <div className="flex items-center mb-8">
        <div className="p-2 bg-brand-accent rounded-lg mr-3">
          <Icon name="logo" className="text-white" />
        </div>
        <h1 className="text-xl font-bold text-slate-900 dark:text-white">Influencer Studio</h1>
      </div>

      <div className="flex-grow">
        <Section title="1. Upload Product">
          <label htmlFor="product-upload" className="cursor-pointer w-full h-32 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg flex items-center justify-center text-slate-500 hover:border-brand-accent hover:text-brand-accent transition-colors">
            {productImagePreview ? <img src={productImagePreview} alt="Product preview" className="h-full w-full object-contain rounded-lg p-1" /> : (
              <div className="text-center">
                <Icon name="upload" className="mx-auto mb-1" />
                <span>Click to upload</span>
              </div>
            )}
          </label>
          <input id="product-upload" type="file" className="hidden" accept="image/png, image/jpeg" onChange={(e) => handleFileChange(e, setProductImage, setProductImagePreview)} />
          <div className="mt-4">
              <label htmlFor="product-description" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Product Description</label>
              <textarea
                  id="product-description"
                  value={productDescription}
                  onChange={(e) => setProductDescription(e.target.value)}
                  placeholder="e.g., A stylish, eco-friendly water bottle with a bamboo lid."
                  className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-brand-accent focus:border-brand-accent text-sm"
                  rows={3}
              />
          </div>
        </Section>

        <Section title="2. Setup Scene">
          <Select label="Aspect Ratio" value={aspectRatio} onChange={(e) => setAspectRatio(e.target.value as AspectRatio)}>
            {ASPECT_RATIO_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
          </Select>
          <Select label="Model Gender" value={modelGender} onChange={(e) => setModelGender(e.target.value as ModelGender)} className="mt-4">
            {MODEL_GENDER_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
          </Select>
          <Select label="Model Skin Tone" value={skinTone} onChange={(e) => setSkinTone(e.target.value as SkinTone)} className="mt-4">
            {SKIN_TONE_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
          </Select>
          <Select label="Model Persona" value={modelPersona} onChange={(e) => setModelPersona(e.target.value as ModelPersona)} className="mt-4">
            {MODEL_PERSONA_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
          </Select>
        </Section>
        
        <Section title="3. Style & Pose">
          <Select label="Style Preset" value={stylePreset} onChange={(e) => setStylePreset(e.target.value as StylePreset)}>
            {STYLE_PRESET_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
          </Select>
           <Select label="Model Pose" value={poseSuggestion} onChange={(e) => setPoseSuggestion(e.target.value)} className="mt-4">
            {POSE_SUGGESTIONS.map(o => <option key={o} value={o}>{o}</option>)}
          </Select>
          {poseSuggestion === CUSTOM_POSE_TRIGGER && (
            <div className="mt-4">
                <label htmlFor="custom-pose" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Custom Pose Description</label>
                <textarea
                    id="custom-pose"
                    value={customPose}
                    onChange={(e) => setCustomPose(e.target.value)}
                    placeholder="e.g., Model laughing while looking over their shoulder, holding the product."
                    className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-brand-accent focus:border-brand-accent text-sm"
                    rows={3}
                />
            </div>
          )}
        </Section>

        <Section title="4. Outfit Control">
          <Select label="Clothing Type" value={clothingType} onChange={(e) => setClothingType(e.target.value as ClothingType)} className="mb-4">
                {CLOTHING_TYPE_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
          </Select>
          <div className="flex space-x-2">
            {(Object.values(OutfitChoice)).map(choice => (
                <button key={choice} onClick={() => setOutfitChoice(choice)} className={`flex-1 p-2 rounded-md text-sm transition-colors ${outfitChoice === choice ? 'bg-brand-accent text-white' : 'bg-slate-200 dark:bg-slate-700'}`}>
                    {choice}
                </button>
            ))}
          </div>
          {outfitChoice === OutfitChoice.Reference && (
              <div className="mt-4">
                   <label htmlFor="outfit-upload" className="cursor-pointer w-full h-24 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg flex items-center justify-center text-slate-500 hover:border-brand-accent hover:text-brand-accent transition-colors">
                        {outfitReferencePreview ? <img src={outfitReferencePreview} alt="Outfit preview" className="h-full w-full object-contain rounded-lg p-1" /> : (
                        <div className="text-center">
                            <Icon name="upload" className="mx-auto mb-1" />
                            <span>Upload Outfit</span>
                        </div>
                        )}
                    </label>
                    <input id="outfit-upload" type="file" className="hidden" accept="image/png, image/jpeg" onChange={(e) => handleFileChange(e, setOutfitReferenceImage, setOutfitReferencePreview)} />
              </div>
          )}
        </Section>

      </div>

      <div className="mt-auto pt-6 border-t border-slate-200 dark:border-slate-700">
        <Button onClick={handleSubmit} disabled={isLoading || !productImage || !productDescription.trim()} fullWidth>
          {isLoading ? 'Generating...' : 'Generate Image'}
        </Button>
      </div>
    </aside>
  );
};