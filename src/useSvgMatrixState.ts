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
export default function useSvgMatrixState(initMatrix: number[]) {
  const [dragState, setDragState] = useState<DragState>({
    mouseDownPosition: null,
    originalTransform: { x: initMatrix[4], y: initMatrix[5] },
    currentTransform: { x: initMatrix[4], y: initMatrix[5] }
  });

  const handleMouseDown = (p: Position) => {
    const { mouseDownPosition, currentTransform } = dragState;
    if (!mouseDownPosition) {
      setDragState({
        ...dragState,
        mouseDownPosition: p,
        originalTransform: currentTransform
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

  const [zoomState, setZoomState] = useState<number>(initMatrix[0]);
  const zoomInterval = 0.1;

  const handleZoom = (position: Position, scrollUp: boolean) => {
    setZoomState(
      scrollUp ? zoomState - zoomInterval : zoomState + zoomInterval
    );
    // use position to zoom on mouse position as center
  };

  const matrix = [
    zoomState,
    0,
    0,
    zoomState,
    dragState.currentTransform.x,
    dragState.currentTransform.y
  ];

  const isDragging = !!dragState.mouseDownPosition;

  return {
    matrix,
    isDragging,
    handleMouseDown,
    handleMouseUp,
    handleMouseMove,
    handleZoom
  };
}
