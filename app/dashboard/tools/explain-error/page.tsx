"use client";

import { useState } from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { TextAreaTool } from "@/components/ui/TextAreaTool";
import { ResultPanel } from "@/components/ui/ResultPanel";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { Zap, RotateCcw, Lightbulb, BookOpen, Wrench, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { sleep } from "@/lib/utils";

interface Explanation {
  summary: string;
  cause: string;
  fix: string;
  example: string;
  severity: "low" | "medium" | "high";
}

const MOCK_EXPLANATIONS: Record<string, Explanation> = {
  default: {
    summary: "This error occurs when JavaScript tries to access a property or method on a value that is `null` or `undefined`.",
    cause: "The most common causes are: accessing a variable before it's initialized, a function returning `null` unexpectedly, or trying to access nested object properties without null checks.",
    fix: "Use optional chaining (`?.`) or null coalescing (`??`), add explicit null checks before accessing properties, or initialize variables with safe default values.",
    example: "// ❌ Before\nconst name = user.profile.name;\n\n// ✅ After\nconst name = user?.profile?.name ?? 'Anonymous';",
    severity: "high",
  },
  module: {
    summary: "Node.js cannot find the specified module. The import path doesn't resolve to an existing file or installed package.",
    cause: "Missing `npm install`, incorrect import path, wrong package name, or the module is not in the right directory.",
    fix: "Run `npm install`, verify the import path is correct, check if the package exists in `package.json`, or confirm the file extension is correct.",
    example: "# Install the missing package\nnpm install <package-name>\n\n# Or fix the import path\nimport utils from './lib/utils'; // correct relative path",
    severity: "medium",
  },
  syntax: {
    summary: "The JavaScript engine encountered unexpected tokens while parsing your code. The syntax is not valid JS/TS.",
    cause: "Missing brackets, parentheses, or semicolons. Incorrect use of template literals, arrow functions, or destructuring syntax.",
    fix: "Check the line number indicated in the error. Look for mismatched brackets or parentheses. A linter like ESLint can catch these automatically.",
    example: "// ❌ Invalid\nconst fn = (x) => {\n  return x * 2\n\n// ✅ Fixed — missing closing brace\nconst fn = (x) => {\n  return x * 2;\n};",
    severity: "high",
  },
};

function getExplanation(input: string): Explanation {
  const lower = input.toLowerCase();
  if (lower.includes("cannot read") || lower.includes("undefined") || lower.includes("null"))
    return MOCK_EXPLANATIONS.default;
  if (lower.includes("module") || lower.includes("cannot find") || lower.includes("require"))
    return MOCK_EXPLANATIONS.module;
  if (lower.includes("syntax") || lower.includes("unexpected token") || lower.includes("parse"))
    return MOCK_EXPLANATIONS.syntax;
  return MOCK_EXPLANATIONS.default;
}

const severityConfig = {
  low: { label: "Low Severity", color: "var(--success)", bg: "rgba(91,240,160,0.1)" },
  medium: { label: "Medium Severity", color: "var(--warning)", bg: "rgba(240,196,91,0.1)" },
  high: { label: "High Severity", color: "var(--danger)", bg: "rgba(240,91,91,0.1)" },
};

export default function ExplainErrorPage() {
  const [input, setInput] = useState("");
  const [explanation, setExplanation] = useState<Explanation | null>(null);
  const [loading, setLoading] = useState(false);

  const handleExplain = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setExplanation(null);
    await sleep(1200);
    setExplanation(getExplanation(input));
    setLoading(false);
  };

  const handleReset = () => {
    setInput("");
    setExplanation(null);
  };

  const severity = explanation ? severityConfig[explanation.severity] : null;

  return (
    <PageContainer
      title="Explain Error"
      description="Paste any error message and get a clear, human-readable explanation with causes and fixes."
      badge="AI-powered"
      badgeColor="#f05b8e"
      actions={
        input && (
          <AnimatedButton variant="ghost" size="sm" icon={RotateCcw} onClick={handleReset}>
            Reset
          </AnimatedButton>
        )
      }
    >
      <div className="max-w-3xl space-y-4">
        <TextAreaTool
          label="Error Message"
          placeholder={`Paste your error here…\n\nExamples:\n• TypeError: Cannot read properties of undefined\n• Module not found: Error: Can't resolve './utils'\n• SyntaxError: Unexpected token`}
          value={input}
          onChange={setInput}
          rows={8}
          hint="Supports any language or runtime"
          charCount
        />

        <div className="flex items-center gap-2">
          <AnimatedButton
            onClick={handleExplain}
            loading={loading}
            disabled={!input.trim()}
            icon={Zap}
            size="md"
          >
            {loading ? "Analyzing…" : "Explain Error"}
          </AnimatedButton>
          {explanation && (
            <motion.div
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-[11px] font-semibold"
              style={{
                color: severity!.color,
                background: severity!.bg,
                border: `1px solid ${severity!.color}40`,
              }}
            >
              <AlertTriangle className="w-3 h-3" />
              {severity!.label}
            </motion.div>
          )}
        </div>

        <ResultPanel
          visible={!!explanation || loading}
          title="Analysis"
          variant={explanation ? "success" : "default"}
          loading={loading}
        >
          {explanation && (
            <div className="divide-y divide-[var(--border)]">
              {[
                {
                  icon: Lightbulb,
                  label: "Summary",
                  content: explanation.summary,
                  color: "#f0c45b",
                },
                {
                  icon: AlertTriangle,
                  label: "Root Cause",
                  content: explanation.cause,
                  color: "#f05b8e",
                },
                {
                  icon: Wrench,
                  label: "How to Fix",
                  content: explanation.fix,
                  color: "#5bf0a0",
                },
                {
                  icon: BookOpen,
                  label: "Code Example",
                  content: explanation.example,
                  color: "#5b8ef0",
                  mono: true,
                },
              ].map(({ icon: Icon, label, content, color, mono }) => (
                <div key={label} className="px-5 py-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className="w-5 h-5 rounded-md flex items-center justify-center"
                      style={{ background: `${color}18`, border: `1px solid ${color}28` }}
                    >
                      <Icon className="w-3 h-3" style={{ color }} />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)]">
                      {label}
                    </span>
                  </div>
                  <p
                    className={`text-[13px] leading-relaxed text-[var(--text-secondary)] ${
                      mono ? "font-mono bg-[var(--surface-2)] p-3 rounded-lg text-[12px] whitespace-pre" : ""
                    }`}
                  >
                    {content}
                  </p>
                </div>
              ))}
            </div>
          )}
        </ResultPanel>

        {/* Examples */}
        {!explanation && !loading && (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-2"
            >
              <p className="text-[11px] text-[var(--text-muted)] mb-2 font-medium">Try an example:</p>
              <div className="flex flex-wrap gap-2">
                {[
                  "TypeError: Cannot read properties of undefined (reading 'map')",
                  "Module not found: Can't resolve './components/Button'",
                  "SyntaxError: Unexpected token '}'",
                ].map((ex) => (
                  <button
                    key={ex}
                    onClick={() => setInput(ex)}
                    className="text-[11px] px-3 py-1.5 rounded-lg border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text-secondary)] hover:border-[rgba(255,255,255,0.1)] hover:bg-[var(--surface-2)] transition-all font-mono truncate max-w-xs"
                  >
                    {ex.substring(0, 48)}…
                  </button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </PageContainer>
  );
}
