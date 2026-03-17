import type { Signal } from "@/data/types";
import { MiniLineChart } from "@/components/charts/MiniLineChart";

interface PerformanceTabProps {
  signal: Signal;
}

export function PerformanceTab({ signal }: PerformanceTabProps) {
  const { performanceData } = signal;

  return (
    <div className="p-4 flex flex-col gap-3 h-full">
      {/* Stats row */}
      <div className="shrink-0 grid grid-cols-3 gap-1.5">
        <div className="bg-[#0d0d0d] rounded-[2px] px-2 py-1.5 text-center border border-[#333]">
          <div className="text-[#555] text-[9px] mb-0.5">ROE</div>
          <div className={`text-[13px] font-bold ${performanceData.roe >= 0 ? "text-terminal-green" : "text-terminal-red"}`}>
            {performanceData.roe >= 0 ? "+" : ""}{performanceData.roe.toFixed(1)}%
          </div>
        </div>
        <div className="bg-[#0d0d0d] rounded-[2px] px-2 py-1.5 text-center border border-[#333]">
          <div className="text-[#555] text-[9px] mb-0.5">WIN RATE</div>
          <div className="text-[13px] font-bold text-white">
            {(performanceData.winRate * 100).toFixed(0)}%
          </div>
        </div>
        <div className="bg-[#0d0d0d] rounded-[2px] px-2 py-1.5 text-center border border-[#333]">
          <div className="text-[#555] text-[9px] mb-0.5">PROFIT FACTOR</div>
          <div className={`text-[13px] font-bold ${performanceData.profitFactor >= 1 ? "text-terminal-green" : "text-terminal-red"}`}>
            {performanceData.profitFactor.toFixed(2)}
          </div>
        </div>
      </div>

      {/* Chart — fills remaining space */}
      <div className="flex-1 min-h-0 bg-[#0d0d0d] rounded-[2px] p-2 border border-[#333] flex flex-col">
        <div className="flex items-center justify-between mb-1 shrink-0">
          <span className="text-[10px] text-[#555]">COPY PERFORMANCE ($1/ORDER) — 90D</span>
          <button className="btn-bracket text-[9px] py-0">REFRESH</button>
        </div>
        <div className="flex-1 min-h-0">
          <MiniLineChart points={performanceData.chartPoints} width={300} height={120} />
        </div>
      </div>

      {/* Footer stats */}
      <div className="shrink-0 flex items-center gap-4 text-[10px] border-t border-[#333] pt-2">
        <span className="text-[#666]">Costs <span className="text-terminal-red">~2-5%</span></span>
        <span className="text-[#666]">Fills <span className="text-white">{performanceData.fills}</span></span>
        <span className="text-[#666]">Basis <span className="text-white">$1.00/order</span></span>
      </div>
    </div>
  );
}
