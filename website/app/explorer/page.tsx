"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScoreGauge } from "@/components/ScoreGauge";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { CANTONS, SECTORS, getStartups, type Startup } from "@/lib/data";
import { cn, formatChf, formatDate } from "@/lib/utils";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  Filter,
  Info,
  Search,
  TrendingUp,
  X,
} from "lucide-react";

type SortKey = "score" | "fundingRequestedChf" | "foundedAt" | "preSeriesATeamSize" | "name";
type SortDir = "asc" | "desc";

const SECTOR_OPTIONS = [...SECTORS];

export default function ExplorerPage() {
  const all = getStartups();

  // ---------- Filter state ----------
  const [search, setSearch] = useState("");
  const [predFilter, setPredFilter] = useState<"all" | "success" | "failure">("all");
  const [scoreRange, setScoreRange] = useState<[number, number]>([0, 1]);
  const [sectors, setSectors] = useState<string[]>([]);
  const [cantons, setCantons] = useState<string[]>([]);
  const [fundingRange, setFundingRange] = useState<[number, number]>([0, 15_000_000]);
  const [yearRange, setYearRange] = useState<[number, number]>([2019, 2024]);
  const [minTeamSize, setMinTeamSize] = useState(0);
  const [stemOnly, setStemOnly] = useState(false);
  const [topUniOnly, setTopUniOnly] = useState(false);
  const [sortKey, setSortKey] = useState<SortKey>("score");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const filtered = useMemo(() => {
    let s = all.filter((x) => {
      if (search && !x.name.toLowerCase().includes(search.toLowerCase()) &&
          !x.tagline.toLowerCase().includes(search.toLowerCase()) &&
          !x.sector.toLowerCase().includes(search.toLowerCase())) return false;
      if (predFilter !== "all" && x.prediction !== predFilter) return false;
      if (x.score < scoreRange[0] || x.score > scoreRange[1]) return false;
      if (sectors.length && !sectors.includes(x.sector)) return false;
      if (cantons.length && !cantons.includes(x.canton)) return false;
      if (x.fundingRequestedChf < fundingRange[0] || x.fundingRequestedChf > fundingRange[1]) return false;
      const year = new Date(x.foundedAt).getFullYear();
      if (year < yearRange[0] || year > yearRange[1]) return false;
      if (x.features.preSeriesATeamSize < minTeamSize) return false;
      if (stemOnly && x.features.shareStemDegree < 0.5) return false;
      if (topUniOnly && !x.features.topUniversityFlag) return false;
      return true;
    });

    s.sort((a, b) => {
      let av: number | string;
      let bv: number | string;
      if (sortKey === "score") {
        av = a.score; bv = b.score;
      } else if (sortKey === "fundingRequestedChf") {
        av = a.fundingRequestedChf; bv = b.fundingRequestedChf;
      } else if (sortKey === "foundedAt") {
        av = a.foundedAt; bv = b.foundedAt;
      } else if (sortKey === "preSeriesATeamSize") {
        av = a.features.preSeriesATeamSize; bv = b.features.preSeriesATeamSize;
      } else {
        av = a.name; bv = b.name;
      }
      if (av < bv) return sortDir === "asc" ? -1 : 1;
      if (av > bv) return sortDir === "asc" ? 1 : -1;
      return 0;
    });

    return s;
  }, [all, search, predFilter, scoreRange, sectors, cantons, fundingRange, yearRange, minTeamSize, stemOnly, topUniOnly, sortKey, sortDir]);

  // KPIs derived from filtered set
  const forwarded = filtered.filter((s) => s.prediction === "success").length;
  const avgScore = filtered.length
    ? filtered.reduce((sum, s) => sum + s.score, 0) / filtered.length
    : 0;
  const totalFunding = filtered.reduce((sum, s) => sum + s.fundingRequestedChf, 0);
  const highTier = filtered.filter((s) => s.scoreTier === "high").length;

  const resetFilters = () => {
    setSearch("");
    setPredFilter("all");
    setScoreRange([0, 1]);
    setSectors([]);
    setCantons([]);
    setFundingRange([0, 15_000_000]);
    setYearRange([2019, 2024]);
    setMinTeamSize(0);
    setStemOnly(false);
    setTopUniOnly(false);
  };

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir(key === "score" || key === "fundingRequestedChf" ? "desc" : "asc");
    }
  };

  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Pipeline header */}
      <section className="relative border-b border-signal-400/[0.07] bg-ink-900/40">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="relative mx-auto max-w-[1440px] px-6 lg:px-10 py-12">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
            <div>
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-signal-300 mb-2">
                Deal Flow · Live Pipeline
              </p>
              <h1 className="font-display text-4xl lg:text-5xl text-bone-50 leading-tight">
                Startup pipeline
              </h1>
              <p className="mt-2 text-sm text-[var(--text-secondary)] max-w-2xl">
                30 mock pre-Series A startups, scored on probability of reaching IPO or
                acquisition.{" "}
                <span className="text-signal-300/80">Triage view — final decisions remain with the analyst.</span>
              </p>
            </div>

            <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-signal-400/[0.08] border border-signal-400/20">
              <span className="h-1.5 w-1.5 rounded-full bg-signal-300 live-dot" />
              <span className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-signal-200">
                Model · LightGBM v2.7.1 · re-scored 12 min ago
              </span>
            </div>
          </div>

          {/* KPI row */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-px bg-signal-400/[0.07] rounded-2xl overflow-hidden border border-signal-400/[0.07]">
            <KpiCell
              label="In pipeline"
              value={<AnimatedCounter value={filtered.length} duration={0.8} />}
              sub="filtered startups"
            />
            <KpiCell
              label="Forwarded"
              value={<><AnimatedCounter value={forwarded} duration={0.8} /></>}
              sub={`of ${filtered.length}`}
              accent
            />
            <KpiCell
              label="Avg. p(exit)"
              value={
                <>
                  <AnimatedCounter value={avgScore} decimals={2} duration={0.8} />
                </>
              }
              sub="LightGBM probability"
            />
            <KpiCell
              label="High-tier"
              value={<AnimatedCounter value={highTier} duration={0.8} />}
              sub="p ≥ 0.70"
            />
            <KpiCell
              label="Capital sought"
              value={
                <>
                  <AnimatedCounter value={totalFunding / 1_000_000} decimals={1} duration={1.0} />
                  <span className="text-signal-300 text-lg ml-1">M</span>
                </>
              }
              sub="aggregate, CHF"
            />
          </div>
        </div>
      </section>

      {/* Body: sidebar + table */}
      <section className="relative">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-10 py-10">
          <div className="grid lg:grid-cols-12 gap-8">
            {/* SIDEBAR */}
            <aside className="lg:col-span-3 space-y-6">
              {/* Disclaimer banner */}
              <div className="rounded-2xl border border-signal-400/20 bg-signal-400/[0.04] p-4">
                <div className="flex items-start gap-3">
                  <Info className="h-4 w-4 text-signal-300 mt-0.5 shrink-0" />
                  <p className="text-[0.72rem] leading-relaxed text-[var(--text-secondary)]">
                    These objective startup characteristics are used as <span className="text-bone-50">input features</span> for the machine learning model. Analyst-entered notes are kept separate on the detail view.
                  </p>
                </div>
              </div>

              {/* Search */}
              <div>
                <SectionLabel>Search</SectionLabel>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-muted)]" />
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Company, sector, thesis…"
                    className="w-full pl-10 pr-3 py-2.5 rounded-lg bg-ink-800/60 border border-signal-400/10 text-sm placeholder:text-[var(--text-muted)] focus:outline-none focus:border-signal-400/40 transition-colors"
                  />
                </div>
              </div>

              {/* Prediction filter */}
              <div>
                <SectionLabel>Prediction</SectionLabel>
                <div className="flex gap-1 p-1 rounded-lg bg-ink-800/60 border border-signal-400/10">
                  {(["all", "success", "failure"] as const).map((p) => (
                    <button
                      key={p}
                      onClick={() => setPredFilter(p)}
                      className={cn(
                        "flex-1 py-2 text-[0.7rem] uppercase tracking-[0.14em] rounded-md transition-colors",
                        predFilter === p
                          ? "bg-signal-400/15 text-signal-200"
                          : "text-[var(--text-secondary)] hover:text-bone-50"
                      )}
                    >
                      {p === "all" ? "All" : p === "success" ? "Fwd." : "Filt."}
                    </button>
                  ))}
                </div>
              </div>

              {/* Score range */}
              <div>
                <SectionLabel>
                  Score range
                  <span className="font-mono normal-case text-[var(--text-muted)] text-[0.65rem] ml-2 tracking-normal">
                    {scoreRange[0].toFixed(2)} — {scoreRange[1].toFixed(2)}
                  </span>
                </SectionLabel>
                <div className="space-y-2 px-1">
                  <DualRange
                    min={0}
                    max={1}
                    step={0.05}
                    value={scoreRange}
                    onChange={setScoreRange}
                  />
                </div>
              </div>

              {/* Sectors */}
              <FilterGroup label="Sector · category_code" mono>
                <div className="flex flex-wrap gap-1.5">
                  {SECTOR_OPTIONS.map((s) => (
                    <Chip
                      key={s}
                      active={sectors.includes(s)}
                      onClick={() =>
                        setSectors((cur) =>
                          cur.includes(s) ? cur.filter((x) => x !== s) : [...cur, s]
                        )
                      }
                    >
                      {s}
                    </Chip>
                  ))}
                </div>
              </FilterGroup>

              {/* Cantons */}
              <FilterGroup label="Canton / region">
                <div className="flex flex-wrap gap-1.5">
                  {CANTONS.map((c) => (
                    <Chip
                      key={c.code}
                      active={cantons.includes(c.code)}
                      onClick={() =>
                        setCantons((cur) =>
                          cur.includes(c.code) ? cur.filter((x) => x !== c.code) : [...cur, c.code]
                        )
                      }
                    >
                      {c.code}
                    </Chip>
                  ))}
                </div>
              </FilterGroup>

              {/* Funding range */}
              <div>
                <SectionLabel>
                  Capital sought
                  <span className="font-mono normal-case text-[var(--text-muted)] text-[0.65rem] ml-2 tracking-normal">
                    {formatChf(fundingRange[0])} — {formatChf(fundingRange[1])}
                  </span>
                </SectionLabel>
                <DualRange
                  min={0}
                  max={15_000_000}
                  step={500_000}
                  value={fundingRange}
                  onChange={setFundingRange}
                />
              </div>

              {/* Founded year */}
              <div>
                <SectionLabel>
                  Founded
                  <span className="font-mono normal-case text-[var(--text-muted)] text-[0.65rem] ml-2 tracking-normal">
                    {yearRange[0]} — {yearRange[1]}
                  </span>
                </SectionLabel>
                <DualRange
                  min={2019}
                  max={2024}
                  step={1}
                  value={yearRange}
                  onChange={setYearRange}
                />
              </div>

              {/* ML-feature flags */}
              <FilterGroup label="ML feature flags" mono>
                <div className="space-y-2">
                  <ToggleRow
                    label="STEM majority team"
                    sub="share_stem ≥ 0.5"
                    active={stemOnly}
                    onClick={() => setStemOnly(!stemOnly)}
                  />
                  <ToggleRow
                    label="Top-university affiliation"
                    sub="top_university_flag"
                    active={topUniOnly}
                    onClick={() => setTopUniOnly(!topUniOnly)}
                  />
                </div>
              </FilterGroup>

              <button
                onClick={resetFilters}
                className="w-full flex items-center justify-center gap-2 rounded-lg border border-signal-400/15 px-3 py-2 text-[0.7rem] uppercase tracking-[0.18em] text-[var(--text-secondary)] hover:text-bone-50 hover:border-signal-400/40 transition-colors"
              >
                <X className="h-3 w-3" />
                Reset filters
              </button>
            </aside>

            {/* TABLE */}
            <div className="lg:col-span-9">
              <div className="glass-strong rounded-2xl overflow-hidden">
                {/* Sort bar */}
                <div className="flex items-center justify-between gap-4 px-5 py-3 border-b border-signal-400/[0.07]">
                  <div className="flex items-center gap-2 text-[var(--text-muted)]">
                    <Filter className="h-3.5 w-3.5" />
                    <span className="font-mono text-[0.65rem] uppercase tracking-[0.18em]">
                      {filtered.length} / {all.length} startups
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-[var(--text-muted)]">
                      Sort:
                    </span>
                    <SortButton
                      active={sortKey === "score"}
                      dir={sortKey === "score" ? sortDir : null}
                      onClick={() => toggleSort("score")}
                    >
                      Score
                    </SortButton>
                    <SortButton
                      active={sortKey === "fundingRequestedChf"}
                      dir={sortKey === "fundingRequestedChf" ? sortDir : null}
                      onClick={() => toggleSort("fundingRequestedChf")}
                    >
                      Funding
                    </SortButton>
                    <SortButton
                      active={sortKey === "foundedAt"}
                      dir={sortKey === "foundedAt" ? sortDir : null}
                      onClick={() => toggleSort("foundedAt")}
                    >
                      Founded
                    </SortButton>
                    <SortButton
                      active={sortKey === "preSeriesATeamSize"}
                      dir={sortKey === "preSeriesATeamSize" ? sortDir : null}
                      onClick={() => toggleSort("preSeriesATeamSize")}
                    >
                      Team
                    </SortButton>
                  </div>
                </div>

                {/* Header row */}
                <div className="hidden lg:grid grid-cols-12 gap-4 px-5 py-2.5 border-b border-signal-400/[0.07] font-mono text-[0.6rem] uppercase tracking-[0.18em] text-[var(--text-muted)]">
                  <div className="col-span-4">Company</div>
                  <div className="col-span-1">Canton</div>
                  <div className="col-span-2">Capital sought</div>
                  <div className="col-span-1">Team</div>
                  <div className="col-span-3">p(exit) · score</div>
                  <div className="col-span-1 text-right">Status</div>
                </div>

                {/* Rows */}
                <div className="divide-y divide-signal-400/[0.05]">
                  <AnimatePresence>
                    {filtered.map((s, idx) => (
                      <motion.div
                        key={s.id}
                        layout
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3, delay: idx * 0.02 }}
                      >
                        <StartupRow startup={s} />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  {filtered.length === 0 && (
                    <div className="px-5 py-12 text-center">
                      <p className="text-[var(--text-secondary)]">No startups match these filters.</p>
                      <button
                        onClick={resetFilters}
                        className="mt-3 text-sm text-signal-300 hover:text-signal-200"
                      >
                        Reset filters →
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

// ============================================ Sub-components

function KpiCell({
  label,
  value,
  sub,
  accent = false,
}: {
  label: string;
  value: React.ReactNode;
  sub: string;
  accent?: boolean;
}) {
  return (
    <div className="bg-ink-900 p-5">
      <p className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-[var(--text-muted)] mb-2">
        {label}
      </p>
      <p className={cn("font-display text-3xl font-light tabular-nums", accent ? "text-signal-300" : "text-bone-50")}>
        {value}
      </p>
      <p className="mt-1 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-[var(--text-muted)]">{sub}</p>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-[var(--text-muted)] mb-2.5">
      {children}
    </div>
  );
}

function FilterGroup({ label, children, mono = false }: { label: string; children: React.ReactNode; mono?: boolean }) {
  return (
    <div>
      <SectionLabel>
        <span className={mono ? "font-mono" : ""}>{label}</span>
      </SectionLabel>
      {children}
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-2.5 py-1 rounded-md text-[0.68rem] uppercase tracking-[0.12em] transition-colors",
        active
          ? "bg-signal-400/15 text-signal-200 ring-1 ring-signal-400/40"
          : "bg-ink-800/60 text-[var(--text-secondary)] hover:text-bone-50 hover:bg-ink-700"
      )}
    >
      {children}
    </button>
  );
}

function ToggleRow({
  label,
  sub,
  active,
  onClick,
}: {
  label: string;
  sub: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-center justify-between gap-2 px-3 py-2 rounded-lg transition-colors text-left",
        active
          ? "bg-signal-400/10 ring-1 ring-signal-400/30"
          : "bg-ink-800/40 ring-1 ring-signal-400/[0.06] hover:bg-ink-800"
      )}
    >
      <div>
        <p className={cn("text-xs", active ? "text-signal-200" : "text-bone-50")}>{label}</p>
        <p className="font-mono text-[0.6rem] text-[var(--text-muted)]">{sub}</p>
      </div>
      <div
        className={cn(
          "h-4 w-7 rounded-full transition-colors relative",
          active ? "bg-signal-400" : "bg-ink-700"
        )}
      >
        <div
          className={cn(
            "absolute top-0.5 h-3 w-3 rounded-full bg-bone-50 transition-all",
            active ? "left-3" : "left-0.5"
          )}
        />
      </div>
    </button>
  );
}

