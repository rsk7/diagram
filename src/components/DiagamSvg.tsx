import { ReactNode } from "react";
import { useSvgMatrixState } from "./DiagramSvgHooks";
import "./DiagramSvg.css";

interface SvgProps {
  children: ReactNode[];
}

export default function DiagramSvg(props: SvgProps) {
  const x = window.innerWidth < 600 ? 25 : window.innerWidth * 0.4;
  const y = 50;
  const {
    matrixState,
    isDragging,
    handleMouseDown,
    handleMouseUp,
    handleMouseMove,
    handleZoom
  } = useSvgMatrixState({ x, y });

  return (
    <svg
      id="mainDiagram"
      xmlns="http://www.w3.org/2000/svg"
      onMouseDown={(e) => handleMouseDown({ x: e.pageX, y: e.pageY })}
      onMouseMove={(e) => handleMouseMove({ x: e.pageX, y: e.pageY })}
      onMouseUp={(e) => handleMouseUp({ x: e.pageX, y: e.pageY })}
      onWheel={(e) => handleZoom({ x: e.pageX, y: e.pageY }, e.deltaY > 0)}
      style={{ cursor: isDragging ? "grabbing" : "grab" }}
    >
      <defs>
        <marker
          id="arrow"
          viewBox="0 0 10 10"
          refX="5"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" />
        </marker>
      </defs>
      <g id="matrix-group" transform={`${matrixState.toString()}`}>
        {props.children}
      </g>
    </svg>
  );
}
