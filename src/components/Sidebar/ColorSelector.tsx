import { useState, useRef, useEffect } from 'react';
import { HexColorPicker } from 'react-colorful';
import { cn } from '../../utils/cn';

const presets = [
  '#ffffff', '#000000', '#f1f5f9', '#94a3b8', 
  '#ef4444', '#f97316', '#f59e0b', '#84cc16', 
  '#22c55e', '#06b6d4', '#3b82f6', '#6366f1', 
  '#a855f7', '#ec4899', '#f43f5e', '#e11d48'
];

interface Props {
  color: string;
  onChange: (color: string) => void;
}

export function ColorSelector({ color, onChange }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <div className="relative" ref={popoverRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-10 h-10 rounded border border-slate-200 shadow-sm overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-500"
            style={{ backgroundColor: color }}
            aria-label="Pick color"
          />
          {isOpen && (
            <div className="absolute z-20 mt-2 p-3 bg-white rounded-xl shadow-xl border border-slate-100">
              <HexColorPicker color={color} onChange={onChange} />
            </div>
          )}
        </div>
        <input
          type="text"
          value={color}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 h-10 px-3 border border-slate-200 rounded text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
        />
      </div>
      
      <div className="grid grid-cols-8 gap-1.5">
        {presets.map((preset) => (
          <button
            key={preset}
            onClick={() => onChange(preset)}
            className={cn(
              "w-full pt-[100%] rounded-md shadow-sm border",
              color.toLowerCase() === preset.toLowerCase() 
                ? "border-blue-500 ring-1 ring-blue-500" 
                : "border-black/10 hover:scale-110 transition-transform"
            )}
            style={{ backgroundColor: preset }}
            title={preset}
          />
        ))}
      </div>
    </div>
  );
}
