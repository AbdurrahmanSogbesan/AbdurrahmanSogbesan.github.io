'use client';

import type { ReactNode } from 'react';
import { ToastContext, useToastController } from '@/hooks/useToast';
import Toaster from './Toaster';

/** Site-wide client state for Home and About (the 404 renders without it). */
export default function Providers({ children }: { children: ReactNode }) {
  const { toast, api } = useToastController();
  return (
    <ToastContext.Provider value={api}>
      {children}
      <Toaster toast={toast} onClose={() => api.hide()} />
    </ToastContext.Provider>
  );
}
