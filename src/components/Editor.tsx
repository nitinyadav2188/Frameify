import { useState, useRef, useCallback } from 'react';
import { ChevronLeft, Download, ZoomIn, ZoomOut, Maximize, Share2 } from 'lucide-react';
import { toCanvas, toBlob } from 'html-to-image';
import { FrameSettings } from '../types';
import { Sidebar } from './Sidebar';
import { FrameCanvas } from './FrameCanvas';
import { motion } from 'motion/react';
import { cn } from '../utils/cn';

interface EditorProps {
  images: string[];
  onClose: () => void;
  settings: FrameSettings;
  setSettings: (settings: FrameSettings | ((prev: FrameSettings) => FrameSettings)) => void;
}

export function Editor({ images, onClose, settings, setSettings }: EditorProps) {
  const [zoom, setZoom] = useState(1);
  const canvasRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [showOriginal, setShowOriginal] = useState(false);

  const handleDownload = useCallback(async () => {
    if (!canvasRef.current || isExporting) return;
    
    setIsExporting(true);
    try {
      const canvas = await toCanvas(canvasRef.current, {
        quality: 1,
        pixelRatio: 3, // 3x resolution
      });
      
      const dataUrl = canvas.toDataURL('image/png');
      
      const link = document.createElement('a');
      link.download = `photo-stamp-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
      
    } catch (err) {
      console.error('Failed to export image', err);
      alert('Failed to export image. Please try again.');
    } finally {
      setIsExporting(false);
    }
  }, [zoom, isExporting]);

  const handleShare = useCallback(async () => {
    if (!canvasRef.current || isExporting) return;
    
    if (!navigator.canShare) {
      alert("Sharing files is not supported on this browser. Please use the Download button instead.");
      return;
    }

    setIsExporting(true);
    try {
      const blob = await toBlob(canvasRef.current, {
        quality: 1,
        pixelRatio: 3, 
      });
      
      if (!blob) throw new Error('Could not generate image blob');
      
      const file = new File([blob], `photo-stamp-${Date.now()}.png`, { type: 'image/png' });
      
      if (navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: 'My Photo Stamp',
          text: 'Check out this photo stamp I created!',
          files: [file],
        });
      } else {
        alert("Your system doesn't support sharing this file type.");
      }
    } catch (err: any) {
      if (err.name !== 'AbortError') {
        console.error('Failed to share image', err);
      }
    } finally {
      setIsExporting(false);
    }
  }, [isExporting]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-screen flex flex-col bg-[#F3F4F6] overflow-hidden text-zinc-900"
    >
      {/* Header */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="h-16 flex items-center justify-between px-4 lg:px-6 bg-white border-b border-zinc-200 shrink-0 z-20"
      >
        <div className="flex items-center gap-4">
          <button 
            onClick={onClose}
            className="p-2 hover:bg-zinc-100 rounded-full transition-colors text-zinc-500 hover:text-zinc-900"
            aria-label="Back to home"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="font-semibold tracking-wide text-lg hidden sm:block text-zinc-800">Editor Workspace</div>
        </div>
        
        <div className="flex items-center gap-3">
          {typeof navigator !== 'undefined' && typeof navigator.share === 'function' && (
            <button 
              onClick={handleShare}
              disabled={isExporting || showOriginal}
              className="flex items-center gap-2 bg-white border border-zinc-200 hover:bg-zinc-50 text-zinc-700 px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
            >
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">Share</span>
            </button>
          )}
          <button 
            onClick={handleDownload}
            disabled={isExporting || showOriginal}
            className="flex items-center gap-2 bg-zinc-900 text-white hover:bg-zinc-800 px-5 py-2 rounded-lg font-semibold transition-colors disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">{isExporting ? 'Exporting...' : 'Export Frame'}</span>
          </button>
        </div>
      </motion.header>

      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        {/* Main Canvas Area */}
        <main 
          className="flex-1 flex flex-col items-center justify-center relative overflow-hidden"
          style={{
            backgroundImage: 'radial-gradient(#cbd5e1 1.5px, transparent 1.5px)',
            backgroundSize: '24px 24px'
          }}
        >
          {/* Before/After Toggle */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="absolute top-6 left-1/2 -translate-x-1/2 flex items-center bg-white/90 backdrop-blur-md p-1 rounded-lg shadow-lg border border-zinc-200/50 z-20"
          >
            <button
              onClick={() => setShowOriginal(true)}
              className={cn(
                "px-4 py-1.5 rounded-md text-sm font-medium transition-colors",
                showOriginal ? "bg-zinc-900 text-white shadow-sm" : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100"
              )}
            >
              Before
            </button>
            <button
              onClick={() => setShowOriginal(false)}
              className={cn(
                "px-4 py-1.5 rounded-md text-sm font-medium transition-colors",
                !showOriginal ? "bg-zinc-900 text-white shadow-sm" : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100"
              )}
            >
              After
            </button>
          </motion.div>

          {/* Zoom Controls */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-white/90 backdrop-blur-md p-1.5 rounded-full shadow-lg border border-zinc-200/50 z-20"
          >
            <button 
              onClick={() => setZoom(z => Math.max(0.1, z - 0.1))}
              className="p-2 hover:bg-zinc-100 rounded-full text-zinc-600 transition-colors"
              aria-label="Zoom out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <div className="w-16 text-center text-sm font-medium text-zinc-700 tabular-nums">
              {Math.round(zoom * 100)}%
            </div>
            <button 
              onClick={() => setZoom(z => Math.min(3, z + 0.1))}
              className="p-2 hover:bg-zinc-100 rounded-full text-zinc-600 transition-colors"
              aria-label="Zoom in"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <div className="w-px h-4 bg-zinc-200 mx-1"></div>
            <button 
              onClick={() => setZoom(1)}
              className="p-2 hover:bg-zinc-100 rounded-full text-zinc-600 transition-colors"
              aria-label="Reset zoom"
            >
              <Maximize className="w-4 h-4" />
            </button>
          </motion.div>

          <div 
            className="w-full h-full flex items-center justify-center overflow-auto p-4 lg:p-12"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{ 
                transform: `scale(${zoom})`,
                transformOrigin: 'center center',
                transition: isExporting ? 'none' : 'transform 0.1s ease-out'
              }}
              className="flex items-center justify-center p-8 shadow-2xl drop-shadow-2xl"
            >
              {showOriginal ? (
                <div className="flex items-center justify-center gap-8 overflow-x-auto p-12">
                  {images.map((img, idx) => (
                    <img 
                      key={idx} 
                      src={img} 
                      alt="Original" 
                      className="max-w-[70vw] max-h-[70vh] object-contain shadow-xl rounded-md shrink-0"
                    />
                  ))}
                </div>
              ) : (
                <div ref={canvasRef} className="shadow-2xl">
                  <FrameCanvas images={images} settings={settings} isExporting={isExporting} />
                </div>
              )}
            </motion.div>
          </div>
        </main>

        {/* Sidebar */}
        <motion.aside 
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-full lg:w-[360px] bg-white text-zinc-900 border-t lg:border-t-0 lg:border-l border-zinc-200 flex-shrink-0 h-1/2 lg:h-full overflow-y-auto shadow-2xl z-30"
        >
          <Sidebar settings={settings} setSettings={setSettings} />
        </motion.aside>
      </div>
    </motion.div>
  );
}
