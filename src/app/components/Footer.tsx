'use client';

import { Computer, ExternalLink, Mail } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const year = new Date().getFullYear();
  const { t } = useLanguage();

  const navItems = [
    { name: t.navbar.home, href: '#home' },
    { name: t.navbar.about, href: '#about' },
    { name: t.navbar.skills, href: '#skills' },
    { name: t.navbar.projects, href: '#projects' },
    { name: t.navbar.contact, href: '#contact' },
  ];

  return (
    <footer className="bg-slate-900 text-slate-400 pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid sm:grid-cols-3 gap-10 mb-12">
          <div>
            <a href="#home" className="text-gradient text-2xl font-bold">
              Part of Me
            </a>
            <p className="mt-3 text-sm leading-relaxed">{t.footer.tagline}</p>
          </div>

          <div>
            <p className="text-white font-semibold mb-3">{t.footer.quickLinks}</p>
            <ul className="space-y-2 text-sm">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="hover:text-white transition-colors">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-white font-semibold mb-3">{t.footer.connect}</p>
            <div className="flex gap-4">
              <a
                href="https://github.com/themeeps"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon no-underline"
              >
                <Computer size={22} />
              </a>
              <a
                href="https://www.linkedin.com/in/sayyid-ali-a5722b201"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon no-underline"
              >
                <ExternalLink size={22} />
              </a>
              <a href="mailto:sayyidali195@gmail.com" className="social-icon no-underline">
                <Mail size={22} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 text-center text-sm">
          <p>&copy; {year} Sayyid Ali Akbar H. {t.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
}
