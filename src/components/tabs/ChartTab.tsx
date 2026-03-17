import type { Signal } from "@/data/types";

interface ChartTabProps {
  signal: Signal;
}

function formatDate(timestamp: number): string {
  return new Date(timestamp).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function ChartTab({ signal }: ChartTabProps) {
  const { priceHistory } = signal;
  if (priceHistory.length < 2) return null;

  const prices = priceHistory.map((p) => p.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const range = maxPrice - minPrice || 0.01;

  // Add some padding to the range
  const paddedMin = Math.max(0, minPrice - range * 0.1);
  const paddedMax = Math.min(1, maxPrice + range * 0.1);
  const paddedRange = paddedMax - paddedMin;

  const viewW = 400;
  const viewH = 200;
  const padding = { top: 12, right: 50, bottom: 24, left: 6 };
  const chartW = viewW - padding.left - padding.right;
  const chartH = viewH - padding.top - padding.bottom;

  const xScale = (i: number) => padding.left + (i / (priceHistory.length - 1)) * chartW;
  const yScale = (price: number) => padding.top + (1 - (price - paddedMin) / paddedRange) * chartH;

  const pathD = priceHistory
    .map((p, i) => `${i === 0 ? "M" : "L"} ${xScale(i)} ${yScale(p.price)}`)
    .join(" ");

  const lastIdx = priceHistory.length - 1;
  const areaD = pathD + ` L ${xScale(lastIdx)} ${yScale(paddedMin)} L ${xScale(0)} ${yScale(paddedMin)} Z`;

  const lastPoint = priceHistory[lastIdx];
  const firstPoint = priceHistory[0];
  const isPositive = lastPoint.price >= firstPoint.price;
  const strokeColor = isPositive ? "#22c55e" : "#ef4444";

  // Y-axis grid lines
  const gridSteps = 5;
  const gridLines = Array.from({ length: gridSteps + 1 }, (_, i) => {
    const val = paddedMin + (paddedRange / gridSteps) * i;
    return val;
  });

  // X-axis labels (show ~4 dates)
  const xLabelCount = 4;
  const xLabels = Array.from({ length: xLabelCount }, (_, i) => {
    const idx = Math.round((i / (xLabelCount - 1)) * lastIdx);
    return { x: xScale(idx), label: formatDate(priceHistory[idx].time) };
  });

  const change = lastPoint.price - firstPoint.price;
  const changePct = ((change / firstPoint.price) * 100).toFixed(1);

  return (
    <div className="p-4 flex flex-col gap-3 h-full">
      {/* Price header */}
      <div className="shrink-0 flex items-baseline gap-3">
        <span className="text-[22px] text-white font-bold tabular-nums">${lastPoint.price.toFixed(2)}</span>
        <span className={`text-[12px] font-medium ${isPositive ? "text-terminal-green" : "text-terminal-red"}`}>
          {change >= 0 ? "+" : ""}{change.toFixed(2)} ({change >= 0 ? "+" : ""}{changePct}%)
        </span>
        <span className="text-[10px] text-[#555]">30D</span>
      </div>

      {/* Chart — fills remaining space */}
      <div className="flex-1 min-h-0 bg-[#0d0d0d] rounded-[2px] border border-[#333] p-1">
        <svg
          viewBox={`0 0 ${viewW} ${viewH}`}
          preserveAspectRatio="xMidYMid meet"
          className="w-full h-full"
        >
          {/* Grid lines */}
          {gridLines.map((val) => (
            <g key={val}>
              <line
                x1={padding.left}
                y1={yScale(val)}
                x2={viewW - padding.right}
                y2={yScale(val)}
                stroke="#1e1e1e"
                strokeWidth={1}
              />
              <text
                x={viewW - padding.right + 4}
                y={yScale(val) + 3}
                fill="#555"
                fontSize={8}
                fontFamily="monospace"
              >
                ${val.toFixed(2)}
              </text>
            </g>
          ))}

          {/* Area fill */}
          <path d={areaD} fill={strokeColor} opacity={0.06} />

          {/* Price line */}
          <path d={pathD} fill="none" stroke={strokeColor} strokeWidth={1.5} />

          {/* Current price dot */}
          <circle
            cx={xScale(lastIdx)}
            cy={yScale(lastPoint.price)}
            r={3}
            fill={strokeColor}
          />

          {/* Current price horizontal line */}
          <line
            x1={padding.left}
            y1={yScale(lastPoint.price)}
            x2={viewW - padding.right}
            y2={yScale(lastPoint.price)}
            stroke={strokeColor}
            strokeWidth={0.5}
            strokeDasharray="3,3"
            opacity={0.5}
          />

          {/* X-axis labels */}
          {xLabels.map((lbl, i) => (
            <text
              key={i}
              x={lbl.x}
              y={viewH - 4}
              textAnchor="middle"
              fill="#555"
              fontSize={8}
              fontFamily="monospace"
            >
              {lbl.label}
            </text>
          ))}
        </svg>
      </div>

      {/* Footer stats */}
      <div className="shrink-0 flex items-center gap-4 text-[10px] border-t border-[#333] pt-2">
        <span className="text-[#666]">Open <span className="text-white">${firstPoint.price.toFixed(2)}</span></span>
        <span className="text-[#666]">High <span className="text-terminal-green">${maxPrice.toFixed(2)}</span></span>
        <span className="text-[#666]">Low <span className="text-terminal-red">${minPrice.toFixed(2)}</span></span>
        <span className="text-[#666]">Bid <span className="text-terminal-green">${signal.bid.toFixed(2)}</span></span>
        <span className="text-[#666]">Ask <span className="text-terminal-red">${signal.ask.toFixed(2)}</span></span>
      </div>
    </div>
  );
}
