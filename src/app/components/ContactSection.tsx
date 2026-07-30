'use client'

import { useState, type SubmitEvent } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';
import { useLanguage } from '../context/LanguageContext';

type Status = 'idle' | 'sending' | 'success' | 'error';

export default function ContactSection() {
  const { ref, isVisible } = useReveal<HTMLDivElement>();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<Status>('idle');
  const { t } = useLanguage();

  const contactInfo = [
    { icon: Mail, label: t.contact.emailLabel, value: 'sayyidali195@gmail.com' },
    { icon: Phone, label: t.contact.phoneLabel, value: '+6281399053740' },
    {
      icon: MapPin,
      label: t.contact.locationLabel,
      value: 'Cempaka Baru IX No,03 RT003/RW007, Kel. Cempaka Baru, Kec. Kemayoran, Jakarta Pusat, Kodepos : 10640',
    },
  ];

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error('Request failed');

      setStatus('success');
      setForm({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900">
            {t.contact.headingPre && `${t.contact.headingPre} `}
            <span className="text-gradient">{t.contact.headingHighlight}</span>
            {t.contact.headingAfter && ` ${t.contact.headingAfter}`}
          </h2>
          <div className="w-16 h-1 bg-gradient-primary rounded-full mx-auto mt-4" />
        </div>

        <div
          ref={ref}
          className={`reveal ${isVisible ? 'is-visible' : ''} grid md:grid-cols-2 gap-12`}
        >
          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">{t.contact.subheading}</h3>
            <p className="text-slate-500 leading-relaxed mb-8">{t.contact.description}</p>

            <div className="space-y-6">
              {contactInfo.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="icon-box shrink-0">
                    <Icon size={22} />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">{label}</p>
                    <p className="text-slate-500">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="contact-name" className="block font-semibold text-slate-900 mb-2">
                {t.contact.formName}
              </label>
              <input
                id="contact-name"
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                placeholder={t.contact.formNamePlaceholder}
                className="form-control w-full rounded-lg border border-slate-200 px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none"
              />
            </div>

            <div>
              <label htmlFor="contact-email" className="block font-semibold text-slate-900 mb-2">
                {t.contact.formEmail}
              </label>
              <input
                id="contact-email"
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                placeholder={t.contact.formEmailPlaceholder}
                className="form-control w-full rounded-lg border border-slate-200 px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none"
              />
            </div>

            <div>
              <label htmlFor="contact-message" className="block font-semibold text-slate-900 mb-2">
                {t.contact.formMessage}
              </label>
              <textarea
                id="contact-message"
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                placeholder={t.contact.formMessagePlaceholder}
                className="form-control w-full rounded-lg border border-slate-200 px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={status === 'sending'}
              className="btn-gradient w-full text-white font-semibold px-6 py-3 rounded-lg disabled:opacity-60"
            >
              {status === 'sending' ? t.contact.sending : t.contact.send}
            </button>

            {status === 'success' && (
              <p className="text-sm text-green-600 font-medium">{t.contact.success}</p>
            )}
            {status === 'error' && (
              <p className="text-sm text-red-600 font-medium">{t.contact.error}</p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
