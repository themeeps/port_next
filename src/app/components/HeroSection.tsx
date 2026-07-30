'use client'

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, type Variants } from 'framer-motion';
import { Computer, ExternalLink, Mail, ArrowDown, LayoutDashboard } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';

const TOTAL_STEPS = 6; // avatar, heading, tagline, description, buttons, socials

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] as const },
  },
};

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

  const visible = (index: number) => (step > index ? 'visible' : 'hidden');

  return (
    <section
      id="home"
      className="hero-section min-h-screen flex items-center justify-center"
    >
      <AnimatePresence mode="wait">
        {step === 0 ? (
          <motion.div
            key="greeting"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.5 }}
            className="text-center px-4"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white">
              {t.hero.greetingPre} <span className="text-gradient">{t.hero.greetingHighlight}</span>
            </h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="text-slate-400 mt-6 text-sm tracking-wide"
            >
              {t.hero.scrollDown}
            </motion.p>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-6xl mx-auto px-4 pt-24 md:pt-0 pb-24 md:pb-0 relative z-10 w-full"
          >
            <div className="max-w-4xl mx-auto text-center">
              <motion.div initial="hidden" animate={visible(0)} variants={itemVariants} className="mb-6">
                <div className="inline-block p-1 rounded-full bg-gradient-primary">
                  <div className="bg-slate-900 rounded-full flex items-center justify-center text-gradient font-bold w-41.25 h-52.25 text-5xl">
                    <img
                      src="/images/formal_photo.jpeg"
                      className="rounded-full"
                      alt="John Programmer"
                      width="165"
                      height="165"
                      style={{ height: '100%' }}
                    />
                  </div>
                </div>
              </motion.div>

              <motion.h1
                initial="hidden"
                animate={visible(1)}
                variants={itemVariants}
                className="text-5xl md:text-6xl font-bold text-white mb-4"
              >
                {t.hero.introPre} <span className="text-gradient">Sayyid Ali Akbar H</span>
              </motion.h1>

              <motion.p initial="hidden" animate={visible(2)} variants={itemVariants} className="text-2xl text-white/50 mb-6">
                {t.hero.tagline}
              </motion.p>

              <motion.p
                initial="hidden"
                animate={visible(3)}
                variants={itemVariants}
                className="text-xl text-slate-400 mb-12 mx-auto max-w-150"
              >
                {t.hero.description}
              </motion.p>

              <motion.div
                initial="hidden"
                animate={visible(4)}
                variants={itemVariants}
                className="flex gap-4 justify-center mb-12 flex-wrap"
              >
                <a href="#contact" className="btn-gradient inline-block text-white px-12 py-4 font-semibold rounded-full">
                  {t.hero.ctaContact}
                </a>
                <a href="#projects" className="border-2 border-sky-500 text-sky-500 hover:bg-sky-500 hover:text-white px-12 py-4 font-semibold rounded-full transition-colors">
                  {t.hero.ctaWork}
                </a>
                <Link href="/login" className="border-2 border-white/30 text-white hover:bg-white/10 px-12 py-4 font-semibold rounded-full flex items-center gap-2 transition-colors">
                  <LayoutDashboard size={18} />
                  {t.hero.ctaAdmin}
                </Link>
              </motion.div>

              <motion.div initial="hidden" animate={visible(5)} variants={itemVariants} className="flex gap-6 justify-center">
                <a href="https://github.com/themeeps" target="_blank" rel="noopener noreferrer" className="social-icon no-underline">
                  <Computer size={28} />
                </a>
                <a href="https://www.linkedin.com/in/sayyid-ali-a5722b201" target="_blank" rel="noopener noreferrer" className="social-icon no-underline">
                  <ExternalLink size={28} />
                </a>
                <a href="mailto:sayyidali195@gmail.com" className="social-icon no-underline">
                  <Mail size={28} />
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: step === TOTAL_STEPS ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 mb-6 social-icon no-underline bounce-animation"
      >
        <ArrowDown size={32} />
      </motion.a>
    </section>
  );
}
