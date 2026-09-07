import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import SectionHeading from './SectionHeading';
import AboutContent from './AboutContent';

export default async function AboutSection() {
  const [content, highlights] = await Promise.all([
    prisma.aboutContent.findUnique({ where: { id: 'about' } }),
    prisma.aboutHighlight.findMany({ orderBy: { order: 'asc' } }),
  ]);

  return (
    <section id="about" className="py-32 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <SectionHeading section="about" />
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="mx-auto w-full max-w-sm rounded-2xl bg-gradient-primary p-1">
            <Image
              src="/images/profile_ali.jpg"
              alt="Sayyid Ali Akbar H"
              width={628}
              height={583}
              className="w-full h-auto rounded-2xl object-cover"
            />
          </div>

          <AboutContent bioEn={content?.bioEn ?? ''} bioId={content?.bioId ?? ''} highlights={highlights} />
        </div>
      </div>
    </section>
  );
}
