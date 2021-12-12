import Rect from "./Rect";
import VerticalLine from "./VerticalLine";

export interface LifelineProps {
  x: number;
  y: number;
  name: string;
  font: string;
  width: number;
  height: number;
  length: number;
  lineX: number;
  textPadding: number;
}

export default function Lifeline(props: LifelineProps) {
  return (
    <g>
      <VerticalLine
        x={props.lineX}
        y={props.y + props.height}
        length={props.length}
      />
      <Rect
        x={props.x}
        y={props.y}
        font={props.font}
        text={props.name}
        height={props.height}
        width={props.width}
        padding={props.textPadding}
      />
    </g>
  );
}
