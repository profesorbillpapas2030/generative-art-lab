import { useState, useRef } from 'react';
import { Header } from '@/components/Header';
import { GenerativeCanvas, GenerativeCanvasRef } from '@/components/GenerativeCanvas';
import { ControlPanel } from '@/components/ControlPanel';
import { ArtSettings } from '@/types/generativeArt';
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
  const canvasRef = useRef<GenerativeCanvasRef>(null);

  const handleSettingsChange = (newSettings: Partial<ArtSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const handleDownload = () => {
    canvasRef.current?.downloadImage();
    toast.success('¡Imagen descargada!', {
      description: 'Tu arte generativo ha sido guardado como PNG.',
    });
  };

  const handleReset = () => {
    canvasRef.current?.clearCanvas();
    setSettings(DEFAULT_SETTINGS);
    toast.info('Canvas reiniciado', {
      description: 'Se han restaurado los valores predeterminados.',
    });
  };

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
          <div className="order-2 lg:order-1 h-[500px] lg:h-[600px]">
            <GenerativeCanvas ref={canvasRef} settings={settings} />
          </div>

          {/* Control Panel */}
          <div className="order-1 lg:order-2">
            <ControlPanel
              settings={settings}
              onSettingsChange={handleSettingsChange}
              onDownload={handleDownload}
              onReset={handleReset}
            />
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center py-8 mt-8 text-sm text-muted-foreground">
          <p>Hecho con ✨ creatividad y código</p>
          <p className="mt-2">© 2025/2026 | Creado por Profesor Bill Papas</p>
        </footer>
      </div>
    </main>
  );
};

export default Index;
