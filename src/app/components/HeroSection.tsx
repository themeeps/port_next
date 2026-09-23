'use client'

import { useEffect, useRef, useState } from 'react';
import { Computer, ExternalLink, Mail, ArrowDown, LayoutDashboard, Download } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';

const TOTAL_STEPS = 6; // avatar, heading, tagline, description, buttons, socials

// Same duration/easing the old framer-motion `itemVariants` used — replicated
// in pure CSS (transition + translate) so this component doesn't need to
// ship the framer-motion runtime (~144KB) just for the Hero reveal.
const REVEAL_BASE = 'transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]';

export default function HeroSection() {
  const [step, setStep] = useState(0);
  const unlockedRef = useRef(false);
  const { t } = useLanguage();

  useEffect(() => {
    const advance = (direction: 1 | -1) => {
      setStep((current) => {
        const next = Math.min(Math.max(current + direction, 0), TOTAL_STEPS);
        unlockedRef.current = next === TOTAL_STEPS;
        return next;
      });
    };

    const handleWheel = (e: WheelEvent) => {
      if (unlockedRef.current) return;
      e.preventDefault();
      advance(e.deltaY > 0 ? 1 : -1);
    };

    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (unlockedRef.current) return;
      e.preventDefault();

      const deltaY = touchStartY - e.touches[0].clientY;
      if (Math.abs(deltaY) < 30) return;
      touchStartY = e.touches[0].clientY;
      advance(deltaY > 0 ? 1 : -1);
    };

    const handleScroll = () => {
      if (unlockedRef.current && window.scrollY <= 0) {
        unlockedRef.current = false;
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Per-element cascade reveal for the "content" screen (avatar, heading,
  // tagline, description, buttons, socials) — each one fades/slides in once
  // `step` passes its index.
  const revealClass = (index: number) =>
    `${REVEAL_BASE} ${step > index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`;

  return (
    <section
      id="home"
      className="hero-section min-h-screen flex items-center justify-center"
    >
      {/* Greeting screen (step 0) */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
          step === 0 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-6 pointer-events-none'
        }`}
        aria-hidden={step !== 0}
      >
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white animate-fade-in">
            {t.hero.greetingPre} <span className="text-gradient">{t.hero.greetingHighlight}</span>
          </h1>
          <p
            className="text-slate-400 mt-6 text-sm tracking-wide animate-fade-in"
            style={{ animationDelay: '0.3s', animationFillMode: 'backwards' }}
          >
            {t.hero.scrollDown}
          </p>
        </div>
      </div>

      {/* Content screen (step 1-6) */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
          step > 0 ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={step === 0}
      >
        <div className="max-w-6xl mx-auto px-4 pt-24 md:pt-0 pb-24 md:pb-0 relative z-10 w-full">
          <div className="max-w-4xl mx-auto text-center">
            <div className={`mb-6 ${revealClass(0)}`}>
              <div className="inline-block p-1 rounded-full bg-gradient-primary">
                <div className="bg-slate-900 rounded-full flex items-center justify-center text-gradient font-bold w-41.25 h-52.25 text-5xl">
                  <Image
                    src="/images/formal_photo.jpeg"
                    className="rounded-full"
                    alt="John Programmer"
                    width={165}
                    height={165}
                    style={{ height: '100%' }}
                  />
                </div>
              </div>
            </div>

            <h1 className={`text-5xl md:text-6xl font-bold text-white mb-4 ${revealClass(1)}`}>
              {t.hero.introPre} <span className="text-gradient">Sayyid Ali Akbar H</span>
            </h1>

            <p className={`text-2xl text-white/50 mb-6 ${revealClass(2)}`}>{t.hero.tagline}</p>

            <p className={`text-xl text-slate-400 mb-12 mx-auto max-w-150 ${revealClass(3)}`}>
              {t.hero.description}
            </p>

            <div className={`flex gap-4 justify-center mb-12 flex-wrap ${revealClass(4)}`}>
              <a href="#contact" className="btn-gradient w-56 flex items-center justify-center py-4 font-semibold rounded-full text-white">
                {t.hero.ctaContact}
              </a>
              <a
                href="/CV_Sayyid_Ali.pdf"
                download
                target="_blank"
                rel="noopener noreferrer"
                className="w-56 flex items-center justify-center gap-2 py-4 font-semibold rounded-full bg-white text-slate-900 hover:bg-slate-100 transition-colors"
              >
                <Download size={18} />
                {t.hero.ctaCv}
              </a>
              <a href="#projects" className="w-56 flex items-center justify-center py-4 font-semibold rounded-full border-2 border-sky-500 text-sky-500 hover:bg-sky-500 hover:text-white transition-colors">
                {t.hero.ctaWork}
              </a>
              <Link href="/login" className="w-56 flex items-center justify-center gap-2 py-4 font-semibold rounded-full border-2 border-white/30 text-white hover:bg-white/10 transition-colors">
                <LayoutDashboard size={18} />
                {t.hero.ctaAdmin}
              </Link>
            </div>

            <div className={`flex gap-6 justify-center ${revealClass(5)}`}>
              <a href="https://github.com/themeeps" target="_blank" rel="noopener noreferrer" className="social-icon no-underline">
                <Computer size={28} />
              </a>
              <a href="https://www.linkedin.com/in/sayyid-ali-a5722b201" target="_blank" rel="noopener noreferrer" className="social-icon no-underline">
                <ExternalLink size={28} />
              </a>
              <a href="mailto:sayyidali195@gmail.com" className="social-icon no-underline">
                <Mail size={28} />
              </a>
            </div>
          </div>
        </div>
      </div>

      <a
        href="#about"
        className={`absolute bottom-0 left-1/2 -translate-x-1/2 mb-6 social-icon no-underline bounce-animation transition-opacity duration-400 ${
          step === TOTAL_STEPS ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <ArrowDown size={32} />
      </a>
    </section>
  );
}
