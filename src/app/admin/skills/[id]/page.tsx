import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import SkillGroupForm from '../SkillGroupForm';
import { updateSkillGroup } from '../actions';

export default async function EditSkillGroupPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const group = await prisma.skillGroup.findUnique({
    where: { id },
    include: { subgroups: { orderBy: { order: 'asc' } } },
  });
  if (!group) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Edit Skill Group</h1>
      <SkillGroupForm
        action={updateSkillGroup.bind(null, id)}
        redirectTo="/admin/skills"
        defaultValues={{
          title: group.title,
          icon: group.icon,
          order: group.order,
          skills: group.skills ? (JSON.parse(group.skills) as string[]) : undefined,
          subgroups: group.subgroups.map((s) => ({
            label: s.label,
            skills: JSON.parse(s.skills) as string[],
          })),
        }}
      />
    </div>
  );
}
