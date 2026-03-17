import type { Signal } from "@/data/types";

interface SignalCardProps {
  signal: Signal;
  isSelected: boolean;
  onClick: () => void;
  isNew?: boolean;
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit" });
}

export function SignalCard({ signal, isSelected, onClick, isNew }: SignalCardProps) {
  const deltaBps = Math.round(signal.delta * 10000);

  return (
    <div
      onClick={onClick}
      className={`group px-5 py-3 border-b border-[#1e1e1e] cursor-pointer transition-all duration-150 ${
        isSelected
          ? "bg-[#0f1a0f] border-l-[3px] border-l-terminal-green"
          : "border-l-[3px] border-l-transparent hover:bg-[#131313]"
      } ${isNew ? "animate-in fade-in slide-in-from-top-1 duration-300" : ""}`}
    >
      {/* Single scannable layout */}
      <div className="flex items-center gap-3">
        {/* Action pill */}
        <span className={`shrink-0 w-[42px] text-center text-[10px] font-bold tracking-wide py-[3px] rounded-[2px] ${
          signal.action === "BUY"
            ? "bg-terminal-green/10 text-terminal-green border border-terminal-green/20"
            : "bg-terminal-red/10 text-terminal-red border border-terminal-red/20"
        }`}>
          {signal.action}
        </span>

        {/* Confidence */}
        <span className={`shrink-0 text-[12px] font-bold tabular-nums w-[34px] text-right ${
          signal.confidence >= 75 ? "text-terminal-green" : signal.confidence >= 50 ? "text-terminal-amber" : "text-terminal-red"
        }`}>
          {signal.confidence}
        </span>

        {/* Market question — the core decision content */}
        <div className="flex-1 min-w-0">
          <div className="text-[13px] text-white font-medium leading-tight truncate">
            {signal.market}
          </div>
        </div>

        {/* Price + Delta cluster */}
        <div className="shrink-0 flex items-center gap-3 text-[11px] tabular-nums">
          <span className="text-[#888]">${signal.price.toFixed(2)}</span>
          <span className={`font-medium ${signal.delta >= 0 ? "text-terminal-green" : "text-terminal-red"}`}>
            {signal.delta >= 0 ? "+" : ""}{deltaBps}bp
          </span>
        </div>

        {/* Category + Time */}
        <div className="shrink-0 flex items-center gap-2.5">
          <span className="text-[9px] px-1.5 py-[1px] border border-[#2a2a2a] text-[#666] rounded-[2px] tracking-wider">
            {signal.category}
          </span>
          <span className="text-[10px] text-[#444] tabular-nums">{formatTime(signal.timestamp)}</span>
        </div>
      </div>
    </div>
  );
}
