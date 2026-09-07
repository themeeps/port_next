import Link from 'next/link';
import { Plus, Pencil } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { deleteHighlight } from './actions';
import DeleteButton from '../DeleteButton';
import BioForm from './BioForm';

export default async function AdminAboutPage() {
  const [content, highlights] = await Promise.all([
    prisma.aboutContent.findUnique({ where: { id: 'about' } }),
    prisma.aboutHighlight.findMany({ orderBy: { order: 'asc' } }),
  ]);

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 mb-6">About — Bio</h1>
        <BioForm bioEn={content?.bioEn} bioId={content?.bioId} />
      </div>

      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-900">Highlights</h2>
          <Link
            href="/admin/about/highlights/new"
            className="btn-gradient text-white px-4 py-2 rounded-lg font-semibold inline-flex items-center gap-2"
          >
            <Plus size={18} />
            New Highlight
          </Link>
        </div>

        <div className="space-y-4">
          {highlights.map((highlight) => (
            <div
              key={highlight.id}
              className="user-card bg-white p-5 flex items-center justify-between"
            >
              <div>
                <p className="font-semibold text-slate-900">{highlight.titleEn}</p>
                <p className="text-slate-500 text-sm">{highlight.descEn}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Link
                  href={`/admin/about/highlights/${highlight.id}`}
                  className="social-icon no-underline p-2"
                >
                  <Pencil size={18} />
                </Link>
                <DeleteButton
                  action={deleteHighlight.bind(null, highlight.id)}
                  confirmMessage={`Delete "${highlight.titleEn}"?`}
                  successMessage={`"${highlight.titleEn}" deleted successfully.`}
                />
              </div>
            </div>
          ))}
          {highlights.length === 0 && <p className="text-slate-500">No highlights yet.</p>}
        </div>
      </div>
    </div>
  );
}
