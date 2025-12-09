import { Keyboard } from 'lucide-react';
import { useState } from 'react';

const shortcuts = [
  { key: 'Espacio', action: 'Pausar/Reproducir' },
  { key: '↑ / ↓', action: 'Velocidad +/-' },
  { key: '← / →', action: 'Complejidad +/-' },
  { key: 'F', action: 'Pantalla completa' },
  { key: 'D', action: 'Descargar' },
  { key: 'R', action: 'Reiniciar' },
  { key: 'Esc', action: 'Salir pantalla completa' },
];

export function KeyboardShortcutsHelp() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors glass px-3 py-1.5 rounded-full"
      >
        <Keyboard className="w-3 h-3" />
        <span>Atajos</span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute bottom-full mb-2 left-0 z-50 glass-strong rounded-lg p-3 min-w-[180px] animate-fade-in">
            <h4 className="text-xs font-semibold mb-2 text-foreground">Atajos de Teclado</h4>
            <div className="space-y-1.5">
              {shortcuts.map((shortcut) => (
                <div key={shortcut.key} className="flex justify-between gap-4 text-xs">
                  <kbd className="px-1.5 py-0.5 rounded bg-background/50 font-mono text-foreground">
                    {shortcut.key}
                  </kbd>
                  <span className="text-muted-foreground">{shortcut.action}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
