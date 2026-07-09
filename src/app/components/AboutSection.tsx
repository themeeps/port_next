import { prisma } from '@/lib/prisma';
import { resolveIcon } from '@/lib/icons';

export default async function AboutSection() {
  const [content, highlights] = await Promise.all([
    prisma.aboutContent.findUnique({ where: { id: 'about' } }),
    prisma.aboutHighlight.findMany({ orderBy: { order: 'asc' } }),
  ]);

  return (
    <section id="about" className="py-32 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900">
            About <span className="text-gradient">Me</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="mx-auto w-full max-w-sm rounded-2xl bg-gradient-primary p-1">
            <img
              src="/images/profile_ali.png"
              alt="Sayyid Ali Akbar H"
              className="w-full h-full rounded-2xl object-cover"
            />
          </div>

          <div>
            <p className="text-slate-600 leading-relaxed mb-4">{content?.bio}</p>

            <div className="grid sm:grid-cols-3 gap-4">
              {highlights.map(({ id, icon, title, desc }) => {
                const Icon = resolveIcon(icon);
                return (
                  <div key={id} className="card-hover bg-slate-50 rounded-xl p-5">
                    <div className="icon-box mb-3">
                      <Icon size={22} />
                    </div>
                    <h3 className="font-semibold text-slate-900 mb-1">{title}</h3>
                    <p className="text-sm text-slate-500">{desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
