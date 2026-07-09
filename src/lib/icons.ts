import {
  Code2,
  Rocket,
  Users,
  Layout,
  Server,
  Database,
  ExternalLink,
  ShoppingCart,
  LayoutDashboard,
  ListChecks,
  Sparkles,
  Briefcase,
  Award,
  Star,
  Zap,
  Globe,
  Palette,
  type LucideIcon,
} from 'lucide-react';

export const ICON_MAP: Record<string, LucideIcon> = {
  Code2,
  Rocket,
  Users,
  Layout,
  Server,
  Database,
  ExternalLink,
  ShoppingCart,
  LayoutDashboard,
  ListChecks,
  Sparkles,
  Briefcase,
  Award,
  Star,
  Zap,
  Globe,
  Palette,
};

export const ICON_NAMES = Object.keys(ICON_MAP);

export function resolveIcon(name: string): LucideIcon {
  return ICON_MAP[name] ?? Code2;
}
