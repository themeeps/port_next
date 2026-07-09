'use client';

import { ICON_NAMES } from '@/lib/icons';
import { useAdminForm } from '../useAdminForm';
import type { ActionResult } from '../actionResult';

type HighlightFormValues = {
  icon?: string;
  title?: string;
  desc?: string;
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

        <div>
          <label className="block font-semibold text-slate-900 mb-2">Title</label>
          <input
            name="title"
            required
            defaultValue={defaultValues?.title}
            className="form-control w-full rounded-lg border border-slate-200 px-4 py-3 outline-none"
          />
        </div>

        <div>
          <label className="block font-semibold text-slate-900 mb-2">Description</label>
          <textarea
            name="desc"
            required
            rows={3}
            defaultValue={defaultValues?.desc}
            className="form-control w-full rounded-lg border border-slate-200 px-4 py-3 outline-none resize-none"
          />
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
