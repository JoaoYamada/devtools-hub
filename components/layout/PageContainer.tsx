"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface PageContainerProps {
  children: ReactNode;
  title?: string;
  description?: string;
  badge?: string;
  badgeColor?: string;
  actions?: ReactNode;
}

const variants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -4 },
};

export function PageContainer({
  children,
  title,
  description,
  badge,
  badgeColor = "var(--accent)",
  actions,
}: PageContainerProps) {
  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="min-h-full p-4 md:p-6 lg:p-8"
    >
      {(title || description) && (
        <div className="mb-8 flex items-start justify-between gap-4">
          <div>
            {badge && (
              <div
                className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full mb-3"
                style={{
                  color: badgeColor,
                  background: `${badgeColor}18`,
                  border: `1px solid ${badgeColor}30`,
                }}
              >
                <div
                  className="w-1 h-1 rounded-full animate-pulse"
                  style={{ background: badgeColor }}
                />
                {badge}
              </div>
            )}
            {title && (
              <h1 className="text-2xl font-bold text-[var(--text-primary)] font-display tracking-tight">
                {title}
              </h1>
            )}
            {description && (
              <p className="text-sm text-[var(--text-secondary)] mt-1.5 max-w-xl leading-relaxed">
                {description}
              </p>
            )}
          </div>
          {actions && <div className="shrink-0">{actions}</div>}
        </div>
      )}
      {children}
    </motion.div>
  );
}
