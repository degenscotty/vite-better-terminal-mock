import type { ReactNode } from "react";
import { useResizable } from "@/hooks/useResizable";
import { DragHandle } from "./DragHandle";

interface LayoutProps {
  leftPanel: ReactNode;
  rightPanel: ReactNode;
  bottomPanel: ReactNode;
}

export function Layout({ leftPanel, rightPanel, bottomPanel }: LayoutProps) {
  const {
    leftWidthPercent,
    bottomHeightPx,
    containerRef,
    onHorizontalDragStart,
    onVerticalDragStart,
  } = useResizable();

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div ref={containerRef} className="flex-1 flex overflow-hidden" style={{ minHeight: 380 }}>
        <div style={{ width: `${leftWidthPercent}%` }} className="overflow-hidden">
          {leftPanel}
        </div>
        <DragHandle direction="horizontal" onMouseDown={onHorizontalDragStart} />
        <div className="flex-1 overflow-hidden flex flex-col">
          {rightPanel}
        </div>
      </div>

      <DragHandle direction="vertical" onMouseDown={onVerticalDragStart} />

      <div style={{ height: `${bottomHeightPx}px`, minHeight: 80 }} className="overflow-hidden shrink-0">
        {bottomPanel}
      </div>
    </div>
  );
}
