import type { Signal } from "@/data/types";
import { DepthChart } from "@/components/charts/DepthChart";

interface BookTabProps {
  signal: Signal;
}

export function BookTab({ signal }: BookTabProps) {
  const { orderbook } = signal;

  return (
    <div className="p-4 flex flex-col gap-3 h-full">
      {/* Snapshot row */}
      <div className="shrink-0 grid grid-cols-4 gap-1.5">
        <div className="bg-[#0d0d0d] rounded-[2px] px-2 py-1.5 text-center border border-[#333]">
          <div className="text-[#555] text-[9px]">BID</div>
          <div className="text-terminal-green font-medium text-[11px]">${orderbook.bids[0]?.price.toFixed(2)}</div>
        </div>
        <div className="bg-[#0d0d0d] rounded-[2px] px-2 py-1.5 text-center border border-[#333]">
          <div className="text-[#555] text-[9px]">ASK</div>
          <div className="text-terminal-red font-medium text-[11px]">${orderbook.asks[0]?.price.toFixed(2)}</div>
        </div>
        <div className="bg-[#0d0d0d] rounded-[2px] px-2 py-1.5 text-center border border-[#333]">
          <div className="text-[#555] text-[9px]">SPREAD</div>
          <div className="text-white font-medium text-[11px]">{signal.spread.toFixed(3)}</div>
        </div>
        <div className="bg-[#0d0d0d] rounded-[2px] px-2 py-1.5 text-center border border-[#333]">
          <div className="text-[#555] text-[9px]">IMBALANCE</div>
          <div className={`font-medium text-[11px] ${orderbook.imbalance >= 0 ? "text-terminal-green" : "text-terminal-red"}`}>
            {orderbook.imbalance >= 0 ? "+" : ""}{(orderbook.imbalance * 100).toFixed(0)}%
          </div>
        </div>
      </div>

      {/* Depth Chart — takes available space */}
      <div className="flex-1 min-h-[60px] bg-[#0d0d0d] rounded-[2px] p-2 border border-[#333] flex flex-col">
        <div className="text-[10px] text-[#555] mb-1 shrink-0">DEPTH</div>
        <div className="flex-1 min-h-0">
          <DepthChart bids={orderbook.bids} asks={orderbook.asks} width={320} height={100} />
        </div>
      </div>

      {/* Order book tables */}
      <div className="shrink-0 grid grid-cols-2 gap-3">
        <div className="flex flex-col">
          <div className="text-[10px] text-[#555] tracking-wider mb-1 shrink-0">BIDS</div>
          <table className="w-full text-[10px]">
            <thead>
              <tr className="text-[#555]">
                <th className="text-left font-normal pb-0.5">Price</th>
                <th className="text-right font-normal pb-0.5">Size</th>
                <th className="text-right font-normal pb-0.5">Total</th>
              </tr>
            </thead>
            <tbody>
              {orderbook.bids.slice(0, 5).map((bid, i) => (
                <tr key={i}>
                  <td className="text-terminal-green py-px">${bid.price.toFixed(2)}</td>
                  <td className="text-right text-white py-px">{bid.size}</td>
                  <td className="text-right text-[#555] py-px">{bid.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col">
          <div className="text-[10px] text-[#555] tracking-wider mb-1 shrink-0">ASKS</div>
          <table className="w-full text-[10px]">
            <thead>
              <tr className="text-[#555]">
                <th className="text-left font-normal pb-0.5">Price</th>
                <th className="text-right font-normal pb-0.5">Size</th>
                <th className="text-right font-normal pb-0.5">Total</th>
              </tr>
            </thead>
            <tbody>
              {orderbook.asks.slice(0, 5).map((ask, i) => (
                <tr key={i}>
                  <td className="text-terminal-red py-px">${ask.price.toFixed(2)}</td>
                  <td className="text-right text-white py-px">{ask.size}</td>
                  <td className="text-right text-[#555] py-px">{ask.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
