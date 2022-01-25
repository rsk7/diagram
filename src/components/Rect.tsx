import TextBoxDetails from "../services/TextBoxDetails";
import Annotation from "./Annotation";

interface RectProps {
  boxX: number;
  boxY: number;
  textBoxDetails: TextBoxDetails;
  annotation?: {
    index: number;
    color: string;
    font: string;
  };
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
        rx={props.textBoxDetails.rounding}
        fill={props.textBoxDetails.fill}
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
      {props.annotation && (
        <Annotation
          x={props.boxX}
          y={props.boxY}
          font={props.annotation.font}
          index={props.annotation.index}
          fill={props.annotation.color}
          fontColor="white"
        />
      )}
    </g>
  );
}
