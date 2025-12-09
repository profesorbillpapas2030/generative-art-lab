import { VisualMode, VISUAL_MODES } from '@/types/generativeArt';

interface ModeSelectorProps {
  currentMode: VisualMode;
  onModeChange: (mode: VisualMode) => void;
}

export function ModeSelector({ currentMode, onModeChange }: ModeSelectorProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
        Modo Visual
      </h3>
      <div className="grid grid-cols-2 gap-2">
        {VISUAL_MODES.map(({ mode, label, icon }) => (
          <button
            key={mode}
            onClick={() => onModeChange(mode)}
            className={`mode-button ${currentMode === mode ? 'active' : ''}`}
          >
            <span className="text-lg mr-2">{icon}</span>
            <span>{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
