"use client";

import { useState } from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { TextAreaTool } from "@/components/ui/TextAreaTool";
import { ResultPanel } from "@/components/ui/ResultPanel";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { TabGroup } from "@/components/ui/TabGroup";
import { formatJSON, formatCSV, formatXML } from "@/lib/utils";
import { Code2, Wand2, RotateCcw, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type FormatMode = "json" | "csv" | "xml";

const EXAMPLES: Record<FormatMode, string> = {
  json: `{"name":"DevTools Hub","version":"1.0.0","dependencies":{"next":"14.2.3","react":"^18","tailwindcss":"^3.4.3"},"scripts":{"dev":"next dev","build":"next build"}}`,
  csv: `name,age,city,country
Alice,28,São Paulo,Brazil
Bob,34,New York,USA
Carol,26,Berlin,Germany
Dave,31,Tokyo,Japan`,
  xml: `<root><user id="1"><name>Alice</name><email>alice@example.com</email><role>admin</role></user><user id="2"><name>Bob</name><email>bob@example.com</email><role>developer</role></user></root>`,
};

const MODE_LABELS: Record<FormatMode, { label: string; color: string; hint: string }> = {
  json: { label: "JSON", color: "#f0c45b", hint: "Paste minified or malformed JSON" },
  csv: { label: "CSV", color: "#5bf0a0", hint: "Paste comma-separated values" },
  xml: { label: "XML", color: "#5b8ef0", hint: "Paste XML or HTML markup" },
};

export default function FormatterPage() {
  const [mode, setMode] = useState<FormatMode>("json");
  const [input, setInput] = useState("");
  const [result, setResult] = useState<{ output: string; error: string | null } | null>(null);

  const handleFormat = () => {
    if (!input.trim()) return;
    let output = { result: "", error: null as string | null };

    if (mode === "json") output = formatJSON(input);
    else if (mode === "csv") output = formatCSV(input);
    else if (mode === "xml") output = formatXML(input);

    setResult({ output: output.result, error: output.error });
  };

  const handleModeChange = (m: string) => {
    setMode(m as FormatMode);
    setInput("");
    setResult(null);
  };

  const modeConfig = MODE_LABELS[mode];

  const tabs = [
    { id: "json", label: "JSON" },
    { id: "csv", label: "CSV" },
    { id: "xml", label: "XML" },
  ];

  return (
    <PageContainer
      title="Code Formatter"
      description="Instantly format and beautify JSON, CSV, and XML. Paste minified or messy data and get clean, readable output."
      badge="Formatter"
      badgeColor="#f0c45b"
    >
      <div className="max-w-3xl space-y-5">
        {/* Mode selector */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <TabGroup tabs={tabs} activeTab={mode} onChange={handleModeChange} />
          <button
            onClick={() => { setInput(EXAMPLES[mode]); setResult(null); }}
            className="text-[11px] text-[var(--text-muted)] hover:text-[var(--text-secondary)] underline underline-offset-2 transition-colors"
          >
            Load example
          </button>
        </div>

        {/* Input */}
        <TextAreaTool
          label={`${modeConfig.label} Input`}
          placeholder={`Paste your ${modeConfig.label} here…`}
          value={input}
          onChange={(v) => { setInput(v); setResult(null); }}
          rows={10}
          hint={modeConfig.hint}
          charCount
        />

        {/* Actions */}
        <div className="flex items-center gap-2">
          <AnimatedButton
            onClick={handleFormat}
            disabled={!input.trim()}
            icon={Wand2}
            color={modeConfig.color}
          >
            Format {modeConfig.label}
          </AnimatedButton>
          {result && (
            <AnimatedButton
              variant="ghost"
              size="md"
              icon={RotateCcw}
              onClick={() => { setInput(""); setResult(null); }}
            >
              Clear
            </AnimatedButton>
          )}
        </div>

        {/* Error */}
        <AnimatePresence>
          {result?.error && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-start gap-3 px-4 py-3 rounded-xl border"
              style={{
                background: "rgba(240,91,91,0.08)",
                borderColor: "rgba(240,91,91,0.3)",
              }}
            >
              <AlertCircle className="w-4 h-4 text-[var(--danger)] mt-0.5 shrink-0" />
              <div>
                <p className="text-[12px] font-semibold text-[var(--danger)] mb-0.5">Parse Error</p>
                <p className="text-[12px] text-[var(--text-muted)] font-mono">{result.error}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Result */}
        <ResultPanel
          visible={!!result?.output}
          title={`Formatted ${modeConfig.label}`}
          variant="success"
          copyContent={result?.output}
        >
          <div className="relative">
            {/* Line numbers + code */}
            <div className="flex overflow-auto max-h-96">
              <div className="select-none text-right text-[11px] font-mono text-[var(--text-muted)] px-3 py-4 border-r border-[var(--border)] bg-[var(--surface-2)] leading-relaxed shrink-0">
                {result?.output.split("\n").map((_, i) => (
                  <div key={i}>{i + 1}</div>
                ))}
              </div>
              <pre className="flex-1 text-[12.5px] font-mono text-[var(--text-primary)] px-4 py-4 overflow-auto leading-relaxed whitespace-pre">
                {result?.output}
              </pre>
            </div>
          </div>
        </ResultPanel>
      </div>
    </PageContainer>
  );
}
