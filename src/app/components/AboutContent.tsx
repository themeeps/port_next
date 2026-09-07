'use client';

import { resolveIcon } from '@/lib/icons';
import { useLanguage } from '../context/LanguageContext';

type HighlightData = {
  id: string;
  icon: string;
  titleEn: string;
  titleId: string;
  descEn: string;
  descId: string;
};

export default function AboutContent({
  bioEn,
  bioId,
  highlights,
}: {
  bioEn: string;
  bioId: string;
  highlights: HighlightData[];
}) {
  const { language } = useLanguage();

  return (
    <div>
      <p className="text-slate-600 leading-relaxed mb-4">{language === 'en' ? bioEn : bioId}</p>

      <div className="grid sm:grid-cols-3 gap-4">
        {highlights.map(({ id, icon, titleEn, titleId, descEn, descId }) => {
          const Icon = resolveIcon(icon);
          return (
            <div key={id} className="card-hover bg-slate-50 rounded-xl p-5">
              <div className="icon-box mb-3">
                <Icon size={22} />
              </div>
              <h3 className="font-semibold text-slate-900 mb-1">
                {language === 'en' ? titleEn : titleId}
              </h3>
              <p className="text-sm text-slate-500">{language === 'en' ? descEn : descId}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
