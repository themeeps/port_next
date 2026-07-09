import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import ProjectForm from '../ProjectForm';
import { updateProject } from '../actions';

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await prisma.project.findUnique({ where: { id } });
  if (!project) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Edit Project</h1>
      <ProjectForm
        action={updateProject.bind(null, id)}
        redirectTo="/admin/projects"
        defaultValues={{
          title: project.title,
          description: project.description,
          icon: project.icon,
          image: project.image,
          tech: JSON.parse(project.tech) as string[],
          githubUrl: project.githubUrl,
          liveUrl: project.liveUrl,
          order: project.order,
        }}
      />
    </div>
  );
}
