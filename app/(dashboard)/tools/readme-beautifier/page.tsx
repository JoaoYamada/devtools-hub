"use client";

import { useState } from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { TabGroup } from "@/components/ui/TabGroup";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, Code2, Copy, Check, FileText, Wand2 } from "lucide-react";
import ReactMarkdown from "react-markdown";

const STARTER_TEMPLATE = `# 🚀 My Awesome Project

> A blazing-fast, production-ready starter kit for modern web development.

![version](https://img.shields.io/badge/version-1.0.0-blue) ![license](https://img.shields.io/badge/license-MIT-green) ![build](https://img.shields.io/badge/build-passing-brightgreen)

## ✨ Features

- ⚡ **Blazing fast** — optimized for performance from day one
- 🎨 **Beautiful UI** — pixel-perfect components out of the box
- 🔒 **Type-safe** — full TypeScript support throughout
- 📦 **Zero config** — works out of the box with sensible defaults

## 📦 Installation

\`\`\`bash
# Clone the repository
git clone https://github.com/username/my-project

# Install dependencies
npm install

# Start development server
npm run dev
\`\`\`

## 🗂 Project Structure

\`\`\`
my-project/
├── app/              # App router pages
├── components/       # Reusable UI components
├── lib/              # Utility functions
└── public/           # Static assets
\`\`\`

## 🛠 Tech Stack

| Technology | Purpose |
|------------|---------|
| Next.js 14 | React framework |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| Framer Motion | Animations |

## 📄 License

MIT © [Your Name](https://github.com/username)
`;

export default function ReadmeBeautifierPage() {
  const [markdown, setMarkdown] = useState(STARTER_TEMPLATE);
  const [activeTab, setActiveTab] = useState<"editor" | "preview" | "split">("split");
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tabs = [
    { id: "editor", label: "Editor", icon: <Code2 className="w-3 h-3" /> },
    { id: "split", label: "Split", icon: <Eye className="w-3 h-3" /> },
    { id: "preview", label: "Preview", icon: <FileText className="w-3 h-3" /> },
  ];

  const showEditor = activeTab === "editor" || activeTab === "split";
  const showPreview = activeTab === "preview" || activeTab === "split";

  return (
    <PageContainer
      title="README Beautifier"
      description="Write markdown on the left, see the beautiful rendered preview on the right in real time."
      badge="Live Preview"
      badgeColor="#5bf0a0"
      actions={
        <div className="flex items-center gap-2">
          <TabGroup
            tabs={tabs}
            activeTab={activeTab}
            onChange={(id) => setActiveTab(id as "editor" | "preview" | "split")}
          />
          <AnimatedButton variant="secondary" size="sm" icon={Wand2} onClick={() => setMarkdown(STARTER_TEMPLATE)}>
            Template
          </AnimatedButton>
          <AnimatedButton variant="secondary" size="sm" onClick={handleCopy}
            icon={copied ? Check : Copy}
          >
            {copied ? "Copied!" : "Copy"}
          </AnimatedButton>
        </div>
      }
    >
      <motion.div
        layout
        className="grid gap-4 h-[calc(100vh-220px)]"
        style={{
          gridTemplateColumns:
            activeTab === "split"
              ? "1fr 1fr"
              : "1fr",
        }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <AnimatePresence mode="popLayout">
          {showEditor && (
            <motion.div
              key="editor"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col rounded-xl border border-[var(--border)] overflow-hidden"
            >
              <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[var(--border)] bg-[var(--surface-2)] shrink-0">
                <Code2 className="w-3.5 h-3.5 text-[var(--text-muted)]" />
                <span className="text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-widest">
                  Markdown Source
                </span>
                <span className="ml-auto text-[10px] text-[var(--text-muted)]">
                  {markdown.length.toLocaleString()} chars
                </span>
              </div>
              <textarea
                value={markdown}
                onChange={(e) => setMarkdown(e.target.value)}
                className="flex-1 w-full px-4 py-4 bg-[var(--surface)] text-[var(--text-primary)] text-[12.5px] font-mono leading-relaxed resize-none focus:outline-none placeholder:text-[var(--text-muted)]"
                placeholder="Start writing markdown…"
                spellCheck={false}
              />
            </motion.div>
          )}

          {showPreview && (
            <motion.div
              key="preview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col rounded-xl border border-[var(--border)] overflow-hidden"
            >
              <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[var(--border)] bg-[var(--surface-2)] shrink-0">
                <Eye className="w-3.5 h-3.5 text-[var(--success)]" />
                <span className="text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-widest">
                  Preview
                </span>
                <span
                  className="ml-auto text-[10px] px-2 py-0.5 rounded-full"
                  style={{
                    color: "var(--success)",
                    background: "rgba(91,240,160,0.1)",
                    border: "1px solid rgba(91,240,160,0.2)",
                  }}
                >
                  Live
                </span>
              </div>
              <div className="flex-1 overflow-y-auto px-6 py-5 bg-[var(--surface)]">
                <div className="markdown-preview max-w-2xl">
                  <ReactMarkdown>{markdown || "*Start typing to see preview…*"}</ReactMarkdown>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </PageContainer>
  );
}
