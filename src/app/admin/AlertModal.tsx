'use client';

import { CheckCircle2, XCircle } from 'lucide-react';

export type AlertState = { status: 'success' | 'error'; message: string } | null;

export default function AlertModal({ alert, onClose }: { alert: AlertState; onClose: () => void }) {
  if (!alert) return null;

  const isSuccess = alert.status === 'success';

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box text-center" onClick={(e) => e.stopPropagation()}>
        <div
          className={`mx-auto mb-4 flex items-center justify-center w-16 h-16 rounded-full ${
            isSuccess ? 'bg-success-subtle text-green-600' : 'bg-danger-subtle text-red-600'
          }`}
        >
          {isSuccess ? <CheckCircle2 size={32} /> : <XCircle size={32} />}
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">
          {isSuccess ? 'Success' : 'Failed'}
        </h3>
        <p className="text-slate-500 mb-6">{alert.message}</p>
        <button
          type="button"
          onClick={onClose}
          className="btn-gradient text-white font-semibold px-6 py-2.5 rounded-lg"
        >
          OK
        </button>
      </div>
    </div>
  );
}
