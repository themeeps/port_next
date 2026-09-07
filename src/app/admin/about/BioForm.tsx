'use client';

import { useAdminForm } from '../useAdminForm';
import { updateBio } from './actions';

export default function BioForm({ bioEn, bioId }: { bioEn?: string; bioId?: string }) {
  const { formAction, isPending } = useAdminForm(updateBio, '/admin/about');

  return (
    <form action={formAction} className="space-y-4 max-w-2xl">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block font-semibold text-slate-900 mb-2">Bio (English)</label>
          <textarea
            name="bioEn"
            required
            rows={5}
            defaultValue={bioEn}
            className="form-control w-full rounded-lg border border-slate-200 px-4 py-3 outline-none resize-none"
          />
        </div>
        <div>
          <label className="block font-semibold text-slate-900 mb-2">Bio (Indonesia)</label>
          <textarea
            name="bioId"
            required
            rows={5}
            defaultValue={bioId}
            className="form-control w-full rounded-lg border border-slate-200 px-4 py-3 outline-none resize-none"
          />
        </div>
      </div>
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
