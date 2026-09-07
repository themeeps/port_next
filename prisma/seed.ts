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
      bioEn:
        'Full-Stack Developer with 3+ years of experience building high-quality web and mobile applications. Skilled in designing scalable systems, optimizing performance, and delivering seamless user experiences. Known for turning complex ideas into efficient, reliable solutions while driving innovation and technical excellence.',
      bioId:
        'Full-Stack Developer dengan pengalaman 3+ tahun membangun aplikasi web dan mobile berkualitas tinggi. Terampil merancang sistem yang skalabel, mengoptimalkan performa, dan menghadirkan pengalaman pengguna yang mulus. Dikenal mampu mengubah ide kompleks menjadi solusi yang efisien dan andal.',
    },
  });

  await prisma.aboutHighlight.createMany({
    data: [
      {
        icon: 'Code2',
        titleEn: 'Clean Code',
        titleId: 'Kode Rapi',
        descEn: 'Write code that is neat, structured, and easy to develop.',
        descId: 'Menulis kode yang rapi, terstruktur, dan mudah dikembangkan.',
        order: 0,
      },
      {
        icon: 'Rocket',
        titleEn: 'Fast Delivery',
        titleId: 'Pengerjaan Cepat',
        descEn: 'Focus on delivering results quickly without compromising quality.',
        descId: 'Fokus menghasilkan pekerjaan dengan cepat tanpa mengorbankan kualitas.',
        order: 1,
      },
      {
        icon: 'Users',
        titleEn: 'Team Player',
        titleId: 'Kerja Tim',
        descEn: 'Experienced in collaborating with cross-functional teams.',
        descId: 'Berpengalaman berkolaborasi dengan tim lintas fungsi.',
        order: 2,
      },
    ],
  });

  const frontend = await prisma.skillGroup.create({
    data: { titleEn: 'Frontend', titleId: 'Frontend', icon: 'Layout', order: 0 },
  });
  await prisma.skillSubgroup.createMany({
    data: [
      { skillGroupId: frontend.id, labelEn: 'Language', labelId: 'Bahasa', skills: JSON.stringify(['JavaScript', 'TypeScript', 'HTML5 & CSS3']), order: 0 },
      { skillGroupId: frontend.id, labelEn: 'Framework', labelId: 'Framework', skills: JSON.stringify(['React', 'Next.js', 'Vue.js', 'Nuxt.js', 'Bootstrap', 'Tailwind CSS']), order: 1 },
    ],
  });

  const backend = await prisma.skillGroup.create({
    data: { titleEn: 'Backend', titleId: 'Backend', icon: 'Server', order: 1 },
  });
  await prisma.skillSubgroup.createMany({
    data: [
      { skillGroupId: backend.id, labelEn: 'Language', labelId: 'Bahasa', skills: JSON.stringify(['JavaScript', 'PHP', 'Java']), order: 0 },
      { skillGroupId: backend.id, labelEn: 'Framework', labelId: 'Framework', skills: JSON.stringify(['Node.js', 'Express', 'Laravel', 'CodeIgniter']), order: 1 },
    ],
  });

  await prisma.skillGroup.create({
    data: {
      titleEn: 'Database',
      titleId: 'Database',
      icon: 'Database',
      order: 2,
      skills: JSON.stringify(['MySQL', 'PostgreSQL', 'SQLite', 'Oracle']),
    },
  });

  await prisma.project.createMany({
    data: [
      {
        titleEn: 'E-Commerce Platform',
        titleId: 'Platform E-Commerce',
        descriptionEn:
          'A full-stack online store with a shopping cart, checkout, and an admin panel for managing products & orders.',
        descriptionId:
          'Toko online full-stack lengkap dengan keranjang belanja, checkout, dan panel admin untuk mengelola produk & pesanan.',
        icon: 'ShoppingCart',
        tech: JSON.stringify(['Next.js', 'TypeScript', 'Tailwind CSS', 'PostgreSQL']),
        githubUrl: 'https://github.com/themeeps',
        liveUrl: '#',
        order: 0,
      },
      {
        titleEn: 'Finance Dashboard',
        titleId: 'Dashboard Keuangan',
        descriptionEn:
          'A personal finance tracker with income/expense charts, transaction categories, and monthly summaries.',
        descriptionId:
          'Pelacak keuangan pribadi dengan grafik pemasukan/pengeluaran, kategori transaksi, dan ringkasan bulanan.',
        icon: 'LayoutDashboard',
        tech: JSON.stringify(['React', 'Node.js', 'Express', 'MongoDB']),
        githubUrl: 'https://github.com/themeeps',
        liveUrl: '/login',
        order: 1,
      },
      {
        titleEn: 'Task Management App',
        titleId: 'Aplikasi Manajemen Tugas',
        descriptionEn:
          'A Kanban-style task management app for team collaboration, complete with drag-and-drop and real-time notifications.',
        descriptionId:
          'Aplikasi manajemen tugas bergaya Kanban untuk kolaborasi tim, lengkap dengan drag-and-drop dan notifikasi real-time.',
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
