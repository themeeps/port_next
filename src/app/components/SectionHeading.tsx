'use client';

import { useLanguage } from '../context/LanguageContext';

type SectionKey = 'about' | 'skills' | 'projects';

export default function SectionHeading({ section }: { section: SectionKey }) {
  const { t } = useLanguage();
  const { headingPre, headingHighlight, headingAfter, subtitle } = t[section];

  return (
    <>
      <h2 className="text-4xl font-bold text-slate-900">
        {headingPre && `${headingPre} `}
        <span className="text-gradient">{headingHighlight}</span>
        {headingAfter && ` ${headingAfter}`}
      </h2>
      {subtitle && <p className="text-slate-500 mt-3">{subtitle}</p>}
    </>
  );
}
