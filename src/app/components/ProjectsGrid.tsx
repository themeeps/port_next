'use client';

import { useState } from 'react';
import { resolveIcon } from '@/lib/icons';
import { ChevronLeft, ChevronRight, Code2, ExternalLink } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';

type ProjectData = {
  id: string;
  title: string;
  description: string;
  icon: string;
  image?: string | null;
  tech: string[];
  githubUrl: string;
  liveUrl: string;
};

const MOBILE_PER_PAGE = 2;

function ProjectCard({
  project,
  isVisible,
  delay,
}: {
  project: ProjectData;
  isVisible: boolean;
  delay: number;
}) {
  const { id, title, description, icon, image, tech, githubUrl, liveUrl } = project;
  const Icon = resolveIcon(icon);
  const hasGithubUrl = githubUrl !== '#';
  const hasLiveUrl = liveUrl !== '#';

  return (
    <div
      key={id}
      className={`reveal ${isVisible ? 'is-visible' : ''} project-card card-hover bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm flex flex-col h-full`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {image ? (
        <img src={image} alt={title} className="project-image w-full" />
      ) : (
        <div className="project-image bg-gradient-primary flex items-center justify-center overflow-hidden">
          <Icon size={56} className="text-white/90" />
        </div>
      )}

      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-xl font-semibold text-slate-900 mb-2">{title}</h3>
        <p className="text-slate-500 text-sm mb-4 leading-relaxed">{description}</p>

        <div className="flex flex-wrap gap-2 mb-5">
          {tech.map((item) => (
            <span
              key={item}
              className="skill-badge bg-slate-100 text-slate-700 text-xs font-medium px-3 py-1 rounded-full"
            >
              {item}
            </span>
          ))}
        </div>

        {(hasGithubUrl || hasLiveUrl) && (
          <div className="flex items-center gap-4 mt-auto">
            {hasGithubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon no-underline inline-flex items-center gap-1.5 text-sm font-medium"
              >
                <Code2 size={18} />
                Code
              </a>
            )}
            {hasLiveUrl && (
              <a
                href={liveUrl}
                className="social-icon no-underline inline-flex items-center gap-1.5 text-sm font-medium"
              >
                <ExternalLink size={18} />
                Live Demo
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ProjectsGrid({ projects }: { projects: ProjectData[] }) {
  const { ref: gridRef, isVisible } = useReveal<HTMLDivElement>();
  const [page, setPage] = useState(0);

  const totalPages = Math.ceil(projects.length / MOBILE_PER_PAGE);
  const currentPage = Math.min(page, Math.max(totalPages - 1, 0));
  const paginatedProjects = projects.slice(
    currentPage * MOBILE_PER_PAGE,
    currentPage * MOBILE_PER_PAGE + MOBILE_PER_PAGE
  );

  return (
    <div ref={gridRef}>
      {/* Desktop / tablet: full grid, no pagination */}
      <div className="hidden md:grid md:grid-cols-3 gap-8">
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} isVisible={isVisible} delay={i * 120} />
        ))}
      </div>

      {/* Mobile: paginated, 2 projects per page */}
      <div className="md:hidden">
        <div className="grid grid-cols-1 gap-8">
          {paginatedProjects.map((project, i) => (
            <ProjectCard key={project.id} project={project} isVisible={isVisible} delay={i * 120} />
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(p - 1, 0))}
              disabled={currentPage === 0}
              className="social-icon disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Previous page"
            >
              <ChevronLeft size={22} />
            </button>

            <span className="text-sm font-medium text-slate-500">
              {currentPage + 1} / {totalPages}
            </span>

            <button
              type="button"
              onClick={() => setPage((p) => Math.min(p + 1, totalPages - 1))}
              disabled={currentPage === totalPages - 1}
              className="social-icon disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Next page"
            >
              <ChevronRight size={22} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
