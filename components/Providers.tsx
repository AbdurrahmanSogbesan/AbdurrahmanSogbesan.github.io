'use client';

import { useEffect, type ReactNode } from 'react';
import { useKonami } from '@/hooks/useKonami';
import { RetroContext, useRetroController } from '@/hooks/useRetroMode';
import { ToastContext, useToastController } from '@/hooks/useToast';
import { printConsoleHello } from '@/lib/consoleHello';
import Scanlines from './Scanlines';
import Toaster from './Toaster';

/** Site-wide client state and easter eggs for Home and About (the 404 renders without it). */
export default function Providers({ children }: { children: ReactNode }) {
  const { toast, api } = useToastController();
  const retro = useRetroController(api);
  useKonami(retro.start);

  useEffect(() => {
    printConsoleHello();
  }, []);

  return (
    <ToastContext.Provider value={api}>
      <RetroContext.Provider value={retro}>
        {children}
        <Toaster toast={toast} onClose={retro.end} />
        <Scanlines on={retro.active} />
      </RetroContext.Provider>
    </ToastContext.Provider>
  );
}
