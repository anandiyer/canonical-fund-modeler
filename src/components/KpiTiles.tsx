import type { ModelResult } from "../model/types";
import { fmtMultiple, fmtPct } from "../lib/format";

type Tile = {
  label: string;
  value: string;
  hint?: string;
  tooltip?: string;
};

export function KpiTiles({ result }: { result: ModelResult }) {
  const tiles: Tile[] = [
    {
      label: "Net TVPI",
      value: fmtMultiple(result.netTVPI),
      hint: `Gross ${fmtMultiple(result.grossTVPI)}`,
      tooltip:
        "Total Value to Paid-In: net distributions + remaining NAV, divided by capital called. The headline LP number.",
    },
    {
      label: "Net IRR",
      value: fmtPct(result.netIRR, 1),
      hint: `Gross ${fmtPct(result.grossIRR, 1)}`,
      tooltip:
        "Internal Rate of Return on the LP cashflow stream (negative calls, positive net distributions). Annualized.",
    },
    {
      label: "DPI",
      value: fmtMultiple(result.dpi),
      hint: "cash returned",
      tooltip:
        "Distributions to Paid-In: realized net cash distributed to LPs, divided by capital called.",
    },
    {
      label: "Net MOIC",
      value: fmtMultiple(result.netMOIC),
      hint: `Gross ${fmtMultiple(result.grossMOIC)}`,
      tooltip:
        "Multiple on Invested Capital: distributions divided by capital actually deployed into companies. Excludes fees.",
    },
    {
      label: "Carry to GP",
      value: `$${(result.totalCarry / 1_000_000).toFixed(1)}M`,
      tooltip: "Total carried interest paid to GP under European waterfall.",
    },
    {
      label: "Fees over life",
      value: `$${(result.totalFees / 1_000_000).toFixed(1)}M`,
      tooltip: "Total management fees over the fund life.",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
      {tiles.map((t) => (
        <div
          key={t.label}
          className="bg-white border border-rule rounded-card p-4 hover:border-rule-strong transition"
          title={t.tooltip}
        >
          <div className="text-[10px] uppercase tracking-[0.14em] text-ink-muted font-medium">
            {t.label}
          </div>
          <div className="kpi-num text-2xl text-ink-strong mt-1 font-light">
            {t.value}
          </div>
          {t.hint && (
            <div className="text-[11px] text-ink-faint mt-0.5 tabular">{t.hint}</div>
          )}
        </div>
      ))}
    </div>
  );
}
