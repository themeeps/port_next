'use client';

import { resolveIcon } from '@/lib/icons';
import { useReveal } from '../hooks/useReveal';

type SkillGroupData = {
  id: string;
  title: string;
  icon: string;
  skills?: string[];
  subgroups?: { label: string; skills: string[] }[];
};

function SkillBadges({ skills }: { skills: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {skills.map((skill) => (
        <span
          key={skill}
          className="skill-badge bg-slate-100 text-slate-700 text-sm font-medium px-3 py-1.5 rounded-full"
        >
          {skill}
        </span>
      ))}
    </div>
  );
}

export default function SkillsGrid({ groups }: { groups: SkillGroupData[] }) {
  const { ref: gridRef, isVisible } = useReveal<HTMLDivElement>();

  return (
    <div ref={gridRef} className="grid md:grid-cols-3 gap-8">
      {groups.map(({ id, title, icon, skills, subgroups }, i) => {
        const Icon = resolveIcon(icon);
        return (
          <div
            key={id}
            className={`reveal ${isVisible ? 'is-visible' : ''} card-hover bg-white rounded-2xl p-6`}
            style={{ transitionDelay: `${i * 120}ms` }}
          >
            <div className="icon-box mb-4">
              <Icon size={22} />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-4">{title}</h3>

            {subgroups ? (
              <div className="space-y-4">
                {subgroups.map(({ label, skills: subSkills }) => (
                  <div key={label}>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-2">
                      {label}
                    </p>
                    <SkillBadges skills={subSkills} />
                  </div>
                ))}
              </div>
            ) : (
              <SkillBadges skills={skills ?? []} />
            )}
          </div>
        );
      })}
    </div>
  );
}
