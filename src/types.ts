export type BorderStyle = 
  | 'polaroid' 
  | 'film' 
  | 'museum' 
  | 'glass' 
  | 'neon' 
  | 'brutalist' 
  | 'stamp' 
  | 'torn';

export type BackgroundType = 'white' | 'black' | 'transparent' | 'custom' | 'pattern';

export interface TextOverlay {
  enabled: boolean;
  text: string;
  fontFamily: string;
  fontSize: number;
  color: string;
  positionX: number;
  positionY: number;
}

export interface FrameSettings {
  borderStyle: BorderStyle;
  borderColor: string;
  frameWidth: number;
  framePadding: number;
  frameRadius: number;
  shadowIntensity: number;
  backgroundType: BackgroundType;
  customBackgroundColor: string;
  backgroundPattern?: string;
  textOverlay: TextOverlay;
  // Image Adjustments
  imageBrightness?: number;
  imageContrast?: number;
  imageSaturation?: number;
  imageBlur?: number;
  imageSepia?: number;
  imageGrayscale?: number;
}
