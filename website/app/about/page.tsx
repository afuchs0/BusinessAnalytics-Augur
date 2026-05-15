import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FeatureImportance } from "@/components/FeatureImportance";
import { TEAM } from "@/lib/data";
import { ArrowRight, BookOpen, Database, GitBranch, ScrollText } from "lucide-react";

const INTERVIEWS = [
  {
    name: "Pavel Yakovlev",
    role: "Startup Manager",
    org: "Tenity",
    quote: "Early-stage screening is educated guessing — the volume of potential portfolio companies vastly exceeds the time analysts can dedicate to each one.",
  },
  {
    name: "Andrea Fritschi",
    role: "Chief Investment Officer",
    org: "Tenity",
    quote: "The useful question for a VC is less 'which startup survives?' and more 'which startup could become an outlier large enough to justify the portfolio model?'",
  },
  {
    name: "Flo Pattiwael",
    role: "Senior Associate",
    org: "Photon-Ventures",
    quote: "Some tasks can be completed four to six times faster using AI. It doesn't always translate into 'saved time' — but rather into doing more with the same time.",
  },
  {
    name: "Bernhard Petermeier",
    role: "Investment Professional",
    org: "XISTA Ventures",
    quote: "AI models trained on historical data tend to favor established patterns. In VC, success is driven by outliers — so the tool must be designed to avoid filtering them out.",
  },
];

