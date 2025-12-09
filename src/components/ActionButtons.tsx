import { Pause, Play, Download, RotateCcw } from 'lucide-react';

interface ActionButtonsProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  onDownload: () => void;
  onReset: () => void;
}

export function ActionButtons({
  isPlaying,
  onPlayPause,
  onDownload,
  onReset,
}: ActionButtonsProps) {
  return (
    <div className="flex flex-col gap-3">
      <button onClick={onPlayPause} className="action-button-primary">
        {isPlaying ? (
          <>
            <Pause className="w-5 h-5" />
            <span>Pausar</span>
          </>
        ) : (
          <>
            <Play className="w-5 h-5" />
            <span>Reproducir</span>
          </>
        )}
      </button>

      <button onClick={onDownload} className="action-button-secondary">
        <Download className="w-5 h-5" />
        <span>Descargar PNG</span>
      </button>

      <button onClick={onReset} className="action-button-accent">
        <RotateCcw className="w-5 h-5" />
        <span>Reiniciar</span>
      </button>
    </div>
  );
}
