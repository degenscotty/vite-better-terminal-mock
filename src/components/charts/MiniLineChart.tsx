import type { ChartPoint } from "@/data/types";

interface MiniLineChartProps {
  points: ChartPoint[];
  width?: number;
  height?: number;
}

export function MiniLineChart({ points, width = 320, height = 120 }: MiniLineChartProps) {
  if (points.length < 2) return null;

  const padding = { top: 10, right: 10, bottom: 20, left: 30 };
  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;

  const xScale = (day: number) =>
    padding.left + (day / 90) * chartW;
  const yScale = (val: number) =>
    padding.top + (1 - val) * chartH;

  const pathD = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${xScale(p.day)} ${yScale(p.value)}`)
    .join(" ");

  const areaD = pathD + ` L ${xScale(points[points.length - 1].day)} ${yScale(0)} L ${xScale(points[0].day)} ${yScale(0)} Z`;

  const lastPoint = points[points.length - 1];
  const firstPoint = points[0];
  const isPositive = lastPoint.value >= firstPoint.value;
  const strokeColor = isPositive ? "#22c55e" : "#ef4444";

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMidYMid meet"
      className="w-full h-full"
    >
      {/* Grid lines */}
      {[0, 0.25, 0.5, 0.75, 1].map((v) => (
        <g key={v}>
          <line
            x1={padding.left}
            y1={yScale(v)}
            x2={width - padding.right}
            y2={yScale(v)}
            stroke="#262626"
            strokeWidth={1}
          />
          <text x={padding.left - 4} y={yScale(v) + 3} textAnchor="end" fill="#555" fontSize={9}>
            {v.toFixed(2)}
          </text>
        </g>
      ))}
      {/* Area fill */}
      <path d={areaD} fill={strokeColor} opacity={0.08} />
      {/* Line */}
      <path d={pathD} fill="none" stroke={strokeColor} strokeWidth={1.5} />
      {/* Current value dot */}
      <circle
        cx={xScale(lastPoint.day)}
        cy={yScale(lastPoint.value)}
        r={3}
        fill={strokeColor}
      />
      {/* X axis labels */}
      <text x={padding.left} y={height - 2} fill="#555" fontSize={9}>0d</text>
      <text x={width - padding.right} y={height - 2} textAnchor="end" fill="#555" fontSize={9}>90d</text>
    </svg>
  );
}
