import { Info } from 'lucide-react';
import { FrameSettings } from '../types';
import { BorderSelector } from './Sidebar/BorderSelector';
import { ColorSelector } from './Sidebar/ColorSelector';
import { SliderControl } from './Sidebar/SliderControl';
import { BackgroundSelector } from './Sidebar/BackgroundSelector';
import { Switch } from './Sidebar/Switch';
import { Tooltip } from './Tooltip';
import { TextOverlayControls } from './Sidebar/TextOverlayControls';

interface SidebarProps {
  settings: FrameSettings;
  setSettings: (settings: FrameSettings | ((prev: FrameSettings) => FrameSettings)) => void;
}

export function Sidebar({ settings, setSettings }: SidebarProps) {
  const updateSetting = <K extends keyof FrameSettings>(key: K, value: FrameSettings[K]) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="p-5 border-b border-slate-200">
        <h3 className="font-semibold text-slate-500 text-xs uppercase mb-4">Border Style</h3>
        <BorderSelector 
          value={settings.borderStyle} 
          onChange={(val) => updateSetting('borderStyle', val)} 
        />
      </div>

      <div className="p-5 border-b border-slate-200">
        <h3 className="font-semibold text-slate-500 text-xs uppercase mb-4">Text Overlay</h3>
        <TextOverlayControls 
          overlay={settings.textOverlay}
          onChange={(overlay) => updateSetting('textOverlay', overlay)}
        />
      </div>

      <div className="p-5 border-b border-slate-200">
        <h3 className="font-semibold text-slate-500 text-xs uppercase mb-4">Appearance</h3>
        <div className="space-y-4">
          <SliderControl 
            label="Border Width"
            value={settings.borderWidth}
            min={5}
            max={80}
            onChange={(v) => updateSetting('borderWidth', v)}
            tooltip="Thickness of the frame border"
          />
          <SliderControl 
            label="Corner Radius"
            value={settings.borderRadius}
            min={0}
            max={40}
            onChange={(v) => updateSetting('borderRadius', v)}
            tooltip="Roundness of the frame corners"
          />
          <SliderControl 
            label="Inner Padding"
            value={settings.padding}
            min={0}
            max={100}
            onChange={(v) => updateSetting('padding', v)}
            tooltip="Space between the photo and the border"
          />
        </div>
      </div>

      <div className="p-5 border-b border-slate-200">
        <h3 className="font-semibold text-slate-500 text-xs uppercase mb-4">Color & Shadow</h3>
        <div className="space-y-4">
          <div>
            <label className="text-[13px] text-slate-700 flex items-center gap-1.5 mb-2 font-medium">
              Border Color
              <Tooltip content="Color of the outer frame">
                <Info className="w-3.5 h-3.5 text-slate-400 hover:text-slate-600 cursor-help" />
              </Tooltip>
            </label>
            <ColorSelector 
              color={settings.borderColor} 
              onChange={(c) => updateSetting('borderColor', c)} 
            />
          </div>
          <BackgroundSelector 
            type={settings.backgroundType}
            customColor={settings.customBackgroundColor}
            onTypeChange={(t) => updateSetting('backgroundType', t)}
            onCustomColorChange={(c) => updateSetting('customBackgroundColor', c)}
          />
          
          <div className="pt-2 flex items-center justify-between">
            <label className="text-[13px] text-slate-700 font-medium flex items-center gap-1.5">
              Drop Shadow
              <Tooltip content="Adds a 3D shadow effect behind the frame">
                <Info className="w-3.5 h-3.5 text-slate-400 hover:text-slate-600 cursor-help" />
              </Tooltip>
            </label>
            <Switch 
              checked={settings.shadow}
              onChange={(v) => updateSetting('shadow', v)}
            />
          </div>
          
          {settings.shadow && (
            <SliderControl 
              label="Shadow Intensity"
              value={settings.shadowIntensity}
              min={0}
              max={100}
              onChange={(v) => updateSetting('shadowIntensity', v)}
              tooltip="How dark and large the shadow is"
            />
          )}
        </div>
      </div>
    </div>
  );
}
