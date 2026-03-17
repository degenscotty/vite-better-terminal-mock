import type { OrderBookEntry } from "@/data/types";

interface DepthChartProps {
  bids: OrderBookEntry[];
  asks: OrderBookEntry[];
  width?: number;
  height?: number;
}

export function DepthChart({ bids, asks, width = 320, height = 100 }: DepthChartProps) {
  if (bids.length === 0 || asks.length === 0) return null;

  const padding = { top: 5, right: 5, bottom: 5, left: 5 };
  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;
  const halfW = chartW / 2;

  const maxTotal = Math.max(
    bids[bids.length - 1].total,
    asks[asks.length - 1].total
  );

  // Bids (left side, reversed so highest price is in the middle)
  const bidPoints = bids.map((b, i) => ({
    x: padding.left + halfW - (i / (bids.length - 1)) * halfW,
    y: padding.top + chartH - (b.total / maxTotal) * chartH,
  }));

  // Asks (right side)
  const askPoints = asks.map((a, i) => ({
    x: padding.left + halfW + (i / (asks.length - 1)) * halfW,
    y: padding.top + chartH - (a.total / maxTotal) * chartH,
  }));

  const bidPath = bidPoints.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const askPath = askPoints.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");

  const bidArea = bidPath + ` L ${bidPoints[bidPoints.length - 1].x} ${padding.top + chartH} L ${bidPoints[0].x} ${padding.top + chartH} Z`;
  const askArea = askPath + ` L ${askPoints[askPoints.length - 1].x} ${padding.top + chartH} L ${askPoints[0].x} ${padding.top + chartH} Z`;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMidYMid meet"
      className="w-full h-full"
    >
      <path d={bidArea} fill="#22c55e" opacity={0.15} />
      <path d={bidPath} fill="none" stroke="#22c55e" strokeWidth={1.5} />
      <path d={askArea} fill="#ef4444" opacity={0.15} />
      <path d={askPath} fill="none" stroke="#ef4444" strokeWidth={1.5} />
      {/* Center line */}
      <line
        x1={padding.left + halfW}
        y1={padding.top}
        x2={padding.left + halfW}
        y2={padding.top + chartH}
        stroke="#333"
        strokeDasharray="3,3"
      />
    </svg>
  );
}
