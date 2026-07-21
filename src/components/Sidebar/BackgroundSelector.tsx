import { BackgroundType } from '../../types';
import { cn } from '../../utils/cn';

interface Props {
  type: BackgroundType;
  customColor: string;
  onTypeChange: (type: BackgroundType) => void;
  onCustomColorChange: (color: string) => void;
}

export function BackgroundSelector({ type, customColor, onTypeChange, onCustomColorChange }: Props) {
  return (
    <div>
      <label className="text-[13px] text-slate-700 block mb-2 font-medium">Canvas Background</label>
      <div className="flex gap-2 mb-2">
        {(['white', 'black', 'transparent', 'custom'] as BackgroundType[]).map((t) => (
          <button
            key={t}
            onClick={() => onTypeChange(t)}
            className={cn(
              "flex-1 py-1.5 px-2 rounded-md border text-xs font-medium capitalize transition-colors duration-200",
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
        <div className="flex items-center gap-2 mt-2">
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
            className="flex-1 h-8 px-2 border border-slate-200 rounded text-xs uppercase"
          />
        </div>
      )}
    </div>
  );
}
