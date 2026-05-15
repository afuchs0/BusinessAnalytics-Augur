// Mock data layer for Augur demo.
// All ML-model features below mirror those engineered in the actual project
// (see Section 5.3.2 and Figure 3 of the report): category_code,
// pre_series_a_team_size, people_linked_total, avg_team_edu_score,
// pre_series_a_employees, people_with_degree_data, pre_series_a_clevel,
// round_1, share_people_with_any_stem_degree, duration_1.




export type Prediction = "success" | "failure";

export interface MilestoneSignal {
  cluster: string; // semantic milestone cluster from NLP (Section 5.2)
  description: string;
  date: string;
}

export interface Startup {
  id: string;
  name: string;
  tagline: string;
  sector: string; // category_code
  canton: string;
  city: string;
  foundedAt: string;
  fundingRequestedChf: number; // current ask
  // ML features (pre-Series A snapshot — leakage-proof per report Section 5.3.2)
  features: {
    preSeriesATeamSize: number;
    peopleLinkedTotal: number;
    avgTeamEduScore: number; // 0–1 normalized
    preSeriesAEmployees: number;
    peopleWithDegreeData: number;
    preSeriesACLevel: number;
    round1AmountChf: number;
    shareStemDegree: number; // 0–1
    duration1Days: number; // time-to-first-round
    topUniversityFlag: boolean;
  };
  // ML output
  score: number; // 0–1 — predicted P(IPO or acquisition)
  prediction: Prediction;
  modelConfidence: number; // 0–1, derived
  scoreTier: "low" | "medium" | "high";
  // Top contributing features (LightGBM gain attribution, demo)
  topDrivers: { feature: string; contribution: number; direction: "+" | "-" }[];
  milestones: MilestoneSignal[];
  // Mock analyst-entered fields (clearly distinguished from ML)
  analystNotes?: {
    founderReliability?: number;
    teamCredibility?: number;
    marketAttractiveness?: number;
    potentialRoi?: number;
    strategicPositioning?: number;
    investorConfidence?: number;
    productVisionQuality?: number;
    freeText?: string;
  };
  // Reference university (for "top university" flag, used in features)
  founderUniversity: string;
}

// Sectors taken from Crunchbase category_code domain — the single most
// influential feature in the LightGBM model (36.2% of total gain).
const SECTORS = [
  "AI / ML",
  "Biotech",
  "FinTech",
  "CleanTech",
  "DeepTech",
  "Quantum",
  "Robotics",
  "SaaS",
  "HealthTech",
  "MedTech",
  "Cybersecurity",
  "Space",
] as const;

const CANTONS = [
  { code: "ZH", name: "Zürich", city: "Zürich" },
  { code: "VD", name: "Vaud", city: "Lausanne" },
  { code: "GE", name: "Geneva", city: "Geneva" },
  { code: "BS", name: "Basel-Stadt", city: "Basel" },
  { code: "BE", name: "Bern", city: "Bern" },
  { code: "ZG", name: "Zug", city: "Zug" },
  { code: "SG", name: "St. Gallen", city: "St. Gallen" },
  { code: "TI", name: "Ticino", city: "Lugano" },
];

const UNIVERSITIES = [
  "ETH Zürich",
  "EPFL",
  "University of Zürich",
  "University of Basel",
  "University of Bern",
  "University of Geneva",
  "USI Lugano",
  "University of St. Gallen",
];

// Semantic milestone clusters (k=8) from Section 5.2 of the report.
const MILESTONE_CLUSTERS = [
  "product_launch_beta",
  "funding_seed_round",
  "team_hire_engineering",
  "partnership_enterprise_deal",
  "award_recognition_grant",
  "patent_ip_filing",
  "user_growth_traction",
  "regulatory_certification",
];

// Deterministic pseudo-random so the demo is stable across reloads
function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const rng = mulberry32(20260514);

function pick<T>(arr: readonly T[]): T {
  return arr[Math.floor(rng() * arr.length)];
}

function rand(min: number, max: number): number {
  return rng() * (max - min) + min;
}

function randInt(min: number, max: number): number {
  return Math.floor(rand(min, max + 1));
}

