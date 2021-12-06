import Rect from "./Rect";

export interface MessageArrowProps {
  startX: number;
  startY: number;
  description: string;
  direction: "left" | "right";
  endX: number;
  endY: number;
  labelX: number;
  labelY: number;
  labelHeight: number;
  labelWidth: number;
}

export default function MessageArrow(props: MessageArrowProps) {
  return (
    <g>
      <polyline
        points={`${props.startX}, ${props.startY} ${props.endX} ${props.endY}`}
        fill="none"
        stroke="black"
        {...(props.direction === "right"
          ? { markerEnd: "url(#arrow)" }
          : { markerStart: "url(#arrow)" })}
      ></polyline>
      <Rect
        x={props.labelX}
        y={props.labelY}
        text={props.description}
        height={props.labelHeight}
        width={props.labelWidth}
        border={false}
      />
    </g>
  );
}
