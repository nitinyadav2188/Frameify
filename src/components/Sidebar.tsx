import { Info } from 'lucide-react';
import { FrameSettings } from '../types';
import { BorderSelector } from './Sidebar/BorderSelector';
import { ColorSelector } from './Sidebar/ColorSelector';
import { BackgroundSelector } from './Sidebar/BackgroundSelector';
import { SliderControl } from './Sidebar/SliderControl';
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
        <div className="space-y-6">
          <BorderSelector 
            value={settings.borderStyle} 
            onChange={(val) => updateSetting('borderStyle', val)} 
          />
          <SliderControl
            label="Frame Width"
            value={settings.frameWidth}
            min={4}
            max={80}
            onChange={(val) => updateSetting('frameWidth', val)}
            tooltip="Adjust the thickness of the outer frame border"
          />
          <SliderControl
            label="Image Padding"
            value={settings.framePadding}
            min={0}
            max={40}
            onChange={(val) => updateSetting('framePadding', val)}
            tooltip="Adjust the space between the image and the frame"
          />
          <SliderControl
            label="Corner Radius"
            value={settings.frameRadius}
            min={0}
            max={40}
            onChange={(val) => updateSetting('frameRadius', val)}
            tooltip="Adjust the roundness of the frame corners"
          />
          <SliderControl
            label="Shadow Intensity"
            value={settings.shadowIntensity}
            min={0}
            max={100}
            onChange={(val) => updateSetting('shadowIntensity', val)}
            tooltip="Adjust the depth of the frame shadow"
          />
        </div>
      </div>

      <div className="p-5 border-b border-slate-200">
        <h3 className="font-semibold text-slate-500 text-xs uppercase mb-4">Color & Background</h3>
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
            backgroundPattern={settings.backgroundPattern}
            onTypeChange={(t) => updateSetting('backgroundType', t)}
            onCustomColorChange={(c) => updateSetting('customBackgroundColor', c)}
            onPatternChange={(p) => updateSetting('backgroundPattern', p)}
          />
        </div>
      </div>

      <div className="p-5 border-b border-slate-200">
        <h3 className="font-semibold text-slate-500 text-xs uppercase mb-4">Image Adjustments</h3>
        <div className="space-y-4">
          <SliderControl
            label="Brightness"
            value={settings.imageBrightness ?? 100}
            min={0}
            max={200}
            onChange={(val) => updateSetting('imageBrightness', val)}
          />
          <SliderControl
            label="Contrast"
            value={settings.imageContrast ?? 100}
            min={0}
            max={200}
            onChange={(val) => updateSetting('imageContrast', val)}
          />
          <SliderControl
            label="Saturation"
            value={settings.imageSaturation ?? 100}
            min={0}
            max={200}
            onChange={(val) => updateSetting('imageSaturation', val)}
          />
          <SliderControl
            label="Blur"
            value={settings.imageBlur ?? 0}
            min={0}
            max={20}
            onChange={(val) => updateSetting('imageBlur', val)}
          />
          <SliderControl
            label="Sepia"
            value={settings.imageSepia ?? 0}
            min={0}
            max={100}
            onChange={(val) => updateSetting('imageSepia', val)}
          />
          <SliderControl
            label="Grayscale"
            value={settings.imageGrayscale ?? 0}
            min={0}
            max={100}
            onChange={(val) => updateSetting('imageGrayscale', val)}
          />
        </div>
      </div>

      <div className="p-5 border-b border-slate-200">
        <h3 className="font-semibold text-slate-500 text-xs uppercase mb-4">Text Overlay</h3>
        <TextOverlayControls 
          overlay={settings.textOverlay}
          onChange={(overlay) => updateSetting('textOverlay', overlay)}
        />
      </div>
    </div>
  );
}
