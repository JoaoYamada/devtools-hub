import { PageContainer } from "@/components/layout/PageContainer";
import { ToolCard } from "@/components/ui/ToolCard";
import { allTools } from "@/lib/navigation";
import { Zap, Users, Star, ArrowUpRight } from "lucide-react";

export default function HomePage() {
  const stats = [
    { label: "Tools Available", value: "5", icon: Zap, color: "#5b8ef0" },
    { label: "Daily Users", value: "2.4k", icon: Users, color: "#5bf0a0" },
    { label: "GitHub Stars", value: "847", icon: Star, color: "#f0c45b" },
  ];

  return (
    <PageContainer>
      {/* Hero */}
      <div className="mb-10 relative">
        <div
          className="absolute -top-20 -left-10 w-80 h-80 rounded-full blur-[120px] pointer-events-none opacity-20"
          style={{ background: "radial-gradient(circle, #5b8ef0, transparent)" }}
        />
        <div className="relative">
          <div className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.15em] px-3 py-1.5 rounded-full mb-4 border"
            style={{
              color: "var(--accent)",
              background: "var(--accent-subtle)",
              borderColor: "var(--accent-muted)",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
            v1.0 — Now live
          </div>
          <h1
            className="text-4xl md:text-5xl font-bold font-display tracking-tight mb-3"
            style={{
              background: "linear-gradient(135deg, #f0f2f7 0%, #8b92a5 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Your dev toolkit,
            <br />
            beautifully crafted.
          </h1>
          <p className="text-[var(--text-secondary)] text-[15px] max-w-xl leading-relaxed">
            A curated set of tools to supercharge your workflow — format code,
            explain errors, generate configs, and more. All in one place.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-10 max-w-lg">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div
            key={label}
            className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] flex flex-col gap-2"
          >
            <div className="flex items-center justify-between">
              <Icon className="w-3.5 h-3.5" style={{ color }} />
              <ArrowUpRight className="w-3 h-3 text-[var(--text-muted)]" />
            </div>
            <div>
              <p className="text-xl font-bold font-display text-[var(--text-primary)]">{value}</p>
              <p className="text-[10px] text-[var(--text-muted)] mt-0.5">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Section label */}
      <div className="flex items-center gap-3 mb-4">
        <h2 className="text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-[0.12em]">
          All Tools
        </h2>
        <div className="flex-1 h-px bg-[var(--border)]" />
        <span className="text-[10px] text-[var(--text-muted)]">{allTools.length} available</span>
      </div>

      {/* Tool cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
        {allTools.map((tool, i) => (
          <ToolCard
            key={tool.href}
            {...tool}
            index={i}
          />
        ))}
      </div>

      {/* Bottom CTA */}
      <div
        className="mt-10 p-6 rounded-2xl border relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, rgba(91,142,240,0.08) 0%, rgba(167,139,250,0.05) 100%)",
          borderColor: "rgba(91,142,240,0.2)",
        }}
      >
        <div className="absolute top-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, rgba(91,142,240,0.5), transparent)" }}
        />
        <div className="flex items-center justify-between gap-6 flex-wrap">
          <div>
            <h3 className="text-[15px] font-bold font-display text-[var(--text-primary)] mb-1">
              Open source & extensible
            </h3>
            <p className="text-[13px] text-[var(--text-secondary)]">
              Fork it, extend it, make it yours. Built with Next.js 14 + TypeScript.
            </p>
          </div>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] font-semibold text-white transition-all hover:opacity-90 hover:scale-[0.98] shrink-0"
            style={{ background: "var(--accent)" }}
          >
            View on GitHub
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </PageContainer>
  );
}
