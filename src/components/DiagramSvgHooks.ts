import { useState } from "react";

interface Position {
  x: number;
  y: number;
}

interface DragState {
  mouseDownPosition: Position | null;
  mouseDownMatrixState: DOMMatrix | null;
}

export function useSvgMatrixState(startPosition?: Position) {
  const translate = startPosition ? [startPosition.x, startPosition.y] : [0, 0];
  const [matrixState, setMatrixState] = useState<DOMMatrix>(
    new DOMMatrix([1, 0, 0, 1, ...translate])
  );

  const [dragState, setDragState] = useState<DragState>({
    mouseDownPosition: null,
    mouseDownMatrixState: null
  });

  const handleMouseDown = (p: Position) => {
    const { mouseDownPosition } = dragState;
    if (!mouseDownPosition) {
      setDragState({
        ...dragState,
        mouseDownPosition: p,
        mouseDownMatrixState: matrixState
      });
    }
  };

  const handleMouseUp = (p: Position) => {
    const { mouseDownPosition } = dragState;
    if (mouseDownPosition) {
      setDragState({
        ...dragState,
        mouseDownPosition: null,
        mouseDownMatrixState: null
      });
    }
  };

  const handleMouseMove = (p: Position) => {
    const { mouseDownPosition, mouseDownMatrixState } = dragState;
    if (mouseDownMatrixState && mouseDownPosition) {
      const dx = (p.x - mouseDownPosition.x) / mouseDownMatrixState.a;
      const dy = (p.y - mouseDownPosition.y) / mouseDownMatrixState.d;
      setMatrixState(mouseDownMatrixState.translate(dx, dy));
    }
  };

  const handleZoom = (
    position: Position,
    scrollUp: boolean,
    scaleFactor?: number
  ) => {
    scaleFactor = scaleFactor || 1.1;
    const zoomFactor = scrollUp ? 1 / scaleFactor : scaleFactor;
    const point = new DOMPoint(position.x, position.y);
    const transformedPoint = point.matrixTransform(matrixState.inverse());
    setMatrixState(
      matrixState.scale(
        zoomFactor,
        zoomFactor,
        undefined,
        transformedPoint.x,
        transformedPoint.y
      )
    );
  };

  const isDragging = !!dragState.mouseDownPosition;

  return {
    matrixState,
    isDragging,
    handleMouseDown,
    handleMouseUp,
    handleMouseMove,
    handleZoom
  };
}
