import Link from 'next/link';
import { Plus, Pencil } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { deleteSkillGroup } from './actions';
import DeleteButton from '../DeleteButton';

export default async function AdminSkillsPage() {
  const groups = await prisma.skillGroup.findMany({
    orderBy: { order: 'asc' },
    include: { subgroups: { orderBy: { order: 'asc' } } },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Skills</h1>
        <Link
          href="/admin/skills/new"
          className="btn-gradient text-white px-4 py-2 rounded-lg font-semibold inline-flex items-center gap-2"
        >
          <Plus size={18} />
          New Skill Group
        </Link>
      </div>

      <div className="space-y-4">
        {groups.map((group) => (
          <div key={group.id} className="user-card bg-white p-5 flex items-center justify-between">
            <div>
              <p className="font-semibold text-slate-900">{group.titleEn}</p>
              <p className="text-slate-500 text-sm">
                {group.subgroups.length > 0
                  ? group.subgroups.map((s) => s.labelEn).join(' / ')
                  : (JSON.parse(group.skills ?? '[]') as string[]).join(', ')}
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Link href={`/admin/skills/${group.id}`} className="social-icon no-underline p-2">
                <Pencil size={18} />
              </Link>
              <DeleteButton
                action={deleteSkillGroup.bind(null, group.id)}
                confirmMessage={`Delete "${group.titleEn}"?`}
                successMessage={`"${group.titleEn}" deleted successfully.`}
              />
            </div>
          </div>
        ))}
        {groups.length === 0 && <p className="text-slate-500">No skill groups yet.</p>}
      </div>
    </div>
  );
}
