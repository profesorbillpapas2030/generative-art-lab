import { ColorPaletteName, COLOR_PALETTES } from '@/types/generativeArt';

interface PaletteSelectorProps {
  currentPalette: ColorPaletteName;
  onPaletteChange: (palette: ColorPaletteName) => void;
}

export function PaletteSelector({ currentPalette, onPaletteChange }: PaletteSelectorProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
        Paleta de Color
      </h3>
      <div className="flex flex-wrap gap-3">
        {COLOR_PALETTES.map((palette) => (
          <button
            key={palette.name}
            onClick={() => onPaletteChange(palette.name)}
            className={`palette-dot ${currentPalette === palette.name ? 'active' : ''}`}
            style={{ background: palette.preview }}
            title={palette.label}
          />
        ))}
      </div>
      <p className="text-xs text-muted-foreground">
        {COLOR_PALETTES.find((p) => p.name === currentPalette)?.label}
      </p>
    </div>
  );
}
