interface VerticalLineProps {
  x: number;
  y: number;
  length: number;
}

export default function VerticalLine(props: VerticalLineProps) {
  const endY = props.y + props.length;
  return (
    <line
      x1={props.x}
      y1={props.y}
      x2={props.x}
      y2={endY}
      stroke="black"
      strokeDasharray="5, 10"
    ></line>
  );
}
