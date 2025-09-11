
export enum AspectRatio {
  Portrait = '9:16',
  Square = '1:1',
  Landscape = '16:9',
  PortraitWide = '3:4',
  LandscapeTall = '4:3',
}

export enum ModelGender {
  Female = 'Female',
  Male = 'Male',
}

export enum SkinTone {
    Light = 'Light',
    Medium = 'Medium',
    Deep = 'Deep',
}

export enum ClothingType {
    Traditional = 'Traditional Indian Wear',
    Casual = 'Casual Wear',
    Formal = 'Formal Wear',
}

export enum ModelPersona {
  ContentCreator = 'Content Creator',
  Doctor = 'Doctor Influencer',
  Beauty = 'Beauty Influencer',
  Fashion = 'Fashion Influencer',
  Food = 'Food Influencer',
  Pet = 'Pet Influencer (with pet)',
  Fitness = 'Fitness Influencer',
  Jewelry = 'Jewelry Influencer/Model',
}

export enum OutfitChoice {
  AI = 'AI-Suggested',
  Reference = 'Upload Reference',
}

export enum StylePreset {
  Minimal = 'Minimal',
  Luxury = 'Luxury',
  Bold = 'Bold',
  Playful = 'Playful',
  Techy = 'Techy',
  Editorial = 'Editorial',
  Lifestyle = 'Lifestyle',
}

export interface GenerateImageParams {
  productImage: File;
  aspectRatio: AspectRatio;
  modelGender: ModelGender;
  modelPersona: ModelPersona;
  skinTone: SkinTone;
  clothingType: ClothingType;
  outfitChoice: OutfitChoice;
  outfitReferenceImage?: File;
  stylePreset: StylePreset;
  customStyleConcept?: string;
  poseSuggestion: string;
}

export interface GeneratedImage {
  id: string;
  imageUrl: string;
  caption: string;
  hashtags: string;
}
