import type { BucketResult, OutcomeBucket } from "../model/types";
import { fmtDecimal, fmtMoneyCompact, fmtMultiple, fmtPct } from "../lib/format";

type Props = {
  outcomes: OutcomeBucket[];
  buckets: BucketResult[];
  lifeMax: number;
  onSetOutcome: (id: string, patch: Partial<OutcomeBucket>) => void;
};

export function OutcomesPanel({ outcomes, buckets, lifeMax, onSetOutcome }: Props) {
  const sum = outcomes.reduce((s, o) => s + o.share, 0);
  const sumOk = Math.abs(sum - 1) < 0.005;
  const totalExit = buckets.reduce((s, b) => s + b.exitValue, 0);

  return (
    <section className="py-10 border-t border-rule">
      <div className="flex items-baseline justify-between mb-2">
        <h2 className="text-[11px] uppercase tracking-[0.16em] text-ink-muted font-medium">
          The portfolio
        </h2>
        <span
          className={`text-xs tabular ${sumOk ? "text-ink-faint" : "text-warning"}`}
        >
          shares · {fmtPct(sum)}
        </span>
      </div>
      <p className="text-sm text-ink-soft mb-6 max-w-2xl">
        Power-law assumptions. Edit the share, multiple, and exit year of each bucket
        to model a different portfolio outcome distribution.
      </p>

      <div className="grid grid-cols-[1fr_72px_72px_56px_1fr_1fr] gap-x-4 gap-y-3 items-center text-sm">
        <div className="text-[10px] uppercase tracking-wider text-ink-faint font-medium">
          Bucket
        </div>
        <div className="text-[10px] uppercase tracking-wider text-ink-faint font-medium text-right">
          Share
        </div>
        <div className="text-[10px] uppercase tracking-wider text-ink-faint font-medium text-right">
          Multiple
        </div>
        <div className="text-[10px] uppercase tracking-wider text-ink-faint font-medium text-right">
          Exit
        </div>
        <div className="text-[10px] uppercase tracking-wider text-ink-faint font-medium text-right">
          Capital
        </div>
        <div className="text-[10px] uppercase tracking-wider text-ink-faint font-medium text-right">
          Returns
        </div>

        {outcomes.map((o, i) => {
          const b = buckets[i];
          return (
            <div key={o.id} className="contents">
              <div className="text-ink-strong">{o.label}</div>
              <input
                type="text"
                inputMode="decimal"
                className="tabular text-right rounded border border-rule bg-white px-2 py-1.5 outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 text-sm"
                value={(o.share * 100).toString()}
                onChange={(e) => {
                  const v = Number(e.target.value.replace(/[,\s%]/g, ""));
                  if (!Number.isNaN(v)) onSetOutcome(o.id, { share: v / 100 });
                }}
              />
              <input
                type="text"
                inputMode="decimal"
                className="tabular text-right rounded border border-rule bg-white px-2 py-1.5 outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 text-sm"
                value={o.multiple.toString()}
                onChange={(e) => {
                  const v = Number(e.target.value.replace(/[,\sx×]/g, ""));
                  if (!Number.isNaN(v))
                    onSetOutcome(o.id, { multiple: Math.max(0, v) });
                }}
              />
              <input
                type="text"
                inputMode="numeric"
                className="tabular text-right rounded border border-rule bg-white px-2 py-1.5 outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 text-sm"
                value={Math.round(o.exitYear).toString()}
                onChange={(e) => {
                  const v = Number(e.target.value);
                  if (!Number.isNaN(v)) {
                    onSetOutcome(o.id, {
                      exitYear: Math.max(1, Math.min(lifeMax, Math.round(v))),
                    });
                  }
                }}
              />
              <div className="text-right text-ink-soft tabular">
                {fmtMoneyCompact(b?.capitalInvested ?? 0)}
                <span className="text-ink-faint text-xs ml-1">
                  · {fmtDecimal(b?.numCompanies ?? 0, 1)} cos
                </span>
              </div>
              <div className="text-right text-ink-strong tabular">
                {fmtMoneyCompact(b?.exitValue ?? 0)}
                <span className="text-accent text-xs ml-1">
                  +{fmtMultiple(b?.contributionToMOIC ?? 0, 2)}
                </span>
              </div>
            </div>
          );
        })}

        <div className="text-ink-soft text-sm font-medium pt-3 border-t border-rule">
          Total
        </div>
        <div></div>
        <div></div>
        <div></div>
        <div className="text-right text-ink-strong tabular pt-3 border-t border-rule">
          {fmtMoneyCompact(buckets.reduce((s, b) => s + b.capitalInvested, 0))}
        </div>
        <div className="text-right text-ink-strong tabular pt-3 border-t border-rule">
          {fmtMoneyCompact(totalExit)}
        </div>
      </div>
    </section>
  );
}
