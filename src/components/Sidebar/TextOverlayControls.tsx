import { TextOverlay } from '../../types';
import { ColorSelector } from './ColorSelector';
import { SliderControl } from './SliderControl';
import { Switch } from './Switch';

interface TextOverlayControlsProps {
  overlay: TextOverlay;
  onChange: (overlay: TextOverlay) => void;
}

const FONTS = [
  { label: 'Sans Serif', value: 'font-sans' },
  { label: 'Serif', value: 'font-serif' },
  { label: 'Monospace', value: 'font-mono' },
  { label: 'Cursive', value: 'font-[cursive]' },
  { label: 'Display', value: 'font-[Impact,sans-serif]' },
];

const POSITIONS = [
  { label: 'Top', value: 'top' },
  { label: 'Center', value: 'center' },
  { label: 'Bottom', value: 'bottom' },
];

export function TextOverlayControls({ overlay, onChange }: TextOverlayControlsProps) {
  const updateField = <K extends keyof TextOverlay>(key: K, value: TextOverlay[K]) => {
    onChange({ ...overlay, [key]: value });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-[13px] text-slate-700 font-medium">Enable Text</label>
        <Switch 
          checked={overlay.enabled}
          onChange={(v) => updateField('enabled', v)}
        />
      </div>

      {overlay.enabled && (
        <div className="space-y-4 pt-2 border-t border-slate-100">
          <div>
            <label className="text-[13px] text-slate-700 mb-1.5 block font-medium">Text Content</label>
            <input 
              type="text" 
              value={overlay.text}
              onChange={(e) => updateField('text', e.target.value)}
              placeholder="e.g. Summer 2026"
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[13px] text-slate-700 mb-1.5 block font-medium">Font Family</label>
              <select 
                value={overlay.fontFamily}
                onChange={(e) => updateField('fontFamily', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                {FONTS.map(f => (
                  <option key={f.value} value={f.value}>{f.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-[13px] text-slate-700 mb-1.5 block font-medium">Position</label>
              <select 
                value={overlay.position}
                onChange={(e) => updateField('position', e.target.value as any)}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                {POSITIONS.map(p => (
                  <option key={p.value} value={p.value}>{p.label}</option>
                ))}
              </select>
            </div>
          </div>

          <SliderControl 
            label="Font Size"
            value={overlay.fontSize}
            min={12}
            max={120}
            onChange={(v) => updateField('fontSize', v)}
          />

          <div>
            <label className="text-[13px] text-slate-700 mb-1.5 block font-medium">Text Color</label>
            <ColorSelector 
              color={overlay.color}
              onChange={(c) => updateField('color', c)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
