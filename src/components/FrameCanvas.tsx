import { useMemo, CSSProperties } from 'react';
import { FrameSettings } from '../types';
import { cn } from '../utils/cn';

interface Props {
  image: string;
  settings: FrameSettings;
  isExporting: boolean;
}

export function FrameCanvas({ image, settings, isExporting }: Props) {
  // Determine actual background color
  const bgColor = useMemo(() => {
    switch (settings.backgroundType) {
      case 'white': return '#ffffff';
      case 'black': return '#000000';
      case 'transparent': return 'transparent';
      case 'custom': return settings.customBackgroundColor;
      default: return 'transparent';
    }
  }, [settings.backgroundType, settings.customBackgroundColor]);

  // Determine styles for the outer container (the frame itself)
  const frameStyles = useMemo(() => {
    const s: CSSProperties = {
      backgroundColor: settings.borderColor,
      padding: `${settings.borderWidth}px`,
      boxShadow: settings.shadow ? `0 ${settings.shadowIntensity}px ${settings.shadowIntensity * 2}px rgba(0,0,0,0.2)` : 'none',
    };

    if (settings.borderStyle === 'rounded') {
      s.borderRadius = `${settings.borderRadius + settings.borderWidth}px`;
    } else if (settings.borderStyle === 'classic') {
      s.borderRadius = `${settings.borderRadius}px`;
    } else if (settings.borderStyle === 'dotted') {
      s.backgroundColor = 'transparent';
      s.border = `${settings.borderWidth}px dotted ${settings.borderColor}`;
      s.padding = '0';
      s.borderRadius = `${settings.borderRadius}px`;
    } else if (settings.borderStyle === 'polaroid') {
      s.paddingBottom = `${settings.borderWidth * 3}px`;
      s.backgroundColor = '#ffffff';
      s.border = `1px solid #e5e7eb`;
    } else if (settings.borderStyle === 'vintage') {
      s.backgroundColor = 'transparent';
      s.padding = `${settings.borderWidth}px`;
    } else if (settings.borderStyle === 'stamp' || settings.borderStyle === 'scalloped') {
      s.backgroundColor = 'transparent';
    } else if (settings.borderStyle === 'film') {
      s.backgroundColor = '#111'; // overrides border color, film is always black
    }
    
    return s;
  }, [settings]);

  // Determine inner image container styles
  const innerContainerStyles = useMemo(() => {
    const s: CSSProperties = {
      backgroundColor: bgColor,
      padding: `${settings.padding}px`,
      borderRadius: settings.borderStyle !== 'stamp' && settings.borderStyle !== 'film' && settings.borderStyle !== 'scalloped'
        ? `${settings.borderRadius}px` 
        : '0px',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
    };

    if (settings.borderStyle === 'polaroid') {
      s.backgroundColor = '#000000'; // Inner frame for polaroid
      s.padding = '2px';
    }

    return s;
  }, [settings, bgColor]);

  // Handle complex borders via classes or additional CSS
  const getFrameClass = () => {
    switch (settings.borderStyle) {
      case 'stamp':
      case 'vintage':
        return 'mask-stamp';
      case 'scalloped':
        return 'mask-scalloped';
      case 'film':
        return 'film-strip';
      default:
        return '';
    }
  };

  return (
    <div className="relative p-8 flex items-center justify-center">
      {/* 
        We use an extra wrapper for the shadow so it doesn't get clipped by the mask 
        if we apply masks to the frame.
      */}
      <div 
        className={cn(
          "transition-all flex flex-col",
          getFrameClass(),
          settings.borderStyle === 'film' && "film-container"
        )}
        style={{
          ...frameStyles,
          // Specific inline variables for masks if needed
          '--bw': `${settings.borderWidth}px`,
        } as CSSProperties}
      >
        <div style={innerContainerStyles} className="z-10">
          {settings.textOverlay?.enabled && settings.textOverlay.position === 'top' && (
            <div 
              className={cn("w-full text-center leading-tight mb-4", settings.textOverlay.fontFamily)} 
              style={{ fontSize: `${settings.textOverlay.fontSize}px`, color: settings.textOverlay.color }}
            >
              {settings.textOverlay.text}
            </div>
          )}
          
          <img 
            src={image} 
            alt="Framed output" 
            className="max-w-[70vw] max-h-[70vh] object-contain transition-all relative z-10"
            style={{
              borderRadius: settings.borderStyle !== 'stamp' && settings.borderStyle !== 'film' 
                ? `${Math.max(0, settings.borderRadius - settings.padding)}px` 
                : '0px',
            }}
          />

          {settings.textOverlay?.enabled && settings.textOverlay.position === 'center' && (
            <div 
              className={cn("absolute inset-0 flex items-center justify-center pointer-events-none z-20 text-center leading-tight p-4", settings.textOverlay.fontFamily)} 
              style={{ fontSize: `${settings.textOverlay.fontSize}px`, color: settings.textOverlay.color }}
            >
              {settings.textOverlay.text}
            </div>
          )}

          {settings.textOverlay?.enabled && settings.textOverlay.position === 'bottom' && (
            <div 
              className={cn("w-full text-center leading-tight mt-4", settings.textOverlay.fontFamily)} 
              style={{ fontSize: `${settings.textOverlay.fontSize}px`, color: settings.textOverlay.color }}
            >
              {settings.textOverlay.text}
            </div>
          )}
        </div>
      </div>

      {/* CSS for complex masks inline to avoid external file issues during html-to-image */}
      <style>{`
        .mask-stamp {
          --hole-size: 6px;
          --spacing: 20px;
          /* Use pseudo element for mask so it doesn't mask the shadow if we applied it to the parent */
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
          inset: 6px; /* fill the middle so we don't have holes inside */
          background: ${settings.borderColor};
          z-index: 0;
        }

        .mask-scalloped::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle, ${settings.borderColor} 4px, transparent 4.5px);
          background-size: 14px 14px;
          background-position: -7px -7px;
          z-index: 0;
        }
        .mask-scalloped::after {
          content: '';
          position: absolute;
          inset: 6px;
          background: ${settings.borderColor};
          z-index: 0;
        }

        .film-container {
          background-color: #111;
          position: relative;
        }
        .film-container::before, .film-container::after {
          content: '';
          position: absolute;
          left: 0; right: 0;
          height: ${Math.max(10, settings.borderWidth * 0.4)}px;
          background-image: linear-gradient(90deg, transparent 4px, white 4px, white 12px, transparent 12px);
          background-size: 16px 100%;
          z-index: 0;
        }
        .film-container::before { top: ${Math.max(5, settings.borderWidth * 0.2)}px; }
        .film-container::after { bottom: ${Math.max(5, settings.borderWidth * 0.2)}px; }
      `}</style>
    </div>
  );
}
