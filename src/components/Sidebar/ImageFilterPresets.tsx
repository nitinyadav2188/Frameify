import { FrameSettings } from '../../types';
import { cn } from '../../utils/cn';

interface FilterPreset {
  name: string;
  settings: Partial<FrameSettings>;
}

const presets: FilterPreset[] = [
  {
    name: 'Normal',
    settings: {
      imageBrightness: 100,
      imageContrast: 100,
      imageSaturation: 100,
      imageBlur: 0,
      imageSepia: 0,
      imageGrayscale: 0,
    }
  },
  {
    name: 'Grayscale',
    settings: {
      imageBrightness: 100,
      imageContrast: 110,
      imageSaturation: 0,
      imageBlur: 0,
      imageSepia: 0,
      imageGrayscale: 100,
    }
  },
  {
    name: 'Sepia',
    settings: {
      imageBrightness: 100,
      imageContrast: 100,
      imageSaturation: 100,
      imageBlur: 0,
      imageSepia: 100,
      imageGrayscale: 0,
    }
  },
  {
    name: 'Vintage',
    settings: {
      imageBrightness: 90,
      imageContrast: 120,
      imageSaturation: 80,
      imageBlur: 0,
      imageSepia: 50,
      imageGrayscale: 0,
    }
  },
  {
    name: 'Vivid',
    settings: {
      imageBrightness: 105,
      imageContrast: 110,
      imageSaturation: 150,
      imageBlur: 0,
      imageSepia: 0,
      imageGrayscale: 0,
    }
  },
  {
    name: 'Fade',
    settings: {
      imageBrightness: 110,
      imageContrast: 80,
      imageSaturation: 90,
      imageBlur: 0,
      imageSepia: 0,
      imageGrayscale: 0,
    }
  }
];

interface Props {
  settings: FrameSettings;
  onChange: (settings: Partial<FrameSettings>) => void;
}

export function ImageFilterPresets({ settings, onChange }: Props) {
  const isMatch = (preset: FilterPreset) => {
    return (
      (settings.imageBrightness ?? 100) === (preset.settings.imageBrightness ?? 100) &&
      (settings.imageContrast ?? 100) === (preset.settings.imageContrast ?? 100) &&
      (settings.imageSaturation ?? 100) === (preset.settings.imageSaturation ?? 100) &&
      (settings.imageBlur ?? 0) === (preset.settings.imageBlur ?? 0) &&
      (settings.imageSepia ?? 0) === (preset.settings.imageSepia ?? 0) &&
      (settings.imageGrayscale ?? 0) === (preset.settings.imageGrayscale ?? 0)
    );
  };

  return (
    <div className="mb-6">
      <label className="text-[13px] text-slate-700 flex items-center gap-1.5 mb-3 font-medium">
        Quick Filters
      </label>
      <div className="grid grid-cols-3 gap-2">
        {presets.map((preset) => {
          const active = isMatch(preset);
          return (
            <button
              key={preset.name}
              onClick={() => onChange(preset.settings)}
              className={cn(
                "py-2 text-xs font-medium rounded-lg border transition-colors duration-200",
                active 
                  ? "border-zinc-900 bg-zinc-900 text-white" 
                  : "border-zinc-200 bg-zinc-50 text-zinc-600 hover:border-zinc-300 hover:bg-zinc-100"
              )}
            >
              {preset.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
