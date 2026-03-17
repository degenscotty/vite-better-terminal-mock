import type { Signal } from "@/data/types";
import { ConfidenceBar } from "@/components/charts/ConfidenceBar";

interface DetailsTabProps {
  signal: Signal;
}

export function DetailsTab({ signal }: DetailsTabProps) {
  return (
    <div className="p-4 flex flex-col gap-3 h-full text-xs">
      {/* Trade + Pricing — single dense grid */}
      <div className="shrink-0">
        <h4 className="text-[10px] text-[#666] tracking-wider mb-1.5">TRADE INFO</h4>
        <div className="grid grid-cols-4 gap-1.5">
          <div className="bg-[#0d0d0d] rounded-[2px] px-2 py-1.5 border border-[#333]">
            <div className="text-[#555] text-[9px]">PRICE</div>
            <div className="text-white font-medium">${signal.price.toFixed(2)}</div>
          </div>
          <div className="bg-[#0d0d0d] rounded-[2px] px-2 py-1.5 border border-[#333]">
            <div className="text-[#555] text-[9px]">SIZE</div>
            <div className="text-white font-medium">{signal.size.toFixed(2)}</div>
          </div>
          <div className="bg-[#0d0d0d] rounded-[2px] px-2 py-1.5 border border-[#333]">
            <div className="text-[#555] text-[9px]">SIDE</div>
            <div className={`font-medium ${signal.action === "BUY" ? "text-terminal-green" : "text-terminal-red"}`}>
              {signal.action} {signal.outcome}
            </div>
          </div>
          <div className="bg-[#0d0d0d] rounded-[2px] px-2 py-1.5 border border-[#333]">
            <div className="text-[#555] text-[9px]">NOTIONAL</div>
            <div className="text-white font-medium">${signal.notional.toFixed(2)}</div>
          </div>
          <div className="bg-[#0d0d0d] rounded-[2px] px-2 py-1.5 border border-[#333]">
            <div className="text-[#555] text-[9px]">BID</div>
            <div className="text-terminal-green font-medium">${signal.bid.toFixed(2)}</div>
          </div>
          <div className="bg-[#0d0d0d] rounded-[2px] px-2 py-1.5 border border-[#333]">
            <div className="text-[#555] text-[9px]">ASK</div>
            <div className="text-terminal-red font-medium">${signal.ask.toFixed(2)}</div>
          </div>
          <div className="bg-[#0d0d0d] rounded-[2px] px-2 py-1.5 border border-[#333]">
            <div className="text-[#555] text-[9px]">SPREAD</div>
            <div className="text-white font-medium">${signal.spread.toFixed(2)}</div>
          </div>
          <div className="bg-[#0d0d0d] rounded-[2px] px-2 py-1.5 border border-[#333]">
            <div className="text-[#555] text-[9px]">DELTA</div>
            <div className={`font-medium ${signal.delta >= 0 ? "text-terminal-green" : "text-terminal-red"}`}>
              {signal.delta >= 0 ? "+" : ""}{signal.delta.toFixed(2)}
            </div>
          </div>
        </div>
      </div>

      {/* Operator — inline row */}
      <div className="shrink-0">
        <h4 className="text-[10px] text-[#666] tracking-wider mb-1.5">OPERATOR</h4>
        <div className="flex items-center gap-4 text-[11px]">
          <span className="text-white font-mono">{signal.operator}</span>
          <span className="text-[#555]">|</span>
          <span className="text-[#666]">Vol <span className="text-white">${(signal.volume / 1000).toFixed(1)}k</span></span>
          <span className="text-[#666]">Trades <span className="text-white">{signal.trades24h}</span></span>
          <span className="text-[#666]">Pos <span className="text-white">{signal.traderPositions}</span></span>
        </div>
      </div>

      {/* Confidence Breakdown — flex-fills remaining space */}
      <div className="flex-1 min-h-0 flex flex-col">
        <h4 className="text-[10px] text-[#666] tracking-wider mb-1.5 shrink-0">CONFIDENCE</h4>
        <div className="flex-1 flex flex-col gap-1 min-h-0">
          <ConfidenceBar label="Position" value={signal.confidenceBreakdown.position} color="#3b82f6" />
          <ConfidenceBar label="Track Record" value={signal.confidenceBreakdown.trackRecord} color="#22c55e" />
          <ConfidenceBar label="Market" value={signal.confidenceBreakdown.market} color="#22c55e" />
          <ConfidenceBar label="Corroboration" value={signal.confidenceBreakdown.corroboration} color="#f59e0b" />
          <ConfidenceBar label="Timing" value={signal.confidenceBreakdown.timing} color="#22c55e" />
        </div>
      </div>

      {/* Stats — single row pinned to bottom */}
      <div className="shrink-0 flex items-center gap-4 text-[10px] border-t border-[#333] pt-2">
        <span className="text-[#666]">PnL 7D <span className={signal.pnl7d >= 0 ? "text-terminal-green" : "text-terminal-red"}>{signal.pnl7d >= 0 ? "+" : ""}{signal.pnl7d.toFixed(1)}%</span></span>
        <span className="text-[#666]">PnL 30D <span className={signal.pnl30d >= 0 ? "text-terminal-green" : "text-terminal-red"}>{signal.pnl30d >= 0 ? "+" : ""}{signal.pnl30d.toFixed(1)}%</span></span>
        <span className="text-[#666]">Sharpe <span className="text-white">{signal.sharpe30d.toFixed(2)}</span></span>
        <span className="text-[#666]">Expires <span className="text-white">{signal.expiryDate}</span></span>
      </div>
    </div>
  );
}
