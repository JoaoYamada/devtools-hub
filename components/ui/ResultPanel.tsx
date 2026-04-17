"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";
import { CheckCircle2, AlertCircle, Copy, Check } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ResultPanelProps {
  children: ReactNode;
  title?: string;
  visible: boolean;
  variant?: "default" | "success" | "error" | "info";
  copyContent?: string;
  className?: string;
  loading?: boolean;
}

export function ResultPanel({
  children,
  title = "Result",
  visible,
  variant = "default",
  copyContent,
  className,
  loading = false,
}: ResultPanelProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!copyContent) return;
    await navigator.clipboard.writeText(copyContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const variantStyles = {
    default: { border: "var(--border)", icon: null },
    success: {
      border: "rgba(91, 240, 160, 0.3)",
      icon: <CheckCircle2 className="w-3.5 h-3.5 text-[var(--success)]" />,
    },
    error: {
      border: "rgba(240, 91, 91, 0.3)",
      icon: <AlertCircle className="w-3.5 h-3.5 text-[var(--danger)]" />,
    },
    info: {
      border: "rgba(91, 142, 240, 0.3)",
      icon: null,
    },
  };

  const current = variantStyles[variant];

  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.div
          key="result"
          initial={{ opacity: 0, y: 8, scale: 0.99 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -4, scale: 0.99 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            "rounded-xl border overflow-hidden",
            className
          )}
          style={{ borderColor: current.border }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-4 py-2.5 border-b"
            style={{
              background: "var(--surface-2)",
              borderColor: current.border,
            }}
          >
            <div className="flex items-center gap-2">
              {current.icon}
              <span className="text-[11px] font-semibold text-[var(--text-secondary)] uppercase tracking-widest">
                {title}
              </span>
            </div>
            {copyContent && (
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 text-[11px] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors px-2 py-1 rounded-md hover:bg-[var(--surface)]"
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3 text-[var(--success)]" />
                    <span className="text-[var(--success)]">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    Copy
                  </>
                )}
              </button>
            )}
          </div>

          {/* Body */}
          <div className="bg-[var(--surface)]">
            {loading ? (
              <div className="p-6 space-y-3">
                {[100, 80, 90, 60].map((w, i) => (
                  <div
                    key={i}
                    className="h-3 rounded shimmer"
                    style={{ width: `${w}%` }}
                  />
                ))}
              </div>
            ) : (
              children
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
