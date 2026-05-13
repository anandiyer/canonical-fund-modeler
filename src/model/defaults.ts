import type { FundInputs, OutcomeBucket } from "./types";
import { SCENARIO_SCHEMA_VERSION } from "./types";

export const DEFAULT_OUTCOMES: OutcomeBucket[] = [
  { id: "loss", label: "Total loss", share: 0.35, multiple: 0, exitYear: 5 },
  { id: "weak", label: "0.5–2×", share: 0.3, multiple: 1.25, exitYear: 6 },
  { id: "ok", label: "2–5×", share: 0.2, multiple: 3.5, exitYear: 7 },
  { id: "good", label: "5–10×", share: 0.1, multiple: 7.5, exitYear: 8 },
  { id: "fund-returner", label: "10×+", share: 0.05, multiple: 20, exitYear: 9 },
];

export const DEFAULT_INPUTS: FundInputs = {
  schemaVersion: SCENARIO_SCHEMA_VERSION,

  fundName: "Fund I",
  fundSize: 50_000_000,
  vintageYear: new Date().getFullYear(),
  fundLife: 10,
  investmentPeriod: 4,
  gpCommitPct: 0.02,
  mgmtFeePct: 0.02,
  carryPct: 0.2,
  recycleFees: false,

  numInvestments: 20,
  avgInitialCheck: 1_000_000,
  avgEntryRoundSize: 5_000_000,
  reserveRatio: 0.4,
  followOnMultiplier: 1.5,
  followOnFraction: 0.5,

  outcomes: DEFAULT_OUTCOMES.map((b) => ({ ...b })),
};
