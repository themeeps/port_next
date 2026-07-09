'use client';

import { useActionState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import type { ActionResult } from './actionResult';
import { useAlert } from './AlertProvider';

export function useAdminForm(
  action: (prevState: ActionResult | null, formData: FormData) => Promise<ActionResult>,
  redirectTo: string
) {
  const router = useRouter();
  const { showAlert } = useAlert();
  const [state, formAction, isPending] = useActionState(action, null);

  useEffect(() => {
    if (!state) return;

    showAlert(
      { status: state.success ? 'success' : 'error', message: state.message },
      state.success ? () => router.push(redirectTo) : undefined
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return { formAction, isPending };
}
