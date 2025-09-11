import { AspectRatio, ModelGender, ModelPersona, StylePreset, SkinTone, ClothingType } from './types';

export const ASPECT_RATIO_OPTIONS = Object.values(AspectRatio);
export const MODEL_GENDER_OPTIONS = Object.values(ModelGender);
export const MODEL_PERSONA_OPTIONS = Object.values(ModelPersona);
export const STYLE_PRESET_OPTIONS = Object.values(StylePreset);
export const SKIN_TONE_OPTIONS = Object.values(SkinTone);
export const CLOTHING_TYPE_OPTIONS = Object.values(ClothingType);

export const POSE_SUGGESTIONS = [
    'Holding product at chest level, looking at camera',
    'Model wearing the product (e.g., jewelry, clothing)',
    'Pointing towards the product with excitement',
    'Looking thoughtfully at the product',
    'A lifestyle action shot using the product',
    'Unboxing or presenting the product to the viewer',
    'A casual pose with the product on a nearby surface'
];