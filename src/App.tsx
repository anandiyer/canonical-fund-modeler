import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { ShareBar } from "./components/ShareBar";
import { KpiTiles } from "./components/KpiTiles";
import { JCurveChart } from "./components/JCurveChart";
import { CashflowTable } from "./components/CashflowTable";
import { PortfolioTable } from "./components/PortfolioTable";
import { useFundStore } from "./store";

function App() {
  const { inputs, result, dispatch } = useFundStore();

  return (
    <div className="min-h-screen flex flex-col bg-canvas text-ink-soft">
      <Header />
      <div className="flex flex-col lg:flex-row flex-1 max-w-[1600px] w-full mx-auto">
        <Sidebar
          inputs={inputs}
          impliedOwnership={result.impliedEntryOwnership}
          reserveAdequacy={result.reserveAdequacy}
          totalFees={result.totalFees}
          onSet={(patch) => dispatch({ type: "set", patch })}
          onSetOutcome={(id, patch) =>
            dispatch({ type: "setOutcome", id, patch })
          }
        />
        <main className="flex-1 px-5 sm:px-8 py-6 space-y-5 lg:overflow-y-auto lg:h-[calc(100vh-49px)]">
          <ShareBar
            fundName={inputs.fundName}
            onRename={(name) => dispatch({ type: "set", patch: { fundName: name } })}
            onReset={() => dispatch({ type: "reset" })}
            inputs={inputs}
            years={result.years}
          />

          {result.warnings.length > 0 && (
            <div className="bg-amber-50 border border-amber-200 rounded-card px-4 py-3 text-xs text-amber-900 space-y-1">
              {result.warnings.map((w, i) => (
                <div key={i}>• {w}</div>
              ))}
            </div>
          )}

          <KpiTiles result={result} />
          <JCurveChart curve={result.curve} vintageYear={inputs.vintageYear} />

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
            <PortfolioTable buckets={result.buckets} />
            <CashflowTable years={result.years} vintageYear={inputs.vintageYear} />
          </div>

          <footer className="text-[11px] text-ink-faint pt-6 pb-2 flex flex-col sm:flex-row sm:justify-between gap-1">
            <div>
              Built by{" "}
              <a
                href="https://canonical.cc"
                target="_blank"
                rel="noreferrer"
                className="text-accent hover:underline"
              >
                Canonical
              </a>
              . Free for any fund manager.
            </div>
            <div>
              Scenarios are local to your browser. Share via the link — nothing leaves
              your device.
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}

export default App;
