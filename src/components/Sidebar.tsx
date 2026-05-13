import type { FundInputs, OutcomeBucket } from "../model/types";
import { InputSection } from "./InputSection";
import { NumberInput } from "./NumberInput";
import { OutcomesEditor } from "./OutcomesEditor";
import { fmtPct, fmtMoneyCompact } from "../lib/format";

type Props = {
  inputs: FundInputs;
  impliedOwnership: number;
  reserveAdequacy: number;
  totalFees: number;
  onSet: (patch: Partial<FundInputs>) => void;
  onSetOutcome: (id: string, patch: Partial<OutcomeBucket>) => void;
};

export function Sidebar({
  inputs,
  impliedOwnership,
  reserveAdequacy,
  totalFees,
  onSet,
  onSetOutcome,
}: Props) {
  return (
    <aside className="w-full lg:w-[360px] lg:flex-none bg-white border-r border-rule lg:h-[calc(100vh-49px)] lg:overflow-y-auto">
      <InputSection title="Fund" subtitle="The basics">
        <label className="block">
          <span className="text-xs text-ink-soft font-medium">Fund name</span>
          <input
            type="text"
            className="mt-1 w-full rounded-md border border-rule bg-white px-2.5 py-1.5 text-sm text-ink-strong outline-none focus:border-accent focus:ring-2 focus:ring-accent/15"
            value={inputs.fundName}
            onChange={(e) => onSet({ fundName: e.target.value })}
          />
        </label>
        <div className="grid grid-cols-2 gap-3">
          <NumberInput
            label="Fund size"
            variant="money"
            value={inputs.fundSize}
            onChange={(n) => onSet({ fundSize: n })}
            min={0}
          />
          <NumberInput
            label="Vintage"
            variant="year"
            value={inputs.vintageYear}
            onChange={(n) => onSet({ vintageYear: n })}
            min={1980}
            max={2100}
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <NumberInput
            label="Fund life"
            hint="years"
            variant="int"
            value={inputs.fundLife}
            onChange={(n) => onSet({ fundLife: n })}
            min={3}
            max={20}
          />
          <NumberInput
            label="Investment period"
            hint="years"
            variant="int"
            value={inputs.investmentPeriod}
            onChange={(n) => onSet({ investmentPeriod: n })}
            min={1}
            max={inputs.fundLife}
          />
        </div>
        <div className="grid grid-cols-3 gap-3">
          <NumberInput
            label="Mgmt fee"
            hint="/yr"
            variant="pct"
            value={inputs.mgmtFeePct}
            onChange={(n) => onSet({ mgmtFeePct: n })}
            min={0}
            max={0.05}
          />
          <NumberInput
            label="Carry"
            variant="pct"
            value={inputs.carryPct}
            onChange={(n) => onSet({ carryPct: n })}
            min={0}
            max={0.5}
          />
          <NumberInput
            label="GP commit"
            variant="pct"
            value={inputs.gpCommitPct}
            onChange={(n) => onSet({ gpCommitPct: n })}
            min={0}
            max={1}
          />
        </div>
        <label className="flex items-center gap-2 text-xs text-ink-soft cursor-pointer select-none">
          <input
            type="checkbox"
            className="accent-accent"
            checked={inputs.recycleFees}
            onChange={(e) => onSet({ recycleFees: e.target.checked })}
          />
          Recycle management fees
        </label>
        <div className="text-[11px] text-ink-faint pt-1 tabular">
          Total fees over life: {fmtMoneyCompact(totalFees)}
        </div>
      </InputSection>

      <InputSection title="Portfolio" subtitle="Construction & reserves">
        <NumberInput
          label="Number of initial investments"
          variant="int"
          value={inputs.numInvestments}
          onChange={(n) => onSet({ numInvestments: n })}
          min={1}
          max={500}
        />
        <div className="grid grid-cols-2 gap-3">
          <NumberInput
            label="Avg initial check"
            variant="money"
            value={inputs.avgInitialCheck}
            onChange={(n) => onSet({ avgInitialCheck: n })}
            min={0}
          />
          <NumberInput
            label="Avg entry round"
            variant="money"
            value={inputs.avgEntryRoundSize}
            onChange={(n) => onSet({ avgEntryRoundSize: n })}
            min={0}
          />
        </div>
        <div className="text-[11px] text-ink-faint tabular">
          Implied entry ownership: {fmtPct(impliedOwnership)}
        </div>
        <NumberInput
          label="Reserve ratio"
          hint="% of fund"
          variant="pct"
          value={inputs.reserveRatio}
          onChange={(n) => onSet({ reserveRatio: n })}
          min={0}
          max={0.8}
        />
        <div className="grid grid-cols-2 gap-3">
          <NumberInput
            label="Follow-on size"
            hint="× initial"
            variant="decimal"
            value={inputs.followOnMultiplier}
            onChange={(n) => onSet({ followOnMultiplier: n })}
            min={0}
            max={10}
          />
          <NumberInput
            label="% of cos w/ follow-on"
            variant="pct"
            value={inputs.followOnFraction}
            onChange={(n) => onSet({ followOnFraction: n })}
            min={0}
            max={1}
          />
        </div>
        <div
          className={`text-[11px] tabular ${
            reserveAdequacy < 0.95
              ? "text-warning"
              : reserveAdequacy > 1.2
                ? "text-ink-faint"
                : "text-positive"
          }`}
        >
          Reserve adequacy: {fmtPct(reserveAdequacy)}{" "}
          {reserveAdequacy < 0.95
            ? "— under-reserved for plan"
            : reserveAdequacy > 1.2
              ? "— excess reserves"
              : "— well sized"}
        </div>
      </InputSection>

      <InputSection
        title="Outcomes"
        subtitle="How the portfolio resolves"
      >
        <OutcomesEditor
          outcomes={inputs.outcomes}
          onChange={onSetOutcome}
          lifeMax={inputs.fundLife}
        />
      </InputSection>
    </aside>
  );
}
