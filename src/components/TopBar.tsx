import { BetterLogo } from "./BetterLogo";
import type { PageTab } from "@/App";

interface TopBarProps {
  totalSignals: number;
  highConfCount: number;
  avgConfidence: number;
  activeTab: PageTab;
  onTabChange: (tab: PageTab) => void;
}

export function TopBar({ totalSignals, highConfCount, avgConfidence, activeTab, onTabChange }: TopBarProps) {
  return (
    <div className="border-b border-[#333] bg-[#0d0d0d] shrink-0">
      {/* Logo row — centered */}
      <div className="flex items-center justify-center py-4 border-b border-[#1a1a1a]">
        <BetterLogo height={44} />
      </div>

      {/* Nav bar */}
      <div className="h-11 flex items-center px-5 gap-6">
        {/* Nav tabs - bracket style */}
        <div className="flex items-center border border-[#333] rounded-[2px]">
          {(["TERMINAL", "WALLET", "VAULT"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => onTabChange(tab)}
              className={`px-5 py-1.5 text-[12px] tracking-wide transition-colors ${
                tab === activeTab
                  ? "bg-[#1a1a1a] text-white"
                  : "text-[#666] hover:text-white hover:bg-[#151515]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Stats - stacked columns */}
        <div className="flex items-center gap-6 ml-4 text-[11px]">
          <div className="flex flex-col items-center leading-tight">
            <span className="text-[#555] text-[9px] tracking-wider">TOTAL</span>
            <span className="text-white font-medium">{totalSignals.toLocaleString()}</span>
          </div>
          <div className="flex flex-col items-center leading-tight">
            <span className="text-[#555] text-[9px] tracking-wider">HIGH CONF</span>
            <span className="text-terminal-green font-medium">{highConfCount.toLocaleString()}</span>
          </div>
          <div className="flex flex-col items-center leading-tight">
            <span className="text-[#555] text-[9px] tracking-wider">AVG CONF</span>
            <span className="text-terminal-amber font-medium">{avgConfidence}%</span>
          </div>
          <div className="flex flex-col items-center leading-tight">
            <span className="text-[#555] text-[9px] tracking-wider">LATENCY</span>
            <span className="text-terminal-green font-medium">49.4ms</span>
          </div>
        </div>

        {/* DOME indicators */}
        <div className="flex items-center gap-2 ml-4">
          <span className="text-[11px] text-[#555]">DOME:</span>
          <span className="w-2 h-2 rounded-full bg-terminal-amber" />
          <span className="w-2 h-2 rounded-full bg-terminal-green" />
          <span className="w-2 h-2 rounded-full bg-terminal-green" />
        </div>

        {/* Operator - stacked */}
        <div className="flex flex-col leading-tight text-[11px] ml-4">
          <span className="text-[#555] text-[9px] tracking-wider">OPERATOR</span>
          <span className="text-white font-mono text-[10px]">0x0a7905753607a6e112127ab2d92e1c6021ad9ca5</span>
        </div>

        <div className="flex-1" />

        {/* Action buttons - bracket style */}
        <div className="flex items-center gap-2">
          <button className="btn-bracket">[CSV]</button>
          <button className="btn-bracket">[LIGHT]</button>
          <button className="btn-bracket">EXIT</button>
        </div>
      </div>
    </div>
  );
}
