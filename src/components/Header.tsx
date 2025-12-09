import { Sparkles } from 'lucide-react';

export function Header() {
  return (
    <header className="text-center space-y-4 py-8">
      <div className="inline-flex items-center gap-3">
        <div className="relative">
          <Sparkles className="w-10 h-10 text-primary animate-pulse-glow" />
          <div className="absolute inset-0 blur-xl bg-primary/30 rounded-full" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gradient">
          Laboratorio de Arte Generativo
        </h1>
        <div className="relative">
          <Sparkles className="w-10 h-10 text-accent animate-pulse-glow" />
          <div className="absolute inset-0 blur-xl bg-accent/30 rounded-full" />
        </div>
      </div>
      <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
        Crea patrones hipnóticos y arte visual único. Experimenta con ondas, fractales,
        partículas y espirales.
      </p>
    </header>
  );
}
