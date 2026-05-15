import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Augur · Pre-Series A Success Probability",
  description:
    "Machine learning triage for Swiss venture capital analysts. Read the signal. Back the founder.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="noise min-h-screen bg-ink-950 text-bone-50">
        {children}
      </body>
    </html>
  );
}
