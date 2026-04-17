"use client";

import { usePathname } from "next/navigation";
import { Menu, Command, Github, ExternalLink } from "lucide-react";
import { navGroups } from "@/lib/navigation";

interface TopbarProps {
  onMenuClick: () => void;
}

export function Topbar({ onMenuClick }: TopbarProps) {
  const pathname = usePathname();

  const currentTool = navGroups
    .flatMap((g) => g.items)
    .find((item) => item.href === pathname);

  const breadcrumbs = [
    { label: "DevTools Hub", href: "/" },
    ...(currentTool && currentTool.href !== "/"
      ? [{ label: currentTool.label, href: currentTool.href }]
      : []),
  ];

  return (
    <header
      className="fixed top-0 right-0 z-20 flex items-center gap-3 px-4 border-b border-[var(--border)] bg-[var(--background)]/80 backdrop-blur-xl"
      style={{
        left: "var(--sidebar-width)",
        height: "var(--topbar-height)",
      }}
    >
      {/* Mobile menu */}
      <button
        onClick={onMenuClick}
        className="lg:hidden p-1.5 rounded-md text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-2)] transition-colors"
      >
        <Menu className="w-4 h-4" />
      </button>

      {/* Breadcrumbs */}
      <div className="flex items-center gap-1.5 text-sm flex-1">
        {breadcrumbs.map((crumb, i) => (
          <span key={crumb.href} className="flex items-center gap-1.5">
            {i > 0 && <span className="text-[var(--border)] text-xs">/</span>}
            <span
              className={
                i === breadcrumbs.length - 1
                  ? "text-[var(--text-primary)] font-medium text-[13px]"
                  : "text-[var(--text-muted)] text-[13px]"
              }
            >
              {crumb.label}
            </span>
          </span>
        ))}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1">
        {/* Command palette hint */}
        <div className="hidden md:flex items-center gap-1 px-2 py-1 rounded-md border border-[var(--border)] text-[var(--text-muted)] text-[11px] cursor-pointer hover:border-[rgba(255,255,255,0.1)] hover:text-[var(--text-secondary)] transition-colors">
          <Command className="w-3 h-3" />
          <span>K</span>
        </div>

        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="p-1.5 rounded-md text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-2)] transition-colors"
        >
          <Github className="w-4 h-4" />
        </a>

        <a
          href="#"
          className="hidden sm:flex items-center gap-1.5 ml-1 px-3 py-1.5 rounded-md text-[11px] font-semibold text-white transition-all duration-200 hover:opacity-90 hover:scale-[0.98] active:scale-95"
          style={{ background: "var(--accent)" }}
        >
          <ExternalLink className="w-3 h-3" />
          Deploy
        </a>
      </div>
    </header>
  );
}
