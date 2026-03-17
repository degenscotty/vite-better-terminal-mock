import { useState, useMemo } from "react";
import type { Signal } from "@/data/types";
import { generatePositions } from "@/data/mockData";
import { useSignalFeed } from "@/hooks/useSignalFeed";
import { Layout } from "@/components/Layout";
import { TopBar } from "@/components/TopBar";
import { SignalFeed } from "@/components/SignalFeed";
import { RightPanel } from "@/components/RightPanel";
import { PositionsPanel } from "@/components/PositionsPanel";
import { StatusBar } from "@/components/StatusBar";
import { WalletPage } from "@/components/WalletPage";
import { VaultPage } from "@/components/VaultPage";

export type PageTab = "TERMINAL" | "WALLET" | "VAULT";

const positions = generatePositions();

function App() {
  const { signals, autoScroll, toggleAutoScroll } = useSignalFeed();
  const [selectedSignal, setSelectedSignal] = useState<Signal | null>(null);
  const [activeTab, setActiveTab] = useState<PageTab>("TERMINAL");

  const highConfCount = useMemo(
    () => signals.filter((s) => s.confidence >= 75).length,
    [signals]
  );

  const avgConfidence = useMemo(
    () => Math.round(signals.reduce((sum, s) => sum + s.confidence, 0) / signals.length),
    [signals]
  );

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden min-w-[1200px]">
      <TopBar
        totalSignals={signals.length}
        highConfCount={highConfCount}
        avgConfidence={avgConfidence}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {activeTab === "TERMINAL" ? (
        <>
          <Layout
            leftPanel={
              <SignalFeed
                signals={signals}
                selectedSignal={selectedSignal}
                onSelectSignal={setSelectedSignal}
                autoScroll={autoScroll}
                onToggleAutoScroll={toggleAutoScroll}
              />
            }
            rightPanel={
              <RightPanel
                signal={selectedSignal}
                onClose={() => setSelectedSignal(null)}
              />
            }
            bottomPanel={<PositionsPanel positions={positions} />}
          />
        </>
      ) : activeTab === "WALLET" ? (
        <div className="flex-1 overflow-y-auto">
          <WalletPage positions={positions} />
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto">
          <VaultPage />
        </div>
      )}

      <StatusBar />
    </div>
  );
}

export default App;
