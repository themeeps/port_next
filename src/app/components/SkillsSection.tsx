import { prisma } from '@/lib/prisma';
import SkillsGrid from './SkillsGrid';
import SectionHeading from './SectionHeading';

export default async function SkillsSection() {
  const groups = await prisma.skillGroup.findMany({
    orderBy: { order: 'asc' },
    include: { subgroups: { orderBy: { order: 'asc' } } },
  });

  const skillGroups = groups.map((group) => ({
    id: group.id,
    titleEn: group.titleEn,
    titleId: group.titleId,
    icon: group.icon,
    skills: group.skills ? (JSON.parse(group.skills) as string[]) : undefined,
    subgroups:
      group.subgroups.length > 0
        ? group.subgroups.map((s) => ({
            labelEn: s.labelEn,
            labelId: s.labelId,
            skills: JSON.parse(s.skills) as string[],
          }))
        : undefined,
  }));

  return (
    <section id="skills" className="py-24 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <SectionHeading section="skills" />
        </div>

        <SkillsGrid groups={skillGroups} />
      </div>
    </section>
  );
}
