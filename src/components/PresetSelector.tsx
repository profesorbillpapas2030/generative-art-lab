import { ArtSettings } from '@/types/generativeArt';

export interface Preset {
  name: string;
  icon: string;
  settings: Omit<ArtSettings, 'isPlaying'>;
}

export const PRESETS: Preset[] = [
  {
    name: 'Zen',
    icon: '🧘',
    settings: { mode: 'waves', palette: 'ocean', speed: 20, complexity: 30, size: 70 },
  },
  {
    name: 'Caos',
    icon: '🔥',
    settings: { mode: 'particles', palette: 'neon', speed: 90, complexity: 100, size: 30 },
  },
  {
    name: 'Naturaleza',
    icon: '🌿',
    settings: { mode: 'spirals', palette: 'forest', speed: 40, complexity: 50, size: 60 },
  },
  {
    name: 'Sueño',
    icon: '💭',
    settings: { mode: 'waves', palette: 'pastel', speed: 15, complexity: 40, size: 80 },
  },
  {
    name: 'Galaxia',
    icon: '🌌',
    settings: { mode: 'fractals', palette: 'neon', speed: 50, complexity: 80, size: 50 },
  },
  {
    name: 'Atardecer',
    icon: '🌅',
    settings: { mode: 'spirals', palette: 'sunset', speed: 30, complexity: 60, size: 65 },
  },
];

interface PresetSelectorProps {
  onSelectPreset: (settings: Omit<ArtSettings, 'isPlaying'>) => void;
}

export function PresetSelector({ onSelectPreset }: PresetSelectorProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
        Presets
      </h3>
      <div className="grid grid-cols-3 gap-2">
        {PRESETS.map((preset) => (
          <button
            key={preset.name}
            onClick={() => onSelectPreset(preset.settings)}
            className="flex flex-col items-center gap-1 p-2 rounded-lg glass hover:bg-white/10 transition-all duration-200 hover:scale-105 group"
          >
            <span className="text-xl group-hover:scale-110 transition-transform">
              {preset.icon}
            </span>
            <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">
              {preset.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
