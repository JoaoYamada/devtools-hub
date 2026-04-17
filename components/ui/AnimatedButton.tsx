"use client";

import { motion } from "framer-motion";
import { Loader2, type LucideIcon } from "lucide-react";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AnimatedButtonProps {
  onClick?: () => void;
  children: ReactNode;
  loading?: boolean;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
  className?: string;
  type?: "button" | "submit";
  color?: string;
}

export function AnimatedButton({
  onClick,
  children,
  loading = false,
  disabled = false,
  variant = "primary",
  size = "md",
  icon: Icon,
  iconPosition = "left",
  className,
  type = "button",
  color,
}: AnimatedButtonProps) {
  const sizeClasses = {
    sm: "px-3 py-1.5 text-[11px] gap-1.5 rounded-lg",
    md: "px-4 py-2 text-[13px] gap-2 rounded-xl",
    lg: "px-5 py-2.5 text-[14px] gap-2 rounded-xl",
  };

  const variantClasses = {
    primary:
      "bg-[var(--accent)] text-white shadow-glow-sm hover:shadow-glow hover:bg-[#4a7de8]",
    secondary:
      "bg-[var(--surface-2)] text-[var(--text-primary)] border border-[var(--border)] hover:border-[rgba(255,255,255,0.1)] hover:bg-[var(--surface)]",
    ghost:
      "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-2)]",
    danger:
      "bg-[rgba(240,91,91,0.15)] text-[var(--danger)] border border-[rgba(240,91,91,0.3)] hover:bg-[rgba(240,91,91,0.2)]",
  };

  const isDisabled = disabled || loading;

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      whileHover={isDisabled ? {} : { scale: 1.015 }}
      whileTap={isDisabled ? {} : { scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={cn(
        "inline-flex items-center font-semibold transition-all duration-200 select-none",
        sizeClasses[size],
        color ? "" : variantClasses[variant],
        isDisabled && "opacity-50 cursor-not-allowed pointer-events-none",
        className
      )}
      style={color ? { background: color, color: "white" } : {}}
    >
      {loading ? (
        <Loader2 className="w-3.5 h-3.5 animate-spin" />
      ) : (
        Icon && iconPosition === "left" && <Icon className="w-3.5 h-3.5" />
      )}
      {children}
      {!loading && Icon && iconPosition === "right" && (
        <Icon className="w-3.5 h-3.5" />
      )}
    </motion.button>
  );
}
