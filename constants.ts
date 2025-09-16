import { AspectRatio, ModelGender, ModelPersona, StylePreset, SkinTone, ClothingType } from './types';

export const ASPECT_RATIO_OPTIONS = Object.values(AspectRatio);
export const MODEL_GENDER_OPTIONS = Object.values(ModelGender);
export const MODEL_PERSONA_OPTIONS = Object.values(ModelPersona);
export const STYLE_PRESET_OPTIONS = Object.values(StylePreset);
export const SKIN_TONE_OPTIONS = Object.values(SkinTone);
export const CLOTHING_TYPE_OPTIONS = Object.values(ClothingType);

export const CUSTOM_POSE_TRIGGER = 'Custom Pose...';

export const POSE_SUGGESTIONS: string[] = [
  'Holding product at chest level, looking at the camera',
  'A casual lifestyle shot with the product naturally in the scene',
  'Unboxing or presenting the product enthusiastically',
  'Pointing towards the product with an excited expression',
  'A dynamic action pose, using the product',
  'Model wearing the product (e.g., clothing, jewelry)',
  'Close-up shot showing product details or application',
  'Happily interacting with or using the product',
  CUSTOM_POSE_TRIGGER,
];