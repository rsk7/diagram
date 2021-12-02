import { useMemo } from "react";
import { getSize } from "./TextBoxSizeService";

interface RectProps {
  x: number;
  y: number;
  text: string;
  fontSize: number;
  width: number;
  height: number;
}

export default function Rect(props: RectProps) {
  const textContainerStyles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "2px 5px",
    height: props.height,
    textAlign: "center" as const,
    fontSize: props.fontSize
  };
  return (
    <g>
      <rect
        x={props.x}
        y={props.y}
        height={props.height + 0.15 * props.height}
        width={props.width}
        fill="white"
        stroke="black"
        strokeWidth="2"
      ></rect>
      <foreignObject
        x={props.x}
        y={props.y}
        height={props.height}
        width={props.width}
      >
        <div style={textContainerStyles}>{props.text}</div>
      </foreignObject>
    </g>
  );
}

Rect.defaultProps = {
  fontSize: 12
};
