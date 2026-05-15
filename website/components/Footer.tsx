import Link from "next/link";
import { AugurLogo } from "./AugurLogo";

export function Footer() {
  return (
    <footer className="relative mt-32 border-t border-signal-400/[0.07] bg-ink-950">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-signal-300/30 to-transparent" />
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <AugurLogo size={36} showWordmark showTagline />
            <p className="mt-6 max-w-md text-sm leading-relaxed text-[var(--text-secondary)]">
              A pre-Series A success-probability tool for Swiss VC analysts.
              Built as a research project at ETH Zürich, D-MTEC, in collaboration with
              practitioners across the Swiss venture ecosystem.
            </p>
            <p className="mt-4 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-[var(--text-muted)]">
              363-1098-00L Business Analytics · FS26 · Group 1
            </p>
          </div>

          <div className="md:col-span-3">
            <h4 className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-signal-300/80 mb-4">
              Product
            </h4>
            <ul className="space-y-3 text-sm text-[var(--text-secondary)]">
              <li><Link href="/explorer" className="hover:text-bone-50 transition-colors">Pipeline</Link></li>
              <li><Link href="/about" className="hover:text-bone-50 transition-colors">Methodology</Link></li>
              <li><Link href="/about#team" className="hover:text-bone-50 transition-colors">Research team</Link></li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <h4 className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-signal-300/80 mb-4">
              Citation
            </h4>
            <p className="text-xs leading-relaxed text-[var(--text-secondary)] font-mono">
              Fuchs, A., Ginter, E., Lopez, H., Nordmann, J., Walder, P. (2026).
              <em className="not-italic text-bone-50"> Augmenting Venture Capital Screening: A Pre-Series A Success-Probability Tool for Swiss VC Analysts.</em> ETH Zürich, D-MTEC.
            </p>
          </div>
        </div>

        <div className="mt-16 flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-t border-signal-400/[0.07] pt-6 text-[0.7rem] font-mono uppercase tracking-[0.18em] text-[var(--text-muted)]">
          <p>© 2026 Augur Research Group · ETH Zürich · D-MTEC</p>
          <p>Triage layer · Not a decision engine · Human-in-the-loop</p>
        </div>
      </div>
    </footer>
  );
}
