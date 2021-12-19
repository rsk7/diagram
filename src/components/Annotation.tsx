export interface AnnotationProps {
  x: number;
  y: number;
  index: number;
  fill: string;
  font: string;
  fontColor: string;
}

export default function Annotation(props: AnnotationProps) {
  const r = 7;
  return (
    <g>
      <circle cx={props.x} cy={props.y} r={r} fill={props.fill} />
      <text
        x={props.x - 0.05 * r}
        y={props.y + 0.1 * r}
        textAnchor="middle"
        alignmentBaseline="middle"
        fill={props.fontColor}
        style={{
          font: props.font,
          fontWeight: "bold"
        }}
      >
        {props.index}
      </text>
    </g>
  );
}
