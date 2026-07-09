import { prisma } from '@/lib/prisma';
import ProjectsGrid from './ProjectsGrid';

export default async function ProjectsSection() {
  const projects = await prisma.project.findMany({ orderBy: { order: 'asc' } });

  const projectData = projects.map((project) => ({
    id: project.id,
    title: project.title,
    description: project.description,
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
          <h2 className="text-4xl font-bold text-slate-900">
            My <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-slate-500 mt-3">A few projects I&apos;ve worked on</p>
        </div>

        <ProjectsGrid projects={projectData} />
      </div>
    </section>
  );
}
