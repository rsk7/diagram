import { useState } from "react";

interface Position {
  x: number;
  y: number;
}

interface DragState {
  mouseDownPosition: Position | null;
  originalTransform: Position;
  currentTransform: Position;
}

// return transform matrix
export default function useSvgDragState(transform: Position) {
  const [dragState, setDragState] = useState<DragState>({
    mouseDownPosition: null,
    originalTransform: transform,
    currentTransform: transform
  });

  const handleMouseDown = (p: Position) => {
    const { mouseDownPosition } = dragState;
    if (!mouseDownPosition) {
      setDragState({
        ...dragState,
        mouseDownPosition: p
      });
    }
  };

  const handleMouseUp = (p: Position) => {
    const { mouseDownPosition, currentTransform } = dragState;
    if (mouseDownPosition) {
      setDragState({
        ...dragState,
        mouseDownPosition: null,
        originalTransform: currentTransform
      });
    }
  };

  const handleMouseMove = (p: Position) => {
    const { mouseDownPosition, originalTransform } = dragState;
    if (mouseDownPosition) {
      const dx = p.x - mouseDownPosition.x;
      const dy = p.y - mouseDownPosition.y;
      setDragState({
        ...dragState,
        currentTransform: {
          x: originalTransform.x + dx,
          y: originalTransform.y + dy
        }
      });
    }
  };

  return {
    dragState,
    handleMouseDown,
    handleMouseUp,
    handleMouseMove
  };
}
