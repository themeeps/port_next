import { prisma } from '@/lib/prisma';
import SkillsGrid from './SkillsGrid';

export default async function SkillsSection() {
  const groups = await prisma.skillGroup.findMany({
    orderBy: { order: 'asc' },
    include: { subgroups: { orderBy: { order: 'asc' } } },
  });

  const skillGroups = groups.map((group) => ({
    id: group.id,
    title: group.title,
    icon: group.icon,
    skills: group.skills ? (JSON.parse(group.skills) as string[]) : undefined,
    subgroups:
      group.subgroups.length > 0
        ? group.subgroups.map((s) => ({ label: s.label, skills: JSON.parse(s.skills) as string[] }))
        : undefined,
  }));

  return (
    <section id="skills" className="py-24 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900">
            My <span className="text-gradient">Skills</span>
          </h2>
          <p className="text-slate-500 mt-3">
            The programming languages and technologies I use on a daily basis.
          </p>
        </div>

        <SkillsGrid groups={skillGroups} />
      </div>
    </section>
  );
}
