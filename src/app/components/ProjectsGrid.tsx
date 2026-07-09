'use client';

import { resolveIcon } from '@/lib/icons';
import { Code2, ExternalLink } from 'lucide-react';
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

export default function ProjectsGrid({ projects }: { projects: ProjectData[] }) {
  const { ref: gridRef, isVisible } = useReveal<HTMLDivElement>();

  return (
    <div ref={gridRef} className="grid md:grid-cols-3 gap-8">
      {projects.map(({ id, title, description, icon, image, tech, githubUrl, liveUrl }, i) => {
        const Icon = resolveIcon(icon);
        return (
          <div
            key={id}
            className={`reveal ${isVisible ? 'is-visible' : ''} project-card card-hover bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm`}
            style={{ transitionDelay: `${i * 120}ms` }}
          >
            {image ? (
              <img src={image} alt={title} className="project-image w-full" />
            ) : (
              <div className="project-image bg-gradient-primary flex items-center justify-center overflow-hidden">
                <Icon size={56} className="text-white/90" />
              </div>
            )}

            <div className="p-6">
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

              <div className="flex items-center gap-4">
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon no-underline inline-flex items-center gap-1.5 text-sm font-medium"
                >
                  <Code2 size={18} />
                  Code
                </a>
                <a
                  href={liveUrl}
                  className="social-icon no-underline inline-flex items-center gap-1.5 text-sm font-medium"
                >
                  <ExternalLink size={18} />
                  Live Demo
                </a>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
