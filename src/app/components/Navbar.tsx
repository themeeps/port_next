'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: t.navbar.home, href: '#home' },
    { name: t.navbar.about, href: '#about' },
    { name: t.navbar.skills, href: '#skills' },
    { name: t.navbar.projects, href: '#projects' },
    { name: t.navbar.contact, href: '#contact' }
  ];

  return (
    <nav
      className={`navbar-custom fixed top-0 inset-x-0 z-50 ${isScrolled ? 'navbar-scrolled' : ''}`}
    >
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        <a className="text-gradient text-2xl font-bold" href="#home">
          Part of Me
        </a>

        <button
          className="lg:hidden text-white p-2"
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((open) => !open)}
        >
          <span className="block w-6 h-0.5 bg-white mb-1.5" />
          <span className="block w-6 h-0.5 bg-white mb-1.5" />
          <span className="block w-6 h-0.5 bg-white" />
        </button>

        <ul className="hidden lg:flex items-center gap-2">
          {navItems.map((item) => (
            <li key={item.href}>
              <a className="px-3 py-2 font-semibold text-white/90 hover:text-white transition-colors" href={item.href}>
                {item.name}
              </a>
            </li>
          ))}
          <li className="ml-2">
            <button
              type="button"
              onClick={toggleLanguage}
              className="border border-white/30 text-white/90 hover:bg-white/10 hover:text-white text-sm font-semibold px-3 py-1.5 rounded-full transition-colors"
              aria-label="Toggle language"
            >
              {language === 'en' ? 'EN' : 'ID'}
            </button>
          </li>
          <li className="ml-2">
            <Link href="/login" className="btn-gradient text-white text-sm px-4 py-2 font-semibold rounded-full">
              {t.navbar.dashboard}
            </Link>
          </li>
        </ul>
      </div>

      {isOpen && (
        <ul className="lg:hidden flex flex-col bg-slate-900/95 backdrop-blur-md px-4 pb-4">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                className="block px-3 py-2 font-semibold text-white/90 hover:text-white transition-colors"
                href={item.href}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </a>
            </li>
          ))}
          <li className="mt-2">
            <button
              type="button"
              onClick={toggleLanguage}
              className="border border-white/30 text-white/90 hover:bg-white/10 hover:text-white text-sm font-semibold px-3 py-1.5 rounded-full transition-colors"
              aria-label="Toggle language"
            >
              {language === 'en' ? 'EN' : 'ID'}
            </button>
          </li>
          <li className="mt-2">
            <Link
              href="/login"
              className="btn-gradient inline-block text-white text-sm px-4 py-2 font-semibold rounded-full"
              onClick={() => setIsOpen(false)}
            >
              {t.navbar.dashboard}
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
}
