import { useRef, useEffect, useState } from "react";
import type { Signal } from "@/data/types";
import { SignalCard } from "./SignalCard";
import { Input } from "@/components/ui/input";

interface SignalFeedProps {
  signals: Signal[];
  selectedSignal: Signal | null;
  onSelectSignal: (signal: Signal) => void;
  autoScroll: boolean;
  onToggleAutoScroll: () => void;
}

export function SignalFeed({
  signals,
  selectedSignal,
  onSelectSignal,
  autoScroll,
  onToggleAutoScroll,
}: SignalFeedProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [search, setSearch] = useState("");
  const [density, setDensity] = useState<"compact" | "comfortable">("comfortable");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    if (autoScroll && scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [signals.length, autoScroll]);

  const filtered = search
    ? signals.filter((s) =>
        s.market.toLowerCase().includes(search.toLowerCase()) ||
        s.metadata.toLowerCase().includes(search.toLowerCase())
      )
    : signals;

  const shownCount = filtered.length;

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-5 py-3 border-b border-[#333] bg-[#0d0d0d] shrink-0">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-[15px] font-bold tracking-wider text-white">SIGNAL FEED</span>
          <span className="text-terminal-red text-[12px] font-bold">LIVE</span>
          <span className="text-[11px] text-[#666]">
            ({signals.length.toLocaleString()} TOTAL)
          </span>
          <span className="text-[11px] text-[#666]">
            ({shownCount} SHOWN)
          </span>
          <div className="flex-1" />
          <button
            onClick={onToggleAutoScroll}
            className="btn-bracket"
          >
            AUTO-SCROLL: {autoScroll ? "ON" : "OFF"}
          </button>
          <button
            onClick={() => setDensity(density === "compact" ? "comfortable" : "compact")}
            className="btn-bracket"
          >
            DENSITY: {density === "compact" ? "COMPACT" : "COMFORTABLE"}
          </button>
        </div>

        {/* Search */}
        <Input
          placeholder="Search markets (keywords, phrases, market_slug:btc)..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-9 text-[12px] bg-[#0a0a0a] border-[#333] placeholder:text-[#444] rounded-[2px]"
        />

        {/* Filters toggle */}
        <div className="mt-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="btn-bracket text-[11px]"
          >
            FILTERS <span className="text-white ml-1">2</span> <span className="ml-2">{showFilters ? "\u25B2" : "\u25BC"}</span>
          </button>
        </div>

        {showFilters && (
          <div className="mt-3 p-3 bg-[#0a0a0a] rounded-[2px] border border-[#333] text-[11px] text-[#666] grid grid-cols-3 gap-3">
            <div>
              <span className="block mb-1.5 text-[10px] tracking-wider">CONFIDENCE</span>
              <select className="bg-[#141414] border border-[#333] rounded-[2px] px-2 py-1 text-white w-full">
                <option>All</option>
                <option>&gt;75% (High)</option>
                <option>&gt;50% (Med)</option>
              </select>
            </div>
            <div>
              <span className="block mb-1.5 text-[10px] tracking-wider">ACTION</span>
              <select className="bg-[#141414] border border-[#333] rounded-[2px] px-2 py-1 text-white w-full">
                <option>All</option>
                <option>BUY</option>
                <option>SELL</option>
              </select>
            </div>
            <div>
              <span className="block mb-1.5 text-[10px] tracking-wider">CATEGORY</span>
              <select className="bg-[#141414] border border-[#333] rounded-[2px] px-2 py-1 text-white w-full">
                <option>All</option>
                <option>CRYPTO</option>
                <option>POL</option>
                <option>FIN</option>
                <option>TECH</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Signal list */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto">
        {filtered.map((signal, i) => (
          <SignalCard
            key={signal.id}
            signal={signal}
            isSelected={selectedSignal?.id === signal.id}
            onClick={() => onSelectSignal(signal)}
            isNew={i === 0}
          />
        ))}
      </div>
    </div>
  );
}