// Names drawn from a deep-tech-leaning Swiss VC pipeline aesthetic.
const STARTUP_NAMES: Array<{ name: string; tagline: string; sectorHint: typeof SECTORS[number] }> = [
  { name: "Axon Quantum AG", tagline: "Quantum error correction for fault-tolerant compute", sectorHint: "Quantum" },
  { name: "Ciphernode Labs", tagline: "Post-quantum cryptography for institutional finance", sectorHint: "Cybersecurity" },
  { name: "SynopticOS", tagline: "Foundation model orchestration for enterprise teams", sectorHint: "AI / ML" },
  { name: "Valoris Health", tagline: "Multimodal diagnostics for early-onset Alzheimer's", sectorHint: "HealthTech" },
  { name: "Luminate AI", tagline: "Vertical agent infrastructure for legal workflows", sectorHint: "AI / ML" },
  { name: "Seraph Robotics", tagline: "Bipedal robotics platform for industrial logistics", sectorHint: "Robotics" },
  { name: "Proxima Materials", tagline: "AI-designed solid-state battery electrolytes", sectorHint: "CleanTech" },
  { name: "GreenFlow AG", tagline: "Carbon-aware grid orchestration for utilities", sectorHint: "CleanTech" },
  { name: "AgroSense Switzerland", tagline: "Hyperlocal yield forecasting from satellite + soil", sectorHint: "DeepTech" },
  { name: "NovaBridge FinTech", tagline: "Cross-border tokenized settlement rails", sectorHint: "FinTech" },
  { name: "Helia Bioworks", tagline: "Synthetic biology platform for rare disease therapeutics", sectorHint: "Biotech" },
  { name: "Orbital Forge", tagline: "In-orbit servicing & debris-mitigation hardware", sectorHint: "Space" },
  { name: "MedAxis Imaging", tagline: "AI radiology co-pilot for breast cancer screening", sectorHint: "MedTech" },
  { name: "Lattice Materials", tagline: "Topological insulators for next-gen photonics", sectorHint: "DeepTech" },
  { name: "Pulsewave Analytics", tagline: "Real-time risk surface for private credit", sectorHint: "FinTech" },
  { name: "Verdant Robotics SA", tagline: "Autonomous orchard-management robots", sectorHint: "Robotics" },
  { name: "Cortexa Bio", tagline: "Closed-loop neuromodulation for treatment-resistant depression", sectorHint: "Biotech" },
  { name: "Stratos Aerospace", tagline: "Sub-orbital cargo logistics, Bern-to-Singapore", sectorHint: "Space" },
  { name: "Boreal Energy", tagline: "Deep-geothermal turnkey systems for district heating", sectorHint: "CleanTech" },
  { name: "Aletheia Models", tagline: "Verified-output LLM serving for regulated industries", sectorHint: "AI / ML" },
  { name: "Quantinex Compute", tagline: "Hybrid quantum-classical optimization-as-a-service", sectorHint: "Quantum" },
  { name: "Sentry Systems CH", tagline: "Adversarial-ML defense for industrial control systems", sectorHint: "Cybersecurity" },
  { name: "MimirIQ", tagline: "Structured-data extraction for life-science M&A", sectorHint: "SaaS" },
  { name: "Helvetic Insurtech", tagline: "Embedded micro-insurance for the gig economy", sectorHint: "FinTech" },
  { name: "Bionic Vue", tagline: "AR-guided surgical navigation for orthopedics", sectorHint: "MedTech" },
  { name: "Telluric Materials", tagline: "Direct-air-capture sorbents at sub-$100/ton", sectorHint: "CleanTech" },
  { name: "Echelon Compute", tagline: "Edge-deployable inference for autonomous vehicles", sectorHint: "AI / ML" },
  { name: "Patera Diagnostics", tagline: "Liquid-biopsy platform for pancreatic cancer", sectorHint: "HealthTech" },
  { name: "Tessera Labs", tagline: "Open-source toolchain for verifiable compute", sectorHint: "DeepTech" },
  { name: "Halcyon Therapeutics", tagline: "GLP-class therapeutics for non-alcoholic steatohepatitis", sectorHint: "Biotech" },
];

