import { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import getCroppedImg from '../utils/cropImage';
import { cn } from '../utils/cn';
import { Check, X, Crop, Image as ImageIcon } from 'lucide-react';

interface ImageCropperProps {
  image: string;
  onCropComplete: (croppedImage: string) => void;
  onCancel: () => void;
}

const ASPECTS = [
  { label: 'Original', value: undefined, icon: <ImageIcon className="w-4 h-4" /> },
  { label: '1:1', value: 1, icon: <div className="w-4 h-4 border-2 border-current rounded-sm"></div> },
  { label: '4:5', value: 4 / 5, icon: <div className="w-3 h-4 border-2 border-current rounded-sm"></div> },
  { label: '16:9', value: 16 / 9, icon: <div className="w-5 h-3 border-2 border-current rounded-sm"></div> },
  { label: '9:16', value: 9 / 16, icon: <div className="w-3 h-5 border-2 border-current rounded-sm"></div> },
];

export function ImageCropper({ image, onCropComplete, onCancel }: ImageCropperProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [aspect, setAspect] = useState<number | undefined>(undefined);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const onCropCompleteCallback = useCallback((croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleConfirm = async () => {
    if (!croppedAreaPixels) return;
    setIsProcessing(true);
    try {
      const croppedImage = await getCroppedImg(image, croppedAreaPixels);
      if (croppedImage) {
        onCropComplete(croppedImage);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-slate-900 text-white">
      <div className="h-16 flex items-center justify-between px-4 lg:px-6 bg-slate-900 border-b border-slate-800 shrink-0">
        <div className="flex items-center gap-2">
          <button 
            onClick={onCancel}
            className="p-2 hover:bg-slate-800 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="font-bold text-lg hidden sm:block text-slate-100">Crop Photo</div>
        </div>
        
        <button 
          onClick={handleConfirm}
          disabled={isProcessing}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
        >
          <Check className="w-4 h-4" />
          <span className="hidden sm:inline">{isProcessing ? 'Processing...' : 'Confirm'}</span>
        </button>
      </div>

      <div className="flex-1 relative bg-black">
        <Cropper
          image={image}
          crop={crop}
          zoom={zoom}
          aspect={aspect}
          onCropChange={setCrop}
          onCropComplete={onCropCompleteCallback}
          onZoomChange={setZoom}
          classes={{
            containerClassName: 'absolute inset-0',
          }}
        />
      </div>

      <div className="bg-slate-900 border-t border-slate-800 p-6 flex flex-col items-center gap-6">
        <div className="w-full max-w-md flex flex-col gap-2">
          <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">Zoom</label>
          <input
            type="range"
            value={zoom}
            min={1}
            max={3}
            step={0.1}
            aria-labelledby="Zoom"
            onChange={(e) => setZoom(Number(e.target.value))}
            className="w-full h-1 bg-slate-700 rounded-sm appearance-none cursor-pointer accent-blue-500"
          />
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          {ASPECTS.map((ratio, index) => (
            <button
              key={index}
              onClick={() => setAspect(ratio.value)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                aspect === ratio.value
                  ? "bg-blue-600 text-white"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white"
              )}
            >
              {ratio.icon}
              {ratio.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
