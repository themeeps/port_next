'use client'

import { useState, type SubmitEvent } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';

const contactInfo = [
  { icon: Mail, label: 'Email', value: 'sayyidali195@gmail.com' },
  { icon: Phone, label: 'Phone', value: '+6281399053740' },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Cempaka Baru IX No,03 RT003/RW007, Kel. Cempaka Baru, Kec. Kemayoran, Jakarta Pusat, Kodepos : 10640',
  },
];

type Status = 'idle' | 'sending' | 'success' | 'error';

export default function ContactSection() {
  const { ref, isVisible } = useReveal<HTMLDivElement>();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<Status>('idle');

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
            Get <span className="text-gradient">In Touch</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-primary rounded-full mx-auto mt-4" />
        </div>

        <div
          ref={ref}
          className={`reveal ${isVisible ? 'is-visible' : ''} grid md:grid-cols-2 gap-12`}
        >
          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Let&apos;s Work Together</h3>
            <p className="text-slate-500 leading-relaxed mb-8">
              I&apos;m always interested in hearing about new projects and opportunities.
              Whether you have a question or just want to say hi, feel free to reach out!
            </p>

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
                Name
              </label>
              <input
                id="contact-name"
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                placeholder="Your name"
                className="form-control w-full rounded-lg border border-slate-200 px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none"
              />
            </div>

            <div>
              <label htmlFor="contact-email" className="block font-semibold text-slate-900 mb-2">
                Email
              </label>
              <input
                id="contact-email"
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                placeholder="your.email@example.com"
                className="form-control w-full rounded-lg border border-slate-200 px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none"
              />
            </div>

            <div>
              <label htmlFor="contact-message" className="block font-semibold text-slate-900 mb-2">
                Message
              </label>
              <textarea
                id="contact-message"
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                placeholder="Your message..."
                className="form-control w-full rounded-lg border border-slate-200 px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={status === 'sending'}
              className="btn-gradient w-full text-white font-semibold px-6 py-3 rounded-lg disabled:opacity-60"
            >
              {status === 'sending' ? 'Sending...' : 'Send Message'}
            </button>

            {status === 'success' && (
              <p className="text-sm text-green-600 font-medium">
                Thanks! Your message has been sent — I&apos;ll get back to you soon.
              </p>
            )}
            {status === 'error' && (
              <p className="text-sm text-red-600 font-medium">
                Something went wrong. Please try again or email me directly.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
