import { useState, useRef, useCallback, useEffect } from 'react';
import { Header } from '@/components/Header';
import { GenerativeCanvas, GenerativeCanvasRef } from '@/components/GenerativeCanvas';
import { ControlPanel } from '@/components/ControlPanel';
import { KeyboardShortcutsHelp } from '@/components/KeyboardShortcutsHelp';
import { ArtSettings } from '@/types/generativeArt';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';
import { toast } from 'sonner';

const DEFAULT_SETTINGS: ArtSettings = {
  mode: 'waves',
  palette: 'neon',
  speed: 50,
  complexity: 50,
  size: 50,
  isPlaying: true,
};

const Index = () => {
  const [settings, setSettings] = useState<ArtSettings>(DEFAULT_SETTINGS);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const canvasRef = useRef<GenerativeCanvasRef>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);

  const handleSettingsChange = useCallback((newSettings: Partial<ArtSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  }, []);

  const handleDownload = useCallback(() => {
    canvasRef.current?.downloadImage();
    toast.success('¡Imagen descargada!', {
      description: 'Tu arte generativo ha sido guardado como PNG.',
    });
  }, []);

  const handleReset = useCallback(() => {
    canvasRef.current?.clearCanvas();
    setSettings(DEFAULT_SETTINGS);
    toast.info('Canvas reiniciado', {
      description: 'Se han restaurado los valores predeterminados.',
    });
  }, []);

  const handleToggleFullscreen = useCallback(() => {
    const container = canvasContainerRef.current;
    if (!container) return;

    if (!document.fullscreenElement) {
      container.requestFullscreen().then(() => {
        setIsFullscreen(true);
        toast.success('Modo pantalla completa', {
          description: 'Presiona Esc o F para salir.',
        });
      }).catch(() => {
        toast.error('No se pudo activar pantalla completa');
      });
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      });
    }
  }, []);

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Keyboard shortcuts
  useKeyboardShortcuts({
    settings,
    onSettingsChange: handleSettingsChange,
    onDownload: handleDownload,
    onReset: handleReset,
    onToggleFullscreen: handleToggleFullscreen,
  });

  return (
    <main className="min-h-screen bg-background">
      {/* Background gradient effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-6 max-w-7xl">
        <Header />

        <div className="grid lg:grid-cols-[1fr_320px] gap-6 mt-8">
          {/* Canvas Area */}
          <div 
            ref={canvasContainerRef}
            className={`order-2 lg:order-1 ${isFullscreen ? 'fixed inset-0 z-50 h-screen' : 'h-[500px] lg:h-[600px]'}`}
          >
            <GenerativeCanvas ref={canvasRef} settings={settings} />
          </div>

          {/* Control Panel */}
          <div className="order-1 lg:order-2">
            <ControlPanel
              settings={settings}
              isFullscreen={isFullscreen}
              onSettingsChange={handleSettingsChange}
              onDownload={handleDownload}
              onReset={handleReset}
              onToggleFullscreen={handleToggleFullscreen}
            />
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center py-8 mt-8 text-sm text-muted-foreground">
          <div className="flex items-center justify-center gap-4 mb-4">
            <KeyboardShortcutsHelp />
          </div>
          <p>Hecho con ✨ creatividad y código</p>
          <p className="mt-2">© 2025/2026 | Creado por Profesor Bill Papas</p>
        </footer>
      </div>
    </main>
  );
};

export default Index;
