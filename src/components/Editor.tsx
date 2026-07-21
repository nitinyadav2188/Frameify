import { useState, useRef, useCallback } from 'react';
import { ChevronLeft, Download, ZoomIn, ZoomOut, Maximize, Share2 } from 'lucide-react';
import { toCanvas, toBlob } from 'html-to-image';
import { FrameSettings } from '../types';
import { Sidebar } from './Sidebar';
import { FrameCanvas } from './FrameCanvas';

interface EditorProps {
  image: string;
  onClose: () => void;
  settings: FrameSettings;
  setSettings: (settings: FrameSettings | ((prev: FrameSettings) => FrameSettings)) => void;
}

export function Editor({ image, onClose, settings, setSettings }: EditorProps) {
  const [zoom, setZoom] = useState(1);
  const canvasRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);

  const handleDownload = useCallback(async () => {
    if (!canvasRef.current || isExporting) return;
    
    setIsExporting(true);
    try {
      // Temporarily set zoom to 1 for high-quality export
      const currentZoom = zoom;
      
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
    
    // Check if browser supports sharing files
    if (!navigator.canShare) {
      alert("Sharing files is not supported on this browser. Please use the Download button instead.");
      return;
    }

    setIsExporting(true);
    try {
      const blob = await toBlob(canvasRef.current, {
        quality: 1,
        pixelRatio: 3, // 3x resolution for high quality share
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
      // AbortError is thrown when user cancels the share dialog, which is normal
      if (err.name !== 'AbortError') {
        console.error('Failed to share image', err);
      }
    } finally {
      setIsExporting(false);
    }
  }, [isExporting]);

  return (
    <div className="h-screen flex flex-col bg-slate-50 overflow-hidden">
      {/* Header */}
      <header className="h-16 flex items-center justify-between px-4 lg:px-6 bg-white border-b border-slate-200 shrink-0 z-10">
        <div className="flex items-center gap-4">
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors"
            aria-label="Back to home"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="font-bold text-lg hidden sm:block">Editor</div>
        </div>
        
        <div className="flex items-center gap-2">
          {typeof navigator !== 'undefined' && typeof navigator.share === 'function' && (
            <button 
              onClick={handleShare}
              disabled={isExporting}
              className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
            >
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">Share</span>
            </button>
          )}
          <button 
            onClick={handleDownload}
            disabled={isExporting}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">{isExporting ? 'Exporting...' : 'Download'}</span>
          </button>
        </div>
      </header>

      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        {/* Main Canvas Area */}
        <main 
          className="flex-1 flex flex-col items-center justify-center relative overflow-hidden p-4 lg:p-8"
          style={{
            backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)',
            backgroundSize: '24px 24px'
          }}
        >
          {/* Zoom Controls */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-white p-1 rounded-full shadow-lg border border-slate-200 z-10">
            <button 
              onClick={() => setZoom(z => Math.max(0.1, z - 0.1))}
              className="p-2 hover:bg-slate-100 rounded-full"
              aria-label="Zoom out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <div className="w-16 text-center text-sm font-medium text-slate-600">
              {Math.round(zoom * 100)}%
            </div>
            <button 
              onClick={() => setZoom(z => Math.min(3, z + 0.1))}
              className="p-2 hover:bg-slate-100 rounded-full"
              aria-label="Zoom in"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <div className="w-px h-4 bg-slate-300 mx-1"></div>
            <button 
              onClick={() => setZoom(1)}
              className="p-2 hover:bg-slate-100 rounded-full"
              aria-label="Reset zoom"
            >
              <Maximize className="w-4 h-4" />
            </button>
          </div>

          <div 
            className="w-full h-full flex items-center justify-center overflow-auto"
            style={{ 
              /* This allows scrolling if image is bigger than container */
            }}
          >
            <div 
              style={{ 
                transform: `scale(${zoom})`,
                transformOrigin: 'center center',
                transition: isExporting ? 'none' : 'transform 0.1s ease-out'
              }}
              className="flex items-center justify-center p-8" // Extra padding for shadow
            >
              <div ref={canvasRef}>
                <FrameCanvas image={image} settings={settings} isExporting={isExporting} />
              </div>
            </div>
          </div>
        </main>

        {/* Sidebar */}
        <aside className="w-full lg:w-[340px] bg-white border-t lg:border-t-0 lg:border-l border-slate-200 flex-shrink-0 h-1/2 lg:h-full overflow-y-auto">
          <Sidebar settings={settings} setSettings={setSettings} />
        </aside>
      </div>
    </div>
  );
}
