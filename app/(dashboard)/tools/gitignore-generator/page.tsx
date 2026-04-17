"use client";

import { useState } from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { ResultPanel } from "@/components/ui/ResultPanel";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { generateGitignore } from "@/lib/utils";
import { GitBranch, Download, RotateCcw, CheckSquare, Square } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Stack {
  id: string;
  label: string;
  description: string;
  color: string;
  icon: string;
  category: string;
}

const STACKS: Stack[] = [
  // Languages
  { id: "node", label: "Node.js", description: "npm, yarn, node_modules", color: "#5bf0a0", icon: "⬡", category: "Runtime" },
  { id: "python", label: "Python", description: "venv, __pycache__, .pyc", color: "#f0c45b", icon: "🐍", category: "Runtime" },
  { id: "java", label: "Java", description: "target/, .class files", color: "#f05b5b", icon: "☕", category: "Runtime" },
  { id: "go", label: "Go", description: "vendor/, binaries", color: "#5bc4f0", icon: "🦫", category: "Runtime" },
  { id: "rust", label: "Rust", description: "target/, Cargo.lock", color: "#f07a5b", icon: "⚙", category: "Runtime" },
  { id: "dotnet", label: ".NET", description: "bin/, obj/, .vs/", color: "#a78bfa", icon: "◆", category: "Runtime" },
  // Frameworks
  { id: "react", label: "React / Next.js", description: ".next/, out/, build/", color: "#5b8ef0", icon: "⚛", category: "Framework" },
  { id: "vue", label: "Vue.js", description: "dist/, .env.local", color: "#5bf0a0", icon: "◉", category: "Framework" },
  // Tools
  { id: "docker", label: "Docker", description: ".env, override files", color: "#5bc4f0", icon: "🐳", category: "DevOps" },
  { id: "env", label: "Env Files", description: ".env, secrets, credentials", color: "#f05b8e", icon: "🔑", category: "Security" },
  // OS
  { id: "macos", label: "macOS", description: ".DS_Store, Spotlight", color: "#8b92a5", icon: "🍎", category: "OS" },
  { id: "windows", label: "Windows", description: "Thumbs.db, desktop.ini", color: "#5b8ef0", icon: "🪟", category: "OS" },
  // Editors
  { id: "vscode", label: "VS Code", description: ".vscode/, .history/", color: "#5b8ef0", icon: "◧", category: "Editor" },
  { id: "idea", label: "JetBrains", description: ".idea/, *.iml", color: "#f05b8e", icon: "◈", category: "Editor" },
];

const CATEGORIES = ["Runtime", "Framework", "DevOps", "Security", "OS", "Editor"];

export default function GitignoreGeneratorPage() {
  const [selected, setSelected] = useState<Set<string>>(new Set(["node", "react", "env", "macos", "vscode"]));
  const [generated, setGenerated] = useState<string | null>(null);

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
    setGenerated(null);
  };

  const handleGenerate = () => {
    const result = generateGitignore(Array.from(selected));
    setGenerated(result);
  };

  const handleDownload = () => {
    if (!generated) return;
    const blob = new Blob([generated], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = ".gitignore";
    a.click();
    URL.revokeObjectURL(url);
  };

  const selectAll = () => { setSelected(new Set(STACKS.map((s) => s.id))); setGenerated(null); };
  const clearAll = () => { setSelected(new Set()); setGenerated(null); };

  return (
    <PageContainer
      title="Gitignore Generator"
      description="Select your tech stack and generate a production-ready .gitignore file in seconds."
      badge="Generator"
      badgeColor="#a78bfa"
      actions={
        <div className="flex items-center gap-2">
          <button onClick={selectAll} className="text-[11px] text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors">
            Select all
          </button>
          <span className="text-[var(--border)]">·</span>
          <button onClick={clearAll} className="text-[11px] text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors">
            Clear
          </button>
        </div>
      }
    >
      <div className="max-w-3xl space-y-6">
        {/* Stack groups */}
        {CATEGORIES.map((category) => {
          const items = STACKS.filter((s) => s.category === category);
          return (
            <div key={category}>
              <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--text-muted)] mb-2.5">
                {category}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {items.map((stack, i) => {
                  const isSelected = selected.has(stack.id);
                  return (
                    <motion.button
                      key={stack.id}
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.04 }}
                      onClick={() => toggle(stack.id)}
                      className={cn(
                        "flex items-center gap-3 px-3 py-3 rounded-xl border text-left transition-all duration-150",
                        isSelected
                          ? "border-[var(--border)] bg-[var(--surface-2)]"
                          : "border-[var(--border-subtle)] bg-[var(--surface)] opacity-60 hover:opacity-80 hover:border-[var(--border)]"
                      )}
                      style={isSelected ? { borderColor: `${stack.color}40`, boxShadow: `0 0 0 1px ${stack.color}20` } : {}}
                    >
                      <div
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-sm shrink-0 transition-all"
                        style={isSelected ? { background: `${stack.color}18`, border: `1px solid ${stack.color}30` } : {
                          background: "var(--surface-2)", border: "1px solid var(--border)"
                        }}
                      >
                        {stack.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[12px] font-semibold text-[var(--text-primary)] leading-none mb-0.5">
                          {stack.label}
                        </p>
                        <p className="text-[10px] text-[var(--text-muted)] leading-none truncate">
                          {stack.description}
                        </p>
                      </div>
                      <div className="shrink-0">
                        {isSelected
                          ? <CheckSquare className="w-3.5 h-3.5" style={{ color: stack.color }} />
                          : <Square className="w-3.5 h-3.5 text-[var(--text-muted)]" />
                        }
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* Selected count + generate */}
        <div className="flex items-center gap-3 pt-2">
          <AnimatedButton
            onClick={handleGenerate}
            disabled={selected.size === 0}
            icon={GitBranch}
            color="#a78bfa"
          >
            Generate .gitignore
          </AnimatedButton>
          <span className="text-[12px] text-[var(--text-muted)]">
            {selected.size} stack{selected.size !== 1 ? "s" : ""} selected
          </span>
        </div>

        {/* Result */}
        <ResultPanel
          visible={!!generated}
          title=".gitignore"
          variant="success"
          copyContent={generated ?? ""}
        >
          <div className="flex items-center justify-between px-5 py-3 border-b border-[var(--border)] bg-[var(--surface-2)]">
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-[var(--text-muted)]">
                {generated?.split("\n").length} lines generated
              </span>
            </div>
            <AnimatedButton
              variant="secondary"
              size="sm"
              icon={Download}
              onClick={handleDownload}
            >
              Download
            </AnimatedButton>
          </div>
          <pre className="text-[12px] font-mono text-[var(--text-secondary)] px-5 py-4 overflow-auto max-h-80 leading-relaxed whitespace-pre">
            {generated}
          </pre>
        </ResultPanel>
      </div>
    </PageContainer>
  );
}
