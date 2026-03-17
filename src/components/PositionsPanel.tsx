import { useState } from "react";
import type { Position } from "@/data/types";

interface PositionsPanelProps {
  positions: Position[];
}

type PositionTab = "active" | "closed";

export function PositionsPanel({ positions }: PositionsPanelProps) {
  const [tab, setTab] = useState<PositionTab>("active");

  const activePositions = positions.filter((p) => p.status === "ACTIVE");
  const closedPositions = positions.filter((p) => p.status === "RESOLVED" || p.status === "LOST");

  const shown = tab === "active" ? activePositions : closedPositions;

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-2 border-b border-[#333] bg-[#0d0d0d] shrink-0">
        <span className="text-xs font-bold tracking-wider text-white">POSITIONS</span>

        {/* Tabs */}
        <div className="flex gap-1 ml-1">
          <button
            onClick={() => setTab("active")}
            className={`px-3 py-1 text-[10px] tracking-wider transition-colors border rounded-[2px] ${
              tab === "active"
                ? "text-white bg-[#1a1a1a] border-[#555]"
                : "text-[#666] border-[#333] hover:text-white hover:border-[#555]"
            }`}
          >
            ACTIVE <span className="text-[#888] ml-0.5">{activePositions.length}</span>
          </button>
          <button
            onClick={() => setTab("closed")}
            className={`px-3 py-1 text-[10px] tracking-wider transition-colors border rounded-[2px] ${
              tab === "closed"
                ? "text-white bg-[#1a1a1a] border-[#555]"
                : "text-[#666] border-[#333] hover:text-white hover:border-[#555]"
            }`}
          >
            CLOSED <span className="text-[#888] ml-0.5">{closedPositions.length}</span>
          </button>
        </div>

        <span className="text-[10px] text-[#555]">refreshed 7s ago</span>

        <div className="flex-1" />

        {tab === "active" ? (
          <>
            <button className="btn-bracket text-[10px] text-terminal-red border-terminal-red/30 hover:border-terminal-red/50">
              [SELL ALL ({activePositions.length})]
            </button>
            <button className="btn-bracket text-[10px]">[CLOSE ALL ({activePositions.length})]</button>
          </>
        ) : (
          <button className="btn-bracket text-[10px]">
            [REDEEM RESOLVED ({closedPositions.filter((p) => p.status === "RESOLVED").length})]
          </button>
        )}
      </div>

      {/* Table */}
      <div className="flex-1 overflow-y-auto">
        <table className="w-full text-[11px]">
          <thead className="sticky top-0 bg-[#0d0d0d]">
            <tr className="text-[#555] text-[10px] tracking-wider">
              <th className="text-left font-normal px-5 py-2">Market</th>
              <th className="text-center font-normal px-3 py-2">Side</th>
              <th className="text-right font-normal px-3 py-2">Entry</th>
              <th className="text-right font-normal px-3 py-2">Shares</th>
              <th className="text-right font-normal px-3 py-2">Cost</th>
              <th className="text-right font-normal px-3 py-2">PnL</th>
              {tab === "closed" && <th className="text-center font-normal px-3 py-2">Status</th>}
              <th className="text-center font-normal px-5 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {shown.map((pos) => (
              <tr key={pos.id} className="border-b border-[#333]/50 hover:bg-[#181818] transition-colors">
                <td className="px-5 py-2.5 text-white max-w-[300px] truncate">{pos.market}</td>
                <td className="px-3 py-2.5 text-center">
                  <span className={pos.side === "Yes" ? "text-terminal-green" : "text-terminal-red"}>
                    {pos.side}
                  </span>
                </td>
                <td className="px-3 py-2.5 text-right text-white">${pos.entry.toFixed(2)}</td>
                <td className="px-3 py-2.5 text-right text-white">{pos.shares.toFixed(2)}</td>
                <td className="px-3 py-2.5 text-right text-white">${pos.cost.toFixed(2)}</td>
                <td className={`px-3 py-2.5 text-right font-medium ${
                  pos.pnl > 0 ? "text-terminal-green" : pos.pnl < 0 ? "text-terminal-red" : "text-white"
                }`}>
                  {pos.pnl >= 0 ? "+" : ""}${pos.pnl.toFixed(2)}
                </td>
                {tab === "closed" && (
                  <td className="px-3 py-2.5 text-center">
                    <span
                      className={`text-[9px] px-1.5 py-0.5 border rounded-[2px] ${
                        pos.status === "RESOLVED"
                          ? "border-terminal-blue/40 text-terminal-blue"
                          : "border-terminal-red/40 text-terminal-red"
                      }`}
                    >
                      {pos.status}
                      {pos.wonOutcome ? ` (won: ${pos.wonOutcome})` : ""}
                    </span>
                  </td>
                )}
                <td className="px-5 py-2.5 text-center">
                  {pos.status === "ACTIVE" ? (
                    <div className="flex items-center justify-center gap-1">
                      <button className="btn-bracket text-[9px] py-0 px-1.5 text-terminal-red border-terminal-red/30 hover:border-terminal-red/50">
                        SELL
                      </button>
                      <button className="btn-bracket text-[9px] py-0 px-1.5">
                        TP/SL
                      </button>
                    </div>
                  ) : pos.status === "RESOLVED" ? (
                    <button className="btn-bracket text-[9px] py-0 px-1.5 text-terminal-blue border-terminal-blue/30 hover:border-terminal-blue/50">
                      REDEEM
                    </button>
                  ) : (
                    <span className="text-[9px] text-[#444]">---</span>
                  )}
                </td>
              </tr>
            ))}
            {shown.length === 0 && (
              <tr>
                <td colSpan={tab === "closed" ? 8 : 7} className="px-5 py-4 text-center text-[11px] text-[#555]">
                  No {tab} positions
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
