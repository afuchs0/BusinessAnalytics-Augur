import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HeroRadar } from "@/components/HeroRadar";
import { LiveTicker } from "@/components/LiveTicker";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { FeatureImportance } from "@/components/FeatureImportance";
import { ArrowRight, Database, GitBranch, Layers, ShieldCheck, Sparkles, Workflow } from "lucide-react";
import { TEAM } from "@/lib/data";

export default function LandingPage() {
  return (
    <main className="relative overflow-hidden">
      <Navbar />

      {/* ============================================ HERO */}
      <section className="relative">
        <div className="absolute inset-0 grid-bg opacity-50" />
        <div className="absolute inset-0 bg-radial-signal opacity-70" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-signal-300/30 to-transparent" />

        <div className="relative mx-auto max-w-[1440px] px-6 lg:px-10 pt-16 pb-24 lg:pt-24 lg:pb-32">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 rounded-full border border-signal-400/20 bg-signal-400/[0.06] px-3 py-1.5 mb-8">
                <span className="h-1.5 w-1.5 rounded-full bg-signal-300 live-dot" />
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-signal-200">
                  ETH Zürich · D-MTEC · Business Analytics FS26
                </span>
              </div>

              <h1 className="font-display text-[clamp(2.6rem,7vw,5.5rem)] leading-[0.96] tracking-tight text-bone-50 text-balance">
                Read the signal.
                <br />
                <span className="text-signal-300 italic font-light">Back the founder.</span>
              </h1>

              <p className="mt-8 max-w-xl text-lg leading-relaxed text-[var(--text-secondary)] text-balance">
                A machine-learning triage layer that scores Swiss pre-Series A startups
                on their probability of reaching IPO or acquisition — so analysts spend their hours where the next exit is hiding.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Link
                  href="/explorer"
                  className="group inline-flex items-center gap-3 rounded-full bg-signal-300 px-6 py-3.5 text-sm font-medium uppercase tracking-[0.16em] text-ink-950 hover:bg-signal-200 transition-colors"
                >
                  Explore Startups
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-3 rounded-full border border-bone-50/15 px-6 py-3.5 text-sm uppercase tracking-[0.16em] text-bone-50 hover:bg-bone-50/[0.04] transition-colors"
                >
                  Methodology
                </Link>
              </div>

              {/* Quick KPI strip */}
              <div className="mt-16 grid grid-cols-3 gap-6 max-w-xl border-l border-signal-400/15 pl-6">
                <div>
                  <p className="font-display text-3xl font-light text-bone-50 tabular-nums">
                    3.4<span className="text-signal-300">×</span>
                  </p>
                  <p className="mt-1 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-[var(--text-muted)]">
                    screening<br/>hit-rate lift
                  </p>
                </div>
                <div>
                  <p className="font-display text-3xl font-light text-bone-50 tabular-nums">
                    0.76
                  </p>
                  <p className="mt-1 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-[var(--text-muted)]">
                    recall on<br/>held-out test
                  </p>
                </div>
                <div>
                  <p className="font-display text-3xl font-light text-bone-50 tabular-nums">
                    5.9<span className="text-signal-300 text-lg">mo</span>
                  </p>
                  <p className="mt-1 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-[var(--text-muted)]">
                    payback<br/>per team
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <HeroRadar />
            </div>
          </div>
        </div>

        <LiveTicker />
      </section>

      {/* ============================================ THE PROBLEM */}
      <section className="relative py-28">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-signal-300 mb-4">
                01 · The Problem
              </p>
              <h2 className="font-display text-4xl lg:text-5xl leading-[1.05] tracking-tight text-bone-50">
                Venture capital screening is <em className="text-signal-300 italic font-light">educated guessing</em> at scale.
              </h2>
            </div>

            <div className="lg:col-span-8 space-y-8">
              <p className="text-lg leading-relaxed text-[var(--text-secondary)]">
                VC returns follow a power law: roughly 1% of deals generate most of the fund's returns,
                yet a typical Swiss analyst evaluates between <span className="text-bone-50">1,000 and 2,500 startups per year</span>
                {" "}at the top of the funnel. The result, as practitioners at Tenity, Photon-Ventures, and XISTA confirmed
                in our interviews, is what one called "<em>educated guessing</em>" — pattern recognition stretched thin.
              </p>

              <div className="grid sm:grid-cols-3 gap-6">
                <div className="border-l border-signal-400/20 pl-5">
                  <p className="font-display text-5xl font-light text-signal-300 tabular-nums">80%</p>
                  <p className="mt-2 text-sm text-[var(--text-secondary)]">of VC investments fail to return capital</p>
                </div>
                <div className="border-l border-signal-400/20 pl-5">
                  <p className="font-display text-5xl font-light text-signal-300 tabular-nums">1%</p>
                  <p className="mt-2 text-sm text-[var(--text-secondary)]">of outliers generate 100×+ returns</p>
                </div>
                <div className="border-l border-signal-400/20 pl-5">
                  <p className="font-display text-5xl font-light text-signal-300 tabular-nums">~5%</p>
                  <p className="mt-2 text-sm text-[var(--text-secondary)]">base rate of pre-Series A → exit</p>
                </div>
              </div>

              <blockquote className="border-l-2 border-signal-300 pl-6 py-2 italic text-bone-50/80 text-lg">
                "At the earliest stages, signals are scarce and noisy. The decisive question
                remains: do you back the person?"
                <footer className="not-italic mt-3 font-mono text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]">
                  Pavel Yakovlev · Startup Manager · Tenity (Zürich)
                </footer>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ THE APPROACH */}
      <section className="relative py-28 border-y border-signal-400/[0.07] bg-ink-900/40">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="relative mx-auto max-w-[1440px] px-6 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-12 mb-16">
            <div className="lg:col-span-5">
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-signal-300 mb-4">
                02 · The Approach
              </p>
              <h2 className="font-display text-4xl lg:text-5xl leading-[1.05] tracking-tight text-bone-50">
                A triage layer — <em className="text-signal-300 italic font-light">not a decision engine.</em>
              </h2>
              <p className="mt-6 text-[var(--text-secondary)] leading-relaxed">
                Augur reframes the analyst's question from <em>"which startup wins?"</em>
                to <em>"where should the next hour of attention go?"</em> — leaving the founder
                judgment work firmly under human authority.
              </p>
            </div>

            <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
              {[
                {
                  icon: Database,
                  title: "Crunchbase + NLP-clustered milestones",
                  body: "Sentence-transformer embeddings (all-MiniLM-L6-v2) cluster startup milestones into 8 semantic categories: product launches, funding rounds, partnerships, patents, awards.",
                },
                {
                  icon: GitBranch,
                  title: "Leakage-proof temporal cutoff",
                  body: "Every feature is filtered to information strictly available before each company's earliest Series A or venture round — no signal from the future leaks backwards.",
                },
                {
                  icon: Layers,
                  title: "Dual-model architecture",
                  body: "Logistic Regression (linear interpretability) benchmarked against LightGBM (non-linear, native categorical splits). Class-balanced training for the 95/5 imbalance.",
                },
                {
                  icon: ShieldCheck,
                  title: "Recall-first evaluation",
                  body: "Optimised for capturing eventual exits (recall 0.69–0.76), not for hit-rate maximisation. Missing a unicorn costs more than diligence on a near-miss.",
                },
              ].map((card, i) => (
                <div
                  key={i}
                  className="glass rounded-2xl p-6 hover:bg-signal-400/[0.04] transition-colors"
                >
                  <card.icon className="h-5 w-5 text-signal-300 mb-4" />
                  <h3 className="font-display text-lg text-bone-50 mb-2">{card.title}</h3>
                  <p className="text-sm leading-relaxed text-[var(--text-secondary)]">{card.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ FEATURES & METHODOLOGY */}
      <section className="relative py-28">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
            <div className="lg:col-span-5">
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-signal-300 mb-4">
                03 · Model Signals
              </p>
              <h2 className="font-display text-4xl lg:text-5xl leading-[1.05] tracking-tight text-bone-50 mb-6">
                Eight features. <br/><em className="text-signal-300 italic font-light">Eighty percent</em> of the signal.
              </h2>
              <p className="text-[var(--text-secondary)] leading-relaxed mb-8">
                LightGBM's gain attribution shows a striking concentration: industry sector
                and team composition dominate, with human-capital features collectively
                outweighing every other thematic group. The model's weighting is a quantitative
                analogue of what experienced investors already know.
              </p>

              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-signal-300 shrink-0" />
                  <p className="text-[var(--text-secondary)]">
                    <span className="text-bone-50">Industry sector</span> captures the dominant
                    structural factor in early-stage outcomes.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-signal-300 shrink-0" />
                  <p className="text-[var(--text-secondary)]">
                    <span className="text-bone-50">Team & human capital features</span> contribute
                    a larger share of gain than any other thematic group.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-bone-300/60 shrink-0" />
                  <p className="text-[var(--text-secondary)]">
                    <span className="text-bone-50">Funding-structure features</span> appear in the top 10
                    but with lower magnitude — <em>who</em> is behind a startup matters more than
                    <em> whether</em> it has raised early capital.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="glass-strong rounded-2xl p-8">
                <div className="flex items-baseline justify-between mb-6 pb-4 border-b border-signal-400/[0.07]">
                  <div>
                    <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-signal-300">
                      Feature gain attribution
                    </p>
                    <p className="text-bone-50 font-display text-xl mt-1">Top 10 predictive signals</p>
                  </div>
                  <p className="font-mono text-xs text-[var(--text-muted)]">LightGBM v2.7.1</p>
                </div>
                <FeatureImportance />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ ECONOMIC VALUE */}
      <section className="relative py-28 border-y border-signal-400/[0.07] bg-gradient-to-b from-ink-900/40 to-ink-950">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-12 mb-16">
            <div className="lg:col-span-6">
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-signal-300 mb-4">
                04 · The Economics
              </p>
              <h2 className="font-display text-4xl lg:text-5xl leading-[1.05] tracking-tight text-bone-50">
                Doubled throughput. <br/><em className="text-signal-300 italic font-light">Halved cost-per-screen.</em>
              </h2>
            </div>
            <div className="lg:col-span-6 flex items-end">
              <p className="text-[var(--text-secondary)] leading-relaxed">
                Modelled on a two-analyst Swiss VC team processing 500 startups annually. The model lifts
                precision from the 5% base rate to ~17%, reduces screening time-share from 70% to 15%,
                and redirects analyst hours into the founder-due-diligence work practitioners identified as decisive.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-signal-400/[0.07] rounded-2xl overflow-hidden">
            {[
              { value: 2, suffix: "×", label: "Daily throughput per analyst", sub: "5–10 → 10–20 startups/day" },
              { value: 100, prefix: "CHF ", suffix: "K", label: "Net annual labor savings", sub: "per two-analyst team" },
              { value: 47, suffix: "%", label: "Reduction in cost-per-screen", sub: "CHF 88 → CHF 46.75" },
              { value: 5.9, decimals: 1, suffix: " mo", label: "Payback on build cost", sub: "Mid-point: CHF 47K" },
            ].map((kpi, i) => (
              <div key={i} className="bg-ink-900 p-8 lg:p-10">
                <p className="font-display text-5xl lg:text-6xl font-light text-bone-50 tabular-nums">
                  <AnimatedCounter
                    value={kpi.value}
                    prefix={kpi.prefix}
                    suffix={kpi.suffix}
                    decimals={kpi.decimals ?? 0}
                  />
                </p>
                <p className="mt-4 text-sm text-bone-50">{kpi.label}</p>
                <p className="mt-1 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-[var(--text-muted)]">{kpi.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ WORKFLOW */}
      <section className="relative py-28">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-signal-300 mb-4">
              05 · Analyst Workflow
            </p>
            <h2 className="font-display text-4xl lg:text-5xl leading-[1.05] tracking-tight text-bone-50">
              The funnel, <em className="text-signal-300 italic font-light">reordered.</em>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Ingest & Score",
                body: "Every new inbound or scraped startup is scored on ingestion against a 384-dimensional milestone embedding and team-composition feature set.",
              },
              {
                step: "02",
                title: "Rank & Triage",
                body: "Analysts review a ranked pipeline at the start of each day. Buckets — high, medium, low — surface the strongest founder-quality signal first.",
              },
              {
                step: "03",
                title: "Re-score Weekly",
                body: "As milestone, team, and funding data accrue, the pipeline rescores. Quarterly full retraining mitigates drift across vintages.",
              },
            ].map((s, i) => (
              <div key={i} className="relative">
                <div className="absolute -top-2 left-0 font-mono text-[0.65rem] tracking-[0.2em] text-signal-300/70">
                  /{s.step}
                </div>
                <div className="pt-8 border-t border-signal-400/15">
                  <h3 className="font-display text-2xl text-bone-50 mb-3">{s.title}</h3>
                  <p className="text-[var(--text-secondary)] leading-relaxed">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ TEAM PREVIEW */}
      <section className="relative py-28 border-t border-signal-400/[0.07]">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-12 mb-16">
            <div className="lg:col-span-5">
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-signal-300 mb-4">
                06 · Research Team
              </p>
              <h2 className="font-display text-4xl lg:text-5xl leading-[1.05] tracking-tight text-bone-50">
                Group 1 · <em className="text-signal-300 italic font-light">ETH Zürich</em>
              </h2>
              <p className="mt-6 text-[var(--text-secondary)] leading-relaxed max-w-md">
                Five researchers spanning machine learning, data engineering, business
                strategy, and venture capital — convened at ETH's D-MTEC department for
                the FS26 Business Analytics capstone.
              </p>
              <Link
                href="/about"
                className="mt-8 inline-flex items-center gap-2 text-sm uppercase tracking-[0.18em] text-signal-300 hover:text-signal-200 transition-colors group"
              >
                Read the full methodology
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
              {TEAM.map((m, i) => (
                <div key={i} className="glass rounded-2xl p-5 hover:bg-signal-400/[0.04] transition-colors">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full bg-gradient-to-br from-signal-300 to-signal-600 flex items-center justify-center">
                      {m.image ? (
                        <img 
                          src={m.image} 
                          alt={m.name} 
                          className="h-full w-full object-cover" 
                        />
                      ) : (
                        <span className="font-mono text-xs font-medium text-ink-950 uppercase">
                          {m.name.charAt(0)}
                        </span>
                      )}
                    </div>
                    <div>
                      <p className="font-display text-bone-50">{m.name}</p>
                      <p className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-signal-300/80">
                        {m.role}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ FINAL CTA */}
      <section className="relative py-28">
        <div className="absolute inset-0 bg-radial-signal opacity-50" />
        <div className="relative mx-auto max-w-[1440px] px-6 lg:px-10 text-center">
          <Sparkles className="h-6 w-6 text-signal-300 mx-auto mb-6" />
          <h2 className="font-display text-5xl lg:text-7xl leading-[0.96] tracking-tight text-bone-50 max-w-4xl mx-auto text-balance">
            The model can <em className="italic text-signal-300 font-light">read the signals.</em><br/>
            Only the analyst can back the founder.
          </h2>
          <p className="mt-8 text-[var(--text-secondary)] max-w-xl mx-auto">
            Explore the Augur pipeline — 30 mock pre-Series A startups, scored, ranked,
            and ready for analyst review.
          </p>
          <Link
            href="/explorer"
            className="mt-10 inline-flex items-center gap-3 rounded-full bg-signal-300 px-8 py-4 text-sm font-medium uppercase tracking-[0.16em] text-ink-950 hover:bg-signal-200 transition-colors group"
          >
            Open Pipeline
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
