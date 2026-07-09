'use client';

import { createContext, useContext, useRef, useState, type ReactNode } from 'react';
import AlertModal, { type AlertState } from './AlertModal';

type ShowAlert = (alert: NonNullable<AlertState>, onClose?: () => void) => void;

const AlertContext = createContext<{ showAlert: ShowAlert } | null>(null);

export function AlertProvider({ children }: { children: ReactNode }) {
  const [alert, setAlert] = useState<AlertState>(null);
  const onCloseRef = useRef<(() => void) | undefined>(undefined);

  const showAlert: ShowAlert = (newAlert, onClose) => {
    onCloseRef.current = onClose;
    setAlert(newAlert);
  };

  const handleClose = () => {
    setAlert(null);
    onCloseRef.current?.();
    onCloseRef.current = undefined;
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      <AlertModal alert={alert} onClose={handleClose} />
    </AlertContext.Provider>
  );
}

export function useAlert() {
  const ctx = useContext(AlertContext);
  if (!ctx) throw new Error('useAlert must be used within <AlertProvider>');
  return ctx;
}
