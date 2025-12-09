import { ArtSettings, VisualMode, ColorPaletteName } from '@/types/generativeArt';
import { ModeSelector } from './ModeSelector';
import { PaletteSelector } from './PaletteSelector';
import { ControlSlider } from './ControlSlider';
import { ActionButtons } from './ActionButtons';

interface ControlPanelProps {
  settings: ArtSettings;
  onSettingsChange: (settings: Partial<ArtSettings>) => void;
  onDownload: () => void;
  onReset: () => void;
}

export function ControlPanel({
  settings,
  onSettingsChange,
  onDownload,
  onReset,
}: ControlPanelProps) {
  return (
    <div className="glass-strong rounded-2xl p-6 space-y-6">
      <div className="text-center space-y-1">
        <h2 className="text-xl font-bold text-gradient">Controles</h2>
        <p className="text-xs text-muted-foreground">Personaliza tu arte</p>
      </div>

      <ModeSelector
        currentMode={settings.mode}
        onModeChange={(mode: VisualMode) => onSettingsChange({ mode })}
      />

      <div className="h-px bg-border/50" />

      <PaletteSelector
        currentPalette={settings.palette}
        onPaletteChange={(palette: ColorPaletteName) => onSettingsChange({ palette })}
      />

      <div className="h-px bg-border/50" />

      <div className="space-y-4">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          Ajustes
        </h3>

        <ControlSlider
          label="Velocidad"
          icon="⚡"
          value={settings.speed}
          min={1}
          max={100}
          onChange={(speed) => onSettingsChange({ speed })}
        />

        <ControlSlider
          label="Complejidad"
          icon="🔮"
          value={settings.complexity}
          min={10}
          max={100}
          onChange={(complexity) => onSettingsChange({ complexity })}
        />

        <ControlSlider
          label="Tamaño"
          icon="📐"
          value={settings.size}
          min={10}
          max={100}
          onChange={(size) => onSettingsChange({ size })}
        />
      </div>

      <div className="h-px bg-border/50" />

      <ActionButtons
        isPlaying={settings.isPlaying}
        onPlayPause={() => onSettingsChange({ isPlaying: !settings.isPlaying })}
        onDownload={onDownload}
        onReset={onReset}
      />
    </div>
  );
}
