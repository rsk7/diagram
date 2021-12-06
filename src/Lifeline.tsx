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
  lineX: number;
}

export default function Lifeline(props: LifelineProps) {
  return (
    <g>
      <VerticalLine x={props.lineX} y={props.y} length={props.length} />
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
