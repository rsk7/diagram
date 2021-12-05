import Rect from "./Rect";
import VerticalLine from "./VerticalLine";

export interface LifelineProps {
  x: number;
  y: number;
  name: string;
  fontSize: number;
  width: number;
  height: number;
  length: number;
}

export default function Lifeline(props: LifelineProps) {
  const lineX = Math.floor(props.width / 2) + props.x;
  return (
    <g>
      <VerticalLine x={lineX} y={props.y} length={props.length} />
      <Rect
        x={props.x}
        y={props.y}
        text={props.name}
        height={props.height}
        width={props.width}
      />
    </g>
  );
}
