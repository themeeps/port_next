'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, LayoutDashboard, FolderKanban, Layers, User, LogOut } from 'lucide-react';
import { logoutAction } from './logout-action';

const navItems = [
  { label: 'Overview', href: '/admin', icon: LayoutDashboard },
  { label: 'Projects', href: '/admin/projects', icon: FolderKanban },
  { label: 'Skills', href: '/admin/skills', icon: Layers },
  { label: 'About', href: '/admin/about', icon: User },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="lg:hidden fixed top-4 left-4 z-[1060] bg-slate-900 text-white p-2 rounded-lg"
        onClick={() => setIsOpen(true)}
        aria-label="Open menu"
      >
        <Menu size={20} />
      </button>

      {isOpen && <div className="sidebar-overlay" onClick={() => setIsOpen(false)} />}

      <aside className={`dashboard-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="p-6">
          <span className="text-gradient text-xl font-bold">Part of Me</span>
          <p className="text-slate-500 text-xs mt-1">Admin</p>
        </div>

        <nav className="flex-1 px-3 space-y-1">
          {navItems.map(({ label, href, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setIsOpen(false)}
                className={`sidebar-nav-item flex items-center gap-3 px-3 py-2.5 rounded-lg ${isActive ? 'active' : ''}`}
              >
                <Icon size={18} />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="p-3">
          <form action={logoutAction}>
            <button
              type="submit"
              className="sidebar-nav-item w-full flex items-center gap-3 px-3 py-2.5 rounded-lg"
            >
              <LogOut size={18} />
              Log out
            </button>
          </form>
        </div>
      </aside>
    </>
  );
}
