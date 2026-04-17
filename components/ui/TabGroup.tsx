"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface TabGroupProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
}

export function TabGroup({ tabs, activeTab, onChange, className }: TabGroupProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 p-1 rounded-xl border border-[var(--border)] bg-[var(--surface)]",
        className
      )}
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={cn(
            "relative flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-[12px] font-semibold transition-colors duration-150",
            activeTab === tab.id
              ? "text-[var(--text-primary)]"
              : "text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
          )}
        >
          {activeTab === tab.id && (
            <motion.div
              layoutId="tab-active"
              className="absolute inset-0 rounded-lg bg-[var(--surface-2)] border border-[var(--border)]"
              transition={{ type: "spring", duration: 0.3, bounce: 0.15 }}
            />
          )}
          {tab.icon && (
            <span className="relative z-10">{tab.icon}</span>
          )}
          <span className="relative z-10">{tab.label}</span>
        </button>
      ))}
    </div>
  );
}
