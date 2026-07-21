/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Home } from './components/Home';
import { Editor } from './components/Editor';
import { ImageCropper } from './components/ImageCropper';
import { FrameSettings } from './types';

export default function App() {
  const [image, setImage] = useState<string | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  
  const [settings, setSettings] = useState<FrameSettings>({
    borderStyle: 'stamp',
    borderColor: '#ffffff',
    borderWidth: 20,
    borderRadius: 0,
    backgroundType: 'transparent',
    customBackgroundColor: '#f0f0f0',
    padding: 10,
    shadow: true,
    shadowIntensity: 20,
    textOverlay: {
      enabled: false,
      text: '',
      fontFamily: 'font-sans',
      fontSize: 24,
      color: '#000000',
      positionX: 50,
      positionY: 90,
    },
  });

  const handleClose = () => {
    setImage(null);
    setCroppedImage(null);
  };

  const handleImageUpload = (img: string, preset?: Partial<FrameSettings>) => {
    setImage(img);
    if (preset) {
      setSettings(prev => ({ 
        ...prev, 
        ...preset,
        textOverlay: preset.textOverlay ? { ...prev.textOverlay, ...preset.textOverlay } : prev.textOverlay
      }));
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      {!image ? (
        <Home onImageUpload={handleImageUpload} />
      ) : !croppedImage ? (
        <ImageCropper 
          image={image} 
          onCropComplete={setCroppedImage} 
          onCancel={handleClose} 
        />
      ) : (
        <Editor 
          image={croppedImage} 
          onClose={handleClose} 
          settings={settings}
          setSettings={setSettings}
        />
      )}
    </div>
  );
}
