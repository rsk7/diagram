export default function Watermark(props: { x: number; y: number }) {
  return (
    <text
      fill="#b0b0b0"
      style={{ font: "12px Consolas" }}
      textAnchor="end"
      x={props.x}
      y={props.y}
    >
      sequencediagram.xyz
    </text>
  );
}
