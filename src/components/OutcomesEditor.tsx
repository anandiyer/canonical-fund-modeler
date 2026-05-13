import type { OutcomeBucket } from "../model/types";
import { fmtPct } from "../lib/format";

type Props = {
  outcomes: OutcomeBucket[];
  onChange: (id: string, patch: Partial<OutcomeBucket>) => void;
  lifeMax: number;
};

export function OutcomesEditor({ outcomes, onChange, lifeMax }: Props) {
  const sum = outcomes.reduce((s, o) => s + o.share, 0);
  const sumOk = Math.abs(sum - 1) < 0.005;

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-[1fr_70px_70px_60px] gap-2 px-1 text-[10px] uppercase tracking-wider text-ink-faint font-medium">
        <div>Bucket</div>
        <div className="text-right">% of cos</div>
        <div className="text-right">Multiple</div>
        <div className="text-right">Year</div>
      </div>
      {outcomes.map((o) => (
        <div
          key={o.id}
          className="grid grid-cols-[1fr_70px_70px_60px] gap-2 items-center"
        >
          <div className="text-xs text-ink-soft">{o.label}</div>
          <input
            type="text"
            inputMode="decimal"
            className="tabular text-right text-xs rounded border border-rule bg-white px-2 py-1 outline-none focus:border-accent focus:ring-2 focus:ring-accent/15"
            value={(o.share * 100).toString()}
            onChange={(e) => {
              const v = Number(e.target.value.replace(/[,\s%]/g, ""));
              if (!Number.isNaN(v)) onChange(o.id, { share: v / 100 });
            }}
          />
          <input
            type="text"
            inputMode="decimal"
            className="tabular text-right text-xs rounded border border-rule bg-white px-2 py-1 outline-none focus:border-accent focus:ring-2 focus:ring-accent/15"
            value={o.multiple.toString()}
            onChange={(e) => {
              const v = Number(e.target.value.replace(/[,\sx×]/g, ""));
              if (!Number.isNaN(v)) onChange(o.id, { multiple: Math.max(0, v) });
            }}
          />
          <input
            type="text"
            inputMode="numeric"
            className="tabular text-right text-xs rounded border border-rule bg-white px-2 py-1 outline-none focus:border-accent focus:ring-2 focus:ring-accent/15"
            value={Math.round(o.exitYear).toString()}
            onChange={(e) => {
              const v = Number(e.target.value);
              if (!Number.isNaN(v)) {
                onChange(o.id, {
                  exitYear: Math.max(1, Math.min(lifeMax, Math.round(v))),
                });
              }
            }}
          />
        </div>
      ))}
      <div
        className={`text-[11px] mt-1 tabular ${
          sumOk ? "text-ink-faint" : "text-warning"
        }`}
      >
        Shares sum: {fmtPct(sum)}{!sumOk && " — must equal 100%"}
      </div>
    </div>
  );
}
