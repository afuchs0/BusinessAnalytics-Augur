import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProbabilityDial } from "@/components/ProbabilityDial";
import { AnalystNotes } from "@/components/AnalystNotes";
import { getStartupById, getStartups, FEATURE_LABEL } from "@/lib/data";
import { formatChf, formatDate, formatPct } from "@/lib/utils";
import {
  ArrowLeft,
  BadgeCheck,
  Building2,
  Calendar,
  Cpu,
  ExternalLink,
  GraduationCap,
  MapPin,
  TrendingUp,
  Users2,
} from "lucide-react";

// Generate static params at build time so detail pages prerender cleanly
export function generateStaticParams() {
  return getStartups().map((s) => ({ id: s.id }));
}

export default function StartupDetailPage({ params }: { params: { id: string } }) {
  const startup = getStartupById(params.id);
  if (!startup) return notFound();

  const tierColor =
    startup.scoreTier === "high"
      ? "text-signal-300"
      : startup.scoreTier === "medium"
      ? "text-warn"
      : "text-[var(--text-muted)]";

  const tierBg =
    startup.scoreTier === "high"
      ? "bg-signal-400/10 ring-signal-400/30"
      : startup.scoreTier === "medium"
      ? "bg-warn/10 ring-warn/30"
      : "bg-ink-700/40 ring-ink-600/40";

  // Compute the age in months for the timeline
  const foundedDate = new Date(startup.foundedAt);
  const ageMonths = Math.round(
    (Date.now() - foundedDate.getTime()) / (1000 * 60 * 60 * 24 * 30.4)
  );

  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Back nav */}
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10 pt-8">
        <Link
          href="/explorer"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[var(--text-secondary)] hover:text-bone-50 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to pipeline
        </Link>
      </div>

      {/* Header */}
      <section className="relative border-b border-signal-400/[0.07] py-12">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="relative mx-auto max-w-[1440px] px-6 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-7">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-signal-400/10 border border-signal-400/20 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-signal-200">
                  {startup.sector}
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-ink-800/60 border border-signal-400/[0.07] font-mono text-[0.62rem] uppercase tracking-[0.18em] text-[var(--text-secondary)]">
                  <MapPin className="h-3 w-3" />
                  {startup.canton} · {startup.city}
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-ink-800/60 border border-signal-400/[0.07] font-mono text-[0.62rem] uppercase tracking-[0.18em] text-[var(--text-secondary)]">
                  ID · {startup.id.toUpperCase()}
                </span>
              </div>

              <h1 className="font-display text-5xl lg:text-6xl tracking-tight text-bone-50 mb-3">
                {startup.name}
              </h1>
              <p className="text-lg text-[var(--text-secondary)] max-w-2xl">
                {startup.tagline}
              </p>

              <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-x-8 gap-y-4 max-w-2xl">
                <Stat icon={Calendar} label="Founded" value={formatDate(startup.foundedAt)} sub={`${ageMonths} months`} />
                <Stat icon={Building2} label="Capital sought" value={formatChf(startup.fundingRequestedChf)} />
                <Stat icon={Users2} label="Pre-A team" value={String(startup.features.preSeriesATeamSize)} sub={`${startup.features.preSeriesACLevel} C-level`} />
                <Stat icon={GraduationCap} label="Top university" value={startup.features.topUniversityFlag ? "Yes" : "No"} sub={startup.founderUniversity} />
              </div>
            </div>

            {/* Probability dial card */}
            <div className="lg:col-span-5">
              <div className="glass-strong rounded-2xl p-6">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div>
                    <p className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-signal-300 mb-1">
                      Model prediction
                    </p>
                    <p className="font-display text-2xl text-bone-50">
                      Probability of exit
                    </p>
                  </div>
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md ring-1 font-mono text-[0.6rem] uppercase tracking-[0.18em] ${tierBg} ${tierColor}`}>
                    {startup.prediction === "success" ? (
                      <>
                        <TrendingUp className="h-3 w-3" /> Forwarded
                      </>
                    ) : (
                      <>Filtered</>
                    )}
                  </span>
                </div>

                <div className="flex flex-col items-center my-2">
                  <ProbabilityDial score={startup.score} confidence={startup.modelConfidence} />
                </div>

                <div className="grid grid-cols-3 gap-px bg-signal-400/[0.07] rounded-lg overflow-hidden mt-4 border border-signal-400/[0.07]">
                  <MiniStat label="Tier" value={startup.scoreTier.toUpperCase()} highlight={startup.scoreTier === "high"} />
                  <MiniStat label="Confidence" value={formatPct(startup.modelConfidence, 0)} />
                  <MiniStat label="Model" value="LightGBM" />
                </div>

                <p className="mt-4 text-[0.7rem] text-[var(--text-muted)] leading-relaxed">
                  Predicted on pre-Series A signals only. No information from or after a Series A
                  round is used as input — feature engineering applies a strict temporal cutoff
                  to prevent leakage.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Body content */}
      <section className="mx-auto max-w-[1440px] px-6 lg:px-10 py-12">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* LEFT — ML Features */}
          <div className="lg:col-span-7 space-y-8">
            {/* ML Card header */}
            <div className="rounded-2xl border border-signal-400/15 bg-signal-400/[0.03] overflow-hidden">
              <div className="px-6 py-5 bg-signal-400/[0.04] border-b border-signal-400/[0.08]">
                <div className="flex items-start gap-3">
                  <div className="h-9 w-9 rounded-full bg-signal-400/15 border border-signal-400/30 flex items-center justify-center shrink-0">
                    <Cpu className="h-4 w-4 text-signal-300" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl text-bone-50">Objective ML model features</h3>
                    <p className="text-xs text-[var(--text-secondary)] mt-1">
                      Inputs used by the LightGBM classifier. Pre-Series A, leakage-proof.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                <FeatureRow
                  label={FEATURE_LABEL.category_code}
                  feature="category_code"
                  value={startup.sector}
                  isCategorical
                />
                <FeatureRow
                  label={FEATURE_LABEL.pre_series_a_team_size}
                  feature="pre_series_a_team_size"
                  value={String(startup.features.preSeriesATeamSize)}
                />
                <FeatureRow
                  label={FEATURE_LABEL.people_linked_total}
                  feature="people_linked_total"
                  value={String(startup.features.peopleLinkedTotal)}
                />
                <FeatureRow
                  label={FEATURE_LABEL.avg_team_edu_score}
                  feature="avg_team_edu_score"
                  value={startup.features.avgTeamEduScore.toFixed(2)}
                  scale={startup.features.avgTeamEduScore}
                />
                <FeatureRow
                  label={FEATURE_LABEL.pre_series_a_employees}
                  feature="pre_series_a_employees"
                  value={String(startup.features.preSeriesAEmployees)}
                />
                <FeatureRow
                  label={FEATURE_LABEL.people_with_degree_data}
                  feature="people_with_degree_data"
                  value={String(startup.features.peopleWithDegreeData)}
                />
                <FeatureRow
                  label={FEATURE_LABEL.pre_series_a_clevel}
                  feature="pre_series_a_clevel"
                  value={String(startup.features.preSeriesACLevel)}
                />
                <FeatureRow
                  label={FEATURE_LABEL.round_1}
                  feature="round_1"
                  value={formatChf(startup.features.round1AmountChf)}
                />
                <FeatureRow
                  label={FEATURE_LABEL.share_people_with_any_stem_degree}
                  feature="share_stem_degree"
                  value={formatPct(startup.features.shareStemDegree, 0)}
                  scale={startup.features.shareStemDegree}
                />
                <FeatureRow
                  label={FEATURE_LABEL.duration_1}
                  feature="duration_1"
                  value={`${startup.features.duration1Days} days`}
                />
              </div>
            </div>

            {/* Top drivers for THIS prediction */}
            <div className="glass rounded-2xl overflow-hidden">
              <div className="px-6 py-5 border-b border-signal-400/[0.07]">
                <h3 className="font-display text-xl text-bone-50">Why this score</h3>
                <p className="text-xs text-[var(--text-secondary)] mt-1">
                  Top features contributing to the predicted probability — LightGBM gain attribution for this instance.
                </p>
              </div>

              <div className="p-6 space-y-4">
                {startup.topDrivers.map((d) => (
                  <div key={d.feature}>
                    <div className="flex items-baseline justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span
                          className={
                            d.direction === "+"
                              ? "inline-flex h-4 w-4 items-center justify-center rounded-sm bg-signal-400/20 text-signal-300 text-xs font-mono"
                              : "inline-flex h-4 w-4 items-center justify-center rounded-sm bg-ink-700 text-[var(--text-muted)] text-xs font-mono"
                          }
                        >
                          {d.direction}
                        </span>
                        <span className="text-sm text-bone-50">{FEATURE_LABEL[d.feature] ?? d.feature}</span>
                        <code className="hidden sm:inline font-mono text-[0.62rem] text-[var(--text-muted)]">{d.feature}</code>
                      </div>
                      <span className="font-mono text-xs text-signal-200 tabular-nums">
                        {(d.contribution * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-ink-800 rounded-full overflow-hidden">
                      <div
                        className={
                          d.direction === "+"
                            ? "h-full bg-gradient-to-r from-signal-500/80 to-signal-300"
                            : "h-full bg-gradient-to-r from-ink-500 to-ink-400"
                        }
                        style={{ width: `${Math.min(100, d.contribution * 220)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Milestone timeline */}
            <div className="glass rounded-2xl overflow-hidden">
              <div className="px-6 py-5 border-b border-signal-400/[0.07]">
                <h3 className="font-display text-xl text-bone-50">Milestone timeline</h3>
                <p className="text-xs text-[var(--text-secondary)] mt-1">
                  Semantically clustered milestones (k=8) from the project's NLP pipeline. Embeddings via{" "}
                  <code className="font-mono text-signal-300/80">all-MiniLM-L6-v2</code>.
                </p>
              </div>

              <div className="p-6">
                <div className="relative pl-6">
                  {/* Vertical line */}
                  <div className="absolute left-2 top-2 bottom-2 w-px bg-signal-400/20" />
                  {startup.milestones.map((m, idx) => (
                    <div key={idx} className="relative pb-6 last:pb-0">
                      <div className="absolute -left-[18px] top-1.5 h-3 w-3 rounded-full bg-signal-300 ring-2 ring-ink-950" />
                      <div className="flex flex-wrap items-baseline gap-2 mb-1">
                        <span className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-signal-300/80">
                          {m.cluster}
                        </span>
                        <span className="font-mono text-[0.65rem] text-[var(--text-muted)]">
                          · {formatDate(m.date)}
                        </span>
                      </div>
                      <p className="text-sm text-[var(--text-secondary)]">{m.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — Quick info + analyst notes */}
          <div className="lg:col-span-5 space-y-6">
            {/* Model card */}
            <div className="glass rounded-2xl p-6">
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-signal-300 mb-3">
                Model card
              </p>
              <div className="space-y-3 text-sm">
                <InfoRow label="Architecture" value="LightGBM · class-balanced" />
                <InfoRow label="Training data" value="Crunchbase + NLP milestones" />
                <InfoRow label="Cutoff" value="Pre-Series A (leakage-proof)" />
                <InfoRow label="Test recall" value="0.69" mono />
                <InfoRow label="Test precision" value="0.17" mono />
                <InfoRow label="Test F1" value="0.27" mono />
              </div>
              <Link
                href="/about"
                className="mt-4 inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.16em] text-signal-300 hover:text-signal-200 transition-colors"
              >
                Full methodology
                <ExternalLink className="h-3 w-3" />
              </Link>
            </div>

            {/* The analyst notes — clearly separated */}
            <AnalystNotes />

            {/* Disclaimer */}
            <div className="rounded-2xl border border-signal-400/15 bg-ink-900/60 p-5">
              <div className="flex items-start gap-3">
                <BadgeCheck className="h-4 w-4 text-signal-300 mt-0.5 shrink-0" />
                <p className="text-[0.72rem] leading-relaxed text-[var(--text-secondary)]">
                  Augur is a <span className="text-bone-50">triage layer</span>, not a decision engine. The model re-orders the analyst's review queue but never auto-rejects a startup. Final evaluation rests with the investment committee.
                </p>
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

function Stat({
  icon: Icon,
  label,
  value,
  sub,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-1">
        <Icon className="h-3 w-3 text-signal-300/80" />
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-[var(--text-muted)]">{label}</span>
      </div>
      <p className="text-bone-50 font-medium">{value}</p>
      {sub && <p className="text-[0.65rem] text-[var(--text-muted)] mt-0.5">{sub}</p>}
    </div>
  );
}

function MiniStat({ label, value, highlight = false }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="bg-ink-900 px-3 py-2.5 text-center">
      <p className="font-mono text-[0.55rem] uppercase tracking-[0.16em] text-[var(--text-muted)] mb-1">{label}</p>
      <p className={`font-mono text-xs tabular-nums ${highlight ? "text-signal-300" : "text-bone-50"}`}>{value}</p>
    </div>
  );
}

function FeatureRow({
  label,
  feature,
  value,
  isCategorical = false,
  scale,
}: {
  label: string;
  feature: string;
  value: string;
  isCategorical?: boolean;
  scale?: number;
}) {
  return (
    <div className="py-2 border-b border-signal-400/[0.05] last:border-0">
      <div className="flex items-baseline justify-between gap-2 mb-1">
        <span className="text-sm text-bone-50">{label}</span>
        <span className={`font-mono text-sm tabular-nums ${isCategorical ? "text-signal-200" : "text-bone-50"}`}>
          {value}
        </span>
      </div>
      <div className="flex items-center justify-between gap-2">
        <code className="font-mono text-[0.6rem] text-[var(--text-muted)]">{feature}</code>
        {scale !== undefined && (
          <div className="flex-1 ml-2 max-w-[80px] h-1 rounded-full bg-ink-800 overflow-hidden">
            <div
              className="h-full bg-signal-400/60"
              style={{ width: `${scale * 100}%` }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

function InfoRow({ label, value, mono = false }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-2 text-sm">
      <span className="text-[var(--text-secondary)]">{label}</span>
      <span className={mono ? "font-mono text-bone-50 tabular-nums" : "text-bone-50"}>{value}</span>
    </div>
  );
}
