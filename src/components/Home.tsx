import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { ImagePlus, Sparkles, Check, Smartphone } from 'lucide-react';
import { cn } from '../utils/cn';
import { FrameSettings } from '../types';
import { FrameCanvas } from './FrameCanvas';

interface HomeProps {
  onImageUpload: (image: string, preset?: Partial<FrameSettings>) => void;
}

const DEFAULT_SETTINGS: FrameSettings = {
  borderStyle: 'solid',
  borderColor: '#ffffff',
  borderWidth: 20,
  borderRadius: 0,
  backgroundType: 'white',
  padding: 10,
  shadow: true,
  shadowIntensity: 20,
  textOverlay: {
    enabled: false,
    text: '',
    fontFamily: 'font-sans',
    fontSize: 24,
    color: '#000000',
    position: 'bottom',
  },
};

const PRESETS = [
  {
    name: "Classic Polaroid",
    url: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?auto=format&fit=crop&w=400&q=80",
    preset: {
      borderStyle: 'polaroid' as const,
      borderColor: '#ffffff',
      borderWidth: 16,
      borderRadius: 0,
      padding: 0,
      backgroundType: 'transparent' as const,
      shadow: true,
      shadowIntensity: 25,
      textOverlay: {
        enabled: true,
        text: 'Summer Vibes',
        fontFamily: 'font-[cursive]',
        fontSize: 48,
        color: '#475569',
        position: 'bottom' as const,
      }
    }
  },
  {
    name: "Airmail Stamp",
    url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
    preset: {
      borderStyle: 'stamp' as const,
      borderColor: '#fdfbf7',
      borderWidth: 24,
      borderRadius: 0,
      padding: 10,
      backgroundType: 'transparent' as const,
      shadow: true,
      shadowIntensity: 20,
      textOverlay: {
        enabled: true,
        text: 'POSTAGE ¢5',
        fontFamily: 'font-[Impact,sans-serif]',
        fontSize: 32,
        color: '#94a3b8',
        position: 'top' as const,
      }
    }
  },
  {
    name: "Cinema Reel",
    url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80",
    preset: {
      borderStyle: 'film' as const,
      borderColor: '#111111',
      borderWidth: 32,
      borderRadius: 0,
      padding: 8,
      backgroundType: 'transparent' as const,
      shadow: true,
      shadowIntensity: 40,
      textOverlay: {
        enabled: true,
        text: 'SCENE I - TAKE 3',
        fontFamily: 'font-mono',
        fontSize: 24,
        color: '#facc15',
        position: 'bottom' as const,
      }
    }
  },
  {
    name: "Modern Pop",
    url: "https://images.unsplash.com/photo-1552083375-1447ce886485?auto=format&fit=crop&w=400&q=80",
    preset: {
      borderStyle: 'rounded' as const,
      borderColor: '#2563eb',
      borderWidth: 16,
      borderRadius: 24,
      padding: 8,
      backgroundType: 'transparent' as const,
      shadow: true,
      shadowIntensity: 15,
      textOverlay: {
        enabled: true,
        text: 'POP ART',
        fontFamily: 'font-[Impact,sans-serif]',
        fontSize: 64,
        color: '#ffffff',
        position: 'center' as const,
      }
    }
  },
  {
    name: "Gallery Frame",
    url: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=400&q=80",
    preset: {
      borderStyle: 'classic' as const,
      borderColor: '#1e293b',
      borderWidth: 24,
      borderRadius: 0,
      padding: 8,
      backgroundType: 'transparent' as const,
      shadow: true,
      shadowIntensity: 40,
      textOverlay: {
        enabled: true,
        text: 'EXHIBIT A',
        fontFamily: 'font-serif',
        fontSize: 28,
        color: '#1e293b',
        position: 'bottom' as const,
      }
    }
  }
];

export function Home({ onImageUpload }: HomeProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          onImageUpload(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  }, [onImageUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/png': ['.png'],
      'image/webp': ['.webp'],
    },
    maxFiles: 1,
  } as any);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="py-6 px-8 flex items-center justify-between bg-white border-b border-slate-200">
        <div className="flex items-center gap-2 text-blue-600">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
            <circle cx="8.5" cy="8.5" r="1.5"/>
            <polyline points="21 15 16 10 5 21"/>
          </svg>
          <span className="font-bold text-xl tracking-tight text-blue-600 font-display">Photo Stamp</span>
          <span className="text-[10px] uppercase px-1.5 py-0.5 bg-blue-100 text-blue-800 rounded font-semibold tracking-wide ml-1">Beta</span>
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center p-6 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-medium mb-6">
          <Sparkles className="w-4 h-4" />
          Free & No Signup Required
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 mb-6 leading-tight font-display">
          Convert Photos into Beautiful <span className="text-blue-600">Stamp Frames</span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl">
          Upload any image and turn it into a customizable stamp-style frame in seconds. Works completely in your browser.
        </p>

        <div 
          {...getRootProps()} 
          className={cn(
            "w-full max-w-xl p-10 md:p-16 border-3 border-dashed rounded-3xl cursor-pointer transition-all duration-200 ease-in-out group focus:outline-none focus:ring-4 focus:ring-blue-500/20",
            isDragActive 
              ? "border-blue-500 bg-blue-50" 
              : "border-slate-300 bg-white hover:border-blue-400 hover:bg-slate-50"
          )}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform relative">
              <ImagePlus className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <p className="text-xl font-semibold text-slate-900">
                {isDragActive ? "Drop your photo here" : "Upload a Photo"}
              </p>
              <p className="text-slate-500 text-sm">
                Drag & drop or click to browse
              </p>
            </div>
            <p className="text-xs text-slate-400 mt-2 font-medium">
              Supports JPG, PNG, WEBP
            </p>
          </div>
        </div>

        <div className="w-full mt-16 max-w-5xl">
          <div className="flex flex-col items-center mb-8">
            <h2 className="text-2xl font-bold text-slate-900 font-display">Inspiration Gallery</h2>
            <p className="text-slate-500 text-sm mt-1">Check out these example frame styles</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6">
            {PRESETS.map((preset, idx) => (
              <div
                key={idx}
                className="group flex flex-col items-center gap-4 rounded-2xl p-4 transition-colors hover:bg-white hover:shadow-lg border border-transparent hover:border-slate-100 w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(20%-1.2rem)] min-w-[150px]"
              >
                <div className="relative w-full aspect-square flex items-center justify-center bg-slate-100/50 rounded-xl overflow-hidden transition-colors group-hover:bg-slate-200/50">
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="scale-[0.4] origin-center transition-transform duration-500 group-hover:scale-[0.45] group-hover:rotate-2">
                      <FrameCanvas 
                        image={preset.url} 
                        settings={{ ...DEFAULT_SETTINGS, ...preset.preset } as FrameSettings} 
                        zoom={1}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-slate-700 font-medium">
                  {preset.name}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12 mt-16 text-slate-500 text-sm font-medium">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-green-500" />
            100% Free
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-green-500" />
            No Watermarks
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-green-500" />
            High Quality Export
          </div>
          <div className="flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-slate-400" />
            Works on Mobile
          </div>
        </div>
      </main>
    </div>
  );
}
