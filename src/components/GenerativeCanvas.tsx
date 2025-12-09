import { useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { ArtSettings } from '@/types/generativeArt';
import { useGenerativeArt } from '@/hooks/useGenerativeArt';

interface GenerativeCanvasProps {
  settings: ArtSettings;
}

export interface GenerativeCanvasRef {
  downloadImage: () => void;
  clearCanvas: () => void;
}

export const GenerativeCanvas = forwardRef<GenerativeCanvasRef, GenerativeCanvasProps>(
  ({ settings }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const { clearCanvas } = useGenerativeArt(canvasRef, settings);

    useImperativeHandle(ref, () => ({
      downloadImage: () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const link = document.createElement('a');
        link.download = `arte-generativo-${settings.mode}-${Date.now()}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
      },
      clearCanvas,
    }));

    useEffect(() => {
      const updateSize = () => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const rect = container.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;

        // Initial clear
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.fillStyle = '#0a0a14';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
      };

      updateSize();
      window.addEventListener('resize', updateSize);
      return () => window.removeEventListener('resize', updateSize);
    }, []);

    return (
      <div
        ref={containerRef}
        className="relative w-full h-full min-h-[400px] rounded-2xl overflow-hidden border border-border/30"
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ background: '#0a0a14' }}
        />
        
        {/* Overlay gradient for depth */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-background/20" />
        
        {/* Status indicator */}
        <div className="absolute top-4 right-4 flex items-center gap-2 glass px-3 py-1.5 rounded-full">
          <div
            className={`w-2 h-2 rounded-full ${
              settings.isPlaying ? 'bg-neon-green animate-pulse-glow' : 'bg-muted-foreground'
            }`}
          />
          <span className="text-xs text-muted-foreground">
            {settings.isPlaying ? 'Reproduciendo' : 'Pausado'}
          </span>
        </div>
      </div>
    );
  }
);

GenerativeCanvas.displayName = 'GenerativeCanvas';
