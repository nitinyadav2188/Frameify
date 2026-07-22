import { useMemo, CSSProperties } from 'react';
import { FrameSettings } from '../types';
import { cn } from '../utils/cn';

interface Props {
  image?: string;
  images?: string[];
  settings: FrameSettings;
  isExporting: boolean;
  isPreview?: boolean;
}

export function FrameCanvas({ image, images, settings, isExporting, isPreview = false }: Props) {
  const imageList = images || (image ? [image] : []);
  const borderWidth = settings.frameWidth || 20;

  const padding = useMemo(() => {
    if (settings.framePadding !== undefined) return settings.framePadding;
    switch (settings.borderStyle) {
      case 'polaroid': return 2;
      case 'film': return 4;
      case 'stamp': return 10;
      case 'torn': return 12;
      default: return 0;
    }
  }, [settings.borderStyle, settings.framePadding]);

  const radius = settings.frameRadius !== undefined ? settings.frameRadius : 0;
  const shadowIntensity = settings.shadowIntensity !== undefined ? settings.shadowIntensity : 25;

  // Determine styles for the outer container (the frame itself)
  const frameStyles = useMemo(() => {
    const s: CSSProperties = {
      backgroundColor: settings.borderColor,
      padding: `${borderWidth}px`,
      position: 'relative',
      borderRadius: `${radius}px`,
      boxShadow: shadowIntensity > 0 ? `0 ${shadowIntensity}px ${shadowIntensity * 2}px rgba(0,0,0,0.15)` : 'none',
    };

    if (settings.borderStyle === 'polaroid') {
      s.paddingBottom = `${borderWidth * 4}px`;
      s.backgroundColor = '#fdfbf7'; // subtle off-white paper
      s.boxShadow = shadowIntensity > 0 ? `0 ${shadowIntensity}px ${shadowIntensity * 2}px -10px rgba(0,0,0,0.25), 0 2px 10px rgba(0,0,0,0.1), inset 0 0 40px rgba(0,0,0,0.02)` : 'none';
      s.borderRadius = `${Math.max(2, radius)}px`;
    } else if (settings.borderStyle === 'film') {
      s.backgroundColor = '#0a0a0a';
      s.paddingTop = '40px';
      s.paddingBottom = '40px';
      s.boxShadow = shadowIntensity > 0 ? `0 ${shadowIntensity}px ${shadowIntensity * 2.5}px rgba(0,0,0,0.5)` : 'none';
    } else if (settings.borderStyle === 'museum') {
      s.backgroundColor = '#f8fafc';
      s.boxShadow = shadowIntensity > 0 ? `0 ${shadowIntensity}px ${shadowIntensity * 2}px -12px rgba(0,0,0,0.3), inset 0 0 20px rgba(0,0,0,0.03)` : 'none';
    } else if (settings.borderStyle === 'glass') {
      s.backgroundColor = 'rgba(255, 255, 255, 0.15)';
      s.backdropFilter = 'blur(16px)';
      s.border = '1px solid rgba(255, 255, 255, 0.4)';
      s.boxShadow = shadowIntensity > 0 ? `0 ${shadowIntensity}px ${shadowIntensity * 2}px rgba(0,0,0,0.12), inset 0 0 0 1px rgba(255,255,255,0.2)` : 'inset 0 0 0 1px rgba(255,255,255,0.2)';
      s.borderRadius = `${Math.max(24, radius)}px`;
    } else if (settings.borderStyle === 'neon') {
      s.backgroundColor = '#09090b';
      s.border = `2px solid ${settings.borderColor}`;
      const glow = shadowIntensity > 0 ? (shadowIntensity / 25) : 0;
      s.boxShadow = glow > 0 ? `0 0 ${10*glow}px ${settings.borderColor}, 0 0 ${20*glow}px ${settings.borderColor}, 0 0 ${40*glow}px ${settings.borderColor}, inset 0 0 ${20*glow}px ${settings.borderColor}` : 'none';
      s.borderRadius = `${Math.max(16, radius)}px`;
    } else if (settings.borderStyle === 'brutalist') {
      s.backgroundColor = '#ffffff';
      s.border = '6px solid #000000';
      s.boxShadow = shadowIntensity > 0 ? `${shadowIntensity}px ${shadowIntensity}px 0px #000000` : '16px 16px 0px #000000';
      s.borderRadius = '0px';
    } else if (settings.borderStyle === 'stamp') {
      s.backgroundColor = 'transparent';
      s.boxShadow = shadowIntensity > 0 ? `0 ${shadowIntensity/2}px ${shadowIntensity}px rgba(0,0,0,0.15)` : 'none';
    } else if (settings.borderStyle === 'torn') {
      s.backgroundColor = '#f1f5f9';
      s.boxShadow = shadowIntensity > 0 ? `0 ${shadowIntensity/1.5}px ${shadowIntensity * 1.5}px rgba(0,0,0,0.1)` : 'none';
    }
    
    return s;
  }, [settings, borderWidth, radius, shadowIntensity]);

  // Determine inner image container styles
  const innerContainerStyles = useMemo(() => {
    const s: CSSProperties = {
      padding: `${padding}px`,
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      backgroundColor: 'transparent',
    };

    if (settings.borderStyle === 'polaroid') {
      s.backgroundColor = '#18181b'; // dark inner well
      s.boxShadow = 'inset 0 3px 10px rgba(0,0,0,0.6), 0 1px 0 rgba(255,255,255,0.3)';
    } else if (settings.borderStyle === 'film') {
      s.backgroundColor = '#000000';
      s.boxShadow = 'inset 0 0 20px rgba(0,0,0,0.8)';
    } else if (settings.borderStyle === 'museum') {
      s.backgroundColor = '#ffffff';
      s.boxShadow = '0 0 0 1px rgba(0,0,0,0.1), inset 0 4px 15px rgba(0,0,0,0.2)'; // The bevel effect
      s.padding = '2px';
    } else if (settings.borderStyle === 'brutalist') {
      s.border = '4px solid #000000';
    } else if (settings.borderStyle === 'glass') {
      s.borderRadius = '8px';
      s.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
    } else if (settings.borderStyle === 'neon') {
      s.borderRadius = '8px';
      s.boxShadow = `0 0 15px ${settings.borderColor}`;
    }

    return s;
  }, [settings, padding]);

  const getFrameClass = () => {
    switch (settings.borderStyle) {
      case 'stamp': return 'mask-stamp';
      case 'film': return 'film-strip';
      case 'torn': return 'mask-torn';
      default: return '';
    }
  };

  return (
    <div className={cn(
      "relative flex items-center justify-center", 
      settings.borderStyle === 'film' ? "gap-0" : "gap-8",
      isPreview ? "p-4" : "p-12"
    )}>
      {imageList.map((imgSrc, idx) => (
        <div 
          key={idx}
          className={cn(
            "transition-all flex flex-col relative shrink-0",
            getFrameClass(),
            settings.borderStyle === 'film' && "film-container"
          )}
          style={frameStyles}
        >
          <div style={innerContainerStyles} className="z-10">
            <img 
              src={imgSrc} 
              alt="Framed output" 
              className={cn(
                "object-contain relative z-10",
                isPreview ? "max-w-[250px] max-h-[250px]" : "max-w-[70vw] max-h-[70vh]"
              )}
              style={{
                borderRadius: settings.borderStyle === 'glass' || settings.borderStyle === 'neon' ? '6px' : '0px',
                filter: `
                  brightness(${settings.imageBrightness ?? 100}%)
                  contrast(${settings.imageContrast ?? 100}%)
                  saturate(${settings.imageSaturation ?? 100}%)
                  blur(${settings.imageBlur ?? 0}px)
                  sepia(${settings.imageSepia ?? 0}%)
                  grayscale(${settings.imageGrayscale ?? 0}%)
                `.trim(),
              }}
            />
          </div>

          {settings.textOverlay?.enabled && (
            <div 
              className={cn("absolute whitespace-pre-wrap text-center leading-tight z-20 pointer-events-none p-4", settings.textOverlay.fontFamily)} 
              style={{ 
                fontSize: `${settings.textOverlay.fontSize}px`, 
                color: settings.textOverlay.color,
                left: `${settings.textOverlay.positionX}%`,
                top: `${settings.textOverlay.positionY}%`,
                transform: 'translate(-50%, -50%)',
                width: '100%',
                textShadow: settings.borderStyle === 'neon' ? `0 0 10px ${settings.textOverlay.color}` : 'none'
              }}
            >
              {settings.textOverlay.text}
            </div>
          )}
          
          {/* Subtle paper texture overlay for polaroid */}
          {settings.borderStyle === 'polaroid' && (
            <div className="absolute inset-0 pointer-events-none opacity-20 mix-blend-multiply z-30" 
                 style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/rice-paper.png")' }} />
          )}
        </div>
      ))}

      <style>{`
        .mask-stamp {
          position: relative;
        }
        .mask-stamp::before {
          content: '';
          position: absolute;
          inset: 0;
          background: ${settings.borderColor};
          mask-image: radial-gradient(circle, transparent 4px, black 4.5px);
          mask-size: 14px 14px;
          mask-position: -7px -7px;
          z-index: 0;
        }
        .mask-stamp::after {
          content: '';
          position: absolute;
          inset: 6px; 
          background: ${settings.borderColor};
          z-index: 0;
        }

        .film-container {
          position: relative;
        }
        .film-container::before, .film-container::after {
          content: '';
          position: absolute;
          left: 0; right: 0;
          height: 24px;
          background-image: linear-gradient(90deg, transparent 6px, #0a0a0a 6px, #0a0a0a 16px, transparent 16px), 
                            linear-gradient(90deg, rgba(255,255,255,0.8) 6px, transparent 6px);
          background-size: 24px 100%;
          z-index: 0;
        }
        .film-container::before { top: 8px; }
        .film-container::after { bottom: 8px; }

        .mask-torn {
          position: relative;
        }
        .mask-torn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: ${settings.borderColor};
          mask-image: url("data:image/svg+xml,%3Csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='rough'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.05' numOctaves='3' result='noise'/%3E%3CfeDisplacementMap in='SourceGraphic' in2='noise' scale='10' xChannelSelector='R' yChannelSelector='G'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' fill='black' filter='url(%23rough)'/%3E%3C/svg%3E");
          z-index: 0;
        }
      `}</style>
    </div>
  );
}
