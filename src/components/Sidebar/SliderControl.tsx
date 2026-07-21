import { Info } from 'lucide-react';
import { Tooltip } from '../Tooltip';

interface Props {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
  tooltip?: string;
}

export function SliderControl({ label, value, min, max, onChange, tooltip }: Props) {
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <label className="text-[13px] text-slate-700 flex items-center gap-1.5">
          {label}
          {tooltip && (
            <Tooltip content={tooltip}>
              <Info className="w-3.5 h-3.5 text-slate-400 hover:text-slate-600 cursor-help" />
            </Tooltip>
          )}
        </label>
        <span className="text-[13px] text-slate-700">
          {value}px
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="slider"
      />
    </div>
  );
}
