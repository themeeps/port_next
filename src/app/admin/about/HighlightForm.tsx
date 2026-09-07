'use client';

import { ICON_NAMES } from '@/lib/icons';
import { useAdminForm } from '../useAdminForm';
import type { ActionResult } from '../actionResult';

type HighlightFormValues = {
  icon?: string;
  titleEn?: string;
  titleId?: string;
  descEn?: string;
  descId?: string;
  order?: number;
};

export default function HighlightForm({
  action,
  defaultValues,
  redirectTo,
}: {
  action: (prevState: ActionResult | null, formData: FormData) => Promise<ActionResult>;
  defaultValues?: HighlightFormValues;
  redirectTo: string;
}) {
  const { formAction, isPending } = useAdminForm(action, redirectTo);

  return (
      <form action={formAction} className="space-y-5 max-w-2xl">
        <div>
          <label className="block font-semibold text-slate-900 mb-2">Icon</label>
          <select
            name="icon"
            defaultValue={defaultValues?.icon ?? ICON_NAMES[0]}
            className="form-control w-full rounded-lg border border-slate-200 px-4 py-3 outline-none"
          >
            {ICON_NAMES.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className="block font-semibold text-slate-900 mb-2">Title (English)</label>
            <input
              name="titleEn"
              required
              defaultValue={defaultValues?.titleEn}
              className="form-control w-full rounded-lg border border-slate-200 px-4 py-3 outline-none"
            />
          </div>
          <div>
            <label className="block font-semibold text-slate-900 mb-2">Title (Indonesia)</label>
            <input
              name="titleId"
              required
              defaultValue={defaultValues?.titleId}
              className="form-control w-full rounded-lg border border-slate-200 px-4 py-3 outline-none"
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className="block font-semibold text-slate-900 mb-2">Description (English)</label>
            <textarea
              name="descEn"
              required
              rows={3}
              defaultValue={defaultValues?.descEn}
              className="form-control w-full rounded-lg border border-slate-200 px-4 py-3 outline-none resize-none"
            />
          </div>
          <div>
            <label className="block font-semibold text-slate-900 mb-2">Description (Indonesia)</label>
            <textarea
              name="descId"
              required
              rows={3}
              defaultValue={defaultValues?.descId}
              className="form-control w-full rounded-lg border border-slate-200 px-4 py-3 outline-none resize-none"
            />
          </div>
        </div>

        <div>
          <label className="block font-semibold text-slate-900 mb-2">Order</label>
          <input
            type="number"
            name="order"
            defaultValue={defaultValues?.order ?? 0}
            className="form-control w-32 rounded-lg border border-slate-200 px-4 py-3 outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="btn-gradient text-white px-6 py-3 rounded-lg font-semibold disabled:opacity-60"
        >
          {isPending ? 'Saving...' : 'Save'}
        </button>
      </form>
  );
}