function SortButton({
  active,
  dir,
  onClick,
  children,
}: {
  active: boolean;
  dir: SortDir | null;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-1 px-2.5 py-1 rounded-md text-[0.68rem] uppercase tracking-[0.14em] transition-colors",
        active
          ? "bg-signal-400/15 text-signal-200 ring-1 ring-signal-400/30"
          : "text-[var(--text-secondary)] hover:text-bone-50"
      )}
    >
      {children}
      {active && (dir === "asc" ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />)}
      {!active && <ArrowUpDown className="h-3 w-3 opacity-40" />}
    </button>
  );
}

function StartupRow({ startup: s }: { startup: Startup }) {
  const tierColor =
    s.scoreTier === "high"
      ? "text-signal-300"
      : s.scoreTier === "medium"
      ? "text-warn"
      : "text-[var(--text-muted)]";

  return (
    <Link
      href={`/startup/${s.id}`}
      className="block px-5 py-4 hover:bg-signal-400/[0.04] transition-colors group"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:items-center">
        {/* Company */}
        <div className="lg:col-span-4 min-w-0">
          <div className="flex items-baseline gap-3">
            <p className="font-display text-bone-50 group-hover:text-signal-200 transition-colors truncate">
              {s.name}
            </p>
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-signal-300/70 shrink-0">
              {s.sector}
            </span>
          </div>
          <p className="text-xs text-[var(--text-secondary)] mt-0.5 truncate">{s.tagline}</p>
          <p className="hidden lg:block font-mono text-[0.6rem] uppercase tracking-[0.14em] text-[var(--text-muted)] mt-1">
            {s.id} · founded {formatDate(s.foundedAt)}
          </p>
        </div>

        {/* Canton */}
        <div className="lg:col-span-1">
          <p className="font-mono text-xs text-bone-50">{s.canton}</p>
          <p className="font-mono text-[0.6rem] text-[var(--text-muted)]">{s.city}</p>
        </div>

        {/* Funding */}
        <div className="lg:col-span-2">
          <p className="font-mono text-sm text-bone-50 tabular-nums">
            {formatChf(s.fundingRequestedChf)}
          </p>
          <p className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-[var(--text-muted)]">
            seeking
          </p>
        </div>

        {/* Team */}
        <div className="lg:col-span-1">
          <p className="font-mono text-sm text-bone-50 tabular-nums">
            {s.features.preSeriesATeamSize}
          </p>
          <p className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-[var(--text-muted)]">
            pre-A team
          </p>
        </div>

        {/* Score */}
        <div className="lg:col-span-3">
          <ScoreGauge score={s.score} size="md" />
        </div>

        {/* Status badge */}
        <div className="lg:col-span-1 lg:text-right flex lg:justify-end">
          <span
            className={cn(
              "inline-flex items-center gap-1.5 px-2 py-1 rounded-md font-mono text-[0.6rem] uppercase tracking-[0.14em]",
              s.prediction === "success"
                ? "bg-signal-400/10 text-signal-200 ring-1 ring-signal-400/30"
                : "bg-ink-700/40 text-[var(--text-muted)] ring-1 ring-ink-600/40"
            )}
          >
            {s.prediction === "success" ? (
              <>
                <TrendingUp className="h-2.5 w-2.5" /> FWD
              </>
            ) : (
              <>FILT</>
            )}
          </span>
        </div>
      </div>
    </Link>
  );
}

