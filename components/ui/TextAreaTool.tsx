"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface TextAreaToolProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
  readOnly?: boolean;
  className?: string;
  mono?: boolean;
  hint?: string;
  charCount?: boolean;
}

export const TextAreaTool = forwardRef<HTMLTextAreaElement, TextAreaToolProps>(
  (
    {
      label,
      placeholder,
      value,
      onChange,
      rows = 10,
      readOnly = false,
      className,
      mono = true,
      hint,
      charCount = false,
    },
    ref
  ) => {
    return (
      <div className={cn("flex flex-col gap-1.5", className)}>
        {(label || hint) && (
          <div className="flex items-center justify-between">
            {label && (
              <label className="text-[11px] font-semibold text-[var(--text-secondary)] uppercase tracking-widest">
                {label}
              </label>
            )}
            {hint && (
              <span className="text-[11px] text-[var(--text-muted)]">{hint}</span>
            )}
          </div>
        )}
        <div className="relative group">
          <textarea
            ref={ref}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            rows={rows}
            readOnly={readOnly}
            className={cn(
              "w-full px-4 py-3 rounded-xl text-sm transition-all duration-200",
              "border border-[var(--border)] bg-[var(--surface)]",
              "text-[var(--text-primary)] placeholder:text-[var(--text-muted)]",
              "focus:outline-none focus:border-[var(--accent-muted)] focus:bg-[var(--surface-2)]",
              "group-hover:border-[rgba(255,255,255,0.08)]",
              readOnly && "cursor-default bg-[var(--surface-2)] select-all",
              mono ? "font-mono text-[12.5px] leading-relaxed" : "font-sans text-[13px] leading-relaxed"
            )}
            style={{ resize: readOnly ? "none" : "vertical" }}
            spellCheck={false}
          />
          {charCount && value.length > 0 && (
            <div className="absolute bottom-3 right-3 text-[10px] text-[var(--text-muted)] pointer-events-none">
              {value.length.toLocaleString()} chars
            </div>
          )}
        </div>
      </div>
    );
  }
);

TextAreaTool.displayName = "TextAreaTool";
