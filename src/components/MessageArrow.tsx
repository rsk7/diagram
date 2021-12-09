import Rect from "./Rect";

export interface MessageArrowProps {
  description: string;
  labelX: number;
  labelY: number;
  labelHeight: number;
  labelWidth: number;
  points: number[][];
  y: number;
}

export default function MessageArrow(props: MessageArrowProps) {
  const startEndXDifference = props.points.length
    ? props.points[0][0] - props.points[props.points.length - 1][0]
    : 0;
  const points = props.points.map((p) => `${p[0]}, ${p[1]}`).join(" ");
  return (
    <g>
      <polyline
        points={points}
        fill="none"
        stroke="black"
        markerEnd="url(#arrow)"
      ></polyline>
      <Rect
        x={props.labelX}
        y={props.labelY}
        text={props.description}
        height={props.labelHeight}
        width={props.labelWidth}
        border={false}
        textAlign={startEndXDifference <= 0 ? "left" : "right"}
      />
    </g>
  );
}
