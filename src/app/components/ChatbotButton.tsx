'use client';

import { useEffect, useRef, useState, type SubmitEvent } from 'react';
import { MessageCircle, Send, X } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { useLanguage } from '../context/LanguageContext';

type ChatMessage = {
  id: string;
  role: 'user' | 'bot';
  text: string;
};

export default function ChatbotButton() {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{ id: 'welcome', role: 'bot', text: t.chatbot.welcomeMessage }]);
    }
  }, [isOpen, messages.length, t.chatbot.welcomeMessage]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;

    const userMessage: ChatMessage = { id: crypto.randomUUID(), role: 'user', text };
    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput('');
    setIsTyping(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: nextMessages
            .filter((m) => m.id !== 'welcome')
            .map((m) => ({ role: m.role, text: m.text })),
        }),
      });

      if (!res.ok) throw new Error('Request failed');
      const data = await res.json();
      setMessages((prev) => [...prev, { id: crypto.randomUUID(), role: 'bot', text: data.reply }]);
    } catch {
      setMessages((prev) => [...prev, { id: crypto.randomUUID(), role: 'bot', text: t.chatbot.error }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-3rem)] h-[500px] max-h-[70vh] bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.25)] flex flex-col overflow-hidden">
          <div className="bg-gradient-primary px-5 py-4 flex items-center justify-between shrink-0">
            <div>
              <p className="text-white font-semibold">{t.chatbot.title}</p>
              <p className="text-white/70 text-xs">{t.chatbot.subtitle}</p>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label={t.chatbot.closeLabel}
              className="text-white/80 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-slate-50">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-gradient-primary text-white rounded-br-sm'
                      : 'bg-white text-slate-700 border border-slate-100 rounded-bl-sm prose-chat'
                  }`}
                >
                  {msg.role === 'bot' ? <ReactMarkdown>{msg.text}</ReactMarkdown> : msg.text}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-slate-100 rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-soft-bounce" />
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-soft-bounce"
                    style={{ animationDelay: '0.15s' }}
                  />
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-soft-bounce"
                    style={{ animationDelay: '0.3s' }}
                  />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSend} className="border-t border-slate-100 p-3 flex items-center gap-2 shrink-0">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t.chatbot.placeholder}
              className="form-control flex-1 rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-900 placeholder:text-slate-400 outline-none"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              aria-label={t.chatbot.send}
              className="btn-gradient w-9 h-9 rounded-full text-white flex items-center justify-center shrink-0 disabled:opacity-40"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-label={isOpen ? t.chatbot.closeLabel : t.chatbot.openLabel}
        className="btn-gradient fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full text-white flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
      >
        {isOpen ? <X size={26} /> : <MessageCircle size={26} />}
      </button>
    </>
  );
}
