'use client';

import { Trash2 } from 'lucide-react';
import { useAlert } from './AlertProvider';

export default function DeleteButton({
  action,
  confirmMessage,
  successMessage,
}: {
  action: () => Promise<void>;
  confirmMessage: string;
  successMessage: string;
}) {
  const { showAlert } = useAlert();

  const handleClick = async () => {
    if (!window.confirm(confirmMessage)) return;

    try {
      await action();
      showAlert({ status: 'success', message: successMessage });
    } catch (error) {
      console.error('delete action failed:', error);
      showAlert({ status: 'error', message: 'Failed to delete.' });
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="social-icon no-underline p-2"
      aria-label="Delete"
    >
      <Trash2 size={18} />
    </button>
  );
}
