export type BorderStyle = 
  | 'stamp' 
  | 'vintage' 
  | 'film' 
  | 'rounded' 
  | 'classic' 
  | 'dotted' 
  | 'scalloped' 
  | 'polaroid';

export type BackgroundType = 'white' | 'black' | 'transparent' | 'custom';

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
  borderWidth: number;
  borderRadius: number;
  backgroundType: BackgroundType;
  customBackgroundColor: string;
  padding: number;
  shadow: boolean;
  shadowIntensity: number;
  textOverlay: TextOverlay;
}
