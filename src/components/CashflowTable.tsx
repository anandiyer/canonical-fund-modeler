import type { YearRow } from "../model/types";
import { fmtMoneyCompact } from "../lib/format";

type Props = {
  years: YearRow[];
  vintageYear: number;
};

export function CashflowTable({ years, vintageYear }: Props) {
  return (
    <div className="bg-white border border-rule rounded-card overflow-hidden">
      <div className="px-4 pt-4">
        <div className="text-[10px] uppercase tracking-[0.14em] text-ink-muted font-medium">
          Cash flow
        </div>
        <div className="text-sm text-ink-soft mt-0.5 mb-3">
          Capital, fees, deployments, and distributions by year
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-xs tabular">
          <thead>
            <tr className="text-ink-muted border-y border-rule bg-canvas/50">
              <th className="text-left font-medium px-4 py-2">Year</th>
              <th className="text-right font-medium px-3 py-2">Called</th>
              <th className="text-right font-medium px-3 py-2">Fees</th>
              <th className="text-right font-medium px-3 py-2">Deployed</th>
              <th className="text-right font-medium px-3 py-2">Distributions</th>
              <th className="text-right font-medium px-3 py-2">Carry</th>
              <th className="text-right font-medium px-3 py-2">NAV</th>
              <th className="text-right font-medium px-4 py-2">Cum net</th>
            </tr>
          </thead>
          <tbody>
            {years.map((r) => (
              <tr key={r.year} className="border-b border-rule/60 last:border-0">
                <td className="px-4 py-1.5 text-ink-soft">
                  {vintageYear + r.year}
                </td>
                <td className="text-right px-3 py-1.5 text-ink-strong">
                  {r.capitalCalled > 0 ? fmtMoneyCompact(r.capitalCalled) : "—"}
                </td>
                <td className="text-right px-3 py-1.5 text-ink-muted">
                  {r.mgmtFees > 0 ? fmtMoneyCompact(r.mgmtFees) : "—"}
                </td>
                <td className="text-right px-3 py-1.5 text-ink-muted">
                  {r.deployedToCos > 0 ? fmtMoneyCompact(r.deployedToCos) : "—"}
                </td>
                <td className="text-right px-3 py-1.5 text-positive">
                  {r.grossDistributions > 0
                    ? fmtMoneyCompact(r.grossDistributions)
                    : "—"}
                </td>
                <td className="text-right px-3 py-1.5 text-ink-muted">
                  {r.carry > 0 ? fmtMoneyCompact(r.carry) : "—"}
                </td>
                <td className="text-right px-3 py-1.5 text-ink-muted">
                  {r.nav > 0 ? fmtMoneyCompact(r.nav) : "—"}
                </td>
                <td
                  className={`text-right px-4 py-1.5 ${
                    r.cumulativeNetCashflow >= 0
                      ? "text-positive"
                      : "text-negative"
                  }`}
                >
                  {fmtMoneyCompact(r.cumulativeNetCashflow)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
