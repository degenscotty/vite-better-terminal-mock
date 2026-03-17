import { useState } from "react";
import type { Signal } from "@/data/types";
import { Checkbox } from "@/components/ui/checkbox";

interface TradeTabProps {
  signal: Signal;
}

export function TradeTab({ signal }: TradeTabProps) {
  const [side, setSide] = useState<"BUY" | "SELL">(signal.action);
  const [notional, setNotional] = useState(10);
  const presets = [5, 10, 25, 50];

  return (
    <div className="p-4 flex flex-col gap-3 h-full">
      {/* Bid/Ask/Spread */}
      <div className="shrink-0 grid grid-cols-3 gap-1.5">
        <div className="border border-[#333] rounded-[2px] px-2 py-1.5 bg-[#0d0d0d]">
          <div className="text-[9px] text-[#555] tracking-wider">BID</div>
          <div className="text-terminal-green font-bold text-[13px]">${signal.bid.toFixed(2)}</div>
        </div>
        <div className="border border-[#333] rounded-[2px] px-2 py-1.5 bg-[#0d0d0d]">
          <div className="text-[9px] text-[#555] tracking-wider">ASK</div>
          <div className="text-terminal-red font-bold text-[13px]">${signal.ask.toFixed(2)}</div>
        </div>
        <div className="border border-[#333] rounded-[2px] px-2 py-1.5 bg-[#0d0d0d]">
          <div className="text-[9px] text-[#555] tracking-wider">SPR</div>
          <div className="text-white font-bold text-[13px]">${signal.spread.toFixed(2)}</div>
        </div>
      </div>

      {/* Side + Order type */}
      <div className="shrink-0 flex items-center gap-3">
        <div className="flex gap-1">
          <button
            onClick={() => setSide("BUY")}
            className={`px-4 py-1.5 rounded-[2px] text-[11px] font-medium transition-colors border ${
              side === "BUY"
                ? "border-terminal-green text-terminal-green"
                : "border-[#333] text-[#666] hover:text-white"
            }`}
          >
            BUY
          </button>
          <button
            onClick={() => setSide("SELL")}
            className={`px-4 py-1.5 rounded-[2px] text-[11px] font-medium transition-colors border ${
              side === "SELL"
                ? "border-terminal-red text-terminal-red"
                : "border-[#333] text-[#666] hover:text-white"
            }`}
          >
            SELL
          </button>
        </div>
        <span className="text-[11px] text-[#555]">GTC &middot; CROSS</span>
        <div className="flex-1" />
        <button className="btn-bracket text-[10px]">[DEFAULTS]</button>
      </div>

      {/* Notional */}
      <div className="shrink-0">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[9px] text-[#555] tracking-wider">NOTIONAL (USDC)</span>
          <button className="btn-bracket text-[9px]">[REPLICATE]</button>
        </div>
        <div className="flex items-center gap-1.5">
          {presets.map((p) => (
            <button
              key={p}
              onClick={() => setNotional(p)}
              className={`w-10 h-7 rounded-[2px] text-[11px] transition-colors border ${
                notional === p
                  ? "text-terminal-green border-terminal-green/30"
                  : "text-[#666] border-[#333] hover:text-white"
              }`}
            >
              {p}
            </button>
          ))}
          <input
            type="number"
            value={notional}
            onChange={(e) => setNotional(Number(e.target.value))}
            className="w-20 bg-[#0a0a0a] border border-[#333] rounded-[2px] px-3 py-1 text-[12px] text-white text-center ml-1"
          />
        </div>
      </div>

      {/* Safety Rails */}
      <div className="shrink-0 space-y-1.5">
        <label className="flex items-center gap-2.5 text-[11px] text-[#888] cursor-pointer">
          <Checkbox className="h-3.5 w-3.5" defaultChecked />
          <span>$10 BUY position cap (default ON)</span>
        </label>
        <label className="flex items-center gap-2.5 text-[11px] text-[#888] cursor-pointer">
          <Checkbox className="h-3.5 w-3.5" />
          <span>Allow UP/DOWN 5m/15m BUY entries (default OFF)</span>
        </label>
      </div>

      {/* Spacer pushes execute to bottom */}
      <div className="flex-1" />

      {/* Execute — pinned to bottom */}
      <div className="shrink-0 border-t border-[#333] pt-3 space-y-2">
        <div className="text-[9px] text-[#555] font-mono truncate">
          market={signal.metadata}
        </div>
        <button
          className={`w-full py-2 text-[12px] font-bold tracking-wider rounded-[2px] border transition-colors ${
            side === "BUY"
              ? "bg-terminal-green hover:bg-terminal-green/80 text-black border-terminal-green"
              : "bg-terminal-red hover:bg-terminal-red/80 text-white border-terminal-red"
          }`}
        >
          [EXECUTE]
        </button>
      </div>

      {/* Recent Trade */}
      <div className="shrink-0 border border-[#333] rounded-[2px] px-2 py-1.5 bg-[#0d0d0d]">
        <div className="flex items-center justify-between text-[9px]">
          <span className="text-[#555] font-mono truncate">
            3/2/2026 &middot; BUY &middot; $10.00 &middot; Yes
          </span>
          <span className="text-terminal-green font-medium shrink-0 ml-2">SAFE</span>
        </div>
      </div>
    </div>
  );
}
