import { config } from 'dotenv';
import { hash } from 'bcryptjs';
import { PrismaClient } from '../src/generated/prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';

config();
config({ path: '.env.local', override: true });

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminEmail || !adminPassword) {
    throw new Error('ADMIN_EMAIL and ADMIN_PASSWORD must be set (see .env.local)');
  }

  await prisma.adminUser.upsert({
    where: { email: adminEmail },
    update: {},
    create: { email: adminEmail, password: await hash(adminPassword, 10) },
  });

  await prisma.aboutContent.upsert({
    where: { id: 'about' },
    update: {},
    create: {
      id: 'about',
      bio: 'Full-Stack Developer with 3+ years of experience building high-quality web and mobile applications. Skilled in designing scalable systems, optimizing performance, and delivering seamless user experiences. Known for turning complex ideas into efficient, reliable solutions while driving innovation and technical excellence.',
    },
  });

  await prisma.aboutHighlight.createMany({
    data: [
      { icon: 'Code2', title: 'Clean Code', desc: 'Write code that is neat, structured, and easy to develop.', order: 0 },
      { icon: 'Rocket', title: 'Fast Delivery', desc: 'Focus on delivering results quickly without compromising quality.', order: 1 },
      { icon: 'Users', title: 'Team Player', desc: 'Experienced in collaborating with cross-functional teams.', order: 2 },
    ],
  });

  const frontend = await prisma.skillGroup.create({
    data: { title: 'Frontend', icon: 'Layout', order: 0 },
  });
  await prisma.skillSubgroup.createMany({
    data: [
      { skillGroupId: frontend.id, label: 'Language', skills: JSON.stringify(['JavaScript', 'TypeScript', 'HTML5 & CSS3']), order: 0 },
      { skillGroupId: frontend.id, label: 'Framework', skills: JSON.stringify(['React', 'Next.js', 'Vue.js', 'Nuxt.js', 'Bootstrap', 'Tailwind CSS']), order: 1 },
    ],
  });

  const backend = await prisma.skillGroup.create({
    data: { title: 'Backend', icon: 'Server', order: 1 },
  });
  await prisma.skillSubgroup.createMany({
    data: [
      { skillGroupId: backend.id, label: 'Language', skills: JSON.stringify(['JavaScript', 'PHP', 'Java']), order: 0 },
      { skillGroupId: backend.id, label: 'Framework', skills: JSON.stringify(['Node.js', 'Express', 'Laravel', 'CodeIgniter']), order: 1 },
    ],
  });

  await prisma.skillGroup.create({
    data: {
      title: 'Database',
      icon: 'Database',
      order: 2,
      skills: JSON.stringify(['MySQL', 'PostgreSQL', 'SQLite', 'Oracle']),
    },
  });

  await prisma.project.createMany({
    data: [
      {
        title: 'E-Commerce Platform',
        description:
          'A full-stack online store with a shopping cart, checkout, and an admin panel for managing products & orders.',
        icon: 'ShoppingCart',
        tech: JSON.stringify(['Next.js', 'TypeScript', 'Tailwind CSS', 'PostgreSQL']),
        githubUrl: 'https://github.com/themeeps',
        liveUrl: '#',
        order: 0,
      },
      {
        title: 'Finance Dashboard',
        description:
          'A personal finance tracker with income/expense charts, transaction categories, and monthly summaries.',
        icon: 'LayoutDashboard',
        tech: JSON.stringify(['React', 'Node.js', 'Express', 'MongoDB']),
        githubUrl: 'https://github.com/themeeps',
        liveUrl: '/login',
        order: 1,
      },
      {
        title: 'Task Management App',
        description:
          'A Kanban-style task management app for team collaboration, complete with drag-and-drop and real-time notifications.',
        icon: 'ListChecks',
        tech: JSON.stringify(['Next.js', 'Laravel', 'MySQL']),
        githubUrl: 'https://github.com/themeeps',
        liveUrl: '#',
        order: 2,
      },
    ],
  });

  console.log('Seed complete.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
