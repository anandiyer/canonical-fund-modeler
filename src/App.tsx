import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { KpiRow } from "./components/KpiRow";
import { JCurveChart } from "./components/JCurveChart";
import { InputsPanel } from "./components/InputsPanel";
import { OutcomesPanel } from "./components/OutcomesPanel";
import { CashflowTable } from "./components/CashflowTable";
import { Actions } from "./components/Actions";
import { useFundStore } from "./store";

function App() {
  const { inputs, result, dispatch } = useFundStore();

  return (
    <div className="min-h-screen flex flex-col bg-canvas text-ink-soft">
      <Header />
      <main className="flex-1 w-full max-w-4xl mx-auto px-6 sm:px-10 pb-24">
        <div className="flex justify-end pt-5">
          <Actions
            inputs={inputs}
            years={result.years}
            onReset={() => dispatch({ type: "reset" })}
          />
        </div>

        <Hero
          fundName={inputs.fundName}
          fundSize={inputs.fundSize}
          vintageYear={inputs.vintageYear}
          numInvestments={inputs.numInvestments}
          result={result}
          onRenameFund={(name) =>
            dispatch({ type: "set", patch: { fundName: name } })
          }
        />

        {result.warnings.length > 0 && (
          <div className="mb-6 border border-amber-200 bg-amber-50 rounded-md px-4 py-3 text-xs text-amber-900 space-y-1">
            {result.warnings.map((w, i) => (
              <div key={i}>{w}</div>
            ))}
          </div>
        )}

        <KpiRow result={result} />

        <JCurveChart
          curve={result.curve}
          vintageYear={inputs.vintageYear}
          netTVPI={result.netTVPI}
        />

        <InputsPanel
          inputs={inputs}
          impliedOwnership={result.impliedEntryOwnership}
          reserveAdequacy={result.reserveAdequacy}
          totalFees={result.totalFees}
          onSet={(patch) => dispatch({ type: "set", patch })}
        />

        <OutcomesPanel
          outcomes={inputs.outcomes}
          buckets={result.buckets}
          lifeMax={inputs.fundLife}
          onSetOutcome={(id, patch) =>
            dispatch({ type: "setOutcome", id, patch })
          }
        />

        <CashflowTable years={result.years} vintageYear={inputs.vintageYear} />

        <footer className="mt-16 pt-8 border-t border-rule text-xs text-ink-faint flex flex-col sm:flex-row sm:justify-between gap-2">
          <div>
            Built by{" "}
            <a
              href="https://canonical.cc"
              target="_blank"
              rel="noreferrer"
              className="text-ink-soft hover:text-accent"
            >
              Canonical
            </a>
            . Free for any fund manager.
          </div>
          <div>
            Scenarios live in your browser. Share via link — nothing leaves your
            device.
          </div>
        </footer>
      </main>
    </div>
  );
}

export default App;
