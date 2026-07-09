import { Computer, ExternalLink, Mail } from 'lucide-react';

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-400 pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid sm:grid-cols-3 gap-10 mb-12">
          <div>
            <a href="#home" className="text-gradient text-2xl font-bold">
              Part of Me
            </a>
            <p className="mt-3 text-sm leading-relaxed">
              Full Stack Developer who loves building web applications from end to end.
            </p>
          </div>

          <div>
            <p className="text-white font-semibold mb-3">Quick Links</p>
            <ul className="space-y-2 text-sm">
              {navItems.map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="hover:text-white transition-colors">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-white font-semibold mb-3">Let&apos;s Connect</p>
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
          <p>&copy; {year} Sayyid Ali Akbar H. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
