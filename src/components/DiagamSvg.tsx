import { ReactNode, useRef } from "react";
import { useSvgMatrixState } from "./DiagramSvgHooks";
import "./DiagramSvg.css";
import { createUseGesture, dragAction, pinchAction } from "@use-gesture/react";

interface SvgProps {
  children: ReactNode[];
}

const useGesture = createUseGesture([dragAction, pinchAction]);

export default function DiagramSvg(props: SvgProps) {
  const x = window.innerWidth < 600 ? 25 : window.innerWidth * 0.4;
  const y = 100;
  const {
    matrixState,
    isDragging,
    handleMouseDown,
    handleMouseUp,
    handleMouseMove,
    handleZoom
  } = useSvgMatrixState({ x, y });

  const ref = useRef(null);
  useGesture(
    {
      onDragStart: (state) => {
        handleMouseDown({ x: state.xy[0], y: state.xy[1] });
      },
      onDrag: (state) => {
        if (state.pinching) return state.cancel();
        handleMouseMove({ x: state.xy[0], y: state.xy[1] });
      },
      onDragEnd: (state) => {
        handleMouseUp({ x: state.xy[0], y: state.xy[1] });
      },
      onPinch: (state) => {
        handleZoom(
          { x: state.origin[0], y: state.origin[1] },
          state.direction[0] < 0,
          1.02
        );
      }
    },
    { target: ref }
  );

  return (
    <svg
      ref={ref}
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