const FEATURE_LABEL: Record<string, string> = {
  category_code: "Industry sector",
  pre_series_a_team_size: "Pre-Series A team size",
  people_linked_total: "Network depth (people linked)",
  avg_team_edu_score: "Avg. team education score",
  pre_series_a_employees: "Pre-Series A employees",
  people_with_degree_data: "Documented founder education",
  pre_series_a_clevel: "C-level coverage pre-Series A",
  round_1: "Round 1 amount raised",
  share_people_with_any_stem_degree: "STEM concentration",
  duration_1: "Time to first round (days)",
  top_university_flag: "Top-university affiliation",
};

function tierFromScore(s: number): "low" | "medium" | "high" {
  if (s >= 0.7) return "high";
  if (s >= 0.4) return "medium";
  return "low";
}

function generateStartups(): Startup[] {
  return STARTUP_NAMES.map((s, i) => {
    const canton = pick(CANTONS);
    const sector = s.sectorHint;
    const foundedYear = randInt(2019, 2024);
    const foundedMonth = randInt(1, 12);
    const foundedDay = randInt(1, 28);
    const foundedAt = `${foundedYear}-${String(foundedMonth).padStart(2, "0")}-${String(foundedDay).padStart(2, "0")}`;

    // Score generation — biased so a small subset reaches the "success" band,
    // mirroring the ~5% real-world base rate but lifted to the model's
    // 16-17% precision (Section 5.7).
    const baseRoll = rng();
    let score: number;
    if (baseRoll < 0.18) {
      // High-probability cluster
      score = rand(0.7, 0.94);
    } else if (baseRoll < 0.45) {
      score = rand(0.42, 0.69);
    } else {
      score = rand(0.05, 0.41);
    }

    // Features correlated with score (so detail pages feel coherent)
    const features = {
      preSeriesATeamSize: Math.max(2, Math.round(rand(2, 14) + score * 6)),
      peopleLinkedTotal: Math.round(rand(4, 30) + score * 25),
      avgTeamEduScore: Math.min(1, Math.max(0.2, rand(0.35, 0.85) + (score - 0.5) * 0.3)),
      preSeriesAEmployees: Math.max(1, Math.round(rand(1, 12) + score * 5)),
      peopleWithDegreeData: Math.max(1, Math.round(rand(1, 8) + score * 4)),
      preSeriesACLevel: Math.max(1, Math.round(rand(1, 4) + score * 1.5)),
      round1AmountChf: Math.round((rand(0.2, 3.2) + score * 1.5) * 1_000_000),
      shareStemDegree: Math.min(1, Math.max(0.1, rand(0.3, 0.95))),
      duration1Days: Math.round(rand(90, 540) - score * 100),
      topUniversityFlag: rng() < 0.4 + score * 0.4,
    };

    const fundingRequested = Math.round((rand(0.8, 12) + score * 4) * 1_000_000);

    // Top drivers — pulled from the actual top-10 features (Figure 3a)
    const driverPool = [
      { feature: "category_code", base: 0.36 },
      { feature: "pre_series_a_team_size", base: 0.23 },
      { feature: "people_linked_total", base: 0.054 },
      { feature: "avg_team_edu_score", base: 0.05 },
      { feature: "pre_series_a_employees", base: 0.031 },
      { feature: "people_with_degree_data", base: 0.028 },
      { feature: "pre_series_a_clevel", base: 0.028 },
      { feature: "round_1", base: 0.026 },
      { feature: "share_people_with_any_stem_degree", base: 0.025 },
      { feature: "duration_1", base: 0.023 },
    ];
    const topDrivers = driverPool.slice(0, 5).map((d) => ({
      feature: d.feature,
      contribution: d.base + (rng() - 0.5) * 0.04,
      direction: (rng() < 0.5 + score * 0.3 ? "+" : "-") as "+" | "-",
    }));

    // Milestones — drawn from semantic clusters, ordered by date
    const numMilestones = randInt(3, 6);
    const milestones: MilestoneSignal[] = [];
    for (let m = 0; m < numMilestones; m++) {
      const cluster = pick(MILESTONE_CLUSTERS);
      const monthOffset = m * randInt(3, 8);
      const d = new Date(foundedYear, foundedMonth - 1 + monthOffset, foundedDay);
      milestones.push({
        cluster,
        description: milestoneDescription(cluster, s.name),
        date: d.toISOString().split("T")[0],
      });
    }

    return {
      id: `aug-${String(i + 1).padStart(3, "0")}`,
      name: s.name,
      tagline: s.tagline,
      sector,
      canton: canton.code,
      city: canton.city,
      foundedAt,
      fundingRequestedChf: fundingRequested,
      features,
      score: Math.round(score * 1000) / 1000,
      prediction: score >= 0.5 ? "success" : "failure",
      modelConfidence: Math.min(0.97, 0.55 + Math.abs(score - 0.5) * 0.8),
      scoreTier: tierFromScore(score),
      topDrivers,
      milestones,
      founderUniversity: pick(UNIVERSITIES),
    } as Startup;
  });
}

