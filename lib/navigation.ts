import {
  Zap,
  FileText,
  Code2,
  GitBranch,
  GitCompare,
  LayoutDashboard,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  description: string;
  badge?: string;
  color: string;
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

export const navGroups: NavGroup[] = [
  {
    label: "Overview",
    items: [
      {
        label: "Dashboard",
        href: "/",
        icon: LayoutDashboard,
        description: "All tools at a glance",
        color: "#5b8ef0",
      },
    ],
  },
  {
    label: "Tools",
    items: [
      {
        label: "Explain Error",
        href: "/tools/explain-error",
        icon: Zap,
        description: "Decode any error message instantly",
        badge: "AI",
        color: "#f05b8e",
      },
      {
        label: "README Beautifier",
        href: "/tools/readme-beautifier",
        icon: FileText,
        description: "Preview markdown in real time",
        color: "#5bf0a0",
      },
      {
        label: "Formatter",
        href: "/tools/formatter",
        icon: Code2,
        description: "Format JSON, CSV, and XML",
        color: "#f0c45b",
      },
      {
        label: "Gitignore Generator",
        href: "/tools/gitignore-generator",
        icon: GitBranch,
        description: "Generate .gitignore for any stack",
        color: "#a78bfa",
      },
      {
        label: "Diff Viewer",
        href: "/tools/diff-viewer",
        icon: GitCompare,
        description: "Visualize text differences",
        color: "#5bc4f0",
      },
    ],
  },
];

export const allTools = navGroups.flatMap((g) => g.items).filter((i) => i.href !== "/");
