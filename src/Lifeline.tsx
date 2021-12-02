import Rect from "./Rect";
import VerticalLine from "./VerticalLine";
import { getSize } from "./TextBoxSizeService";
import { useMemo } from "react";

interface LifelineProps {
  x: number;
  y: number;
  name: string;
  fontSize: number;
  maxWidth: number;
  minWidth: number;
  length: number;
}

export default function Lifeline(props: LifelineProps) {
  const { width, height } = useMemo(
    () => getSize(props.name, props.fontSize, props.maxWidth, props.minWidth),
    [props.name, props.fontSize, props.maxWidth, props.minWidth]
  );
  const lineX = Math.floor(width / 2) + props.x;
  return (
    <g>
      <VerticalLine x={lineX} y={props.y} length={props.length} />
      <Rect
        x={props.x}
        y={props.y}
        text={props.name}
        height={height}
        width={width}
      />
    </g>
  );
}

Lifeline.defaultProps = {
  fontSize: 12,
  maxWidth: 200,
  minWidth: 50,
  length: 500
};
