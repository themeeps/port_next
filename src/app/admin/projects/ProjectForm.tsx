'use client';

import { useState } from 'react';
import { ICON_NAMES } from '@/lib/icons';
import { useAdminForm } from '../useAdminForm';
import type { ActionResult } from '../actionResult';

type ProjectFormValues = {
  titleEn?: string;
  titleId?: string;
  descriptionEn?: string;
  descriptionId?: string;
  icon?: string;
  image?: string | null;
  tech?: string[];
  githubUrl?: string;
  liveUrl?: string;
  order?: number;
};

export default function ProjectForm({
  action,
  defaultValues,
  redirectTo,
}: {
  action: (prevState: ActionResult | null, formData: FormData) => Promise<ActionResult>;
  defaultValues?: ProjectFormValues;
  redirectTo: string;
}) {
  const { formAction, isPending } = useAdminForm(action, redirectTo);
  const [preview, setPreview] = useState<string | null>(defaultValues?.image ?? null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setPreview(file ? URL.createObjectURL(file) : (defaultValues?.image ?? null));
  };

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

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block font-semibold text-slate-900 mb-2">Description (English)</label>
          <textarea
            name="descriptionEn"
            required
            rows={3}
            defaultValue={defaultValues?.descriptionEn}
            className="form-control w-full rounded-lg border border-slate-200 px-4 py-3 outline-none resize-none"
          />
        </div>
        <div>
          <label className="block font-semibold text-slate-900 mb-2">Description (Indonesia)</label>
          <textarea
            name="descriptionId"
            required
            rows={3}
            defaultValue={defaultValues?.descriptionId}
            className="form-control w-full rounded-lg border border-slate-200 px-4 py-3 outline-none resize-none"
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
        <p className="text-slate-500 text-sm mt-1">
          Used as the thumbnail fallback when no screenshot is uploaded.
        </p>
      </div>

      <div>
        <label className="block font-semibold text-slate-900 mb-2">Screenshot</label>
        {preview && (
          <img
            src={preview}
            alt="Screenshot preview"
            className="w-full h-48 object-cover rounded-lg mb-3 border border-slate-200"
          />
        )}
        <input
          type="file"
          name="image"
          accept="image/jpeg,image/png,image/webp,image/gif"
          onChange={handleImageChange}
          className="form-control w-full rounded-lg border border-slate-200 px-4 py-3 outline-none file:mr-4 file:rounded-md file:border-0 file:bg-slate-100 file:px-3 file:py-1.5 file:text-sm file:font-medium"
        />
        <p className="text-slate-500 text-sm mt-1">
          JPEG, PNG, WEBP, or GIF, up to 5MB.{' '}
          {defaultValues?.image ? 'Leave empty to keep the current screenshot.' : ''}
        </p>
      </div>

      <div>
        <label className="block font-semibold text-slate-900 mb-2">Tech stack (comma-separated)</label>
        <input
          name="tech"
          required
          defaultValue={defaultValues?.tech?.join(', ')}
          placeholder="Next.js, TypeScript, Tailwind CSS"
          className="form-control w-full rounded-lg border border-slate-200 px-4 py-3 outline-none"
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block font-semibold text-slate-900 mb-2">GitHub URL</label>
          <input
            name="githubUrl"
            required
            defaultValue={defaultValues?.githubUrl}
            className="form-control w-full rounded-lg border border-slate-200 px-4 py-3 outline-none"
          />
        </div>
        <div>
          <label className="block font-semibold text-slate-900 mb-2">Live URL</label>
          <input
            name="liveUrl"
            required
            defaultValue={defaultValues?.liveUrl}
            className="form-control w-full rounded-lg border border-slate-200 px-4 py-3 outline-none"
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
