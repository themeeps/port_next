'use client';

import { ICON_NAMES } from '@/lib/icons';
import { useAdminForm } from '../useAdminForm';
import type { ActionResult } from '../actionResult';

type SkillGroupFormValues = {
  titleEn?: string;
  titleId?: string;
  icon?: string;
  order?: number;
  skills?: string[];
  subgroups?: { labelEn: string; labelId: string; skills: string[] }[];
};

export default function SkillGroupForm({
  action,
  defaultValues,
  redirectTo,
}: {
  action: (prevState: ActionResult | null, formData: FormData) => Promise<ActionResult>;
  defaultValues?: SkillGroupFormValues;
  redirectTo: string;
}) {
  const sub0 = defaultValues?.subgroups?.[0];
  const sub1 = defaultValues?.subgroups?.[1];
  const { formAction, isPending } = useAdminForm(action, redirectTo);

  return (
    <form action={formAction} className="space-y-5 max-w-2xl">
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
        <label className="block font-semibold text-slate-900 mb-2">Order</label>
        <input
          type="number"
          name="order"
          defaultValue={defaultValues?.order ?? 0}
          className="form-control w-32 rounded-lg border border-slate-200 px-4 py-3 outline-none"
        />
      </div>

      <div className="rounded-xl border border-slate-200 p-5">
        <p className="font-semibold text-slate-900 mb-1">Flat skills</p>
        <p className="text-slate-500 text-sm mb-3">
          Use this OR the subgroups below, not both. Leave both subgroup labels empty to use this
          field.
        </p>
        <input
          name="skills"
          defaultValue={defaultValues?.skills?.join(', ')}
          placeholder="MySQL, PostgreSQL, SQLite"
          className="form-control w-full rounded-lg border border-slate-200 px-4 py-3 outline-none"
        />
      </div>

      <div className="rounded-xl border border-slate-200 p-5 space-y-4">
        <p className="font-semibold text-slate-900">Subgroup 1 (optional)</p>
        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm text-slate-500 mb-1">Label (English)</label>
            <input
              name="subgroupLabelEn0"
              defaultValue={sub0?.labelEn}
              placeholder="Language"
              className="form-control w-full rounded-lg border border-slate-200 px-4 py-3 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm text-slate-500 mb-1">Label (Indonesia)</label>
            <input
              name="subgroupLabelId0"
              defaultValue={sub0?.labelId}
              placeholder="Bahasa"
              className="form-control w-full rounded-lg border border-slate-200 px-4 py-3 outline-none"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm text-slate-500 mb-1">Skills (comma-separated)</label>
          <input
            name="subgroupSkills0"
            defaultValue={sub0?.skills.join(', ')}
            placeholder="JavaScript, TypeScript"
            className="form-control w-full rounded-lg border border-slate-200 px-4 py-3 outline-none"
          />
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 p-5 space-y-4">
        <p className="font-semibold text-slate-900">Subgroup 2 (optional)</p>
        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm text-slate-500 mb-1">Label (English)</label>
            <input
              name="subgroupLabelEn1"
              defaultValue={sub1?.labelEn}
              placeholder="Framework"
              className="form-control w-full rounded-lg border border-slate-200 px-4 py-3 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm text-slate-500 mb-1">Label (Indonesia)</label>
            <input
              name="subgroupLabelId1"
              defaultValue={sub1?.labelId}
              placeholder="Framework"
              className="form-control w-full rounded-lg border border-slate-200 px-4 py-3 outline-none"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm text-slate-500 mb-1">Skills (comma-separated)</label>
          <input
            name="subgroupSkills1"
            defaultValue={sub1?.skills.join(', ')}
            placeholder="React, Next.js"
            className="form-control w-full rounded-lg border border-slate-200 px-4 py-3 outline-none"
          />
        </div>
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
