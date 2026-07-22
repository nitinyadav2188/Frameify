import { BackgroundType } from '../../types';
import { cn } from '../../utils/cn';

interface Props {
  type: BackgroundType;
  customColor: string;
  backgroundPattern?: string;
  onTypeChange: (type: BackgroundType) => void;
  onCustomColorChange: (color: string) => void;
  onPatternChange: (pattern: string) => void;
}

const PRESET_COLORS = [
  '#f87171', '#fb923c', '#fbbf24', '#a3e635', '#4ade80', '#34d399', '#2dd4bf', '#38bdf8',
  '#60a5fa', '#818cf8', '#a78bfa', '#c084fc', '#e879f9', '#f472b6', '#fb7185', '#94a3b8',
  '#fcd34d', '#bef264', '#fecaca', '#bfdbfe', '#ddd6fe', '#ffedd5', '#ecfccb', '#ffe4e6',
  '#ffedd5', '#cffafe', '#e0e7ff', '#fce7f3'
];

const PRESET_PATTERNS = [
  { id: 'dots', name: 'Dots', style: { backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)', backgroundSize: '10px 10px' } },
  { id: 'grid', name: 'Grid', style: { backgroundImage: 'linear-gradient(#94a3b8 1px, transparent 1px), linear-gradient(90deg, #94a3b8 1px, transparent 1px)', backgroundSize: '10px 10px' } },
  { id: 'diagonal', name: 'Diagonal', style: { backgroundImage: 'repeating-linear-gradient(45deg, #94a3b8 25%, transparent 25%, transparent 75%, #94a3b8 75%, #94a3b8)', backgroundPosition: '0 0, 10px 10px', backgroundSize: '20px 20px' } },
  { id: 'checker', name: 'Checker', style: { backgroundImage: 'conic-gradient(#cbd5e1 90deg, transparent 90deg 180deg, #cbd5e1 180deg 270deg, transparent 270deg)', backgroundSize: '20px 20px' } }
];

export function BackgroundSelector({ type, customColor, backgroundPattern, onTypeChange, onCustomColorChange, onPatternChange }: Props) {
  return (
    <div>
      <label className="text-[13px] text-slate-700 block mb-2 font-medium">Canvas Background</label>
      <div className="flex flex-wrap gap-2 mb-3">
        {(['white', 'black', 'transparent', 'custom', 'pattern'] as BackgroundType[]).map((t) => (
          <button
            key={t}
            onClick={() => onTypeChange(t)}
            className={cn(
              "flex-1 min-w-[60px] py-1.5 px-2 rounded-md border text-xs font-medium capitalize transition-colors duration-200",
              type === t 
                ? "border-blue-600 bg-blue-50 text-blue-600" 
                : "border-slate-200 bg-[#fafafa] text-slate-700 hover:border-blue-400"
            )}
          >
            {t}
          </button>
        ))}
      </div>
      
      {type === 'custom' && (
        <div className="space-y-3">
          <div className="grid grid-cols-8 gap-1.5">
            {PRESET_COLORS.map((c) => (
              <button
                key={c}
                onClick={() => onCustomColorChange(c)}
                className={cn(
                  "w-full aspect-square rounded-md border border-slate-200 hover:scale-110 transition-transform",
                  customColor === c ? "ring-2 ring-blue-500 ring-offset-1" : ""
                )}
                style={{ backgroundColor: c }}
                title={c}
              />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={customColor}
              onChange={(e) => onCustomColorChange(e.target.value)}
              className="w-8 h-8 p-0 border-0 rounded cursor-pointer"
            />
            <input
              type="text"
              value={customColor}
              onChange={(e) => onCustomColorChange(e.target.value)}
              className="flex-1 h-8 px-2 border border-slate-200 rounded text-xs uppercase focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      )}

      {type === 'pattern' && (
        <div className="grid grid-cols-4 gap-2 mt-2">
          {PRESET_PATTERNS.map((p) => (
            <button
              key={p.id}
              onClick={() => onPatternChange(p.id)}
              className={cn(
                "w-full aspect-square rounded-md border bg-slate-50 transition-all",
                backgroundPattern === p.id ? "border-blue-500 ring-1 ring-blue-500" : "border-slate-200 hover:border-blue-400"
              )}
              title={p.name}
            >
              <div className="w-full h-full rounded-sm opacity-50" style={p.style} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
