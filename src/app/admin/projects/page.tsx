import Link from 'next/link';
import { Plus, Pencil } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { deleteProject } from './actions';
import DeleteButton from '../DeleteButton';

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({ orderBy: { order: 'asc' } });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Projects</h1>
        <Link
          href="/admin/projects/new"
          className="btn-gradient text-white px-4 py-2 rounded-lg font-semibold inline-flex items-center gap-2"
        >
          <Plus size={18} />
          New Project
        </Link>
      </div>

      <div className="space-y-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className="user-card bg-white p-5 flex items-center justify-between"
          >
            <div>
              <p className="font-semibold text-slate-900">{project.titleEn}</p>
              <p className="text-slate-500 text-sm">{project.descriptionEn}</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Link href={`/admin/projects/${project.id}`} className="social-icon no-underline p-2">
                <Pencil size={18} />
              </Link>
              <DeleteButton
                action={deleteProject.bind(null, project.id)}
                confirmMessage={`Delete "${project.titleEn}"?`}
                successMessage={`"${project.titleEn}" deleted successfully.`}
              />
            </div>
          </div>
        ))}
        {projects.length === 0 && <p className="text-slate-500">No projects yet.</p>}
      </div>
    </div>
  );
}
