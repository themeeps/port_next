'use client';

import { useAdminForm } from '../useAdminForm';
import { updateBio } from './actions';

export default function BioForm({ bio }: { bio?: string }) {
  const { formAction, isPending } = useAdminForm(updateBio, '/admin/about');

  return (
    <form action={formAction} className="space-y-4 max-w-2xl">
      <textarea
        name="bio"
        required
        rows={5}
        defaultValue={bio}
        className="form-control w-full rounded-lg border border-slate-200 px-4 py-3 outline-none resize-none"
      />
      <button
        type="submit"
        disabled={isPending}
        className="btn-gradient text-white px-6 py-3 rounded-lg font-semibold disabled:opacity-60"
      >
        {isPending ? 'Saving...' : 'Save Bio'}
      </button>
    </form>
  );
}
