"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { navGroups } from "@/lib/navigation";
import { cn } from "@/lib/utils";
import { Terminal, X, ChevronRight } from "lucide-react";

interface SidebarProps {
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

export function Sidebar({ mobileOpen = false, onMobileClose }: SidebarProps) {
  const pathname = usePathname();

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="h-14 flex items-center px-4 border-b border-[var(--border)] gap-3 shrink-0">
        <div className="w-7 h-7 rounded-lg bg-[var(--accent)] flex items-center justify-center shadow-glow-sm shrink-0">
          <Terminal className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
        </div>
        <div className="flex flex-col">
          <span className="text-[13px] font-bold text-[var(--text-primary)] leading-none font-display tracking-wide">
            DevTools
          </span>
          <span className="text-[10px] text-[var(--text-muted)] leading-none mt-0.5 tracking-widest uppercase">
            Hub
          </span>
        </div>
        {/* Mobile close */}
        {onMobileClose && (
          <button
            onClick={onMobileClose}
            className="ml-auto p-1 rounded-md text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-2)] transition-colors lg:hidden"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-4">
        {navGroups.map((group) => (
          <div key={group.label}>
            <p className="text-[10px] font-semibold text-[var(--text-muted)] uppercase tracking-[0.12em] px-2 mb-1">
              {group.label}
            </p>
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onMobileClose}
                    className={cn(
                      "group flex items-center gap-2.5 px-2 py-2 rounded-lg text-sm transition-all duration-150 relative",
                      isActive
                        ? "bg-[var(--accent-subtle)] text-[var(--text-primary)]"
                        : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-2)]"
                    )}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="sidebar-active"
                        className="absolute inset-0 rounded-lg bg-[var(--accent-subtle)] border border-[var(--accent-muted)]"
                        transition={{ type: "spring", duration: 0.4, bounce: 0.15 }}
                      />
                    )}
                    <div
                      className={cn(
                        "w-6 h-6 rounded-md flex items-center justify-center shrink-0 relative z-10 transition-all",
                        isActive ? "opacity-100" : "opacity-60 group-hover:opacity-80"
                      )}
                      style={isActive ? { color: item.color } : {}}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <span className="flex-1 font-medium relative z-10 text-[13px]">
                      {item.label}
                    </span>
                    {item.badge && (
                      <span
                        className="text-[9px] font-bold px-1.5 py-0.5 rounded-full relative z-10"
                        style={{
                          background: "rgba(91, 142, 240, 0.15)",
                          color: "var(--accent)",
                          border: "1px solid var(--accent-muted)",
                        }}
                      >
                        {item.badge}
                      </span>
                    )}
                    {isActive && (
                      <ChevronRight
                        className="w-3 h-3 relative z-10 opacity-50"
                        style={{ color: item.color }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-[var(--border)] shrink-0">
        <div className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#5b8ef0] to-[#a78bfa] shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-[11px] font-medium text-[var(--text-primary)] leading-none">Developer</p>
            <p className="text-[10px] text-[var(--text-muted)] mt-0.5">Free plan</p>
          </div>
          <div className="w-1.5 h-1.5 rounded-full bg-[var(--success)] shrink-0" />
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className="hidden lg:flex flex-col fixed left-0 top-0 bottom-0 z-30 bg-[var(--surface)] border-r border-[var(--border)]"
        style={{ width: "var(--sidebar-width)" }}
      >
        <SidebarContent />
      </aside>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={onMobileClose}
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed left-0 top-0 bottom-0 z-50 flex flex-col bg-[var(--surface)] border-r border-[var(--border)] lg:hidden"
              style={{ width: "var(--sidebar-width)" }}
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
