export type VisualMode = 'waves' | 'fractals' | 'particles' | 'spirals';

export type ColorPaletteName = 'neon' | 'ocean' | 'sunset' | 'forest' | 'pastel' | 'monochrome';

export interface ColorPalette {
  name: ColorPaletteName;
  label: string;
  colors: string[];
  preview: string;
}

export interface ArtSettings {
  mode: VisualMode;
  palette: ColorPaletteName;
  speed: number;
  complexity: number;
  size: number;
  isPlaying: boolean;
}

export const COLOR_PALETTES: ColorPalette[] = [
  {
    name: 'neon',
    label: 'Neón',
    colors: ['#ff00ff', '#00ffff', '#ff0080', '#80ff00', '#ffff00', '#ff8000'],
    preview: 'linear-gradient(135deg, #ff00ff, #00ffff, #ff0080)',
  },
  {
    name: 'ocean',
    label: 'Océano',
    colors: ['#0077b6', '#00b4d8', '#90e0ef', '#caf0f8', '#023e8a', '#0096c7'],
    preview: 'linear-gradient(135deg, #0077b6, #00b4d8, #90e0ef)',
  },
  {
    name: 'sunset',
    label: 'Atardecer',
    colors: ['#ff6b35', '#f7c59f', '#efa00b', '#d65108', '#591f0a', '#1e1e24'],
    preview: 'linear-gradient(135deg, #ff6b35, #f7c59f, #efa00b)',
  },
  {
    name: 'forest',
    label: 'Bosque',
    colors: ['#2d6a4f', '#40916c', '#52b788', '#74c69d', '#95d5b2', '#b7e4c7'],
    preview: 'linear-gradient(135deg, #2d6a4f, #40916c, #52b788)',
  },
  {
    name: 'pastel',
    label: 'Pastel',
    colors: ['#ffc8dd', '#ffafcc', '#bde0fe', '#a2d2ff', '#cdb4db', '#e2ece9'],
    preview: 'linear-gradient(135deg, #ffc8dd, #bde0fe, #cdb4db)',
  },
  {
    name: 'monochrome',
    label: 'Monocromo',
    colors: ['#f8f9fa', '#e9ecef', '#dee2e6', '#ced4da', '#adb5bd', '#6c757d'],
    preview: 'linear-gradient(135deg, #f8f9fa, #adb5bd, #6c757d)',
  },
];

export const VISUAL_MODES: { mode: VisualMode; label: string; icon: string }[] = [
  { mode: 'waves', label: 'Ondas', icon: '🌊' },
  { mode: 'fractals', label: 'Fractales', icon: '❄️' },
  { mode: 'particles', label: 'Partículas', icon: '✨' },
  { mode: 'spirals', label: 'Espirales', icon: '🌀' },
];