export default function AboutPage() {
  return (
    <main>
      <Navbar />

      {/* ========================= HERO */}
      <section className="relative border-b border-signal-400/[0.07] py-20">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="relative mx-auto max-w-[1440px] px-6 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-7">
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-signal-300 mb-4">
                Research project · 363-1098-00L Business Analytics · FS26
              </p>
              <h1 className="font-display text-5xl lg:text-7xl tracking-tight text-bone-50 leading-[0.96]">
                Augmenting <em className="italic text-signal-300 font-light">venture capital</em> screening.
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-[var(--text-secondary)] max-w-2xl">
                A pre-Series A success-probability tool, developed at ETH Zürich's
                D-MTEC department for the FS26 Business Analytics capstone, in collaboration
                with practitioners across the Swiss and European VC ecosystem.
              </p>
            </div>

            <aside className="lg:col-span-5">
              <div className="glass rounded-2xl p-6">
                <p className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-signal-300 mb-4">
                  At a glance
                </p>
                <ul className="space-y-3 text-sm">
                  {[
                    ["Target", "P(IPO or acquisition)"],
                    ["Scoping", "Pre-Series A only"],
                    ["Architecture", "LightGBM vs. Logistic Regression"],
                    ["Training data", "Crunchbase + NLP milestones"],
                    ["Test recall", "0.69 – 0.76"],
                    ["Test precision", "0.16 – 0.17"],
                    ["Practitioner interviews", "4 (Tenity, Photon, XISTA)"],
                  ].map(([k, v]) => (
                    <li key={k} className="flex items-baseline justify-between gap-4 border-b border-signal-400/[0.06] pb-2 last:border-0">
                      <span className="text-[var(--text-secondary)]">{k}</span>
                      <span className="text-bone-50 font-mono text-xs tabular-nums">{v}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ========================= METHODOLOGY */}
      <section className="relative py-24">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-12 mb-16">
            <div className="lg:col-span-4">
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-signal-300 mb-4">
                Methodology
              </p>
              <h2 className="font-display text-4xl lg:text-5xl leading-tight text-bone-50">
                Following <em className="italic text-signal-300 font-light">CRISP-DM,</em> end to end.
              </h2>
            </div>
            <div className="lg:col-span-8">
              <p className="text-[var(--text-secondary)] leading-relaxed">
                The project follows the Cross-Industry Standard Process for Data Mining (CRISP-DM)
                framework: business understanding, data understanding, data preparation, modeling,
                evaluation, and deployment. Each phase maps onto a clearly delimited section of the report.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                icon: Database,
                phase: "01 · Data Understanding",
                title: "Crunchbase + relational joins",
                body: "Master records (objects), funding rounds, relationships, degrees, people, and an external milestones dataset — joined into a unified pre-Series A view.",
              },
              {
                icon: ScrollText,
                phase: "02 · Semantic clustering",
                title: "NLP milestone embeddings",
                body: "Sentence-transformer (all-MiniLM-L6-v2) → 384-dimensional vectors → K=8 clusters → TF-IDF-derived labels (product_launch_beta, funding_seed_round, etc.).",
              },
              {
                icon: GitBranch,
                phase: "03 · Feature engineering",
                title: "Leakage-proof temporal cutoff",
                body: "Every feature filtered to events occurring strictly before the company's earliest Series A or venture round. Right-censoring handled via Dec 2013 observation end.",
              },
              {
                icon: BookOpen,
                phase: "04 · Modeling",
                title: "Dual-model architecture",
                body: "Logistic Regression baseline (linear interpretability) benchmarked against LightGBM (native categorical splits, missing-value tolerance). Both class-balanced.",
              },
              {
                icon: Database,
                phase: "05 · Evaluation",
                title: "Recall-first metrics",
                body: "Optimised for capturing eventual exits — missing a unicorn (false negative) costs more than running diligence on a failure (false positive). Stratified random baseline as reference.",
              },
              {
                icon: GitBranch,
                phase: "06 · Deployment",
                title: "Decision support, not decision",
                body: "Augur is positioned as a triage layer — it re-orders the analyst's queue but never auto-rejects. Final evaluation remains with the investment committee.",
              },
            ].map((s, i) => (
              <div key={i} className="glass rounded-2xl p-6 hover:bg-signal-400/[0.04] transition-colors">
                <s.icon className="h-5 w-5 text-signal-300 mb-4" />
                <p className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-signal-300/70 mb-2">{s.phase}</p>
                <h3 className="font-display text-lg text-bone-50 mb-2">{s.title}</h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================= MODEL PERFORMANCE TABLE */}
      <section className="relative py-24 border-y border-signal-400/[0.07] bg-ink-900/40">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5">
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-signal-300 mb-4">
                Held-out test results
              </p>
              <h2 className="font-display text-4xl lg:text-5xl leading-tight text-bone-50 mb-6">
                A <em className="italic text-signal-300 font-light">3.4×</em> lift over the base rate.
              </h2>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                Both trained models substantially outperform the stratified random baseline.
                LightGBM offers slightly higher precision; Logistic Regression slightly higher recall.
                Both yield F1 scores roughly 5× the no-skill reference.
              </p>
            </div>

            <div className="lg:col-span-7">
              <div className="glass-strong rounded-2xl overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-signal-400/[0.08] bg-ink-900/40">
                      <th className="text-left px-5 py-3 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-[var(--text-muted)]">Model</th>
                      <th className="text-right px-5 py-3 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-[var(--text-muted)]">Accuracy</th>
                      <th className="text-right px-5 py-3 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-[var(--text-muted)]">Precision</th>
                      <th className="text-right px-5 py-3 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-[var(--text-muted)]">Recall</th>
                      <th className="text-right px-5 py-3 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-[var(--text-muted)]">F1</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-signal-400/[0.05]">
                    <tr>
                      <td className="px-5 py-4">
                        <p className="text-sm text-[var(--text-muted)]">Stratified random baseline</p>
                      </td>
                      <td className="px-5 py-4 text-right font-mono text-sm text-[var(--text-muted)] tabular-nums">90.11%</td>
                      <td className="px-5 py-4 text-right font-mono text-sm text-[var(--text-muted)] tabular-nums">0.05</td>
                      <td className="px-5 py-4 text-right font-mono text-sm text-[var(--text-muted)] tabular-nums">0.05</td>
                      <td className="px-5 py-4 text-right font-mono text-sm text-[var(--text-muted)] tabular-nums">0.05</td>
                    </tr>
                    <tr>
                      <td className="px-5 py-4">
                        <p className="text-sm text-bone-50">Logistic Regression</p>
                        <p className="text-[0.65rem] text-[var(--text-muted)] mt-0.5">Linear interpretability</p>
                      </td>
                      <td className="px-5 py-4 text-right font-mono text-sm text-bone-50 tabular-nums">77.66%</td>
                      <td className="px-5 py-4 text-right font-mono text-sm text-signal-300 tabular-nums">0.16</td>
                      <td className="px-5 py-4 text-right font-mono text-sm text-signal-300 tabular-nums">0.76</td>
                      <td className="px-5 py-4 text-right font-mono text-sm text-signal-300 tabular-nums">0.26</td>
                    </tr>
                    <tr className="bg-signal-400/[0.03]">
                      <td className="px-5 py-4">
                        <p className="text-sm text-bone-50">LightGBM</p>
                        <p className="text-[0.65rem] text-signal-300/70 mt-0.5">Production model · v2.7.1</p>
                      </td>
                      <td className="px-5 py-4 text-right font-mono text-sm text-bone-50 tabular-nums">80.95%</td>
                      <td className="px-5 py-4 text-right font-mono text-sm text-signal-300 tabular-nums">0.17</td>
                      <td className="px-5 py-4 text-right font-mono text-sm text-signal-300 tabular-nums">0.69</td>
                      <td className="px-5 py-4 text-right font-mono text-sm text-signal-300 tabular-nums">0.27</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="mt-4 text-[0.7rem] text-[var(--text-muted)] leading-relaxed">
                Class imbalance: 95% negatives, 5% positives. Models trained with class-balanced
                weighting (<code className="font-mono text-signal-300/70">class_weight='balanced'</code> and{" "}
                <code className="font-mono text-signal-300/70">scale_pos_weight</code>).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================= FEATURE IMPORTANCE */}
      <section className="relative py-24">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
            <div className="lg:col-span-5">
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-signal-300 mb-4">
                Feature attribution
              </p>
              <h2 className="font-display text-4xl lg:text-5xl leading-tight text-bone-50 mb-6">
                Sector and team <em className="italic text-signal-300 font-light">dominate</em> the signal.
              </h2>
              <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
                Just eight features account for 80% of total information gain. Industry sector alone
                contributes 36.2% — confirming that the structural macro factor of which market a
                startup operates in is the single most predictive signal at the pre-Series A stage.
              </p>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                Team and human-capital features — pre-Series A team size, network depth, education
                score, employee count, C-level coverage, STEM concentration — together contribute
                more gain than any other thematic group. The model's weighting is a quantitative
                analogue of practitioner intuition: at the earliest stages, you back the people, not the product.
              </p>
            </div>

            <div className="lg:col-span-7">
              <div className="glass-strong rounded-2xl p-8">
                <FeatureImportance />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================= PRACTITIONER VOICES */}
      <section className="relative py-24 border-y border-signal-400/[0.07] bg-ink-900/40">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-signal-300 mb-4">
              Practitioner perspectives
            </p>
            <h2 className="font-display text-4xl lg:text-5xl leading-tight text-bone-50">
              Validated against <em className="italic text-signal-300 font-light">four</em> VC operators.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {INTERVIEWS.map((i) => (
              <div key={i.name} className="glass rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-5">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-signal-300 to-signal-600 flex items-center justify-center font-mono text-xs text-ink-950">
                    {i.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <p className="font-display text-bone-50">{i.name}</p>
                    <p className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-signal-300/80">
                      {i.role} · {i.org}
                    </p>
                  </div>
                </div>
                <blockquote className="text-bone-50/85 italic leading-relaxed border-l-2 border-signal-300/40 pl-4">
                  "{i.quote}"
                </blockquote>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================= TEAM */}
      <section id="team" className="relative py-24">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-12 mb-16">
            <div className="lg:col-span-5">
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-signal-300 mb-4">
                Research team · Group 1
              </p>
              <h2 className="font-display text-4xl lg:text-5xl leading-tight text-bone-50">
                Five researchers. <em className="italic text-signal-300 font-light">One question.</em>
              </h2>
              <p className="mt-6 text-[var(--text-secondary)] leading-relaxed">
                Convened at ETH Zürich's D-MTEC department for the FS26 Business Analytics capstone.
                Each member contributed across machine learning, data engineering, business strategy,
                and external stakeholder engagement.
              </p>
            </div>

            <div className="lg:col-span-7 space-y-4">
              {TEAM.map((m) => (
                <div key={m.name} className="glass rounded-2xl p-6 hover:bg-signal-400/[0.04] transition-colors">
                  <div className="flex items-start gap-5">
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
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                        <p className="font-display text-xl text-bone-50">{m.name}</p>
                        <p className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-signal-300/80">
                          {m.role}
                        </p>
                      </div>
                      <p className="text-sm leading-relaxed text-[var(--text-secondary)]">{m.bio}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================= FINAL CTA */}
      <section className="relative py-24 border-t border-signal-400/[0.07]">
        <div className="absolute inset-0 bg-radial-signal opacity-50" />
        <div className="relative mx-auto max-w-[1440px] px-6 lg:px-10 text-center">
          <h2 className="font-display text-4xl lg:text-6xl leading-tight tracking-tight text-bone-50 max-w-3xl mx-auto text-balance">
            See the pipeline in <em className="italic text-signal-300 font-light">motion.</em>
          </h2>
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
