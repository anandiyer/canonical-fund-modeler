import { useState } from "react";
import type { FundInputs, YearRow } from "../model/types";

type Props = {
  fundName: string;
  onRename: (name: string) => void;
  onReset: () => void;
  inputs: FundInputs;
  years: YearRow[];
};

function toCSV(years: YearRow[], vintage: number): string {
  const header = [
    "year",
    "capital_called",
    "mgmt_fees",
    "deployed",
    "gross_distributions",
    "carry",
    "net_distributions",
    "nav",
    "cum_net_cashflow",
  ];
  const rows = years.map((r) => [
    vintage + r.year,
    r.capitalCalled.toFixed(0),
    r.mgmtFees.toFixed(0),
    r.deployedToCos.toFixed(0),
    r.grossDistributions.toFixed(0),
    r.carry.toFixed(0),
    r.netDistributions.toFixed(0),
    r.nav.toFixed(0),
    r.cumulativeNetCashflow.toFixed(0),
  ]);
  return [header.join(","), ...rows.map((r) => r.join(","))].join("\n");
}

export function ShareBar({ fundName, onRename, onReset, inputs, years }: Props) {
  const [copied, setCopied] = useState(false);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* noop */
    }
  };

  const downloadCSV = () => {
    const csv = toCSV(years, inputs.vintageYear);
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${fundName.replace(/\s+/g, "_")}_cashflow.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 mb-4 border-b border-rule">
      <div className="flex items-baseline gap-3">
        <input
          type="text"
          className="text-2xl font-light text-ink-strong bg-transparent border-b border-transparent hover:border-rule focus:border-accent outline-none px-1 -ml-1 min-w-[12ch]"
          value={fundName}
          onChange={(e) => onRename(e.target.value)}
          aria-label="Fund name"
        />
        <span className="text-xs text-ink-faint">
          scenario · {inputs.vintageYear} vintage
        </span>
      </div>
      <div className="flex items-center gap-2 text-xs">
        <button
          type="button"
          onClick={copyLink}
          className="rounded-md border border-rule bg-white px-3 py-1.5 text-ink-soft hover:border-accent hover:text-accent transition"
        >
          {copied ? "Copied ✓" : "Copy link"}
        </button>
        <button
          type="button"
          onClick={downloadCSV}
          className="rounded-md border border-rule bg-white px-3 py-1.5 text-ink-soft hover:border-accent hover:text-accent transition"
        >
          Export CSV
        </button>
        <button
          type="button"
          onClick={() => {
            if (confirm("Reset all inputs to defaults?")) onReset();
          }}
          className="rounded-md border border-rule bg-white px-3 py-1.5 text-ink-muted hover:border-negative hover:text-negative transition"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
