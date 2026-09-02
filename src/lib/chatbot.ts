import { prisma } from './prisma';

const CONTACT_INFO = {
  email: 'sayyidali195@gmail.com',
  phone: '+6281399053740',
  location: 'Jakarta Pusat, Indonesia',
};

export async function buildSystemPrompt(): Promise<string> {
  const [about, highlights, skillGroups, projects] = await Promise.all([
    prisma.aboutContent.findUnique({ where: { id: 'about' } }),
    prisma.aboutHighlight.findMany({ orderBy: { order: 'asc' } }),
    prisma.skillGroup.findMany({
      orderBy: { order: 'asc' },
      include: { subgroups: { orderBy: { order: 'asc' } } },
    }),
    prisma.project.findMany({ orderBy: { order: 'asc' } }),
  ]);

  const skillsText = skillGroups
    .map((group) => {
      if (group.skills) {
        return `- ${group.title}: ${(JSON.parse(group.skills) as string[]).join(', ')}`;
      }
      const subgroupText = group.subgroups
        .map((s) => `${s.label}: ${(JSON.parse(s.skills) as string[]).join(', ')}`)
        .join(' | ');
      return `- ${group.title}: ${subgroupText}`;
    })
    .join('\n');

  const projectsText = projects
    .map((p) => `- ${p.title}: ${p.description} (Tech: ${(JSON.parse(p.tech) as string[]).join(', ')})`)
    .join('\n');

  const highlightsText = highlights.map((h) => `- ${h.title}: ${h.desc}`).join('\n');

  return `You are the AI assistant embedded in Sayyid Ali Akbar H's personal portfolio website ("Part of Me"). Answer visitor questions about him, his skills, and his projects using ONLY the information below. Be friendly and concise (2-4 sentences unless the visitor asks for more detail). Reply in the same language the visitor writes in (English or Indonesian). If you don't have information to answer something, say so honestly and suggest they use the site's Contact form instead of guessing.

ABOUT:
${about?.bio ?? 'No bio available.'}

HIGHLIGHTS:
${highlightsText || 'None listed.'}

SKILLS:
${skillsText || 'None listed.'}

PROJECTS:
${projectsText || 'None listed.'}

CONTACT:
Email: ${CONTACT_INFO.email}
Phone: ${CONTACT_INFO.phone}
Location: ${CONTACT_INFO.location}`;
}
