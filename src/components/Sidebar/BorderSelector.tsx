import { type ReactNode } from 'react';
import { BorderStyle } from '../../types';
import { cn } from '../../utils/cn';
import { Square, Ticket, Film, CircleDashed, LayoutTemplate, Diamond, LayoutPanelTop } from 'lucide-react';
import { Tooltip } from '../Tooltip';

interface Props {
  value: BorderStyle;
  onChange: (value: BorderStyle) => void;
}

const styles: { value: BorderStyle; label: string; description: string; icon: ReactNode }[] = [
  { value: 'stamp', label: 'Stamp', description: 'Perforated postage stamp edges', icon: <Ticket className="w-4 h-4 transform rotate-45" /> },
  { value: 'vintage', label: 'Vintage', description: 'Classic jagged stamp edge', icon: <Ticket className="w-4 h-4" /> },
  { value: 'film', label: 'Film Strip', description: 'Cinema film strip borders', icon: <Film className="w-4 h-4" /> },
  { value: 'rounded', label: 'Rounded', description: 'Smooth rounded corners', icon: <Square className="w-4 h-4 rounded-lg" /> },
  { value: 'classic', label: 'Classic', description: 'Simple square frame', icon: <Square className="w-4 h-4" /> },
  { value: 'dotted', label: 'Dotted', description: 'Dashed stitch-like border', icon: <CircleDashed className="w-4 h-4" /> },
  { value: 'scalloped', label: 'Scalloped', description: 'Inverted wavy edges', icon: <Diamond className="w-4 h-4" /> },
  { value: 'polaroid', label: 'Polaroid', description: 'Instant camera style frame', icon: <LayoutPanelTop className="w-4 h-4" /> },
];

export function BorderSelector({ value, onChange }: Props) {
  return (
    <div className="grid grid-cols-4 gap-2">
      {styles.map((style) => (
        <div key={style.value}>
          <Tooltip content={style.description} className="w-full flex">
            <button
              onClick={() => onChange(style.value)}
              className={cn(
                "w-full h-14 flex flex-col items-center justify-center gap-1 rounded-md border text-[10px] font-medium transition-all duration-200",
                value === style.value
                  ? "border-blue-600 bg-blue-50 text-blue-600"
                  : "border-slate-200 bg-[#fafafa] text-slate-700 hover:border-blue-400"
              )}
            >
              <span className={value === style.value ? "text-blue-600" : "text-slate-500"}>
                {style.icon}
              </span>
              {style.label}
            </button>
          </Tooltip>
        </div>
      ))}
    </div>
  );
}
