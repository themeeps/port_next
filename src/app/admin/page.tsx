import { prisma } from '@/lib/prisma';
import { FolderKanban, Layers, Sparkles } from 'lucide-react';

export default async function AdminOverviewPage() {
  const [projectCount, skillGroupCount, highlightCount] = await Promise.all([
    prisma.project.count(),
    prisma.skillGroup.count(),
    prisma.aboutHighlight.count(),
  ]);

  const stats = [
    { label: 'Projects', value: projectCount, icon: FolderKanban },
    { label: 'Skill Groups', value: skillGroupCount, icon: Layers },
    { label: 'About Highlights', value: highlightCount, icon: Sparkles },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Dashboard Overview</h1>
      <div className="grid sm:grid-cols-3 gap-6">
        {stats.map(({ label, value, icon: Icon }) => (
          <div
            key={label}
            className="stat-card bg-white rounded-2xl p-6 shadow-sm border border-slate-100"
          >
            <div className="icon-box mb-4">
              <Icon size={22} />
            </div>
            <p className="text-3xl font-bold text-slate-900">{value}</p>
            <p className="text-slate-500 text-sm mt-1">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
