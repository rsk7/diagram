export interface MessageArrowProps {
  x: number;
  y: number;
  description: string;
  length: number;
  direction: "left" | "right";
}

export default function MessageArrow(props: MessageArrowProps) {
  return (
    <polyline
      points={`${props.x}, ${props.y} ${props.x + props.length} ${props.y}`}
      fill="none"
      stroke="black"
      {...(props.direction === "right"
        ? { markerEnd: "url(#arrow)" }
        : { markerStart: "url(#arrow)" })}
    ></polyline>
  );
}
