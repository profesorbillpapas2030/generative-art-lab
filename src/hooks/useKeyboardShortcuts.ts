import { useEffect, useCallback } from 'react';
import { ArtSettings } from '@/types/generativeArt';

interface UseKeyboardShortcutsProps {
  settings: ArtSettings;
  onSettingsChange: (settings: Partial<ArtSettings>) => void;
  onDownload: () => void;
  onReset: () => void;
  onToggleFullscreen: () => void;
}

export function useKeyboardShortcuts({
  settings,
  onSettingsChange,
  onDownload,
  onReset,
  onToggleFullscreen,
}: UseKeyboardShortcutsProps) {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      // Ignore if user is typing in an input
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      switch (event.key.toLowerCase()) {
        case ' ':
          event.preventDefault();
          onSettingsChange({ isPlaying: !settings.isPlaying });
          break;
        case 'arrowup':
          event.preventDefault();
          onSettingsChange({ speed: Math.min(100, settings.speed + 5) });
          break;
        case 'arrowdown':
          event.preventDefault();
          onSettingsChange({ speed: Math.max(1, settings.speed - 5) });
          break;
        case 'arrowleft':
          event.preventDefault();
          onSettingsChange({ complexity: Math.max(10, settings.complexity - 5) });
          break;
        case 'arrowright':
          event.preventDefault();
          onSettingsChange({ complexity: Math.min(100, settings.complexity + 5) });
          break;
        case 'd':
          if (!event.ctrlKey && !event.metaKey) {
            event.preventDefault();
            onDownload();
          }
          break;
        case 'r':
          if (!event.ctrlKey && !event.metaKey) {
            event.preventDefault();
            onReset();
          }
          break;
        case 'f':
          event.preventDefault();
          onToggleFullscreen();
          break;
        case 'escape':
          if (document.fullscreenElement) {
            document.exitFullscreen();
          }
          break;
      }
    },
    [settings, onSettingsChange, onDownload, onReset, onToggleFullscreen]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
}
