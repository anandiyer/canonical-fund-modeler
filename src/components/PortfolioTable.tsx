import type { BucketResult } from "../model/types";
import { fmtDecimal, fmtMoneyCompact, fmtMultiple, fmtPct } from "../lib/format";

type Props = {
  buckets: BucketResult[];
};

export function PortfolioTable({ buckets }: Props) {
  const totalExit = buckets.reduce((s, b) => s + b.exitValue, 0);
  const totalCap = buckets.reduce((s, b) => s + b.capitalInvested, 0);

  return (
    <div className="bg-white border border-rule rounded-card overflow-hidden">
      <div className="px-4 pt-4">
        <div className="text-[10px] uppercase tracking-[0.14em] text-ink-muted font-medium">
          Portfolio outcomes
        </div>
        <div className="text-sm text-ink-soft mt-0.5 mb-3">
          Each bucket's contribution to the fund
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-xs tabular">
          <thead>
            <tr className="text-ink-muted border-y border-rule bg-canvas/50">
              <th className="text-left font-medium px-4 py-2">Bucket</th>
              <th className="text-right font-medium px-3 py-2"># cos</th>
              <th className="text-right font-medium px-3 py-2">Capital</th>
              <th className="text-right font-medium px-3 py-2">Multiple</th>
              <th className="text-right font-medium px-3 py-2">Exit value</th>
              <th className="text-right font-medium px-3 py-2">Exit yr</th>
              <th className="text-right font-medium px-4 py-2">→ MOIC</th>
            </tr>
          </thead>
          <tbody>
            {buckets.map((b) => (
              <tr key={b.id} className="border-b border-rule/60 last:border-0">
                <td className="px-4 py-1.5 text-ink-soft">{b.label}</td>
                <td className="text-right px-3 py-1.5 text-ink-strong">
                  {fmtDecimal(b.numCompanies, 1)}
                </td>
                <td className="text-right px-3 py-1.5 text-ink-muted">
                  {fmtMoneyCompact(b.capitalInvested)}
                </td>
                <td className="text-right px-3 py-1.5 text-ink-muted">
                  {fmtMultiple(b.multiple, 1)}
                </td>
                <td className="text-right px-3 py-1.5 text-ink-strong">
                  {fmtMoneyCompact(b.exitValue)}
                </td>
                <td className="text-right px-3 py-1.5 text-ink-muted">
                  Y{b.exitYear}
                </td>
                <td className="text-right px-4 py-1.5 text-accent">
                  +{fmtMultiple(b.contributionToMOIC, 2)}
                </td>
              </tr>
            ))}
            <tr className="border-t border-rule-strong bg-canvas/40">
              <td className="px-4 py-2 text-ink-soft font-medium">Total</td>
              <td className="text-right px-3 py-2 text-ink-strong font-medium">
                {fmtDecimal(
                  buckets.reduce((s, b) => s + b.numCompanies, 0),
                  1
                )}
              </td>
              <td className="text-right px-3 py-2 text-ink-strong font-medium">
                {fmtMoneyCompact(totalCap)}
              </td>
              <td className="text-right px-3 py-2 text-ink-muted">
                {fmtMultiple(totalExit / (totalCap || 1), 2)}
              </td>
              <td className="text-right px-3 py-2 text-ink-strong font-medium">
                {fmtMoneyCompact(totalExit)}
              </td>
              <td className="text-right px-3 py-2 text-ink-muted">—</td>
              <td className="text-right px-4 py-2 text-ink-strong font-medium">
                {fmtPct(1, 0)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
