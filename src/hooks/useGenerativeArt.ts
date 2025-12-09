import { useRef, useEffect, useCallback } from 'react';
import { ArtSettings, COLOR_PALETTES } from '@/types/generativeArt';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
}

export function useGenerativeArt(
  canvasRef: React.RefObject<HTMLCanvasElement>,
  settings: ArtSettings
) {
  const animationRef = useRef<number>();
  const timeRef = useRef(0);
  const particlesRef = useRef<Particle[]>([]);

  const getColors = useCallback(() => {
    const palette = COLOR_PALETTES.find((p) => p.name === settings.palette);
    return palette?.colors || COLOR_PALETTES[0].colors;
  }, [settings.palette]);

  const initParticles = useCallback((width: number, height: number) => {
    const count = Math.floor(settings.complexity * 2) + 20;
    particlesRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      size: Math.random() * settings.size * 3 + 2,
      color: getColors()[Math.floor(Math.random() * getColors().length)],
    }));
  }, [settings.complexity, settings.size, getColors]);

  const drawWaves = useCallback(
    (ctx: CanvasRenderingContext2D, width: number, height: number, time: number) => {
      const colors = getColors();
      const waveCount = Math.floor(settings.complexity / 10) + 3;

      for (let w = 0; w < waveCount; w++) {
        ctx.beginPath();
        ctx.strokeStyle = colors[w % colors.length];
        ctx.lineWidth = settings.size / 5 + 1;
        ctx.globalAlpha = 0.6;

        for (let x = 0; x <= width; x += 5) {
          const y =
            height / 2 +
            Math.sin((x * 0.01 + time * settings.speed * 0.02 + w) * (1 + w * 0.2)) *
              (50 + w * 20) *
              (settings.size / 50) +
            Math.cos((x * 0.02 + time * settings.speed * 0.01) * (1 + w * 0.1)) *
              (30 + w * 15) *
              (settings.size / 50);

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    },
    [settings.complexity, settings.size, settings.speed, getColors]
  );

  const drawFractals = useCallback(
    (ctx: CanvasRenderingContext2D, width: number, height: number, time: number) => {
      const colors = getColors();
      const centerX = width / 2;
      const centerY = height / 2;
      const branches = Math.floor(settings.complexity / 15) + 4;
      const maxDepth = Math.floor(settings.complexity / 25) + 3;

      const drawBranch = (
        x: number,
        y: number,
        angle: number,
        length: number,
        depth: number
      ) => {
        if (depth > maxDepth || length < 5) return;

        const endX = x + Math.cos(angle) * length;
        const endY = y + Math.sin(angle) * length;

        ctx.beginPath();
        ctx.strokeStyle = colors[depth % colors.length];
        ctx.lineWidth = Math.max(1, (maxDepth - depth) * (settings.size / 30));
        ctx.globalAlpha = 0.8 - depth * 0.1;
        ctx.moveTo(x, y);
        ctx.lineTo(endX, endY);
        ctx.stroke();

        const newLength = length * 0.7;
        const angleOffset = 0.4 + Math.sin(time * settings.speed * 0.01) * 0.2;

        drawBranch(endX, endY, angle - angleOffset, newLength, depth + 1);
        drawBranch(endX, endY, angle + angleOffset, newLength, depth + 1);
      };

      for (let i = 0; i < branches; i++) {
        const angle = (Math.PI * 2 * i) / branches + time * settings.speed * 0.001;
        drawBranch(centerX, centerY, angle, 80 * (settings.size / 50), 0);
      }
      ctx.globalAlpha = 1;
    },
    [settings.complexity, settings.size, settings.speed, getColors]
  );

  const drawParticles = useCallback(
    (ctx: CanvasRenderingContext2D, width: number, height: number) => {
      const colors = getColors();
      const particles = particlesRef.current;
      const connectionDistance = 100 + settings.size;

      // Update particles
      particles.forEach((p) => {
        p.x += p.vx * settings.speed * 0.1;
        p.y += p.vy * settings.speed * 0.1;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        p.x = Math.max(0, Math.min(width, p.x));
        p.y = Math.max(0, Math.min(height, p.y));
      });

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            ctx.beginPath();
            ctx.strokeStyle = colors[i % colors.length];
            ctx.globalAlpha = (1 - distance / connectionDistance) * 0.5;
            ctx.lineWidth = 1;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw particles
      particles.forEach((p, i) => {
        ctx.beginPath();
        ctx.fillStyle = colors[i % colors.length];
        ctx.globalAlpha = 0.9;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Glow effect
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3);
        gradient.addColorStop(0, colors[i % colors.length] + '40');
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalAlpha = 1;
    },
    [settings.size, settings.speed, getColors]
  );

  const drawSpirals = useCallback(
    (ctx: CanvasRenderingContext2D, width: number, height: number, time: number) => {
      const colors = getColors();
      const centerX = width / 2;
      const centerY = height / 2;
      const spiralCount = Math.floor(settings.complexity / 20) + 2;

      for (let s = 0; s < spiralCount; s++) {
        ctx.beginPath();
        ctx.strokeStyle = colors[s % colors.length];
        ctx.lineWidth = settings.size / 20 + 1;
        ctx.globalAlpha = 0.7;

        const startAngle = (Math.PI * 2 * s) / spiralCount + time * settings.speed * 0.005;
        const maxRadius = Math.min(width, height) * 0.4;
        const turns = 3 + settings.complexity / 30;

        for (let i = 0; i <= 500; i++) {
          const t = i / 500;
          const angle = startAngle + t * Math.PI * 2 * turns;
          const radius = t * maxRadius;

          const x = centerX + Math.cos(angle) * radius;
          const y = centerY + Math.sin(angle) * radius;

          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    },
    [settings.complexity, settings.size, settings.speed, getColors]
  );

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Clear with fade effect
    ctx.fillStyle = 'rgba(10, 10, 20, 0.1)';
    ctx.fillRect(0, 0, width, height);

    switch (settings.mode) {
      case 'waves':
        drawWaves(ctx, width, height, timeRef.current);
        break;
      case 'fractals':
        drawFractals(ctx, width, height, timeRef.current);
        break;
      case 'particles':
        drawParticles(ctx, width, height);
        break;
      case 'spirals':
        drawSpirals(ctx, width, height, timeRef.current);
        break;
    }

    timeRef.current += 1;
  }, [settings.mode, drawWaves, drawFractals, drawParticles, drawSpirals, canvasRef]);

  const animate = useCallback(() => {
    if (settings.isPlaying) {
      draw();
      animationRef.current = requestAnimationFrame(animate);
    }
  }, [settings.isPlaying, draw]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    initParticles(canvas.width, canvas.height);
  }, [settings.complexity, settings.size, initParticles, canvasRef]);

  useEffect(() => {
    if (settings.isPlaying) {
      animate();
    } else if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [settings.isPlaying, animate]);

  const clearCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#0a0a14';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    timeRef.current = 0;
  }, [canvasRef]);

  return { clearCanvas };
}
