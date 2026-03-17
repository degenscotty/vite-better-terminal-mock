import type { Position } from "@/data/types";

interface WalletPageProps {
  positions: Position[];
}

export function WalletPage({ positions }: WalletPageProps) {
  const activeCount = positions.filter((p) => p.status === "ACTIVE").length;
  const resolvedCount = positions.filter((p) => p.status === "RESOLVED").length;
  const lostCount = positions.filter((p) => p.status === "LOST").length;

  return (
    <div className="max-w-[1140px] mx-auto px-8 py-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-[15px] font-bold tracking-wider text-white mb-1">WALLET</h1>
          <div className="text-[12px] text-[#888]">
            Destination: <span className="text-white font-mono">0x256E...27A8</span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <button className="btn-bracket text-[12px]">[WITHDRAW]</button>
          <div className="flex gap-2">
            <button className="btn-bracket text-[11px]">[REFRESH STATUS]</button>
            <button className="btn-bracket text-[11px] text-[#555]">[REFRESH BAL]</button>
          </div>
        </div>
      </div>

      {/* Balance Cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="border border-[#333] rounded-[2px] p-5 bg-[#111]">
          <div className="text-[11px] text-[#666] tracking-wider mb-2">Cash Balance</div>
          <div className="text-[22px] text-white font-bold mb-3">14.653437</div>
          <div className="text-[11px] text-[#666] space-y-0.5">
            <div>Safe (0x256E...27A8): 14.653437</div>
            <div>EOA (0x8D09...cBB3): 0.000000</div>
            <div>Polygon USDC.e</div>
          </div>
        </div>
        <div className="border border-[#333] rounded-[2px] p-5 bg-[#111]">
          <div className="text-[11px] text-[#666] tracking-wider mb-2">Portfolio Value</div>
          <div className="text-[22px] text-white font-bold mb-3">$0.00</div>
          <div className="text-[11px] text-[#666]">
            {activeCount} active &middot; {resolvedCount} resolved
          </div>
        </div>
        <div className="border border-[#333] rounded-[2px] p-5 bg-[#111]">
          <div className="text-[11px] text-[#666] tracking-wider mb-2">Account P&L</div>
          <div className="text-[22px] text-white font-bold mb-3">...</div>
          <div className="text-[11px] text-[#666]">
            Deposits vs current value
          </div>
        </div>
      </div>

      {/* Settlement notice */}
      <div className="border border-terminal-amber/30 rounded-[2px] p-4 mb-6 bg-terminal-amber/5">
        <div className="text-[11px] text-terminal-amber leading-relaxed">
          Settlement timing notice: after a market resolves, redemption + wallet balance updates can take up to ~30 minutes. If totals look stale, wait briefly and press [REFRESH COCKPIT].
        </div>
      </div>

      {/* Deposits & Funding */}
      <div className="border border-[#333] rounded-[2px] p-5 mb-6 bg-[#111]">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[12px] font-bold tracking-wider text-white">Deposits & Funding</h2>
          <button className="btn-bracket text-[11px]">[EXPAND DEPOSITS]</button>
        </div>
        <div className="text-[11px] text-[#666]">
          Deposits &middot; Base &middot; 0xa76c...4514
        </div>
      </div>

      {/* Active Risk Cockpit */}
      <div className="border border-[#333] rounded-[2px] p-5 mb-6 bg-[#111]">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[12px] font-bold tracking-wider text-white">Active Risk Cockpit</h2>
          <span className="text-[11px] text-[#666]">{activeCount} active &middot; {activeCount} positions</span>
        </div>

        {/* Risk metrics */}
        <div className="grid grid-cols-5 gap-3 mb-4">
          <div className="border border-[#333] rounded-[2px] p-3">
            <div className="text-[10px] text-[#555] tracking-wider mb-1">EXPOSURE</div>
            <div className="text-[14px] text-white font-medium">$0.00</div>
          </div>
          <div className="border border-[#333] rounded-[2px] p-3">
            <div className="text-[10px] text-[#555] tracking-wider mb-1">UNREALIZED</div>
            <div className="text-[14px] text-terminal-green font-medium">+$0.00</div>
          </div>
          <div className="border border-[#333] rounded-[2px] p-3">
            <div className="text-[10px] text-[#555] tracking-wider mb-1">PROTECTED</div>
            <div className="text-[14px] text-white font-medium">0/0</div>
          </div>
          <div className="border border-[#333] rounded-[2px] p-3">
            <div className="text-[10px] text-[#555] tracking-wider mb-1">CLOSE-READY</div>
            <div className="text-[14px] text-white font-medium">0</div>
          </div>
          <div className="border border-[#333] rounded-[2px] p-3">
            <div className="text-[10px] text-[#555] tracking-wider mb-1">RISK AGE</div>
            <div className="text-[14px] text-white font-medium">---</div>
          </div>
        </div>

        {/* Risk action buttons */}
        <div className="flex items-center gap-2">
          <button className="btn-bracket text-[11px]">[REFRESH COCKPIT]</button>
          <button className="btn-bracket text-[11px] text-[#555]">[CLOSE ALL ({activeCount})]</button>
          <button className="btn-bracket text-[11px] text-[#555]">[CANCEL TP/SL ({activeCount})]</button>
          <button className="btn-bracket text-[11px] text-[#555]">[REDEEM RESOLVED ({resolvedCount})]</button>
        </div>
      </div>

      {/* Positions */}
      <div className="border border-[#333] rounded-[2px] p-5 bg-[#111]">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[12px] font-bold tracking-wider text-white">Positions</h2>
          <span className="text-[11px] text-[#666]">
            {activeCount} active &middot; {resolvedCount} resolved &middot; {lostCount} lost &middot; refreshed 1s ago
          </span>
        </div>

        <div className="text-[11px] text-[#666] mb-4">
          LOST / EXPIRED ({lostCount})
        </div>

        <div className="space-y-3">
          {positions.map((pos) => (
            <div key={pos.id} className="border border-[#333] rounded-[2px] p-4">
              <div className="flex items-start justify-between mb-1.5">
                <div className="text-[13px] text-white font-medium">{pos.market}</div>
                <span
                  className={`text-[10px] px-2 py-0.5 border rounded-[2px] ml-4 shrink-0 ${
                    pos.status === "ACTIVE"
                      ? "border-terminal-green/40 text-terminal-green"
                      : pos.status === "RESOLVED"
                      ? "border-terminal-blue/40 text-terminal-blue"
                      : "border-terminal-red/40 text-terminal-red"
                  }`}
                >
                  {pos.status}{pos.wonOutcome ? ` (won: ${pos.wonOutcome})` : ""}
                </span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <div className="text-[#666]">
                  {pos.shares.toFixed(2)} shares ({pos.status === "LOST" ? "lost" : pos.status === "RESOLVED" ? "resolved" : "active"} &mdash; ${pos.pnl >= 0 ? pos.pnl.toFixed(2) : "0"} payout)
                </div>
                <div className="text-right">
                  <div className="text-white">${Math.abs(pos.pnl).toFixed(2)}</div>
                  <div className={pos.pnl >= 0 ? "text-terminal-green" : "text-terminal-red"}>
                    ${pos.pnl >= 0 ? "" : "-"}{Math.abs(pos.cost).toFixed(2)}
                  </div>
                </div>
              </div>
              <div className="text-[10px] text-[#555] mt-1">
                entry: ${pos.entry.toFixed(4)} &middot; cost: ${pos.cost.toFixed(2)}
              </div>
              {pos.status === "ACTIVE" && (
                <div className="flex gap-2 mt-2">
                  <button className="btn-bracket text-[10px] text-terminal-red border-terminal-red/30">SELL</button>
                  <button className="btn-bracket text-[10px]">SET TP/SL</button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
