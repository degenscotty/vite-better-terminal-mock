interface DragHandleProps {
  direction: "horizontal" | "vertical";
  onMouseDown: (e: React.MouseEvent) => void;
}

export function DragHandle({ direction, onMouseDown }: DragHandleProps) {
  if (direction === "horizontal") {
    return (
      <div
        onMouseDown={onMouseDown}
        className="w-[4px] shrink-0 cursor-col-resize bg-[#333] hover:bg-[#444] active:bg-terminal-green/40 transition-colors"
      />
    );
  }

  return (
    <div
      onMouseDown={onMouseDown}
      className="h-[4px] shrink-0 cursor-row-resize bg-[#333] hover:bg-[#444] active:bg-terminal-green/40 transition-colors"
    />
  );
}
