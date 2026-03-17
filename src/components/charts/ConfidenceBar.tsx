interface ConfidenceBarProps {
  label: string;
  value: number;
  color: string;
}

export function ConfidenceBar({ label, value, color }: ConfidenceBarProps) {
  return (
    <div className="flex items-center gap-2 text-xs flex-1 min-h-[14px]">
      <span className="w-28 text-[#666] shrink-0">{label}</span>
      <div className="flex-1 min-h-[6px] h-full max-h-[14px] bg-[#1a1a1a] rounded-none overflow-hidden">
        <div
          className="h-full rounded-none transition-all duration-500"
          style={{ width: `${value}%`, backgroundColor: color }}
        />
      </div>
      <span className="w-10 text-right font-medium shrink-0" style={{ color }}>
        {value}%
      </span>
    </div>
  );
}
