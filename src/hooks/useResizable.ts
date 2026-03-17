import { useState, useCallback, useRef, useEffect } from "react";

interface ResizableState {
  leftWidthPercent: number;
  bottomHeightPx: number;
}

const MIN_LEFT_PERCENT = 30;
const MAX_LEFT_PERCENT = 80;
const MIN_BOTTOM_PX = 80;
const MAX_BOTTOM_PX = 500;
const MIN_TOP_PX = 380;

export function useResizable(defaults?: Partial<ResizableState>) {
  const [leftWidthPercent, setLeftWidthPercent] = useState(defaults?.leftWidthPercent ?? 60);
  const [bottomHeightPx, setBottomHeightPx] = useState(defaults?.bottomHeightPx ?? 200);
  const dragging = useRef<"horizontal" | "vertical" | null>(null);
  const startPos = useRef({ x: 0, y: 0 });
  const startSize = useRef({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement | null>(null);

  const onHorizontalDragStart = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    dragging.current = "horizontal";
    startPos.current = { x: e.clientX, y: e.clientY };
    startSize.current = { width: leftWidthPercent, height: bottomHeightPx };
    document.body.style.userSelect = "none";
    document.body.style.cursor = "col-resize";
  }, [leftWidthPercent, bottomHeightPx]);

  const onVerticalDragStart = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    dragging.current = "vertical";
    startPos.current = { x: e.clientX, y: e.clientY };
    startSize.current = { width: leftWidthPercent, height: bottomHeightPx };
    document.body.style.userSelect = "none";
    document.body.style.cursor = "row-resize";
  }, [leftWidthPercent, bottomHeightPx]);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!dragging.current) return;

      if (dragging.current === "horizontal" && containerRef.current) {
        const containerWidth = containerRef.current.getBoundingClientRect().width;
        const deltaX = e.clientX - startPos.current.x;
        const deltaPercent = (deltaX / containerWidth) * 100;
        const newWidth = Math.min(MAX_LEFT_PERCENT, Math.max(MIN_LEFT_PERCENT, startSize.current.width + deltaPercent));
        setLeftWidthPercent(newWidth);
      }

      if (dragging.current === "vertical") {
        const parentEl = containerRef.current?.parentElement;
        const totalHeight = parentEl ? parentEl.getBoundingClientRect().height : window.innerHeight;
        const deltaY = startPos.current.y - e.clientY;
        const candidateBottom = startSize.current.height + deltaY;
        // Enforce: bottom can't grow so much that top area goes below MIN_TOP_PX
        // totalHeight = topArea + dragHandle(~4px) + bottomArea
        const maxBottom = Math.min(MAX_BOTTOM_PX, totalHeight - MIN_TOP_PX - 4);
        const newHeight = Math.min(maxBottom, Math.max(MIN_BOTTOM_PX, candidateBottom));
        setBottomHeightPx(newHeight);
      }
    };

    const onMouseUp = () => {
      if (!dragging.current) return;
      dragging.current = null;
      document.body.style.userSelect = "";
      document.body.style.cursor = "";
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  return {
    leftWidthPercent,
    bottomHeightPx,
    containerRef,
    onHorizontalDragStart,
    onVerticalDragStart,
  };
}