function milestoneDescription(cluster: string, name: string): string {
  const company = name.split(" ")[0];
  switch (cluster) {
    case "product_launch_beta":
      return `${company} launched closed beta with 12 design-partner customers`;
    case "funding_seed_round":
      return `Closed CHF ${randInt(800, 3500)}K pre-seed led by Swiss angel syndicate`;
    case "team_hire_engineering":
      return `Hired Head of Engineering from a Tier-1 deep-tech company`;
    case "partnership_enterprise_deal":
      return `Signed POC agreement with a top-3 European industrial group`;
    case "award_recognition_grant":
      return `Awarded Innosuisse grant (CHF ${randInt(200, 850)}K) for R&D phase`;
    case "patent_ip_filing":
      return `Filed core PCT patent application covering platform architecture`;
    case "user_growth_traction":
      return `Reached ${randInt(2, 25)}× MoM user growth post-launch`;
    case "regulatory_certification":
      return `Obtained ISO 13485 / equivalent regulatory pre-clearance`;
    default:
      return `Key milestone recorded`;
  }
}

let _cached: Startup[] | null = null;
export function getStartups(): Startup[] {
  if (!_cached) _cached = generateStartups();
  return _cached;
}

export function getStartupById(id: string): Startup | undefined {
  return getStartups().find((s) => s.id === id);
}

export { FEATURE_LABEL, SECTORS, CANTONS, MILESTONE_CLUSTERS };

// Team data — pulled directly from Section 6 of the report
export const TEAM = [
  {
    name: "Andreas Fuchs",
    role: "Machine Learning Engineering",
    bio: "Drives model architecture and technical implementation, building on 6+ years in software consulting. MSc MTEC at ETH Zürich; BSc Business Informatics at TU Vienna.",
    initials: "AF",
    image: '/assets/Andi.png',
  },
  {
    name: "Jean Nordmann",
    role: "Data Science Engineering",
    bio: "Owns data processing, cleaning, and leakage-proof pipelines. BSc Computer Science (Communication Systems) at EPFL; pursuing MSc MTEC at ETH Zürich.",
    initials: "JN",
    image: '/assets/Jean_reframed.png',
  },
  {
    name: "Eleni Ginter",
    role: "Market Strategist",
    bio: "Bridges technical ML outputs and the operational needs of VC analysts. BSc Neuroscience; completing MSc MTEC at ETH Zürich. Sales experience with ETH Entrepreneur Club's InCube.",
    initials: "EG",
    image: '/assets/EG_Photo.png',
  },
  {
    name: "Hector Lopez",
    role: "Business Strategy",
    bio: "Startup founder, former Business Product Manager at Amazon, strategist at quantum computing firm QCentroid. BSc Physics & Industrial Engineering, UC3M Madrid; MSc MTI at ETH Zürich.",
    initials: "HL",
    image: '/assets/hector.png',
  },
  {
    name: "Paul Walder",
    role: "Business Development",
    bio: "Strategy consulting and Venture Capital background. BSc Business Informatics from TU Vienna and TU Delft.",
    initials: "PW",
    image: '/assets/Paul.png',
  },
];

// Headline KPIs from the report Executive Summary / Section 3.3
export const KPIS = {
  precisionLift: { from: 0.05, to: 0.17, label: "Precision lift over base rate" },
  recallRange: { lo: 0.69, hi: 0.76, label: "Recall on held-out test set" },
  f1Lift: { from: 0.05, to: 0.27, label: "F1 score lift" },
  throughput: { from: "5–10", to: "10–20", label: "Startups screened per analyst per day" },
  annualSavings: 100_000, // CHF per two-analyst team
  paybackMonths: 5.9,
  totalStartupsScored: 12847, // demo telemetry
};
