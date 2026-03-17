import { useState } from "react";
import type { Signal } from "@/data/types";
import { DetailsTab } from "./tabs/DetailsTab";
import { PerformanceTab } from "./tabs/PerformanceTab";
import { BookTab } from "./tabs/BookTab";
import { TradeTab } from "./tabs/TradeTab";
import { ChartTab } from "./tabs/ChartTab";

interface RightPanelProps {
  signal: Signal | null;
  onClose: () => void;
}

type TabId = "trade" | "chart" | "details" | "performance" | "book";

const tabs: { id: TabId; label: string }[] = [
  { id: "trade", label: "TRADE" },
  { id: "chart", label: "CHART" },
  { id: "details", label: "DETAILS" },
  { id: "performance", label: "PERFORMANCE" },
  { id: "book", label: "BOOK" },
];

function formatTime(date: Date): string {
  return date.toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

export function RightPanel({ signal, onClose }: RightPanelProps) {
  const [activeTab, setActiveTab] = useState<TabId>("trade");

  if (!signal) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-[#666]">
        <div className="text-2xl mb-2 opacity-20">&#9670;</div>
        <div className="text-xs">Select a signal to trade</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-4 py-3 border-b border-[#333] bg-[#0d0d0d] shrink-0">
        <div className="flex items-center gap-3 mb-1.5">
          <span className="text-[11px] text-[#888]">{formatTime(signal.timestamp)}</span>
          <span className="text-[11px] text-[#555]">&bull;</span>
          <span className={`text-[11px] font-bold ${
            signal.confidence >= 75 ? "text-terminal-green" : signal.confidence >= 50 ? "text-terminal-amber" : "text-terminal-red"
          }`}>
            {signal.confidence}%
          </span>
          <button
            onClick={onClose}
            className="btn-bracket ml-auto text-[11px]"
          >
            [CLOSE]
          </button>
        </div>
        <div className="text-[13px] text-white font-bold leading-tight mb-1">
          {signal.market}
        </div>
        <div className="text-[10px] text-[#666] font-mono">
          wallet: {signal.operator}
        </div>
      </div>

      {/* Tabs - bordered pills */}
      <div className="flex gap-1.5 px-4 py-2 border-b border-[#333] shrink-0">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-3 py-1.5 text-[11px] tracking-wider transition-colors border rounded-[2px] ${
              activeTab === tab.id
                ? "text-white bg-[#1a1a1a] border-[#555]"
                : "text-[#666] border-[#333] hover:text-white hover:border-[#555]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-hidden">
        {activeTab === "trade" && <TradeTab signal={signal} />}
        {activeTab === "chart" && <ChartTab signal={signal} />}
        {activeTab === "details" && <DetailsTab signal={signal} />}
        {activeTab === "performance" && <PerformanceTab signal={signal} />}
        {activeTab === "book" && <BookTab signal={signal} />}
      </div>
    </div>
  );
}
