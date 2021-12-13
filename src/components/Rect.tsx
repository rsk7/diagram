import TextBoxDetails from "../services/TextBoxDetails";

interface RectProps {
  boxX: number;
  boxY: number;
  textBoxDetails: TextBoxDetails;
}

export default function Rect(props: RectProps) {
  const { textX, textY, textAnchor } = props.textBoxDetails.getTextPosition(
    props.boxX,
    props.boxY
  );
  return (
    <g>
      <rect
        x={props.boxX}
        y={props.boxY}
        height={props.textBoxDetails.height}
        width={props.textBoxDetails.width}
        fill="transparent"
        {...(props.textBoxDetails.border
          ? {
              stroke: "black",
              strokeWidth: "2"
            }
          : {})}
      ></rect>
      <text
        style={{ font: props.textBoxDetails.font }}
        x={textX}
        y={textY}
        textAnchor={textAnchor}
      >
        {props.textBoxDetails.lines.map((l, idx) => (
          <tspan
            key={idx}
            alignmentBaseline="hanging"
            x={textX}
            dy={`${idx === 0 ? 0 : props.textBoxDetails.lineHeight}px`}
          >
            {l.text}
          </tspan>
        ))}
      </text>
    </g>
  );
}
