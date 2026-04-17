"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ToolCardProps {
  label: string;
  description: string;
  href: string;
  icon: LucideIcon;
  color: string;
  badge?: string;
  index?: number;
}

export function ToolCard({
  label,
  description,
  href,
  icon: Icon,
  color,
  badge,
  index = 0,
}: ToolCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.07,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <Link href={href} className="group block h-full">
        <div
          className={cn(
            "relative h-full p-5 rounded-xl border border-[var(--border)] bg-[var(--surface)]",
            "glass-hover cursor-pointer overflow-hidden transition-all duration-300",
            "hover:border-[rgba(255,255,255,0.1)] hover:shadow-card-hover hover:-translate-y-0.5"
          )}
        >
          {/* Gradient orb background */}
          <div
            className="absolute -top-8 -right-8 w-24 h-24 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl pointer-events-none"
            style={{ background: color }}
          />

          {/* Top row */}
          <div className="flex items-start justify-between gap-3 mb-4">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-110"
              style={{
                background: `${color}18`,
                border: `1px solid ${color}30`,
              }}
            >
              <Icon className="w-4.5 h-4.5" style={{ color, width: 18, height: 18 }} />
            </div>
            {badge && (
              <span
                className="text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest"
                style={{
                  color,
                  background: `${color}15`,
                  border: `1px solid ${color}30`,
                }}
              >
                {badge}
              </span>
            )}
          </div>

          {/* Content */}
          <div>
            <h3 className="text-[14px] font-semibold text-[var(--text-primary)] font-display mb-1.5">
              {label}
            </h3>
            <p className="text-[12px] text-[var(--text-muted)] leading-relaxed">
              {description}
            </p>
          </div>

          {/* Arrow */}
          <div className="mt-4 flex items-center gap-1 text-[11px] font-medium opacity-0 group-hover:opacity-100 transition-all duration-200 -translate-x-1 group-hover:translate-x-0"
            style={{ color }}
          >
            Open tool
            <ArrowRight className="w-3 h-3" />
          </div>

          {/* Bottom accent line */}
          <div
            className="absolute bottom-0 left-0 right-0 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
          />
        </div>
      </Link>
    </motion.div>
  );
}
