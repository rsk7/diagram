import Rect from "./Rect";

export interface MessageArrowProps {
  startX: number;
  startY: number;
  description: string;
  endX: number;
  endY: number;
  labelX: number;
  labelY: number;
  labelHeight: number;
  labelWidth: number;
}

export default function MessageArrow(props: MessageArrowProps) {
  const direction = props.startX - props.endX;
  return (
    <g>
      <polyline
        points={`${props.startX}, ${props.startY} ${props.endX} ${props.endY}`}
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
        textAlign={direction < 0 ? "left" : "right"}
      />
    </g>
  );
}
