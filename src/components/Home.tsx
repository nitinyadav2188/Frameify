import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { ImagePlus, Sparkles, Check, ArrowRight } from 'lucide-react';
import { cn } from '../utils/cn';
import { FrameSettings } from '../types';
import { FrameCanvas } from './FrameCanvas';
import { motion } from 'motion/react';

interface HomeProps {
  onImagesUpload: (images: string[], preset?: Partial<FrameSettings>) => void;
}

const DEFAULT_SETTINGS: FrameSettings = {
  borderStyle: 'polaroid',
  borderColor: '#ffffff',
  frameWidth: 24,
  framePadding: 2,
  frameRadius: 2,
  shadowIntensity: 20,
  backgroundType: 'white',
  customBackgroundColor: '#000000',
  backgroundPattern: 'dots',
  textOverlay: {
    enabled: false,
    text: '',
    fontFamily: 'font-sans',
    fontSize: 24,
    color: '#000000',
    positionX: 50, positionY: 90,
  },
  imageBrightness: 100,
  imageContrast: 100,
  imageSaturation: 100,
  imageBlur: 0,
  imageSepia: 0,
  imageGrayscale: 0,
};

const PRESETS = [
  {
    name: "Classic Polaroid",
    url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    preset: {
      borderStyle: 'polaroid' as const,
      borderColor: '#ffffff',
      frameWidth: 24,
      framePadding: 2,
      frameRadius: 2,
      shadowIntensity: 25,
      backgroundType: 'transparent' as const,
      textOverlay: {
        enabled: true,
        text: 'PORTRAIT',
        fontFamily: 'font-[cursive]',
        fontSize: 32,
        color: '#18181b',
        positionX: 50, positionY: 92,
      }
    }
  },
  {
    name: "Cinematic Film",
    url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=600&q=80",
    preset: {
      borderStyle: 'film' as const,
      borderColor: '#111111',
      frameWidth: 32,
      framePadding: 4,
      frameRadius: 0,
      shadowIntensity: 50,
      backgroundType: 'transparent' as const,
      textOverlay: {
        enabled: true,
        text: 'KODAK PORTRA 400',
        fontFamily: 'font-mono',
        fontSize: 16,
        color: '#facc15',
        positionX: 50, positionY: 94,
      }
    }
  },
  {
    name: "Gallery Museum",
    url: "https://images.unsplash.com/photo-1518382473007-8e6f7dfa74d2?auto=format&fit=crop&w=600&q=80",
    preset: {
      borderStyle: 'museum' as const,
      borderColor: '#ffffff',
      frameWidth: 48,
      framePadding: 0,
      frameRadius: 0,
      shadowIntensity: 30,
      backgroundType: 'transparent' as const,
      textOverlay: {
        enabled: false,
        text: '',
        fontFamily: 'font-sans',
        fontSize: 24,
        color: '#000000',
        positionX: 50, positionY: 50,
      }
    }
  },
  {
    name: "Neo Brutalism",
    url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80",
    preset: {
      borderStyle: 'brutalist' as const,
      borderColor: '#ffffff',
      frameWidth: 24,
      framePadding: 0,
      frameRadius: 0,
      shadowIntensity: 0,
      backgroundType: 'white' as const,
      textOverlay: {
        enabled: true,
        text: 'VOL. 01',
        fontFamily: 'font-[Impact,sans-serif]',
        fontSize: 48,
        color: '#000000',
        positionX: 50, positionY: 50,
      }
    }
  }
];