// Lightweight dual-range slider built from two native range inputs
function DualRange({
  min,
  max,
  step,
  value,
  onChange,
}: {
  min: number;
  max: number;
  step: number;
  value: [number, number];
  onChange: (v: [number, number]) => void;
}) {
  return (
    <div className="relative h-6">
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-1 rounded-full bg-ink-800" />
      <div
        className="absolute top-1/2 -translate-y-1/2 h-1 rounded-full bg-signal-400/60"
        style={{
          left: `${((value[0] - min) / (max - min)) * 100}%`,
          right: `${100 - ((value[1] - min) / (max - min)) * 100}%`,
        }}
      />
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value[0]}
        onChange={(e) => {
          const v = Math.min(parseFloat(e.target.value), value[1] - step);
          onChange([v, value[1]]);
        }}
        className="absolute inset-x-0 top-0 w-full h-6 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-signal-300 [&::-webkit-slider-thumb]:cursor-grab [&::-webkit-slider-thumb]:shadow-md"
      />
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value[1]}
        onChange={(e) => {
          const v = Math.max(parseFloat(e.target.value), value[0] + step);
          onChange([value[0], v]);
        }}
        className="absolute inset-x-0 top-0 w-full h-6 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-signal-300 [&::-webkit-slider-thumb]:cursor-grab [&::-webkit-slider-thumb]:shadow-md"
      />
    </div>
  );
}
