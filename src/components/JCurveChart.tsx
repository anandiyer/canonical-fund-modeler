import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
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
};

export function JCurveChart({ curve, vintageYear }: Props) {
  const data = curve.map((p) => ({
    year: vintageYear + p.year,
    fundYear: p.year,
    TVPI: Number(p.tvpi.toFixed(3)),
    DPI: Number(p.dpi.toFixed(3)),
    RVPI: Number(p.rvpi.toFixed(3)),
  }));

  return (
    <div className="bg-white border border-rule rounded-card p-4">
      <div className="flex items-baseline justify-between mb-3">
        <div>
          <div className="text-[10px] uppercase tracking-[0.14em] text-ink-muted font-medium">
            J-curve
          </div>
          <div className="text-sm text-ink-soft mt-0.5">
            Net TVPI and DPI over fund life
          </div>
        </div>
      </div>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, bottom: 0, left: -20 }}>
            <defs>
              <linearGradient id="tvpi" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2563eb" stopOpacity={0.25} />
                <stop offset="100%" stopColor="#2563eb" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="dpi" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#059669" stopOpacity={0.2} />
                <stop offset="100%" stopColor="#059669" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#eeece6" strokeDasharray="2 3" vertical={false} />
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
              width={48}
            />
            <Tooltip
              contentStyle={{
                background: "#fff",
                border: "1px solid #e7e5e0",
                borderRadius: 6,
                fontSize: 12,
              }}
              labelStyle={{ color: "#374151", fontWeight: 500 }}
              formatter={(value, name) => [
                `${Number(value).toFixed(2)}×`,
                String(name),
              ]}
              labelFormatter={(label) => `Year ${label}`}
            />
            <ReferenceLine y={1} stroke="#9ca3af" strokeDasharray="3 3" />
            <Area
              type="monotone"
              dataKey="TVPI"
              stroke="#2563eb"
              strokeWidth={2}
              fill="url(#tvpi)"
              isAnimationActive={false}
            />
            <Area
              type="monotone"
              dataKey="DPI"
              stroke="#059669"
              strokeWidth={2}
              fill="url(#dpi)"
              isAnimationActive={false}
            />
            <Legend
              wrapperStyle={{ fontSize: 11, color: "#6b7280" }}
              iconType="plainline"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
