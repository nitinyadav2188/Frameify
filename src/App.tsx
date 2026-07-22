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
  const [images, setImages] = useState<string[]>([]);
  
  const [settings, setSettings] = useState<FrameSettings>({
    borderStyle: 'stamp',
    borderColor: '#ffffff',
    frameWidth: 24,
    framePadding: 2,
    frameRadius: 2,
    shadowIntensity: 20,
    backgroundType: 'transparent',
    customBackgroundColor: '#f0f0f0',
    backgroundPattern: 'dots',
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
    setImages([]);
  };

  const handleImagesUpload = (imgs: string[], preset?: Partial<FrameSettings>) => {
    setImages(imgs);
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
      {images.length === 0 ? (
        <Home onImagesUpload={handleImagesUpload} />
      ) : (
        <Editor 
          images={images} 
          onClose={handleClose} 
          settings={settings}
          setSettings={setSettings}
        />
      )}
    </div>
  );
}
