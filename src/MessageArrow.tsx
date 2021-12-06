export interface MessageArrowProps {
  x: number;
  y: number;
  description: string;
  length: number;
  direction: "left" | "right";
}

export default function MessageArrow(props: MessageArrowProps) {
  return (
    <g>
      <polyline
        points={`${props.x}, ${props.y} ${props.x + props.length} ${props.y}`}
        fill="none"
        stroke="black"
        {...(props.direction === "right"
          ? { markerEnd: "url(#arrow)" }
          : { markerStart: "url(#arrow)" })}
      ></polyline>
      <text
        x={props.x + props.length / 2}
        y={props.y - 10}
        fontSize="12"
        textAnchor="middle"
      >
        {props.description}
      </text>
    </g>
  );
}
