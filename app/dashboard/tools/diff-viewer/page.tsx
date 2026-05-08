"use client";

import { useState, useMemo } from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { ResultPanel } from "@/components/ui/ResultPanel";
import { computeDiff } from "@/lib/utils";
import { GitCompare, RotateCcw, Plus, Minus, Equal } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const EXAMPLE_ORIGINAL = `function fetchUser(id) {
  const url = "http://api.example.com/users/" + id;
  fetch(url)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      return data;
    });
}

const timeout = 3000;
const retries = 1;`;

const EXAMPLE_MODIFIED = `async function fetchUser(id: string): Promise<User> {
  const url = \`https://api.example.com/v2/users/\${id}\`;
  const res = await fetch(url, { signal: AbortSignal.timeout(5000) });

  if (!res.ok) throw new Error(\`HTTP \${res.status}\`);

  const data: User = await res.json();
  return data;
}

const TIMEOUT_MS = 5000;
const MAX_RETRIES = 3;`;

export default function DiffViewerPage() {
  const [original, setOriginal] = useState("");
  const [modified, setModified] = useState("");
  const [showDiff, setShowDiff] = useState(false);

  const diff = useMemo(() => {
    if (!showDiff) return [];
    return computeDiff(original, modified);
  }, [original, modified, showDiff]);

  const stats = useMemo(() => {
    const added = diff.filter((d) => d.type === "added").length;
    const removed = diff.filter((d) => d.type === "removed").length;
    const unchanged = diff.filter((d) => d.type === "unchanged").length;
    return { added, removed, unchanged };
  }, [diff]);

  const handleCompare = () => setShowDiff(true);
  const handleReset = () => {
    setOriginal("");
    setModified("");
    setShowDiff(false);
  };

  const loadExample = () => {
    setOriginal(EXAMPLE_ORIGINAL);
    setModified(EXAMPLE_MODIFIED);
    setShowDiff(false);
  };

  return (
    <PageContainer
      title="Diff Viewer"
      description="Paste two versions of any text and instantly visualize what changed between them."
      badge="Comparison"
      badgeColor="#5bc4f0"
      actions={
        <div className="flex items-center gap-2">
          <button onClick={loadExample} className="text-[11px] text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors">
            Load example
          </button>
          {(original || modified) && (
            <AnimatedButton variant="ghost" size="sm" icon={RotateCcw} onClick={handleReset}>
              Reset
            </AnimatedButton>
          )}
        </div>
      }
    >
      <div className="max-w-4xl space-y-5">
        {/* Two-column inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { label: "Original", value: original, onChange: setOriginal, color: "var(--danger)", hint: "Before" },
            { label: "Modified", value: modified, onChange: setModified, color: "var(--success)", hint: "After" },
          ].map(({ label, value, onChange, color, hint }) => (
            <div key={label} className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-semibold text-[var(--text-secondary)] uppercase tracking-widest flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full" style={{ background: color }} />
                  {label}
                </label>
                <span className="text-[11px] text-[var(--text-muted)]">{hint}</span>
              </div>
              <textarea
                value={value}
                onChange={(e) => { onChange(e.target.value); setShowDiff(false); }}
                placeholder={`Paste ${label.toLowerCase()} text here…`}
                rows={12}
                className="w-full px-4 py-3 rounded-xl text-[12.5px] font-mono leading-relaxed border border-[var(--border)] bg-[var(--surface)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-muted)] transition-colors resize-y"
                style={{ borderTopColor: color, borderTopWidth: 2 }}
                spellCheck={false}
              />
            </div>
          ))}
        </div>

        {/* Action */}
        <div className="flex items-center gap-3">
          <AnimatedButton
            onClick={handleCompare}
            disabled={!original.trim() || !modified.trim()}
            icon={GitCompare}
            color="#5bc4f0"
          >
            Compare
          </AnimatedButton>

          {/* Stats */}
          {showDiff && (
            <motion.div
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2"
            >
              {[
                { icon: Plus, label: `+${stats.added}`, color: "var(--success)", bg: "rgba(91,240,160,0.1)" },
                { icon: Minus, label: `-${stats.removed}`, color: "var(--danger)", bg: "rgba(240,91,91,0.1)" },
                { icon: Equal, label: `${stats.unchanged}`, color: "var(--text-muted)", bg: "var(--surface-2)" },
              ].map(({ icon: Icon, label, color, bg }) => (
                <div
                  key={label}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-bold"
                  style={{ color, background: bg, border: `1px solid ${color}30` }}
                >
                  <Icon className="w-3 h-3" />
                  {label}
                </div>
              ))}
            </motion.div>
          )}
        </div>

        {/* Diff result */}
        <ResultPanel
          visible={showDiff && diff.length > 0}
          title="Diff Output"
          variant={stats.removed > 0 || stats.added > 0 ? "info" : "success"}
        >
          <div className="overflow-auto max-h-[480px] font-mono text-[12px] leading-relaxed">
            <table className="w-full border-collapse">
              <tbody>
                {diff.map((line, i) => {
                  const typeConfig = {
                    added: {
                      bg: "rgba(91,240,160,0.06)",
                      border: "rgba(91,240,160,0.4)",
                      color: "var(--success)",
                      prefix: "+ ",
                      lineColor: "rgba(91,240,160,0.1)",
                    },
                    removed: {
                      bg: "rgba(240,91,91,0.06)",
                      border: "rgba(240,91,91,0.4)",
                      color: "var(--danger)",
                      prefix: "- ",
                      lineColor: "rgba(240,91,91,0.1)",
                    },
                    unchanged: {
                      bg: "transparent",
                      border: "transparent",
                      color: "var(--text-muted)",
                      prefix: "  ",
                      lineColor: "transparent",
                    },
                  }[line.type];

                  return (
                    <tr
                      key={i}
                      style={{ background: typeConfig.bg }}
                    >
                      <td
                        className="select-none text-right pl-4 pr-2 py-0.5 text-[10px] w-10 border-r"
                        style={{ color: typeConfig.color, borderColor: typeConfig.border, background: typeConfig.lineColor, opacity: 0.6 }}
                      >
                        {i + 1}
                      </td>
                      <td
                        className="pl-1 pr-1 py-0.5 w-5 text-center font-bold text-[11px]"
                        style={{ color: typeConfig.color }}
                      >
                        {typeConfig.prefix.trim()}
                      </td>
                      <td
                        className="px-3 py-0.5 whitespace-pre"
                        style={{ color: line.type === "unchanged" ? "var(--text-muted)" : typeConfig.color }}
                      >
                        {line.content || " "}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </ResultPanel>

        {showDiff && stats.added === 0 && stats.removed === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[12px] text-[var(--text-muted)]"
          >
            <Equal className="w-4 h-4" />
            The two texts are identical — no differences found.
          </motion.div>
        )}
      </div>
    </PageContainer>
  );
}