export function Home({ onImagesUpload }: HomeProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      Promise.all(acceptedFiles.map(file => {
        return new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            if (e.target?.result) resolve(e.target.result as string);
          };
          reader.readAsDataURL(file);
        });
      })).then(images => {
         onImagesUpload(images);
      });
    }
  }, [onImagesUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/png': ['.png'],
      'image/webp': ['.webp'],
    },
    maxFiles: 10,
  } as any);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA] text-zinc-900 selection:bg-zinc-200">
      <header className="py-6 px-8 flex items-center justify-between border-b border-zinc-200/60 bg-white/50 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-zinc-900 rounded flex items-center justify-center text-white">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <polyline points="21 15 16 10 5 21"/>
            </svg>
          </div>
          <span className="font-semibold text-lg tracking-tight font-display">Frameify</span>
        </div>
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-500">
          <span className="hover:text-zinc-900 transition-colors cursor-pointer">Templates</span>
          <span className="hover:text-zinc-900 transition-colors cursor-pointer">Features</span>
          <span className="hover:text-zinc-900 transition-colors cursor-pointer">Pro</span>
        </div>
      </header>

      <motion.main 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="flex-grow flex flex-col items-center pt-24 pb-32 px-6 text-center max-w-5xl mx-auto w-full"
      >
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-100 text-zinc-800 text-xs font-medium mb-8 border border-zinc-200"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Professional-grade framing tools, right in your browser.</span>
        </motion.div>
        
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-zinc-900 mb-6 leading-[1.1] font-display max-w-4xl">
          Elevate your photos with <br className="hidden md:block"/>
          <span className="text-zinc-400">studio-quality frames.</span>
        </h1>
        
        <p className="text-lg md:text-xl text-zinc-500 mb-12 max-w-2xl font-light">
          Upload any image and apply cinematic film borders, classic polaroid mounts, and gallery-ready mats in seconds.
        </p>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          {...getRootProps()} 
          className={cn(
            "w-full max-w-2xl p-12 md:p-20 border-[1.5px] border-dashed rounded-3xl cursor-pointer transition-all duration-300 ease-out group relative overflow-hidden bg-white",
            isDragActive 
              ? "border-zinc-900 bg-zinc-50 shadow-2xl scale-[1.02]" 
              : "border-zinc-300 hover:border-zinc-900 hover:shadow-xl hover:-translate-y-1"
          )}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center justify-center gap-5 relative z-10">
            <div className="w-16 h-16 bg-zinc-900 text-white rounded-2xl flex items-center justify-center group-hover:rotate-6 transition-transform duration-300 shadow-lg">
              <ImagePlus className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-semibold tracking-tight text-zinc-900">
                {isDragActive ? "Drop image to begin" : "Start Framing"}
              </p>
              <p className="text-zinc-500 text-base font-light">
                Drag & drop or click to upload
              </p>
            </div>
            <p className="text-xs text-zinc-400 mt-2 font-medium tracking-wide uppercase">
              Supports high-res JPG, PNG, WEBP
            </p>
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-50/0 to-zinc-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full mt-32"
        >
          <div className="flex flex-col items-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 font-display">Featured Styles</h2>
            <p className="text-zinc-500 mt-3 font-light text-lg">Click any style to start creating</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRESETS.map((preset, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + idx * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="group flex flex-col gap-4 rounded-3xl p-5 bg-white border border-zinc-200 hover:border-zinc-400 transition-all duration-300 hover:shadow-xl cursor-pointer text-left"
                onClick={() => {
                  onImagesUpload([preset.url], preset.preset);
                }}
              >
                <div className="relative w-full aspect-square flex items-center justify-center bg-zinc-50 rounded-2xl overflow-hidden transition-colors group-hover:bg-zinc-100">
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="scale-[0.4] origin-center transition-all duration-500 group-hover:scale-[0.45] group-hover:rotate-1 shadow-2xl">
                      <FrameCanvas 
                        images={[preset.url]} 
                        settings={{ ...DEFAULT_SETTINGS, ...preset.preset } as FrameSettings} 
                        isExporting={false}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <div className="font-medium text-zinc-900 tracking-tight text-lg">
                    {preset.name}
                  </div>
                  <ArrowRight className="w-5 h-5 text-zinc-300 group-hover:text-zinc-900 transition-colors group-hover:translate-x-1 duration-300" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-8 mt-24 text-zinc-400 text-sm font-medium tracking-wide uppercase"
        >
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-zinc-300" />
            Browser-based
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-zinc-300" />
            No Watermarks
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-zinc-300" />
            High Quality Export
          </div>
        </motion.div>
      </motion.main>
    </div>
  );
}
