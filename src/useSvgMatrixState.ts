import { useState } from "react";

interface Position {
  x: number;
  y: number;
}

interface DragState {
  mouseDownPosition: Position | null;
  mouseDownMatrixState: DOMMatrix | null;
}

export default function useSvgMatrixState(initMatrix?: DOMMatrix) {
  const [matrixState, setMatrixState] = useState<DOMMatrix>(
    initMatrix || new DOMMatrix()
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

  const handleZoom = (position: Position, scrollUp: boolean) => {
    console.log("zoom position", position.x, position.y);
    const zoomFactor = scrollUp ? 1 / 1.01 : 1.01;
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
