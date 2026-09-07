import { prisma } from '@/lib/prisma';
import ProjectsGrid from './ProjectsGrid';
import SectionHeading from './SectionHeading';

export default async function ProjectsSection() {
  const projects = await prisma.project.findMany({ orderBy: { order: 'asc' } });

  const projectData = projects.map((project) => ({
    id: project.id,
    titleEn: project.titleEn,
    titleId: project.titleId,
    descriptionEn: project.descriptionEn,
    descriptionId: project.descriptionId,
    icon: project.icon,
    image: project.image,
    tech: JSON.parse(project.tech) as string[],
    githubUrl: project.githubUrl,
    liveUrl: project.liveUrl,
  }));

  return (
    <section id="projects" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <SectionHeading section="projects" />
        </div>

        <ProjectsGrid projects={projectData} />
      </div>
    </section>
  );
}
