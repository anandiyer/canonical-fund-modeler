import {
  Area,
  AreaChart,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { CurvePoint } from "../model/types";

type Props = {
  curve: CurvePoint[];
  vintageYear: number;
  netTVPI: number;
};

export function JCurveChart({ curve, vintageYear, netTVPI }: Props) {
  const data = curve.map((p) => ({
    year: vintageYear + p.year,
    TVPI: Number(p.tvpi.toFixed(3)),
    DPI: Number(p.dpi.toFixed(3)),
  }));

  return (
    <section className="py-10 border-t border-rule">
      <div className="flex items-baseline justify-between mb-2">
        <h2 className="text-[11px] uppercase tracking-[0.16em] text-ink-muted font-medium">
          The path
        </h2>
        <div className="flex items-center gap-4 text-xs text-ink-faint">
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-3 h-px bg-accent" /> TVPI
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-3 h-px bg-positive" /> DPI
          </span>
        </div>
      </div>
      <p className="text-sm text-ink-soft mb-6 max-w-2xl">
        Net TVPI and realized DPI by year. The J-curve dips early — fees and
        deployment without exits — then climbs as winners mark up and exit.
        Target line at 1.0× shows when LPs are made whole.
      </p>
      <div className="h-[360px] -mx-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 16, bottom: 0, left: -10 }}>
            <defs>
              <linearGradient id="tvpiGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2563eb" stopOpacity={0.18} />
                <stop offset="100%" stopColor="#2563eb" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="dpiGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#059669" stopOpacity={0.14} />
                <stop offset="100%" stopColor="#059669" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#eeece6" strokeDasharray="2 4" vertical={false} />
            <XAxis
              dataKey="year"
              tick={{ fill: "#9ca3af", fontSize: 11 }}
              axisLine={{ stroke: "#e7e5e0" }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "#9ca3af", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v: number) => `${v.toFixed(1)}×`}
              width={44}
              domain={[0, Math.ceil(Math.max(netTVPI * 1.2, 2.5))]}
            />
            <Tooltip
              contentStyle={{
                background: "#fff",
                border: "1px solid #e7e5e0",
                borderRadius: 6,
                fontSize: 12,
                padding: "8px 10px",
              }}
              labelStyle={{ color: "#374151", fontWeight: 500, marginBottom: 4 }}
              formatter={(value, name) => [
                `${Number(value).toFixed(2)}×`,
                String(name),
              ]}
              labelFormatter={(label) => `Year ${label}`}
            />
            <ReferenceLine
              y={1}
              stroke="#cbc8c0"
              strokeDasharray="3 3"
              label={{
                value: "1.0× LPs made whole",
                position: "right",
                fill: "#9ca3af",
                fontSize: 10,
              }}
            />
            <Area
              type="monotone"
              dataKey="TVPI"
              stroke="#2563eb"
              strokeWidth={1.75}
              fill="url(#tvpiGrad)"
              isAnimationActive={false}
            />
            <Area
              type="monotone"
              dataKey="DPI"
              stroke="#059669"
              strokeWidth={1.75}
              fill="url(#dpiGrad)"
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
